"use client";

import Link from "next/link";
import { useTranslation, Language } from "../lib/LanguageContext";

export default function LandingPage() {
  const { t, language, setLanguage } = useTranslation();

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const langs: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "hi", label: "हि" },
    { code: "mr", label: "म" },
    { code: "gu", label: "ગુ" },
  ];

  const microInteractions =
    "transition-all duration-300 ease-out hover:-translate-y-1 hover:border-amber-400/40 hover:shadow-[0_0_25px_rgba(217,155,53,0.08)]";
  const microEmerald =
    "transition-all duration-300 ease-out hover:-translate-y-1 hover:border-emerald-400/50 hover:shadow-[0_0_25px_rgba(52,211,153,0.12)]";
  const ctaBtn =
    "transition-all duration-200 hover:brightness-110 active:scale-95";
  const faqCard =
    "p-4 rounded-xl bg-[#162019] border border-white/10 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-amber-400/30 hover:shadow-[0_0_18px_rgba(217,155,53,0.06)]";

  return (
    <main className="w-full bg-[#111713] text-[#F5F4EF] antialiased selection:bg-[#E5AA3E]/30 selection:text-white">
      <div
        className="flex flex-col w-full"
        style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
      >
        {/* SECTION A: COMMAND RADAR & EDITORIAL HERO */}
        <div
          id="hero"
          className="min-h-screen w-full relative flex flex-col justify-between box-border overflow-x-hidden md:overflow-hidden px-8 sm:px-12 lg:px-16 pt-6 pb-8 text-[#F5F4EF]"
          style={{
            background:
              "linear-gradient(135deg, rgb(17, 23, 19) 0%, rgb(22, 26, 20) 50%, rgb(26, 20, 16) 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 z-0"
            style={{
              background:
                "radial-gradient(circle at 80% 25%, rgba(227, 157, 52, 0.15) 0%, rgba(217, 155, 53, 0.05) 45%, transparent 70%)",
            }}
          />
          <header className="relative z-30 w-full max-w-7xl mx-auto flex items-center justify-between flex-shrink-0">
            <a className="flex items-center gap-3 group" href="/">
              <div className="w-7 h-7 rounded-md bg-[#1E3A27] border border-[#E5AA3E]/30 flex items-center justify-center shadow-sm">
                <svg
                  className="w-4 h-4 fill-none stroke-[#E5AA3E]"
                  strokeLinecap="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C12 2 5 6 3 13C2 19 9 22 12 23C15 22 22 19 21 13C19 6 12 2 12 2Z" fill="#111713" />
                  <path d="M12 5V21" />
                  <path d="M12 9L16 6" />
                  <path d="M12 13L8 10" />
                  <path d="M12 16L16 13" />
                </svg>
              </div>
              <span className="font-serif text-[24px] font-medium tracking-tight text-[#F5F4EF] group-hover:text-white transition-colors">
                Krishiq
              </span>
            </a>
            <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.2em] text-[#9EABA2] font-semibold">
              <a className="hover:text-[#F5F4EF] transition-colors" href="#features" onClick={scrollTo("features")}>{t("landing.nav.mandi")}</a>
              <a className="hover:text-[#F5F4EF] transition-colors" href="#features" onClick={scrollTo("features")}>{t("landing.nav.pooling")}</a>
              <a className="hover:text-[#F5F4EF] transition-colors" href="#reality-audit" onClick={scrollTo("reality-audit")}>{t("landing.nav.economics")}</a>
              <a className="hover:text-[#F5F4EF] transition-colors" href="#field-faq" onClick={scrollTo("field-faq")}>{t("landing.nav.faq")}</a>
            </nav>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5 rounded-full border border-[#F5F4EF]/25 bg-[#F5F4EF]/5 p-1">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLanguage(l.code)}
                    aria-label={l.code}
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                      language === l.code
                        ? "bg-[#E5AA3E] text-[#141E17]"
                        : "text-[#9EABA2] hover:text-[#F5F4EF]"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <Link
                href="/sell"
                className={`inline-flex items-center justify-center gap-1.5 text-[13px] font-semibold text-[#F5F4EF] bg-[#F5F4EF]/5 hover:bg-[#F5F4EF]/10 border border-[#F5F4EF]/25 hover:border-[#E5AA3E]/60 px-5 py-2 rounded-full ${ctaBtn}`}
              >
                {t("landing.nav.launchApp")}
                <span className="text-[#E5AA3E]">&rarr;</span>
              </Link>
            </div>
          </header>

          <div className="relative z-20 w-full max-w-7xl mx-auto flex-1 flex items-center justify-between my-auto min-h-0">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 z-20 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E6F40]/20 border border-[#2E6F40]/40 text-[#adf3b8] text-[11px] font-mono uppercase tracking-wider mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#adf3b8]" /> {t("landing.hero.badge")}
                </div>
                <h1
                  className="font-serif text-[#F5F4EF] tracking-[-0.03em] select-none text-left"
                  style={{ fontSize: "clamp(2.4rem, 4.2vw, 3.8rem)", lineHeight: 1.04 }}
                >
                  <span className="block font-light">{t("landing.hero.h1a")}</span>
                  <span className="block font-light whitespace-nowrap">{t("landing.hero.h1b")}</span>
                  <span className="block font-light whitespace-nowrap text-[#E5AA3E]">{t("landing.hero.h1c")}</span>
                </h1>
                <p className="mt-4 text-[#9EABA2] text-sm leading-relaxed max-w-md">
                  {t("landing.hero.sub")}
                </p>
              </div>

              <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end">
                <div className="w-full max-w-[620px] flex items-center justify-center lg:justify-end pointer-events-none md:pointer-events-auto">
                  <svg className="w-full h-auto select-none max-h-[58vh] object-contain" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <filter height="240%" id="origin-glow-lg" width="240%" x="-70%" y="-70%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
                        <feMerge>
                          <feMergeNode />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                      <linearGradient id="optimal-gradient" x1="320" x2="620" y1="320" y2="110">
                        <stop offset="0%" stopColor="#E5AA3E" />
                        <stop offset="100%" stopColor="#F2C167" />
                      </linearGradient>
                    </defs>
                    <circle cx="320" cy="320" r="70" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 5" strokeWidth="1" />
                    <circle cx="320" cy="320" r="150" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <circle cx="320" cy="320" r="240" stroke="rgba(255,255,255,0.045)" strokeDasharray="4 6" strokeWidth="1" />
                    <circle cx="320" cy="320" r="330" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
                    <line stroke="rgba(255,255,255,0.06)" strokeDasharray="2 4" strokeWidth="1" x1="40" x2="740" y1="320" y2="320" />
                    <line stroke="rgba(255,255,255,0.06)" strokeDasharray="2 4" strokeWidth="1" x1="320" x2="320" y1="20" y2="580" />
                    <line stroke="rgba(255,255,255,0.03)" strokeWidth="1" x1="320" x2="160" y1="320" y2="150" />
                    <line stroke="rgba(255,255,255,0.03)" strokeWidth="1" x1="320" x2="90" y1="320" y2="280" />
                    <line stroke="rgba(255,255,255,0.03)" strokeWidth="1" x1="320" x2="570" y1="320" y2="490" />
                    <path d="M320,320 C260,240 210,190 160,150" stroke="rgba(158, 171, 162, 0.35)" strokeDasharray="4 4" strokeWidth="1.4" />
                    <path d="M320,320 C230,312 160,300 90,280" stroke="rgba(158, 171, 162, 0.35)" strokeDasharray="4 4" strokeWidth="1.4" />
                    <path d="M320,320 C410,390 490,445 570,490" stroke="rgba(158, 171, 162, 0.35)" strokeDasharray="4 4" strokeWidth="1.4" />
                    <circle cx="160" cy="150" fill="#111713" r="6" stroke="rgba(158, 171, 162, 0.6)" strokeWidth="1.5" />
                    <circle cx="160" cy="150" fill="rgba(158, 171, 162, 0.8)" r="2.5" />
                    <text fill="#9EABA2" fontFamily="'JetBrains Mono', monospace" fontSize="10" fontWeight="500" letterSpacing="0.1em" x="116" y="130">{t("landing.radar.amravati")}</text>
                    <circle cx="90" cy="280" fill="#111713" r="6" stroke="rgba(158, 171, 162, 0.6)" strokeWidth="1.5" />
                    <circle cx="90" cy="280" fill="rgba(158, 171, 162, 0.8)" r="2.5" />
                    <text fill="#9EABA2" fontFamily="'JetBrains Mono', monospace" fontSize="10" fontWeight="500" letterSpacing="0.1em" x="54" y="260">{t("landing.radar.akola")}</text>
                    <circle cx="570" cy="490" fill="#111713" r="6" stroke="rgba(158, 171, 162, 0.6)" strokeWidth="1.5" />
                    <circle cx="570" cy="490" fill="rgba(158, 171, 162, 0.8)" r="2.5" />
                    <text fill="#9EABA2" fontFamily="'JetBrains Mono', monospace" fontSize="10" fontWeight="500" letterSpacing="0.1em" x="582" y="496">{t("landing.radar.chandrapur")}</text>
                    <path d="M320,320 C420,245 515,175 620,110" stroke="rgba(229, 170, 62, 0.3)" strokeWidth="7" />
                    <path className="animate-optimal-dash" d="M320,320 C420,245 515,175 620,110" fill="none" stroke="url(#optimal-gradient)" strokeLinecap="round" strokeWidth="3" />
                    <circle cx="620" cy="110" fill="none" r="16" stroke="rgba(229, 170, 62, 0.35)" strokeWidth="1.5" />
                    <circle cx="620" cy="110" fill="#161a14" r="8" stroke="#E5AA3E" strokeWidth="2.5" />
                    <circle cx="620" cy="110" fill="#E5AA3E" r="3.5" />
                    <g transform="translate(630, 94)">
                      <rect fill="#1E3A27" height="24" opacity="0.95" rx="5" stroke="#E5AA3E" strokeOpacity="0.6" strokeWidth="1.2" width="124" x="0" y="0" />
                      <text fill="#F5F4EF" fontFamily="'JetBrains Mono', monospace" fontSize="10.5" fontWeight="600" letterSpacing="0.08em" x="9" y="16">{t("landing.radar.nagpur")}</text>
                      <text fill="#E5AA3E" fontFamily="'JetBrains Mono', monospace" fontSize="9.5" fontWeight="700" letterSpacing="0.06em" x="65" y="16">{t("landing.radar.optimal")}</text>
                    </g>
                    <circle className="animate-radar-pulse" cx="320" cy="320" fill="none" r="8" stroke="#E5AA3E" strokeWidth="2" />
                    <circle cx="320" cy="320" fill="#111713" r="12" stroke="rgba(229, 170, 62, 0.8)" strokeWidth="2" />
                    <circle cx="320" cy="320" fill="#E5AA3E" filter="url(#origin-glow-lg)" r="5.5" />
                    <g transform="translate(200, 350)">
                      <text fill="#F5F4EF" fontFamily="'JetBrains Mono', monospace" fontSize="11" fontWeight="600" letterSpacing="0.12em" x="0" y="0">{t("landing.radar.origin")}</text>
                      <text fill="#E5AA3E" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="500" letterSpacing="0.08em" opacity="0.9" x="0" y="16">20.7453° N, 78.6022° E</text>
                    </g>
                    <text fill="rgba(158, 171, 162, 0.45)" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" x="475" y="316">100 KM</text>
                    <text fill="rgba(158, 171, 162, 0.45)" fontFamily="'JetBrains Mono', monospace" fontSize="8.5" x="575" y="316">200 KM</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-30 w-full max-w-7xl mx-auto flex items-end justify-between pt-2 pb-2 flex-shrink-0">
            <a aria-label={t("landing.hero.scroll")} className="group flex items-center gap-3 text-[#9EABA2] hover:text-[#F5F4EF] transition-colors cursor-pointer" href="#features" onClick={scrollTo("features")}>
              <div className="w-10 h-10 rounded-full border border-[#F5F4EF]/20 group-hover:border-[#E5AA3E] flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[18px] text-[#F5F4EF]/70 group-hover:text-[#E5AA3E] group-hover:translate-y-0.5 transition-all">south</span>
              </div>
              <span className="hidden sm:inline text-[11px] uppercase tracking-widest text-[#9EABA2]">{t("landing.hero.scroll")}</span>
            </a>
            <div className="text-right max-w-[300px]">
              <p className="text-xs leading-relaxed text-[#9EABA2] font-normal">{t("landing.hero.micro")}</p>
            </div>
          </div>
        </div>

        {/* SECTION B: SYSTEM MECHANICS BENTO */}
        <section
          id="features"
          className="w-full relative flex flex-col justify-between px-8 sm:px-12 lg:px-16 py-8 md:py-6 box-border overflow-x-hidden bg-[#111713] text-[#F5F4EF] border-t border-white/10"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(30, 58, 39, 0.35) 0%, rgb(17, 23, 19) 60%)",
          }}
        >
          <div className="w-full max-w-7xl mx-auto flex items-end justify-between flex-shrink-0 pt-2 pb-3 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#E5AA3E]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#E5AA3E] font-bold">{t("landing.bento.tag")}</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#F5F4EF] tracking-tight leading-tight">
                {t("landing.bento.title")}
              </h2>
            </div>
            <p className="hidden md:block text-right max-w-md text-xs text-[#9EABA2] leading-relaxed">
              {t("landing.bento.sub")}
            </p>
          </div>

          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 my-6">
            {/* CARD 1: Net Realisation */}
            <div className={`md:col-span-7 bg-[#162019] p-5 rounded-2xl border border-white/15 shadow-2xl flex flex-col justify-between backdrop-blur-md ${microEmerald}`}>
              <div className="flex flex-col justify-between h-full">
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#adf3b8]" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#adf3b8] font-bold">{t("landing.bento.netTag")}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2E6F40]/30 text-[#adf3b8] border border-[#2E6F40]/60 text-[11px] font-bold tabular-nums">{t("landing.bento.netBadge")}</span>
                </div>
                <div className="mb-4">
                  <h3 className="font-serif text-2xl text-[#F5F4EF] font-normal leading-snug mb-1">{t("landing.bento.netTitle")}</h3>
                  <p className="text-xs text-[#9EABA2] leading-relaxed max-w-lg">{t("landing.bento.netDesc")}</p>
                </div>
                <div className="bg-[#0d1510] p-4 rounded-xl border border-white/10 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif text-lg text-[#F5F4EF] font-normal">{t("landing.bento.netBlockTag")}</span>
                    <span className="text-[10px] font-mono text-[#adf3b8] uppercase tracking-wider bg-[#2E6F40]/30 px-2 py-0.5 rounded border border-[#2E6F40]/50">{t("landing.bento.netBlockBadge")}</span>
                  </div>
                  <p className="text-xs text-[#9EABA2] leading-relaxed">{t("landing.bento.netBlockDesc")}</p>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#2E6F40]/20 border border-[#2E6F40]/50">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#adf3b8] text-[20px]">verified</span>
                    <span className="font-bold text-sm text-[#adf3b8]">{t("landing.bento.netFoot")}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#F5F4EF]/70">{t("landing.bento.netFootSub")}</span>
                </div>
              </div>
            </div>

            {/* CARD 2: Collective Logistics (Ochre) */}
            <div className={`md:col-span-5 bg-[#D99B35] text-[#141E17] p-5 rounded-2xl border border-[#F2C167]/40 shadow-2xl flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(217,155,53,0.25)] transition-all duration-300 ease-out`}>
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-black/15">
                    <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-[#141E17]">{t("landing.bento.logTag")}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#141E17] text-[#D99B35] font-bold font-mono">{t("landing.bento.logLock")}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-normal leading-snug mb-1 text-[#141E17]">{t("landing.bento.logTitle")}</h3>
                  <p className="text-xs text-[#141E17]/85 mb-4 font-medium">{t("landing.bento.logDesc")}</p>
                  <div className="bg-black/10 p-3.5 rounded-xl backdrop-blur-[2px] mb-4 border border-black/10">
                    <div className="flex justify-between items-center text-[#141E17] font-bold text-xs mb-1.5">
                      <span>{t("landing.bento.logCapTag")}</span>
                      <span className="font-mono">{t("landing.bento.logCapVal")}</span>
                    </div>
                    <div className="w-full bg-black/20 h-3 rounded-full overflow-hidden">
                      <div className="bg-[#141E17] h-full rounded-full" style={{ width: "100%" }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-[#141E17]/70 font-mono mt-1.5">
                      <span>{t("landing.bento.logCapL")}</span>
                      <span>{t("landing.bento.logCapR")}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 p-2.5 rounded-lg bg-black/10 border border-black/10 text-center mb-4">
                    <div>
                      <span className="text-[10px] text-[#141E17]/70 font-mono block uppercase">{t("landing.bento.logSolo")}</span>
                      <span className="text-sm font-bold font-mono text-[#141E17] line-through">₹240 / qtl</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#141E17] font-mono block uppercase font-bold">{t("landing.bento.logPooled")}</span>
                      <span className="text-base font-bold font-mono text-[#141E17]">₹65 / qtl <span className="text-[10px] text-[#141E17] font-bold">(-73%)</span></span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#141E17]">
                  <span className="material-symbols-outlined text-[#D99B35] text-[20px]">local_shipping</span>
                  <div className="flex-1 ml-2.5">
                    <span className="block font-bold text-sm text-[#D99B35]">{t("landing.bento.logMatched")}</span>
                    <span className="block text-[10px] font-mono text-[#F5F4EF]/70">{t("landing.bento.logMatchedDesc")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD 3: Spatial Arbitrage */}
            <div className={`md:col-span-4 bg-[#162019] p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col justify-between backdrop-blur-md ${microInteractions}`}>
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#E5AA3E] font-bold">{t("landing.bento.spatialTag")}</span>
                  <span className="material-symbols-outlined text-[16px] text-[#9EABA2]">explore</span>
                </div>
                <h4 className="font-serif text-lg text-[#F5F4EF] font-normal mb-1">{t("landing.bento.spatialTitle")}</h4>
                <div className="space-y-2 mt-2">
                  <div className="p-2.5 rounded-lg bg-[#0d1510] border border-[#2E6F40]/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#F5F4EF] font-semibold flex items-center gap-1.5">
                        {t("landing.bento.nagpur")} <span className="text-[10px] text-[#adf3b8] font-mono font-bold">&bull; {t("landing.bento.optimal")}</span>
                      </span>
                      <span className="font-mono font-bold text-[#adf3b8] tabular-nums">{t("landing.bento.netSuffix")} ₹4,480/q</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-[#9EABA2] mt-1 font-mono">
                      <span>{t("landing.bento.dist")}: 14km</span>
                      <span>{t("landing.bento.freight")}: ₹45/q</span>
                      <span>{t("landing.bento.gross")}: ₹4,650/q</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#111713] border border-white/5 opacity-80">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#9EABA2] flex items-center gap-1.5">
                        {t("landing.bento.akola")} <span className="text-[10px] text-red-400 font-mono font-bold">&bull; {t("landing.bento.falseRate")}</span>
                      </span>
                      <span className="font-mono text-red-400 font-bold tabular-nums">{t("landing.bento.netSuffix")} ₹4,310/q</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-[#9EABA2] mt-1 font-mono">
                      <span>{t("landing.bento.dist")}: 245km</span>
                      <span>{t("landing.bento.freight")}: ₹320/q</span>
                      <span>{t("landing.bento.gross")}: ₹4,780/q</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-white/10 text-[11px] text-[#9EABA2]">
                <span className="text-red-400 font-semibold">&bull; {t("landing.bento.trap")}:</span> {t("landing.bento.trapTxt")}
              </div>
            </div>

            {/* CARD 4: Temporal Engine */}
            <div className={`md:col-span-4 bg-[#162019] p-6 rounded-2xl border border-white/10 shadow-xl flex flex-col justify-between backdrop-blur-md ${microInteractions}`}>
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#9EABA2] font-semibold">{t("landing.bento.temporalTag")}</span>
                  <span className="px-2 py-0.5 rounded bg-[#2E6F40]/20 text-[#adf3b8] text-[10px] font-mono font-bold">{t("landing.bento.storage")}</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="font-serif text-lg text-[#F5F4EF] font-normal">{t("landing.bento.temporalTitle")}</h4>
                  <span className="text-[11px] text-[#E5AA3E] font-mono font-bold">{t("landing.bento.temporalBadge")}</span>
                </div>
                <div className="bg-[#0d1510] p-2.5 rounded-lg border border-white/10 mb-2">
                  <div className="w-full h-10 relative">
                    <svg className="w-full h-full text-[#E5AA3E]" fill="none" preserveAspectRatio="none" viewBox="0 0 240 50">
                      <path d="M0,42 Q60,40 120,25 T240,8" fill="none" stroke="currentColor" strokeWidth="2" />
                      <path d="M0,42 Q60,40 120,25 T240,8 L240,50 L0,50 Z" fill="currentColor" fillOpacity="0.12" />
                      <circle className="fill-[#E5AA3E]" cx="240" cy="8" r="3.5" />
                      <circle className="fill-[#9EABA2]" cx="0" cy="42" r="2.5" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[9px] text-[#9EABA2] font-mono mt-0.5">
                    <span>{t("landing.bento.d0")}</span>
                    <span>{t("landing.bento.d12")}</span>
                  </div>
                </div>
              </div>
              <div className="text-[11px] text-[#9EABA2] bg-[#111713]/60 p-2 rounded border border-white/5">
                <span className="text-[#adf3b8] font-bold">{t("landing.bento.action")}:</span> {t("landing.bento.actionTxt")}
              </div>
            </div>

            {/* CARD 5: Pilot Discovery */}
            <div className={`md:col-span-4 bg-[#1E3A27] text-[#F5F4EF] p-6 rounded-2xl border border-[#2E6F40]/60 shadow-xl flex flex-col justify-between ${microEmerald}`}>
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#E5AA3E] font-bold block mb-1">{t("landing.bento.pilotTag")}</span>
                <span className="font-serif text-base text-[#EDEDE8] block font-normal leading-snug">{t("landing.bento.pilotTitle")}</span>
              </div>
              <div className="py-2">
                <span className="font-serif text-4xl leading-none text-[#E5AA3E] font-bold block tabular-nums">{t("landing.bento.pilotBig")}</span>
                <span className="text-[11px] text-[#adf3b8] font-mono mt-1 block">{t("landing.bento.pilotLabel")}</span>
              </div>
              <p className="text-[10px] text-[#9EABA2] border-t border-white/10 pt-2 leading-relaxed">{t("landing.bento.pilotNote")}</p>
            </div>
          </div>
        </section>

        {/* SECTION C: FIELD REALITY AUDIT */}
        <section
          id="reality-audit"
          className="py-16 w-full relative flex flex-col justify-between px-8 sm:px-12 lg:px-16 box-border bg-[#111713] text-[#F5F4EF] border-t border-white/10"
          style={{
            background:
              "radial-gradient(circle at 80% 80%, rgba(22, 32, 25, 0.6) 0%, #111713 70%)",
          }}
        >
          <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between flex-shrink-0 pt-2 pb-3 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#E5AA3E]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#E5AA3E] font-bold">{t("landing.audit.tag")}</span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl text-[#F5F4EF] tracking-tight leading-tight">{t("landing.audit.title")}</h2>
            </div>
            <div className="mt-2 md:mt-0 inline-flex p-1 rounded-full bg-[#162019] border border-white/15">
              <button type="button" className={`px-3.5 py-1 rounded-full bg-[#E5AA3E] text-[#141E17] text-[11px] font-bold shadow-sm active:scale-95 transition`}>{t("landing.audit.btnA")}</button>
              <button type="button" className="px-3.5 py-1 rounded-full text-[#9EABA2] hover:text-[#F5F4EF] text-[11px] font-semibold transition-colors">{t("landing.audit.btnB")}</button>
            </div>
          </div>

          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 py-8 items-stretch">
            {/* Scenario A */}
            <div className={`bg-[#162019] p-6 sm:p-8 rounded-2xl border border-white/15 flex flex-col justify-between shadow-lg backdrop-blur-md ${microInteractions}`}>
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#9EABA2] font-bold">{t("landing.audit.aTag")}</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-[#9EABA2] text-[10px] font-mono">{t("landing.audit.aChip")}</span>
                </div>
                <h3 className="font-serif text-lg text-[#F5F4EF] font-normal mb-1">{t("landing.audit.aTitle")}</h3>
                <p className="text-xs text-[#9EABA2] mb-4">{t("landing.audit.aDesc")}</p>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-white/5 text-[#9EABA2]">
                    <span>{t("landing.audit.aQuoted")}</span><span className="text-[#F5F4EF]">₹4,250/q</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5 text-[#9EABA2]">
                    <span>{t("landing.audit.aNominal")}</span><span className="text-[#F5F4EF]">₹85,000</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5 text-red-400">
                    <span>{t("landing.audit.aWeightCut")}</span><span>-₹3,400</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5 text-red-400">
                    <span>{t("landing.audit.aBatta")}</span><span>-₹1,200</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#9EABA2] block mb-1">{t("landing.audit.netLabel")}</span>
                <span className="font-serif text-3xl text-[#F5F4EF] font-bold tabular-nums block">₹80,400</span>
                <span className="text-[11px] text-red-400 block mt-1 font-mono">{t("landing.audit.aHidden")}</span>
              </div>
            </div>

            {/* Scenario B */}
            <div className={`bg-[#162019] p-6 sm:p-8 rounded-2xl border border-white/15 flex flex-col justify-between shadow-lg backdrop-blur-md ${microInteractions}`}>
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#9EABA2] font-bold">{t("landing.audit.bTag")}</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 text-[#9EABA2] text-[10px] font-mono">{t("landing.audit.bChip")}</span>
                </div>
                <h3 className="font-serif text-lg text-[#F5F4EF] font-normal mb-1">{t("landing.audit.bTitle")}</h3>
                <p className="text-xs text-[#9EABA2] mb-4">{t("landing.audit.bDesc")}</p>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-white/5 text-[#9EABA2]">
                    <span>{t("landing.audit.bAuction")}</span><span className="text-[#F5F4EF]">₹4,700/q</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5 text-[#9EABA2]">
                    <span>{t("landing.audit.bGross")}</span><span className="text-[#F5F4EF]">₹94,000</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5 text-red-400">
                    <span>{t("landing.audit.bTruck")}</span><span>-₹3,200</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5 text-red-400">
                    <span>{t("landing.audit.bCess")}</span><span>-₹2,400</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#9EABA2] block mb-1">{t("landing.audit.netLabel")}</span>
                <span className="font-serif text-3xl text-[#F5F4EF] font-bold tabular-nums block">₹88,400</span>
                <span className="text-[11px] text-[#9EABA2] block mt-1 font-mono">{t("landing.audit.bLog")}</span>
              </div>
            </div>

            {/* Scenario C (Winner) */}
            <div className={`bg-[#1A2A1E] p-6 sm:p-8 rounded-2xl border-2 border-[#2E6F40] flex flex-col justify-between shadow-2xl relative ${microEmerald}`}>
              <div className="absolute -top-3 right-6 bg-[#2E6F40] text-[#adf3b8] border border-[#adf3b8]/40 px-3.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider shadow-md">
                {t("landing.audit.cRecommended")}
              </div>
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#2E6F40]/40 mb-3">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#adf3b8] font-bold">{t("landing.audit.cTag")}</span>
                  <span className="px-2.5 py-0.5 rounded bg-[#2E6F40]/30 text-[#adf3b8] text-[10px] font-mono font-bold">{t("landing.audit.cChip")}</span>
                </div>
                <h3 className="font-serif text-lg text-[#F5F4EF] font-normal mb-1">{t("landing.audit.cTitle")}</h3>
                <p className="text-xs text-[#9EABA2] mb-4">{t("landing.audit.cDesc")}</p>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1.5 border-b border-white/5 text-[#EDEDE8]">
                    <span>{t("landing.audit.cMill")}</span><span className="text-[#adf3b8] font-bold">₹4,820/q</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5 text-[#EDEDE8]">
                    <span>{t("landing.audit.cGross")}</span><span className="text-[#adf3b8] font-bold">₹96,400</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5 text-[#9EABA2]">
                    <span>{t("landing.audit.cPooledFreight")}</span><span>-₹1,300</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-white/5 text-[#9EABA2]">
                    <span>{t("landing.audit.cQa")}</span><span>-₹1,500</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-[#2E6F40]/60">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#adf3b8] font-bold block mb-1">{t("landing.audit.netLabel")}</span>
                <div className="flex items-baseline justify-between">
                  <span className="font-serif text-3xl text-[#E5AA3E] font-bold tabular-nums">₹93,600</span>
                  <span className="text-[11px] font-mono text-[#adf3b8] font-bold bg-[#2E6F40]/30 border border-[#2E6F40]/60 px-2 py-0.5 rounded">+₹13,200</span>
                </div>
                <span className="text-[11px] text-[#adf3b8] block mt-1 font-mono">{t("landing.audit.cEscrow")}</span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-7xl mx-auto p-4 rounded-xl bg-[#162019] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#2E6F40]/30 text-[#adf3b8] border border-[#2E6F40]/50 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">savings</span>
              </div>
              <p className="text-xs text-[#EDEDE8]">
                <strong className="text-[#E5AA3E]">{t("landing.audit.summary")}</strong>
              </p>
            </div>
            <a href="#field-faq" onClick={scrollTo("field-faq")} className={`whitespace-nowrap px-4 py-2 rounded-full bg-[#E5AA3E] text-[#141E17] font-semibold text-xs shrink-0 ${ctaBtn}`}>
              {t("landing.audit.exploreFaq")} &rarr;
            </a>
          </div>
        </section>

        {/* SECTION D & E: FIELD FAQ + CTA + FOOTER */}
        <section
          id="field-faq"
          className="w-full relative flex flex-col justify-between px-8 sm:px-12 lg:px-16 box-border overflow-x-hidden bg-[#111713] text-[#F5F4EF] border-t border-white/10 py-12 gap-8"
          style={{
            background:
              "radial-gradient(circle at 50% 10%, rgba(30, 58, 39, 0.4) 0%, rgb(17, 23, 19) 65%)",
          }}
        >
          <div className="w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between min-h-0">
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E5AA3E]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#E5AA3E] font-bold">{t("landing.faq.tag")}</span>
                </div>
                <span className="text-[11px] text-[#9EABA2] font-mono">{t("landing.faq.badge")}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(["q1", "q2", "q3", "q4"] as const).map((q, i) => (
                  <div key={q} className={faqCard}>
                    <h4 className="text-sm text-[#F5F4EF] font-semibold mb-1 flex items-start gap-2">
                      <span className="text-[#E5AA3E] font-mono text-xs mt-0.5 shrink-0">0{i + 1}.</span>
                      <span>{t(`landing.faq.${q}`)}</span>
                    </h4>
                    <p className="text-xs text-[#9EABA2] leading-relaxed pl-5">{t(`landing.faq.a${i + 1}`)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-r from-[#162019] via-[#1A281E] to-[#162019] border border-[#2E6F40]/50 shadow-2xl relative overflow-hidden flex flex-col items-center text-center mt-8">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#E5AA3E] font-bold mb-1.5">{t("landing.cta.tag")}</span>
              <h2 className="font-serif text-2xl md:text-3xl text-[#F5F4EF] max-w-2xl font-normal tracking-tight leading-snug mb-2">{t("landing.cta.title")}</h2>
              <p className="text-xs md:text-sm text-[#9EABA2] max-w-xl font-normal leading-relaxed mb-4">{t("landing.cta.sub")}</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Link href="/sell" className={`inline-flex items-center gap-2 text-xs font-semibold bg-[#E5AA3E] text-[#141E17] px-6 py-2.5 rounded-full shadow-md ${ctaBtn}`}>
                  {t("landing.cta.check")} &rarr;
                </Link>
                <Link href="/pools" className={`inline-flex items-center gap-2 text-xs font-semibold text-[#F5F4EF] border border-white/20 hover:border-[#E5AA3E]/60 bg-white/5 px-5 py-2.5 rounded-full ${ctaBtn}`}>
                  <span className="material-symbols-outlined text-[16px] text-[#E5AA3E]">local_shipping</span>
                  {t("landing.cta.pools")}
                </Link>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono text-[#9EABA2]">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#adf3b8]" /> {t("landing.cta.t1")}</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#adf3b8]" /> {t("landing.cta.t2")}</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#adf3b8]" /> {t("landing.cta.t3")}</span>
              </div>
            </div>
          </div>

          <footer className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between pt-3 mt-3 border-t border-white/10 text-[11px] text-[#9EABA2] font-mono flex-shrink-0">
            <div>{t("landing.footer.org")}</div>
            <div className="flex items-center gap-4 mt-1 sm:mt-0">
              <a className="hover:text-[#F5F4EF] transition-colors" href="#hero" onClick={scrollTo("hero")}>{t("landing.footer.registry")}</a>
              <a className="hover:text-[#F5F4EF] transition-colors" href="#features" onClick={scrollTo("features")}>{t("landing.footer.ledger")}</a>
              <a className="hover:text-[#F5F4EF] transition-colors" href="#reality-audit" onClick={scrollTo("reality-audit")}>{t("landing.footer.econ")}</a>
              <span>{t("landing.footer.copyright")}</span>
            </div>
          </footer>
        </section>
      </div>
    </main>
  );
}