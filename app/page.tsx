"use client";

import Link from "next/link";
import { useTranslation } from "../lib/LanguageContext";

export default function Home() {
  const { t, translateCrop } = useTranslation();

  const features = [
    { title: t("home.feature1Title"), desc: t("home.feature1Desc") },
    { title: t("home.feature2Title"), desc: t("home.feature2Desc") },
    { title: t("home.feature3Title"), desc: t("home.feature3Desc") },
  ];

  return (
    <main className="page">
      <header className="mb-6">
        <p className="text-sm font-semibold text-krishiq-600">
          {t("home.subtitle")}
        </p>
        <h1 className="text-3xl font-black">{t("home.title")}</h1>
      </header>

      <section className="card overflow-hidden bg-krishiq-700 p-6 text-white">
        <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-krishiq-100">
          {t("home.heroTag")}
        </span>
        <p className="mt-3 max-w-md text-sm text-white/90">
          {t("home.heroDesc")}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/sell"
            className="rounded-2xl bg-harvest px-5 py-3 font-bold text-krishiq-900"
          >
            {t("home.ctaStart")}
          </Link>
          <Link
            href="/map"
            className="rounded-2xl bg-white/10 px-5 py-3 font-bold text-white"
          >
            {t("home.ctaExplore")}
          </Link>
        </div>
      </section>

      <section className="mt-6">
        <div className="space-y-3">
          {features.map((f) => (
            <div key={f.title} className="card flex items-start gap-3 p-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-krishiq-100 font-black text-krishiq-700">
                K
              </span>
              <div>
                <h2 className="font-black">{f.title}</h2>
                <p className="mt-1 text-sm text-slate-500">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}