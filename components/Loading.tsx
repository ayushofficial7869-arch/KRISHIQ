"use client";
import { useTranslation } from "../lib/LanguageContext";
export default function Loading() {
  const { t } = useTranslation();
  return (
    <div className="card p-6 text-center">
      <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-4 border-krishiq-200 border-t-krishiq-600" />
      <p className="text-sm text-slate-500">{t("common.loading")}</p>
    </div>
  );
}