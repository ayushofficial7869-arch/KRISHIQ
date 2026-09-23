"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "../lib/LanguageContext";

const items = [
  { href: "/", label: "nav.home" },
  { href: "/sell", label: "nav.sell" },
  { href: "/pools", label: "nav.pools" },
  { href: "/map", label: "nav.map" },
];

export default function Nav() {
  const { t } = useTranslation();
  const path = usePathname();
  if (path.startsWith("/landing")) return null;
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-3xl border-t bg-white/95 backdrop-blur">
      <div className="grid grid-cols-4 px-2 py-2">
        {items.map((item) => {
          const active = path === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1.5 rounded-2xl py-2 text-xs font-bold uppercase tracking-widest ${
                active ? "bg-krishiq-50 text-krishiq-700" : "text-slate-500"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  active ? "bg-krishiq-600" : "bg-transparent"
                }`}
              />
              {t(item.label)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}