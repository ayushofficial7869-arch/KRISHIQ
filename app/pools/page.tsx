"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "../../lib/LanguageContext";
import { pools as fallbackPools, PoolOption } from "../../lib/demo";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface EnhancedPool extends PoolOption {
  members?: number;
  fill_pct?: number;
  target_moq?: number;
  member_lot_id?: number | null;
}

export default function Pools() {
  const { t, translateCrop, translateBuyer } = useTranslation();
  const [poolsList, setPoolsList] = useState<EnhancedPool[]>(fallbackPools);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPools() {
      try {
        const res = await fetch(`${API_BASE}/pools`);
        if (res.ok) {
          const data = await res.json();
          if (data.pools && data.pools.length > 0) setPoolsList(data.pools);
        }
      } catch (err) {
        console.warn("Backend unavailable; using demo pools fallback.", err);
      } finally {
        setLoading(false);
      }
    }
    loadPools();
  }, []);

  const totalQty = poolsList.reduce((acc, p) => acc + p.qty, 0);

  return (
    <main className="page">
      <div className="mb-6">
        <p className="text-sm font-semibold text-krishiq-600">{t("pools.tag")}</p>
        <h1 className="text-3xl font-black">{t("pools.title")}</h1>
        <p className="mt-1 text-sm text-slate-500">{t("pools.desc")}</p>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3">
        <div className="card p-4">
          <p className="text-xs text-slate-500">
            {t("pools.statusForming")} &amp; {t("pools.statusMatched")}
          </p>
          <b className="text-2xl">{poolsList.length} {t("pools.activePools")}</b>
        </div>
        <div className="card p-4">
          <p className="text-xs text-slate-500">{t("pools.totalVolume")}</p>
          <b className="text-2xl text-krishiq-700">{totalQty.toFixed(0)} qtl</b>
        </div>
      </div>

      <div className="space-y-4">
        {poolsList.map((p) => {
          const fill =
            p.fill_pct ?? Math.min(100, Math.round((p.qty / 100) * 100));
          const members = p.members ?? 3;
          const buyerLabel = p.buyer && p.buyer !== "" ? translateBuyer(p.buyer) : "";

          return (
            <div key={p.id} className="card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-black">
                    {translateCrop(p.crop)} {t("pools.poolNumber")} #{p.id}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {members} {t("pools.members")} • {p.qty.toFixed(0)} qtl{" "}
                    {t("pools.totalVolume")}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    p.status === "matched"
                      ? "bg-krishiq-100 text-krishiq-700"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {p.status === "matched"
                    ? t("pools.statusMatched")
                    : t("pools.statusForming")}
                </span>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>
                    {t("pools.truckCapacity")} ({fill}%)
                  </span>
                  <span>{p.qty.toFixed(0)} / 100 qtl</span>
                </div>
                <div className="mt-1.5 h-3 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-krishiq-500 to-krishiq-700 transition-all duration-500"
                    style={{ width: `${fill}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-slate-50 p-3.5 text-xs text-slate-600">
                <span className="font-bold text-slate-700">
                  {t("pools.targetBuyer")}:
                </span>{" "}
                {buyerLabel}
                {p.target_moq ? ` (Min ${p.target_moq.toFixed(1)} qtl)` : ""}
              </div>

              <Link
                href={`/offers/${p.member_lot_id ?? p.id}`}
                className="primary mt-4 block w-full text-center text-sm"
              >
                {p.status === "matched"
                  ? `${t("pools.reviewBidsBtn")} →`
                  : `${t("pools.viewOffersBtn")} →`}
              </Link>
            </div>
          );
        })}
      </div>

      <Link href="/sell" className="secondary mt-5 block w-full text-center">
        + {t("pools.listAnotherBtn")}
      </Link>
    </main>
  );
}