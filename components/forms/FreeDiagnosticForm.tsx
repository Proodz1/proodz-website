"use client";
import { useEffect, useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";
import type { Translations } from "@/i18n/types";
import {
  IconCheck, IconArrowLeft, IconWhatsApp,
  IconRocket, IconTarget, IconMapPin, IconTrendingUp, IconBriefcase,
  IconLineChart, IconCode, IconGlobe, IconLightbulb, IconHandshake,
  IconGear, IconMessageCircle, IconClipboard,
} from "@/components/icons/Icons";

const spaceFont = "var(--font-space), 'Space Grotesk', sans-serif";
const interFont = "var(--font-inter), 'Inter', sans-serif";
const WA_PHONE = "21694809417";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s().-]{5,}$/;

const SERVICE_TO_OBJECTIVE: Record<number, number> = { 0: 0, 2: 1, 3: 2, 4: 3, 5: 4 };

type Answers = { sector: number | null; objective: number | null; situation: number | null; budget: number | null };
type Contact = { name: string; company: string; email: string; phone: string; message: string };
type Status = "idle" | "submitting" | "success" | "error";

function readPreselect(fd: Translations["freeDiagnostic"]): { sector: number | null; objective: number | null } {
  if (typeof window === "undefined") return { sector: null, objective: null };
  const params = new URLSearchParams(window.location.search);
  let sector: number | null = null;
  const section = params.get("section");
  if (section) {
    const i = fd.sectors.findIndex((s) => s.slug === section.trim());
    if (i >= 0) sector = i;
  }
  let objective: number | null = null;
  const service = params.get("service");
  if (service) {
    const n = Number.parseInt(service, 10);
    const mapped = Number.isInteger(n) ? SERVICE_TO_OBJECTIVE[n] : undefined;
    if (mapped !== undefined) objective = mapped;
  }
  return { sector, objective };
}

const sectorIcons: ReactNode[] = [
  <IconMapPin key="sec0" size={18} color="#4361EE" />,
  <IconGlobe key="sec1" size={18} color="#4361EE" />,
  <IconRocket key="sec2" size={18} color="#4361EE" />,
  <IconBriefcase key="sec3" size={18} color="#4361EE" />,
  <IconLightbulb key="sec4" size={18} color="#4361EE" />,
  <IconLineChart key="sec5" size={18} color="#4361EE" />,
  <IconHandshake key="sec6" size={18} color="#4361EE" />,
  <IconClipboard key="sec7" size={18} color="#4361EE" />,
];

const objectiveIcons: ReactNode[] = [
  <IconTarget key="obj0" size={18} color="#4361EE" />,
  <IconCode key="obj1" size={18} color="#4361EE" />,
  <IconTrendingUp key="obj2" size={18} color="#4361EE" />,
  <IconLightbulb key="obj3" size={18} color="#4361EE" />,
  <IconGear key="obj4" size={18} color="#4361EE" />,
  <IconGlobe key="obj5" size={18} color="#4361EE" />,
  <IconClipboard key="obj6" size={18} color="#4361EE" />,
];

const situationIcons: ReactNode[] = [
  <IconRocket key="sit0" size={18} color="#4361EE" />,
  <IconLineChart key="sit1" size={18} color="#4361EE" />,
  <IconMessageCircle key="sit2" size={18} color="#4361EE" />,
  <IconTrendingUp key="sit3" size={18} color="#4361EE" />,
  <IconTarget key="sit4" size={18} color="#4361EE" />,
  <IconClipboard key="sit5" size={18} color="#4361EE" />,
];

