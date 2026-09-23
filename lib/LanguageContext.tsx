"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import en from "../locales/en.json";
import hi from "../locales/hi.json";
import mr from "../locales/mr.json";
import gu from "../locales/gu.json";

export type Language = "en" | "hi" | "mr" | "gu";

const translations: Record<Language, any> = { en, hi, mr, gu };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
  translateCrop: (crop: string) => string;
  translateGrade: (grade: string) => string;
  translateMandi: (mandi: string) => string;
  translateBuyer: (buyer: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (path: string) => path,
  translateCrop: (c) => c,
  translateGrade: (g) => g,
  translateMandi: (m) => m,
  translateBuyer: (b) => b,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("krishiqLang") as Language;
    if (saved && ["en", "hi", "mr", "gu"].includes(saved)) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("krishiqLang", lang);
  };

  const t = (path: string): string => {
    const keys = path.split(".");
    let current: any = translations[language] || translations["en"];
    for (const k of keys) {
      if (current && typeof current === "object" && k in current) {
        current = current[k];
      } else {
        // Fallback to English
        let fallback: any = translations["en"];
        for (const fk of keys) {
          if (fallback && typeof fallback === "object" && fk in fallback) {
            fallback = fallback[fk];
          } else {
            return path;
          }
        }
        return typeof fallback === "string" ? fallback : path;
      }
    }
    return typeof current === "string" ? current : path;
  };

  const translateCrop = (crop: string) => {
    return translations[language]?.crops?.[crop] || crop;
  };

  const translateGrade = (grade: string) => {
    return translations[language]?.grades?.[grade] || grade;
  };

  const translateMandi = (mandi: string) => {
    return translations[language]?.mandis?.[mandi] || mandi;
  };

  const translateBuyer = (buyer: string) => {
    return translations[language]?.buyers?.[buyer] || buyer;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        translateCrop,
        translateGrade,
        translateMandi,
        translateBuyer,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useTranslation = () => useContext(LanguageContext);