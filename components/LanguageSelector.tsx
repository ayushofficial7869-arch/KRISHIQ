"use client";

import { useTranslation, Language } from "../lib/LanguageContext";
import { usePathname } from "next/navigation";

export default function LanguageSelector() {
  const { language, setLanguage } = useTranslation();
  const path = usePathname();
  if (path.startsWith("/landing")) return null;

  const options: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "hi", label: "हिन्दी" },
    { code: "mr", label: "मराठी" },
    { code: "gu", label: "ગુજરાતી" },
  ];

  return (
    <div className="flex items-center gap-1 rounded-2xl bg-slate-100 p-1 text-xs">
      {options.map((opt) => (
        <button
          key={opt.code}
          type="button"
          onClick={() => setLanguage(opt.code)}
          className={`rounded-xl px-2.5 py-1 font-bold transition ${
            language === opt.code
              ? "bg-white text-krishiq-700 shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}