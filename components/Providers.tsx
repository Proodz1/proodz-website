"use client";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
