"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "../../lib/LanguageContext";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function Sell() {
  const router = useRouter();
  const { t, translateCrop, translateGrade } = useTranslation();
  const [crop, setCrop] = useState("Soybean");
  const [qty, setQty] = useState("20");
  const [grade, setGrade] = useState("FAQ");
  const [loc, setLoc] = useState("Nagpur");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const parsedQty = parseFloat(qty) || 20;
    const lotPayload = {
      crop,
      quantity_qtl: parsedQty,
      quality_grade: grade,
      latitude: 21.1458,
      longitude: 79.0882,
      location_name: loc,
    };

    let lotId = null;
    try {
      const res = await fetch(`${API_BASE}/lots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lotPayload),
      });
      if (res.ok) {
        const data = await res.json();
        lotId = data.lot?.id;
      }
    } catch (err) {
      console.warn("Backend unavailable; using local fallback state.", err);
    }

    localStorage.setItem(
      "krishiqLot",
      JSON.stringify({ ...lotPayload, id: lotId || 1 }),
    );

    router.push("/results");
  }

  return (
    <main className="page">
      <div className="mb-6">
        <p className="text-sm font-semibold text-krishiq-600">{t("sell.step")}</p>
        <h1 className="text-3xl font-black">{t("sell.title")}</h1>
        <p className="mt-1 text-sm text-slate-500">{t("sell.desc")}</p>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-5 p-5">
        <label className="block">
          <span className="mb-2 block text-sm font-bold">{t("sell.crop")}</span>
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="w-full rounded-2xl border p-3.5"
          >
            {["Soybean", "Cotton", "Wheat"].map((c) => (
              <option key={c} value={c}>
                {translateCrop(c)}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold">
            {t("sell.quantity")}
          </span>
          <input
            type="number"
            min="1"
            step="0.5"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="w-full rounded-2xl border p-3.5"
            required
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold">{t("sell.grade")}</span>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full rounded-2xl border p-3.5"
          >
            {["FAQ", "A", "B", "C"].map((g) => (
              <option key={g} value={g}>
                {translateGrade(g)}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-bold">
            {t("sell.location")}
          </span>
          <div className="flex gap-2">
            <input
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              className="min-w-0 flex-1 rounded-2xl border p-3.5"
            />
            <button
              type="button"
              onClick={() => setLoc("Nagpur Center")}
              className="secondary px-4 text-sm font-bold"
            >
              {t("sell.locateBtn")}
            </button>
          </div>
        </label>

        <button type="submit" disabled={submitting} className="primary w-full">
          {submitting ? t("sell.processingBtn") : `${t("sell.submitBtn")} →`}
        </button>
      </form>
    </main>
  );
}