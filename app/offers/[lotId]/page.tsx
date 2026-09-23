"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "../../../lib/LanguageContext";
import { offers as fallbackOffers } from "../../../lib/demo";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface OfferItem {
  id: number;
  buyer: string;
  price: number;
  total_value?: number;
  status: string;
  payment: string;
}

export default function Offers({ params }: { params: { lotId: string } }) {
  const { t, translateBuyer, translateCrop } = useTranslation();
  const [offersList, setOffersList] = useState<OfferItem[]>(
    fallbackOffers as OfferItem[],
  );
  const [lotDetails, setLotDetails] = useState({ crop: "Soybean", qty: 20 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOffers() {
      try {
        const res = await fetch(
          `${API_BASE}/offers/lot/${params.lotId || 1}`,
        );
        if (res.ok) {
          const data = await res.json();
          if (data.offers && data.offers.length > 0) setOffersList(data.offers);
          if (data.lot) setLotDetails(data.lot);
        }
      } catch (err) {
        console.warn("Backend unavailable; using demo offers.", err);
      } finally {
        setLoading(false);
      }
    }
    loadOffers();
  }, [params.lotId]);

  async function handleStatusChange(
    offerId: number,
    newStatus: "accepted" | "rejected",
  ) {
    try {
      const res = await fetch(`${API_BASE}/offers/${offerId}/status`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        },
      );
      if (res.ok) {
        setOffersList((prev) =>
          prev.map((o) =>
            o.id === offerId
              ? {
                  ...o,
                  status: newStatus,
                  payment: newStatus === "accepted" ? "pending" : o.payment,
                }
              : o,
          ),
        );
      }
    } catch (err) {
      setOffersList((prev) =>
        prev.map((o) => (o.id === offerId ? { ...o, status: newStatus } : o)),
      );
    }
  }

  async function handleMarkPaid(offerId: number) {
    try {
      const res = await fetch(`${API_BASE}/offers/${offerId}/pay`, {
        method: "PATCH",
      });
      if (res.ok) {
        setOffersList((prev) =>
          prev.map((o) =>
            o.id === offerId
              ? { ...o, payment: "paid", status: "accepted" }
              : o,
          ),
        );
      }
    } catch (err) {
      setOffersList((prev) =>
        prev.map((o) =>
          o.id === offerId ? { ...o, payment: "paid", status: "accepted" } : o,
        ),
      );
    }
  }

  return (
    <main className="page">
      <div className="mb-6">
        <p className="text-sm font-semibold text-krishiq-600">
          {t("offers.tag")} #{params.lotId}
        </p>
        <h1 className="text-3xl font-black">{t("offers.title")}</h1>
        <p className="mt-1 text-sm text-slate-500">
          {t("offers.desc")} {lotDetails.qty} {t("results.qtlOf")}{" "}
          {translateCrop(lotDetails.crop)}.
        </p>
      </div>

      <div className="space-y-4">
        {offersList.map((o) => {
          const totalVal =
            o.total_value || Math.round(o.price * lotDetails.qty);

          return (
            <div key={o.id} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-black text-slate-800">
                    {translateBuyer(o.buyer)}
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {t("offers.offeredRate")}
                  </p>
                  <b className="text-2xl font-black text-krishiq-700">
                    ₹{o.price.toLocaleString()}/q
                  </b>
                  <p className="mt-1 text-xs font-semibold text-slate-600">
                    {t("offers.grossValue")}: ₹{totalVal.toLocaleString()}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    o.status === "accepted"
                      ? "bg-krishiq-100 text-krishiq-700"
                      : o.status === "rejected"
                        ? "bg-slate-100 text-slate-500"
                        : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {o.status === "accepted"
                    ? t("offers.statusAccepted")
                    : o.status === "rejected"
                      ? t("offers.statusRejected")
                      : t("offers.statusPending")}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 p-3 text-xs">
                <span className="font-semibold text-slate-600">
                  {t("offers.escrowPayment")}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    o.payment === "paid"
                      ? "bg-emerald-50 text-emerald-700"
                      : o.payment === "pending"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {o.payment === "paid"
                    ? t("offers.paymentPaid")
                    : o.payment === "pending"
                      ? t("offers.paymentPending")
                      : t("offers.paymentNotStarted")}
                </span>
              </div>

              <div className="mt-4 flex gap-2">
                {o.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusChange(o.id, "accepted")}
                      className="primary flex-1 py-2.5 text-xs"
                    >
                      {t("offers.acceptDealBtn")}
                    </button>
                    <button
                      onClick={() => handleStatusChange(o.id, "rejected")}
                      className="secondary flex-1 py-2.5 text-xs text-slate-600"
                    >
                      {t("offers.declineBtn")}
                    </button>
                  </>
                )}

                {o.status === "accepted" && o.payment !== "paid" && (
                  <button
                    onClick={() => handleMarkPaid(o.id)}
                    className="primary w-full py-2.5 text-xs"
                  >
                    {t("offers.confirmPaidBtn")}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Link href="/pools" className="secondary mt-5 block w-full text-center">
        ← {t("offers.backToPoolsBtn")}
      </Link>
    </main>
  );
}