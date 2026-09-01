"use client";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { useLang } from "@/i18n/LanguageContext";
import { chatbotContent } from "@/lib/chatbot-content";
import type { ChatOption } from "@/lib/chatbot-content";
import { IconMessageCircle, IconX, IconSend } from "../icons/Icons";

interface Message {
  id: number;
  role: "assistant" | "user";
  content: string;
  options?: ChatOption[];
}

const BLUE = "#4169FF";
const NAVY = "#071B45";
const REPLY_DELAY = 650;

const pillStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "9px 14px",
  borderRadius: 999,
  fontSize: 12.5,
  fontWeight: 600,
  textAlign: "center",
  cursor: "pointer",
  border: "1px solid rgba(65,105,255,0.4)",
  background: "rgba(65,105,255,0.06)",
  color: BLUE,
  textDecoration: "none",
  transition: "background 0.15s",
} as const;

export default function Chatbot() {
  const { lang } = useLang();
  const content = chatbotContent[lang];
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const welcomeShown = useRef(false);

  const nextId = () => ++idRef.current;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, typing, open]);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open && !welcomeShown.current) {
      welcomeShown.current = true;
      const welcome = content.bubbles.welcome;
      setTyping(true);
      const id = nextId();
      window.setTimeout(() => {
        setMessages((prev) => [...prev, { id, role: "assistant", content: welcome.text, options: welcome.options }]);
        setTyping(false);
      }, REPLY_DELAY);
    }
  }, [open, content]);

  const pushBubble = (bubbleId: string, userLabel: string) => {
    const bubble = content.bubbles[bubbleId];
    if (!bubble) return;
    setMessages((prev) => [...prev, { id: nextId(), role: "user", content: userLabel }]);
    setTyping(true);
    const id = nextId();
    window.setTimeout(() => {
      setMessages((prev) => [...prev, { id, role: "assistant", content: bubble.text, options: bubble.options }]);
      setTyping(false);
    }, REPLY_DELAY);
  };

  const handleOption = (option: ChatOption) => {
    const action = option.action;
    if (action.type === "bubble") {
      pushBubble(action.id, option.label);
      return;
    }
    setOpen(false);
    if (action.type === "link") return;
    if (action.type === "whatsapp") {
      window.open(content.whatsappUrl, "_blank", "noopener,noreferrer");
      return;
    }
    if (action.type === "diagnostic") {
      window.setTimeout(() => {
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else window.location.assign("/contact");
      }, 60);
    }
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    const lower = text.toLowerCase();
    let bubble: string | undefined;
    for (const rule of content.keywords) {
      if (rule.match.some((k) => lower.includes(k))) {
        bubble = rule.bubble;
        break;
      }
    }
    pushBubble(bubble ?? "fallback", text);
  };

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label={content.name}
          style={{
            position: "fixed",
            bottom: 90,
            right: 24,
            width: "min(340px, calc(100vw - 32px))",
            maxHeight: 480,
            background: "#FFFFFF",
            borderRadius: 18,
            border: "1px solid rgba(10,10,10,0.1)",
            overflow: "hidden",
            boxShadow: "0 12px 48px rgba(0,0,0,0.12)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            animation: "fadeSlideUp 0.4s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          <div style={{ background: NAVY, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconMessageCircle size={16} color="#fff" />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#FFFFFF" }}>{content.name}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
                  <span style={{ color: "#22C55E" }}>●</span> {content.online}
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label={content.ariaClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", padding: 4 }}>
              <IconX size={18} />
            </button>
          </div>

          <div role="log" aria-live="polite" style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((msg) =>
              msg.role === "user" ? (
                <div key={msg.id} style={{ alignSelf: "flex-end", maxWidth: "85%", background: "rgba(65,105,255,0.12)", borderRadius: "14px 14px 4px 14px", padding: "10px 14px", fontSize: 13, color: "rgba(10,10,10,0.85)", lineHeight: 1.5 }}>
                  {msg.content}
                </div>
              ) : (
                <div key={msg.id} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start", maxWidth: "92%" }}>
                  <div style={{ background: "rgba(10,10,10,0.05)", borderRadius: "14px 14px 14px 4px", padding: "10px 14px", fontSize: 13, color: "rgba(10,10,10,0.85)", lineHeight: 1.5 }}>
                    {msg.content}
                  </div>
                  {msg.options && msg.options.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
                      {msg.options.map((opt, j) => {
                        const base = { ...pillStyle } as CSSProperties;
                        if (opt.action.type === "link") {
                          return (
                            <Link key={j} href={opt.action.href} onClick={() => setOpen(false)} style={base}>
                              {opt.label}
                            </Link>
                          );
                        }
                        return (
                          <button
                            key={j}
                            onClick={() => handleOption(opt)}
                            style={base}
                            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(65,105,255,0.12)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(65,105,255,0.06)"; }}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )
            )}
            {typing && (
              <div style={{ alignSelf: "flex-start", background: "rgba(10,10,10,0.05)", borderRadius: "14px 14px 14px 4px", padding: "10px 14px", fontSize: 13, color: "rgba(10,10,10,0.4)" }}>
                {content.typing}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} style={{ display: "flex", gap: 8, padding: "12px 16px", borderTop: "1px solid rgba(10,10,10,0.08)" }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={content.placeholder} aria-label={content.placeholder} style={{ flex: 1, background: "rgba(10,10,10,0.04)", border: "1px solid rgba(10,10,10,0.12)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#0A0A0A", outline: "none", fontFamily: "var(--font-inter), 'Inter', sans-serif" }} />
            <button type="submit" style={{ width: 40, height: 40, borderRadius: 8, background: BLUE, border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }} aria-label={content.send}>
              <IconSend size={16} color="#fff" />
            </button>
          </form>
        </div>
      )}

      <button onClick={() => setOpen(!open)} style={{ position: "fixed", bottom: 24, right: 24, width: 56, height: 56, borderRadius: "50%", background: BLUE, border: "none", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", cursor: "pointer", boxShadow: "0 4px 24px rgba(65,105,255,0.35)", zIndex: 1001, transition: "all 0.2s" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 6px 32px rgba(65,105,255,0.45)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(65,105,255,0.35)"; }} aria-label={open ? content.ariaClose : content.ariaOpen}>
        {open ? <IconX size={24} /> : <IconMessageCircle size={24} />}
        {!open && <span style={{ position: "absolute", top: -2, right: -2, width: 14, height: 14, borderRadius: "50%", background: "#22C55E", border: "2px solid #FFFFFF" }} />}
      </button>
    </>
  );
}