function OptionCard({ icon, label, selected, onSelect }: { icon: ReactNode; label: string; selected: boolean; onSelect: () => void }) {
  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        textAlign: "left",
        width: "100%",
        cursor: "pointer",
        fontFamily: interFont,
        background: selected ? "rgba(67,97,238,0.06)" : "#FFFFFF",
        border: selected ? "1.5px solid #4361EE" : "1.5px solid rgba(10,10,10,0.12)",
        borderRadius: 14,
        padding: "12px 14px",
        transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
        boxShadow: selected ? "0 8px 24px rgba(67,97,238,0.12)" : "none",
        color: selected ? "#4361EE" : "#0A0A0A",
      }}
    >
      <span aria-hidden style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(67,97,238,0.08)", border: "1px solid rgba(67,97,238,0.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {icon}
      </span>
      <span style={{ flex: 1, fontSize: 14, fontWeight: 600, lineHeight: 1.4, minWidth: 0 }}>{label}</span>
      <span aria-hidden style={{ width: 22, height: 22, borderRadius: "50%", background: selected ? "#4361EE" : "rgba(10,10,10,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        {selected ? <IconCheck size={12} color="#FFFFFF" /> : null}
      </span>
    </motion.button>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label htmlFor={id} style={{ fontSize: 13, fontWeight: 600, color: "rgba(10,10,10,0.8)" }}>
        {label}
      </label>
      {children}
      {error && <span role="alert" style={{ fontSize: 12, color: "#D64545", fontWeight: 500 }}>{error}</span>}
    </div>
  );
}

export default function FreeDiagnosticForm() {
  const { t, lang } = useLang();
  const fd = t.freeDiagnostic;

  const [boot] = useState(() => {
    const p = readPreselect(fd);
    return { preselect: p };
  });
  const preselect = boot.preselect;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({ sector: preselect.sector, objective: preselect.objective, situation: null, budget: null });
  const [contact, setContact] = useState<Contact>({ name: "", company: "", email: "", phone: "", message: "" });
  const [stepError, setStepError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [contactAttempted, setContactAttempted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const startRef = useRef<number>(0);
  const firstRender = useRef(true);
  const submittingRef = useRef(false);

  useEffect(() => {
    startRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const validateStep = (): string | null => {
    if (step === 0 && answers.sector === null) return fd.requiredError;
    if (step === 1 && answers.objective === null) return fd.requiredError;
    if (step === 2 && answers.situation === null) return fd.requiredError;
    if (step === 3 && answers.budget === null) return fd.requiredError;
    return null;
  };

  const validateContact = (c: Contact): Record<string, string> => {
    const e: Record<string, string> = {};
    if (!c.name.trim()) e.name = fd.requiredError;
    if (!c.email.trim()) e.email = fd.requiredError;
    else if (!EMAIL_RE.test(c.email.trim())) e.email = fd.emailError;
    if (!c.phone.trim()) e.phone = fd.requiredError;
    else if (!PHONE_RE.test(c.phone.trim())) e.phone = fd.phoneError;
    if (!c.message.trim()) e.message = fd.requiredError;
    return e;
  };

  const goTo = (s: number) => {
    if (s < 0 || s > 4) return;
    setStep(s);
    setStepError(null);
    setFieldErrors({});
    setStatus("idle");
  };

  const selectOption = (key: keyof Answers, index: number) => {
    setAnswers((a) => ({ ...a, [key]: index }));
    setStepError(null);
  };

  const handleContactChange = (key: keyof Contact, value: string) => {
    const next = { ...contact, [key]: value };
    setContact(next);
    if (status === "error") setStatus("idle");
    if (contactAttempted) setFieldErrors(validateContact(next));
  };

  const next = () => {
    if (step < 4) {
      const err = validateStep();
      if (err) {
        setStepError(err);
        return;
      }
      goTo(step + 1);
      return;
    }
    submit();
  };

  const submit = async () => {
    if (submittingRef.current) return;
    const errs = validateContact(contact);
    setFieldErrors(errs);
    setContactAttempted(true);
    if (Object.keys(errs).length > 0) return;
    submittingRef.current = true;
    setStatus("submitting");

    const fdData = new FormData(formRef.current ?? undefined);
    const payload = {
      sector: answers.sector !== null ? fd.sectors[answers.sector].label : "",
      sectorSlug: answers.sector !== null ? fd.sectors[answers.sector].slug : "",
      objective: answers.objective !== null ? fd.objectives[answers.objective] : "",
      situation: answers.situation !== null ? fd.situations[answers.situation] : "",
      budget: answers.budget !== null ? fd.budgets[answers.budget] : "",
      name: contact.name.trim(),
      company: contact.company.trim(),
      email: contact.email.trim(),
      phone: contact.phone.trim(),
      message: contact.message.trim(),
      lang,
      source: typeof window !== "undefined" ? window.location.href : "direct",
      honeypot: String(fdData.get("company_website") ?? ""),
      formStart: startRef.current,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok?: boolean };
      if (res.ok && data.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    next();
  };

  const resetAll = () => {
    setAnswers({ sector: preselect.sector, objective: preselect.objective, situation: null, budget: null });
    setContact({ name: "", company: "", email: "", phone: "", message: "" });
    setStep(0);
    setStepError(null);
    setFieldErrors({});
    setContactAttempted(false);
    setStatus("idle");
    submittingRef.current = false;
    startRef.current = Date.now();
  };

  const fieldStyle = (error?: string) => ({
    background: "#FFFFFF",
    border: `1.5px solid ${error ? "#D64545" : "rgba(10,10,10,0.22)"}`,
    borderRadius: 10,
    padding: "13px 14px",
    fontSize: 14,
    color: "#0A0A0A",
    width: "100%",
    fontFamily: interFont,
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.2s, box-shadow 0.2s",
  });

  const waMsg = fd.whatsappMsg
    .replace("{sector}", answers.sector !== null ? fd.sectors[answers.sector].label : "")
    .replace("{objective}", answers.objective !== null ? fd.objectives[answers.objective] : "");
  const waHref = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(waMsg)}`;

  const summaryRows: { label: string; value: string }[] = [
    { label: fd.summaryLabels.sector, value: answers.sector !== null ? fd.sectors[answers.sector].label : "" },
    { label: fd.summaryLabels.objective, value: answers.objective !== null ? fd.objectives[answers.objective] : "" },
    { label: fd.summaryLabels.situation, value: answers.situation !== null ? fd.situations[answers.situation] : "" },
    { label: fd.summaryLabels.budget, value: answers.budget !== null ? fd.budgets[answers.budget] : "" },
    { label: fd.summaryLabels.name, value: contact.name },
    { label: fd.summaryLabels.email, value: contact.email },
    { label: fd.summaryLabels.phone, value: contact.phone },
  ];

  const renderStepContent = () => {
    if (step === 0) {
      return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="fd-options-grid">
          {fd.sectors.map((s, i) => (
            <OptionCard key={s.slug} icon={sectorIcons[i]} label={s.label} selected={answers.sector === i} onSelect={() => selectOption("sector", i)} />
          ))}
        </div>
      );
    }
    if (step === 1) {
      return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="fd-options-grid">
          {fd.objectives.map((label, i) => (
            <OptionCard key={label} icon={objectiveIcons[i]} label={label} selected={answers.objective === i} onSelect={() => selectOption("objective", i)} />
          ))}
        </div>
      );
    }
    if (step === 2) {
      return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="fd-options-grid">
          {fd.situations.map((label, i) => (
            <OptionCard key={label} icon={situationIcons[i]} label={label} selected={answers.situation === i} onSelect={() => selectOption("situation", i)} />
          ))}
        </div>
      );
    }
    if (step === 3) {
      return (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="fd-options-grid">
            {fd.budgets.map((label, i) => (
              <OptionCard key={label} icon={<IconClipboard size={18} color="#4361EE" />} label={label} selected={answers.budget === i} onSelect={() => selectOption("budget", i)} />
            ))}
          </div>
          <p style={{ fontSize: 13, color: "rgba(10,10,10,0.55)", lineHeight: 1.6, margin: "16px 0 0" }}>{fd.budgetNote}</p>
        </div>
      );
    }
    return (
      <div style={{ display: "grid", gap: 14 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="fd-options-grid">
          <Field id="fd-name" label={fd.fields.name} error={fieldErrors.name}>
            <input id="fd-name" type="text" autoComplete="name" style={fieldStyle(fieldErrors.name)} value={contact.name} onChange={(e) => handleContactChange("name", e.target.value)} />
          </Field>
          <Field id="fd-company" label={fd.fields.company}>
            <input id="fd-company" type="text" autoComplete="organization" style={fieldStyle()} value={contact.company} onChange={(e) => handleContactChange("company", e.target.value)} />
          </Field>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="fd-options-grid">
          <Field id="fd-email" label={fd.fields.email} error={fieldErrors.email}>
            <input id="fd-email" type="email" autoComplete="email" style={fieldStyle(fieldErrors.email)} value={contact.email} onChange={(e) => handleContactChange("email", e.target.value)} />
          </Field>
          <Field id="fd-phone" label={fd.fields.phone} error={fieldErrors.phone}>
            <input id="fd-phone" type="tel" autoComplete="tel" style={fieldStyle(fieldErrors.phone)} value={contact.phone} onChange={(e) => handleContactChange("phone", e.target.value)} />
          </Field>
        </div>
        <Field id="fd-message" label={fd.fields.message} error={fieldErrors.message}>
          <textarea id="fd-message" style={{ ...fieldStyle(fieldErrors.message), height: 110, resize: "none" }} value={contact.message} onChange={(e) => handleContactChange("message", e.target.value)} />
        </Field>
      </div>
    );
  };

  if (status === "success") {
    return (
      <div style={{ background: "#FFFFFF", border: "1px solid rgba(67,97,238,0.22)", borderRadius: 18, padding: "32px 28px", boxShadow: "0 10px 40px rgba(67,97,238,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
          <span aria-hidden style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(67,97,238,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <IconCheck size={24} color="#4361EE" />
          </span>
          <h3 style={{ fontFamily: spaceFont, fontSize: 22, fontWeight: 800, margin: 0 }}>{fd.successTitle}</h3>
        </div>
        <p style={{ fontSize: 14.5, color: "rgba(10,10,10,0.65)", lineHeight: 1.7, margin: "0 0 24px" }}>{fd.successText}</p>

        <div style={{ background: "#F7F9FC", border: "1px solid rgba(67,97,238,0.14)", borderRadius: 14, padding: "18px 20px", marginBottom: 24 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "rgba(10,10,10,0.5)", margin: "0 0 6px" }}>{fd.summaryTitle}</p>
          {summaryRows.map((r) => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "8px 0", borderBottom: "1px solid rgba(10,10,10,0.06)", fontSize: 13 }}>
              <span style={{ color: "rgba(10,10,10,0.5)", fontWeight: 600, flexShrink: 0 }}>{r.label}</span>
              <span style={{ color: "#0A0A0A", fontWeight: 600, textAlign: "right", wordBreak: "break-word" }}>{r.value}</span>
            </div>
          ))}
          {contact.company.trim() && (
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "8px 0", borderBottom: "1px solid rgba(10,10,10,0.06)", fontSize: 13 }}>
              <span style={{ color: "rgba(10,10,10,0.5)", fontWeight: 600, flexShrink: 0 }}>{fd.summaryLabels.company}</span>
              <span style={{ color: "#0A0A0A", fontWeight: 600, textAlign: "right", wordBreak: "break-word" }}>{contact.company}</span>
            </div>
          )}
          <div style={{ padding: "8px 0 0", fontSize: 13 }}>
            <span style={{ color: "rgba(10,10,10,0.5)", fontWeight: 600, display: "block", marginBottom: 4 }}>{fd.summaryLabels.message}</span>
            <p style={{ color: "#0A0A0A", fontWeight: 500, margin: 0, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{contact.message}</p>
          </div>
        </div>

        <motion.a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -2, boxShadow: "0 10px 28px rgba(37,211,102,0.35)" }}
          whileTap={{ scale: 0.98 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: "#25D366", color: "#FFFFFF", fontWeight: 700, fontSize: 15, padding: "14px", borderRadius: 12, textDecoration: "none", marginBottom: 12, fontFamily: interFont }}
        >
          <IconWhatsApp size={20} color="#FFFFFF" /> {fd.whatsappBtn} →
        </motion.a>

        <button
          type="button"
          onClick={resetAll}
          style={{ width: "100%", background: "none", border: "1px solid rgba(10,10,10,0.2)", color: "rgba(10,10,10,0.7)", fontWeight: 700, fontSize: 14, padding: "12px", borderRadius: 12, cursor: "pointer", fontFamily: interFont }}
        >
          {fd.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: "#FFFFFF", border: "1px solid rgba(67,97,238,0.22)", borderRadius: 18, padding: "28px 24px", boxShadow: "0 10px 40px rgba(67,97,238,0.08)" }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#4361EE", display: "block", marginBottom: 6 }}>
        {fd.eyebrow}
      </span>
      <h3 style={{ fontFamily: spaceFont, fontSize: 20, fontWeight: 800, textTransform: "uppercase", margin: "0 0 4px" }}>
        {fd.title1}<span style={{ color: "#4361EE" }}>{fd.title2}</span>
      </h3>
      <p style={{ fontSize: 13.5, color: "rgba(10,10,10,0.55)", margin: "0 0 22px", lineHeight: 1.6 }}>{fd.subtitle}</p>

      <span aria-live="polite" style={{ fontSize: 13, fontWeight: 700, color: "#4361EE", display: "block", marginBottom: 10 }}>
        {fd.stepPrefix} {step + 1} {fd.stepOf} 5
      </span>

      <ol aria-label={fd.progressAria} style={{ listStyle: "none", display: "flex", gap: 8, padding: 0, margin: "0 0 26px" }}>
        {fd.stepShort.map((label, i) => {
          const done = i < step;
          const current = i === step;
          return (
            <li key={label} style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              {done ? (
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`${fd.stepPrefix} ${i + 1} ${fd.stepOf} 5 — ${label}`}
                  style={{ width: 34, height: 34, borderRadius: "50%", background: "#4361EE", color: "#FFFFFF", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <IconCheck size={14} color="#FFFFFF" />
                </button>
              ) : (
                <span
                  aria-hidden
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: 12,
                    border: current ? "2px solid #4361EE" : "1.5px solid rgba(10,10,10,0.2)",
                    color: current ? "#4361EE" : "rgba(10,10,10,0.4)",
                    background: current ? "rgba(67,97,238,0.08)" : "#FFFFFF",
                  }}
                >
                  {i + 1}
                </span>
              )}
              <span
                aria-current={current ? "step" : undefined}
                style={{
                  fontSize: 10,
                  fontWeight: current ? 700 : 500,
                  color: current ? "#4361EE" : "rgba(10,10,10,0.45)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  maxWidth: "100%",
                }}
              >
                {label}
              </span>
            </li>
          );
        })}
      </ol>

      <form ref={formRef} onSubmit={handleFormSubmit} noValidate>
        <motion.div key={step} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <h2 ref={headingRef} tabIndex={-1} style={{ fontFamily: spaceFont, fontSize: 18, fontWeight: 800, margin: "0 0 6px", outline: "none", textTransform: "uppercase", letterSpacing: "-0.01em", color: "#071B45" }}>
            {fd.stepHeadings[step]}
          </h2>
          <p style={{ fontSize: 13.5, color: "rgba(10,10,10,0.55)", margin: "0 0 18px", lineHeight: 1.6 }}>{fd.stepSubtitles[step]}</p>

          {renderStepContent()}

          {step < 4 && stepError && (
            <p role="alert" style={{ color: "#D64545", fontSize: 13, fontWeight: 500, margin: "14px 0 0" }}>{stepError}</p>
          )}

          {status === "error" && (
            <p role="alert" style={{ background: "rgba(214,69,69,0.08)", border: "1px solid rgba(214,69,69,0.25)", color: "#D64545", fontSize: 13, fontWeight: 500, borderRadius: 10, padding: "12px 14px", margin: "16px 0 0", lineHeight: 1.5 }}>
              {fd.submitError}
            </p>
          )}

          <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
            {step > 0 && (
              <motion.button
                type="button"
                onClick={() => goTo(step - 1)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "none", border: "1.5px solid rgba(10,10,10,0.2)", color: "rgba(10,10,10,0.7)", fontWeight: 700, fontSize: 14, padding: "13px 20px", borderRadius: 10, cursor: "pointer", fontFamily: interFont }}
              >
                <IconArrowLeft size={16} color="currentColor" /> {fd.back}
              </motion.button>
            )}
            <motion.button
              type="submit"
              disabled={status === "submitting"}
              whileHover={{ y: -1, boxShadow: "0 10px 34px rgba(67,97,238,0.35)" }}
              whileTap={{ scale: 0.99 }}
              style={{ flex: 1, background: "#4361EE", color: "#FFFFFF", fontWeight: 700, fontSize: 15, padding: "13px 20px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: interFont, opacity: status === "submitting" ? 0.7 : 1 }}
            >
              {step === 4 ? `${fd.submitBtn} →` : `${fd.continueBtn} →`}
            </motion.button>
          </div>
        </motion.div>

        <div aria-hidden style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
          <label htmlFor="fd-honey">Website</label>
          <input id="fd-honey" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 18 }}>
          {fd.trustLine.split("·").map((c) => (
            <span key={c} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12.5, fontWeight: 600, color: "rgba(10,10,10,0.6)" }}>
              <IconCheck size={11} color="#4361EE" /> {c.trim()}
            </span>
          ))}
        </div>
      </form>

      <style>{`
        @media (max-width: 600px) {
          .fd-options-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
