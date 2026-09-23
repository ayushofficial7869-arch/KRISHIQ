"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import RankedCard from "../../components/RankedCard";
import Loading from "../../components/Loading";
import CostBreakdownChart from "../../components/CostBreakdownChart";
import { useTranslation } from "../../lib/LanguageContext";
import { mandis as fallbackMandis, MandiOption } from "../../lib/demo";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface PoolingData {
  active: boolean;
  farmer_count: number;
  total_pooled_qty: number;
  solo_net: number;
  pooled_net: number;
  savings_per_qtl: number;
  unlocked_buyers: string[];
}

interface TimingData {
  verdict: "SELL NOW" | "WAIT & STORE";
  holding_window_days: number;
  total_storage_cost_per_qtl: number;
  expected_net_gain_per_qtl: number;
  reasoning: string;
}

export default function Results() {
  const router = useRouter();
  const { t, translateCrop, translateMandi, translateBuyer } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [mandisList, setMandisList] = useState<MandiOption[]>(fallbackMandis);
  const [pooling, setPooling] = useState<PoolingData | null>(null);
  const [timing, setTiming] = useState<TimingData | null>({
    verdict: "WAIT & STORE",
    holding_window_days: 15,
    total_storage_cost_per_qtl: 18,
    expected_net_gain_per_qtl: 147,
    reasoning: "Holding for 15 days earns an estimated net gain.",
  });
  const [lotInfo, setLotInfo] = useState<{
    id: number;
    crop: string;
    qty: string;
  }>({
    id: 1,
    crop: "Soybean",
    qty: "20",
  });
  const [joiningPool, setJoiningPool] = useState(false);

  useEffect(() => {
    async function loadResults() {
      const stored = localStorage.getItem("krishiqLot");
      const parsed = stored
        ? JSON.parse(stored)
        : { id: 1, crop: "Soybean", qty: "20", quality_grade: "B" };
      setLotInfo({
        id: parsed.id || 1,
        crop: parsed.crop,
        qty: String(parsed.quantity_qtl || parsed.qty || 20),
      });

      try {
        const res = await fetch(`${API_BASE}/recommendations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            crop: parsed.crop,
            quantity_qtl: parseFloat(parsed.quantity_qtl || parsed.qty) || 20,
            quality_grade: parsed.quality_grade || parsed.grade || "B",
            latitude: 21.1458,
            longitude: 79.0882,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.mandis && data.mandis.length > 0) setMandisList(data.mandis);
          if (data.pooling) setPooling(data.pooling);
          if (data.timing_recommendation) setTiming(data.timing_recommendation);
        }
      } catch (err) {
        console.warn(
          "Using offline demo fixtures - FastAPI backend unreachable.",
          err,
        );
      } finally {
        setLoading(false);
      }
    }
    loadResults();
  }, []);

  async function handleJoinPool() {
    setJoiningPool(true);
    try {
      await fetch(`${API_BASE}/pools/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lot_id: lotInfo.id }),
      });
    } catch (err) {
      console.warn("Failed to join pool live; advancing to dashboard.", err);
    }
    router.push("/pools");
  }

  function mandiNote(m: MandiOption, i: number): string {
    if (i === 0) return t("results.optimalNote");
    const km = parseFloat(m.distance);
    if (!isNaN(km) && km >= 200) return t("results.longDistNote");
    return t("results.localNote");
  }

  if (loading) {
    return (
      <main className="page">
        <Loading />
      </main>
    );
  }

  const topMandi = mandisList[0];
  const gross = topMandi ? topMandi.price : 4720;
  const transport = (topMandi as any)?.transport_per_qtl || 120;
  const apmc = Math.round(gross * 0.01);
  const commission = Math.round(gross * 0.02);
  const hamali = 22;
  const net = topMandi
    ? topMandi.net
    : gross - transport - apmc - commission - hamali;

  return (
    <main className="page">
      <div className="mb-5">
        <p className="text-sm font-semibold text-krishiq-600">
          {t("results.step")}
        </p>
        <h1 className="text-3xl font-black">{t("results.title")}</h1>
        <p className="mt-1 text-sm text-slate-500">
          {t("results.desc")} {lotInfo.qty} {t("results.qtlOf")}{" "}
          {translateCrop(lotInfo.crop)}.
        </p>
      </div>

      {pooling && pooling.active && (
        <div className="rounded-3xl border border-harvest/30 bg-harvest/10 p-5">
          <p className="text-xs font-black uppercase tracking-wide text-soil">
            {t("results.poolingTitle")}
          </p>
          <h2 className="mt-1 text-xl font-black">
            {t("results.poolWith")} {pooling.farmer_count - 1}{" "}
            {t("results.nearbyFarmers")}
          </h2>
          <p className="mt-1 text-xs text-slate-600">
            {pooling.total_pooled_qty} {t("results.qtlOf")} •{" "}
            {t("results.totalVolume")}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-white p-3">
              <p className="text-xs text-slate-500">{t("results.soloNet")}</p>
              <b>₹{pooling.solo_net.toLocaleString()}/q</b>
            </div>
            <div className="rounded-2xl bg-krishiq-100 p-3">
              <p className="text-xs text-slate-500">{t("results.pooledNet")}</p>
              <b className="text-krishiq-700">
                ₹{pooling.pooled_net.toLocaleString()}/q
              </b>
            </div>
          </div>
          {pooling.unlocked_buyers && pooling.unlocked_buyers.length > 0 && (
            <span className="mt-3 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              {t("results.unlocksBuyer")}:{" "}
              {translateBuyer(pooling.unlocked_buyers[0])}
            </span>
          )}
          <button
            onClick={handleJoinPool}
            disabled={joiningPool}
            className="primary mt-4 w-full"
          >
            {joiningPool
              ? t("results.addingToPool")
              : `${t("results.joinPoolBtn")} →`}
          </button>
        </div>
      )}

      {timing && (
        <div className="card mt-4 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-wide text-slate-500">
                {t("results.temporalTitle")}
              </p>
              <h3 className="mt-1 text-lg font-black text-slate-800">
                {t("results.timing")}:{" "}
                {timing.verdict === "WAIT & STORE"
                  ? t("results.waitAndStore")
                  : t("results.sellImmediately")}
              </h3>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                timing.verdict === "WAIT & STORE"
                  ? "bg-amber-100 text-amber-800"
                  : "bg-krishiq-100 text-krishiq-700"
              }`}
            >
              {timing.verdict === "WAIT & STORE"
                ? t("results.waitAndStore")
                : t("results.sellImmediately")}
            </span>
          </div>
          <p className="mt-2 text-xs text-slate-600">{timing.reasoning}</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-xl bg-slate-50 p-2.5">
              <span className="text-slate-500">
                {t("results.warehouseCost")}
              </span>
              <b className="block text-slate-700">
                ₹{timing.total_storage_cost_per_qtl}/q (15d)
              </b>
            </div>
            <div className="rounded-xl bg-slate-50 p-2.5">
              <span className="text-slate-500">
                {t("results.projectedGain")}
              </span>
              <b
                className={`block ${timing.expected_net_gain_per_qtl >= 0 ? "text-krishiq-700" : "text-rose-600"}`}
              >
                {timing.expected_net_gain_per_qtl >= 0 ? "+" : ""}₹
                {timing.expected_net_gain_per_qtl}/q
              </b>
            </div>
          </div>
        </div>
      )}

      {/* Recharts Visual Breakdown */}
      <CostBreakdownChart
        gross={gross}
        transport={transport}
        apmc={apmc}
        commission={commission}
        hamali={hamali}
        net={net}
      />

      <h2 className="mb-3 mt-6 text-lg font-black">
        {t("results.topMandisTitle")}
      </h2>
      <div className="space-y-3">
        {mandisList.map((m, i) => (
          <RankedCard
            key={m.name}
            rank={i + 1}
            name={translateMandi(m.name)}
            price={m.price}
            distance={m.distance}
            net={m.net}
            note={mandiNote(m, i)}
          />
        ))}
      </div>

      <Link href="/map" className="secondary mt-5 block w-full text-center">
        {t("results.compareMapBtn")}
      </Link>
    </main>
  );
}