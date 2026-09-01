import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

type Lead = {
  sector: string;
  sectorSlug: string;
  objective: string;
  situation: string;
  budget: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  lang: string;
  source: string;
  submittedAt: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s().-]{5,}$/;
const MIN_ELAPSED_MS = 3 * 1000;

function sanitize(value: unknown, max = 500): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function buildText(lead: Lead): string {
  const l =
    lead.lang === "en"
      ? {
          sector: "Sector",
          objective: "Main objective",
          situation: "Current situation",
          budget: "Estimated budget",
          name: "Full name",
          company: "Company",
          email: "Email",
          phone: "Phone / WhatsApp",
          message: "Message",
          lang: "Language",
          source: "Source",
        }
      : {
          sector: "Secteur",
          objective: "Objectif principal",
          situation: "Situation actuelle",
          budget: "Budget estimatif",
          name: "Nom complet",
          company: "Entreprise",
          email: "E-mail",
          phone: "Téléphone / WhatsApp",
          message: "Message",
          lang: "Langue",
          source: "Source",
        };
  return [
    `${l.sector}: ${lead.sector}`,
    `${l.objective}: ${lead.objective}`,
    `${l.situation}: ${lead.situation}`,
    `${l.budget}: ${lead.budget}`,
    "",
    `${l.name}: ${lead.name}`,
    `${l.company}: ${lead.company || "-"}`,
    `${l.email}: ${lead.email}`,
    `${l.phone}: ${lead.phone}`,
    "",
    `${l.message}:`,
    lead.message,
    "",
    `${l.lang}: ${lead.lang === "en" ? "English" : "Français"}`,
    `${l.source}: ${lead.source}`,
  ].join("\n");
}

async function sendResend(apiKey: string, from: string, to: string, subject: string, text: string): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, text }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return { ok: false, error: `resend ${res.status}: ${body.slice(0, 300)}` };
  }
  return { ok: true };
}

async function sendSendGrid(apiKey: string, from: string, to: string, subject: string, text: string): Promise<{ ok: boolean; error?: string }> {
  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from },
      subject,
      content: [{ type: "text/plain", value: text }],
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    return { ok: false, error: `sendgrid ${res.status}: ${body.slice(0, 300)}` };
  }
  return { ok: true };
}

async function sendMailgun(apiKey: string, from: string, to: string, subject: string, text: string): Promise<{ ok: boolean; error?: string }> {
  const domain = process.env.MAILGUN_DOMAIN;
  if (!domain) return { ok: false, error: "mailgun domain not configured" };
  const body = new URLSearchParams({ from, to, subject, text });
  const res = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
    method: "POST",
    headers: { Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}` },
    body,
  });
  if (!res.ok) {
    const textBody = await res.text().catch(() => "");
    return { ok: false, error: `mailgun ${res.status}: ${textBody.slice(0, 300)}` };
  }
  return { ok: true };
}

async function deliverEmail(lead: Lead): Promise<{ ok: boolean; error?: string }> {
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL_TO ?? "contact@proodz.com";
  if (!from) return { ok: false, error: "CONTACT_EMAIL_FROM not configured" };
  const subject =
    lead.lang === "en" ? `[Proodz] New diagnostic — ${lead.sector}` : `[Proodz] Nouveau diagnostic — ${lead.sector}`;
  const text = buildText(lead);

  if (process.env.RESEND_API_KEY) return sendResend(process.env.RESEND_API_KEY, from, to, subject, text);
  if (process.env.SENDGRID_API_KEY) return sendSendGrid(process.env.SENDGRID_API_KEY, from, to, subject, text);
  if (process.env.MAILGUN_API_KEY) return sendMailgun(process.env.MAILGUN_API_KEY, from, to, subject, text);
  return { ok: false, error: "no email provider configured" };
}

async function recordFallback(lead: Lead): Promise<void> {
  const dir =
    process.env.LEADS_DIR ||
    path.join(/* turbopackIgnore: true */ process.cwd(), "var", "leads");
  await fs.mkdir(dir, { recursive: true });
  await fs.appendFile(path.join(dir, "diagnostic.jsonl"), JSON.stringify(lead) + "\n", "utf8");
}

export async function POST(request: Request): Promise<NextResponse> {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  const lead: Lead = {
    sector: sanitize(body.sector, 200),
    sectorSlug: sanitize(body.sectorSlug, 80),
    objective: sanitize(body.objective, 200),
    situation: sanitize(body.situation, 200),
    budget: sanitize(body.budget, 120),
    name: sanitize(body.name, 120),
    company: sanitize(body.company, 120),
    email: sanitize(body.email, 200).toLowerCase(),
    phone: sanitize(body.phone, 60),
    message: sanitize(body.message, 3000),
    lang: body.lang === "en" ? "en" : "fr",
    source: sanitize(body.source, 300) || "direct",
    submittedAt: new Date().toISOString(),
  };

  // Anti-spam: honeypot field must stay empty.
  if (sanitize(body.honeypot, 500) !== "") {
    return NextResponse.json({ ok: true, delivered: false, status: "spam" });
  }
  // Anti-spam: reject submissions that arrive faster than a human can type.
  const start = typeof body.formStart === "number" ? body.formStart : 0;
  const elapsed = Date.now() - start;
  if (elapsed >= 0 && elapsed < MIN_ELAPSED_MS) {
    return NextResponse.json({ ok: true, delivered: false, status: "spam" });
  }

  if (!lead.sector || !lead.objective || !lead.name || !lead.email || !lead.phone) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!EMAIL_RE.test(lead.email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  if (!PHONE_RE.test(lead.phone)) {
    return NextResponse.json({ ok: false, error: "invalid_phone" }, { status: 400 });
  }

  const delivery = await deliverEmail(lead);
  if (delivery.ok) {
    return NextResponse.json({ ok: true, delivered: true, status: "delivered" });
  }

  // Safe fallback: persist locally. We never claim an email was sent in this mode.
  try {
    await recordFallback(lead);
    console.warn("[contact] email not delivered, lead recorded locally:", delivery.error);
    return NextResponse.json({ ok: true, delivered: false, status: "recorded" });
  } catch (err) {
    console.error("[contact] fallback write failed:", err);
    return NextResponse.json({ ok: false, error: "fallback_failed" }, { status: 500 });
  }
}
