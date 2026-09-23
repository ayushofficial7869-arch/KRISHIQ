"use client";

import { useTranslation } from "../lib/LanguageContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface CostBreakdownProps {
  gross: number;
  transport: number;
  apmc: number;
  commission: number;
  hamali: number;
  net: number;
}

export default function CostBreakdownChart({
  gross,
  transport,
  apmc,
  commission,
  hamali,
  net,
}: CostBreakdownProps) {
  const { t } = useTranslation();

  const data = [
    { name: t("results.chartGross"), amount: gross, color: "#16a34a" },
    { name: t("results.chartTransport"), amount: transport, color: "#ef4444" },
    { name: t("results.chartApmc"), amount: apmc, color: "#f97316" },
    { name: t("results.chartCommission"), amount: commission, color: "#f59e0b" },
    { name: t("results.chartHamali"), amount: hamali, color: "#eab308" },
    { name: t("results.chartNet"), amount: net, color: "#15803d" },
  ];

  return (
    <div className="card mt-4 p-5">
      <h3 className="mb-2 text-sm font-bold text-slate-800">
        {t("results.chartTitle")}
      </h3>
      <p className="mb-4 text-xs text-slate-500">{t("results.chartDesc")}</p>
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
          >
            <XAxis type="number" tickFormatter={(v) => `₹${v}`} />
            <YAxis
              dataKey="name"
              type="category"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fontWeight: 600, fill: "#475569" }}
            />
            <Tooltip
              formatter={(val: number) => [
                `₹${val.toLocaleString()}`,
                t("results.chartUnit"),
              ]}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            />
            <Bar dataKey="amount" radius={[0, 8, 8, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}