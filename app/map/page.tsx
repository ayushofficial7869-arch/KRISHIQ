"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import BottomSheet from "../../components/BottomSheet";
import Loading from "../../components/Loading";
import { useTranslation } from "../../lib/LanguageContext";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Dynamically import Leaflet with ssr: false
const MandiMap = dynamic(() => import("../../components/MandiMap"), {
  ssr: false,
  loading: () => <Loading />,
});

const DEFAULT_MAP_MANDIS = [
  {
    id: 1,
    name: "Nagpur Mandi",
    latitude: 21.1458,
    longitude: 79.0882,
    net: 4575,
    distance: "14 km",
    rank: 1,
  },
  {
    id: 4,
    name: "Wardha Mandi",
    latitude: 20.7453,
    longitude: 78.6022,
    net: 4410,
    distance: "72 km",
    rank: 2,
  },
  {
    id: 3,
    name: "Amravati Mandi",
    latitude: 20.9374,
    longitude: 77.7796,
    net: 4380,
    distance: "155 km",
    rank: 3,
  },
  {
    id: 2,
    name: "Akola Mandi",
    latitude: 20.7002,
    longitude: 77.0082,
    net: 4210,
    distance: "245 km",
    rank: 4,
  },
];

export default function MapPage() {
  const { t, translateMandi } = useTranslation();
  const [mandis, setMandis] = useState(DEFAULT_MAP_MANDIS);
  const [selectedMandi, setSelectedMandi] = useState(DEFAULT_MAP_MANDIS[0]);

  useEffect(() => {
    async function fetchMandiGeo() {
      try {
        const stored = localStorage.getItem("krishiqLot");
        const parsed = stored
          ? JSON.parse(stored)
          : { crop: "Soybean", quantity_qtl: 20, quality_grade: "B" };

        const res = await fetch(`${API_BASE}/recommendations`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            crop: parsed.crop || "Soybean",
            quantity_qtl: parseFloat(parsed.quantity_qtl || parsed.qty) || 20,
            quality_grade: parsed.quality_grade || parsed.grade || "B",
            latitude: 21.1458,
            longitude: 79.0882,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.mandis && data.mandis.length > 0) {
            // Coordinate mapping for Vidarbha Mandis
            const coords: Record<string, [number, number]> = {
              "Nagpur Mandi": [21.1458, 79.0882],
              "Wardha Mandi": [20.7453, 78.6022],
              "Amravati Mandi": [20.9374, 77.7796],
              "Akola Mandi": [20.7002, 77.0082],
              "Yavatmal Mandi": [20.3888, 78.1204],
            };

            const mapped = data.mandis.map((m: any, idx: number) => ({
              id: m.id || idx + 1,
              name: m.name,
              latitude: coords[m.name]?.[0] || 21.1458,
              longitude: coords[m.name]?.[1] || 79.0882,
              net: m.net,
              distance: m.distance,
              rank: m.rank,
            }));
            setMandis(mapped);
            setSelectedMandi(mapped[0]);
          }
        }
      } catch (err) {
        console.warn("Using offline demo map dataset.", err);
      }
    }
    fetchMandiGeo();
  }, []);

  return (
    <main className="page">
      <div className="mb-5">
        <p className="text-sm font-semibold text-krishiq-600">{t("map.tag")}</p>
        <h1 className="text-3xl font-black">{t("map.title")}</h1>
        <p className="mt-1 text-sm text-slate-500">{t("map.desc")}</p>
      </div>

      <MandiMap mandis={mandis} onSelectMandi={(m) => setSelectedMandi(m)} />

      <div className="mt-3 flex flex-wrap items-center justify-center gap-4 rounded-2xl bg-white p-3 text-xs shadow-soft">
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />{" "}
            {t("map.optimalTier")}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />{" "}
            {t("map.moderateTier")}
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />{" "}
            {t("map.highFreightTier")}
          </span>
      </div>

      <BottomSheet>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-800">
              {translateMandi(selectedMandi.name)}
            </h2>
            <p className="text-xs text-slate-500">
              {selectedMandi.distance} {t("map.awayFromPickup")}
            </p>
          </div>
          <div className="text-right">
            <b className="text-xl font-black text-krishiq-700">
              ₹{selectedMandi.net.toLocaleString()}/q
            </b>
            <span className="block text-[10px] uppercase tracking-wider text-slate-400">
              {t("map.netReceived")}
            </span>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-600">
          {selectedMandi.rank === 1
            ? t("map.optimalNote")
            : t("map.highFreightNote")}
        </p>
      </BottomSheet>
    </main>
  );
}