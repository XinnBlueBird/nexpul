"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, Radar, Fuel, Briefcase, Bot,
  Sparkles, Activity, Bell, ArrowRight, ArrowUpRight,
  ChevronRight, Menu, X
} from "lucide-react";

/* ─── data ─── */
const FEATURES = [
  { num: "01", label: "Dashboard", desc: "Live prices, volume, and market cap across top tokens. Real-time CoinGecko data with 60-second auto-refresh and AI market analysis chat.", accent: "#f59e0b", icon: LayoutDashboard },
  { num: "02", label: "Whale Radar", desc: "Track whale wallets with confidence ratings — HIGH, MEDIUM, LOW based on historical accuracy. Monitor accumulation, distribution, and holding patterns.", accent: "#06b6d4", icon: Radar },
  { num: "03", label: "Gas Oracle", desc: "Multi-chain gas tracking across Ethereum, Base, Arbitrum, Polygon, and BSC. Per-operation cost estimates for swaps, transfers, mints, and deploys.", accent: "#22c55e", icon: Fuel },
  { num: "04", label: "Portfolio", desc: "Track holdings with per-position P&L calculation. Allocation analysis and AI-powered rebalancing recommendations. Data stored in localStorage.", accent: "#3b82f6", icon: Briefcase },
  { num: "05", label: "AI Analyst", desc: "Full MiMo v2.5 Pro streaming chat. Each module has a dedicated system prompt encoding domain expertise — not a generic chatbot.", accent: "#8b5cf6", icon: Bot },
  { num: "06", label: "Airdrop Scanner", desc: "Upcoming airdrops with eligibility criteria, step-by-step farming guides, risk ratings, estimated rewards, and protocol TVL data.", accent: "#ec4899", icon: Sparkles },
  { num: "07", label: "Sentiment Pulse", desc: "Fear & Greed Index, social volume metrics, BTC dominance, trending topics, and per-token sentiment scoring with trend indicators.", accent: "#f97316", icon: Activity },
  { num: "08", label: "Alert System", desc: "Configurable alerts for price targets, whale movements, gas thresholds, and volume anomalies. Toggle active/paused. AI suggests thresholds.", accent: "#ef4444", icon: Bell },
];

const STEPS = [
  { num: "01", title: "Data Ingestion", desc: "Real-time market data from CoinGecko, on-chain RPC endpoints, and gas oracle APIs. Refreshed every 60 seconds with null guards and error handling." },
  { num: "02", title: "AI Analysis", desc: "MiMo v2.5 Pro processes data through domain-specific system prompts. Each module gets its own expert persona — whale patterns, gas optimization, sentiment mapping." },
  { num: "03", title: "Actionable Output", desc: "Structured insights delivered via streaming chat. Set smart alerts, track portfolio P&L, discover airdrop opportunities. Not raw data — intelligence." },
];

const CHAINS = [
  { name: "Ethereum", tag: "L1", color: "#3b82f6" },
  { name: "Base", tag: "L2", color: "#06b6d4" },
  { name: "Arbitrum", tag: "L2", color: "#22c55e" },
  { name: "Polygon", tag: "L2", color: "#8b5cf6" },
  { name: "BSC", tag: "L1", color: "#f59e0b" },
  { name: "Solana", tag: "L1", color: "#ec4899" },
];

/* ─── page ─── */
export default function LandingPage() {
  const [mobileNav, setMobileNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 selection:bg-amber-500/30 selection:text-amber-100">

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#09090b]/95 backdrop-blur-xl border-b border-white/[0.06]" : ""}`}>
        <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center">
              <span className="text-black font-semibold text-[10px] leading-none">N</span>
            </div>
            <span className="font-semibold text-[14px] tracking-[-0.3px] text-zinc-100">NexPul</span>
          </Link>

          <div className="hidden md:flex items-center gap-7">
            <Link href="/dashboard" className="font-mono text-[11px] tracking-[0.08em] uppercase text-zinc-500 hover:text-zinc-200 transition-colors">Dashboard</Link>
            <Link href="/analyst" className="font-mono text-[11px] tracking-[0.08em] uppercase text-zinc-500 hover:text-zinc-200 transition-colors">AI Analyst</Link>
            <Link href="/about" className="font-mono text-[11px] tracking-[0.08em] uppercase text-zinc-500 hover:text-zinc-200 transition-colors">About</Link>
            <Link href="/faq" className="font-mono text-[11px] tracking-[0.08em] uppercase text-zinc-500 hover:text-zinc-200 transition-colors">FAQ</Link>
            <Link
              href="/dashboard"
              className="ml-2 font-mono text-[11px] tracking-[0.08em] uppercase px-4 py-1.5 rounded-md bg-zinc-100 text-[#09090b] hover:bg-white transition-colors"
            >
              Open Dashboard
            </Link>
          </div>

          <button onClick={() => setMobileNav(!mobileNav)} className="md:hidden text-zinc-400">
            {mobileNav ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {mobileNav && (
          <div className="md:hidden bg-[#09090b]/98 backdrop-blur-xl border-b border-white/[0.06] px-6 py-5 space-y-3">
            <Link href="/dashboard" onClick={() => setMobileNav(false)} className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400 hover:text-zinc-200">Dashboard</Link>
            <Link href="/analyst" onClick={() => setMobileNav(false)} className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400 hover:text-zinc-200">AI Analyst</Link>
            <Link href="/about" onClick={() => setMobileNav(false)} className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400 hover:text-zinc-200">About</Link>
            <Link href="/faq" onClick={() => setMobileNav(false)} className="block font-mono text-[11px] uppercase tracking-wider text-zinc-400 hover:text-zinc-200">FAQ</Link>
            <Link href="/dashboard" onClick={() => setMobileNav(false)} className="inline-block mt-2 font-mono text-[11px] uppercase tracking-wider px-4 py-1.5 rounded-md bg-zinc-100 text-[#09090b]">Open Dashboard</Link>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative pt-28 md:pt-36 pb-20 px-6">
        {/* Atmospheric glow — subtle, not gradient slop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/[0.03] blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: copy */}
            <div>
              {/* Eyebrow */}
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-amber-400/70 mb-5">
                Real-Time On-Chain Intelligence for Crypto Builders
              </div>

              {/* Headline */}
              <h1 className="text-[36px] md:text-[44px] lg:text-[52px] font-semibold leading-[1.08] tracking-[-1.2px] text-zinc-100 mb-5">
                Turn on-chain data
                <br />
                into <span className="text-amber-400">actionable</span> intelligence.
              </h1>

              {/* Body */}
              <p className="text-[15px] text-zinc-500 leading-[1.65] max-w-[420px] mb-8">
                Eight AI-powered modules. Real-time market data. Whale tracking, gas optimization, portfolio analytics, and sentiment analysis — all in one command center.
              </p>

              {/* CTAs — hard shadow, tactile */}
              <div className="flex items-center gap-3 mb-6">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] uppercase px-5 py-2.5 rounded-md bg-amber-500 text-black hover:bg-amber-400 transition-colors shadow-[3px_3px_0px_0px_rgba(245,158,11,0.3)] hover:shadow-[1px_1px_0px_0px_rgba(245,158,11,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  Open Dashboard <ArrowRight size={13} />
                </Link>
                <a
                  href="#modules"
                  className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] uppercase px-5 py-2.5 rounded-md border border-white/[0.12] bg-white/[0.03] text-zinc-400 hover:text-zinc-200 hover:border-white/[0.2] transition-all shadow-[3px_3px_0px_0px_rgba(255,255,255,0.04)] hover:shadow-[1px_1px_0px_0px_rgba(255,255,255,0.04)] hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  View Modules
                </a>
              </div>

              {/* Micro tags */}
              <div className="flex flex-wrap gap-2">
                {["MiMo v2.5 Pro", "Edge Streaming", "Zero Sign-Up"].map((tag) => (
                  <span key={tag} className="font-mono text-[10px] tracking-[0.06em] px-2.5 py-1 rounded border border-white/[0.08] bg-white/[0.02] text-zinc-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: terminal artifact */}
            <div className="hidden lg:block">
              <div className="rounded-xl border border-white/[0.08] bg-[#0c0c0e] overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] transform rotate-[0.5deg]">
                {/* Title bar */}
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                  <span className="ml-3 font-mono text-[10px] text-zinc-600">nexpul — on-chain intelligence</span>
                </div>
                {/* Terminal body */}
                <div className="p-5 font-mono text-[12px] leading-[1.8]">
                  <div className="text-zinc-600">$ nexpul analyze --market</div>
                  <div className="mt-1.5">
                    <span className="text-amber-400">BTC</span>{" "}
                    <span className="text-zinc-500">$76,832</span>{" "}
                    <span className="text-emerald-400">+0.66%</span>{" "}
                    <span className="text-zinc-700">|</span>{" "}
                    <span className="text-zinc-600">Vol $29.0B</span>
                  </div>
                  <div>
                    <span className="text-blue-400">ETH</span>{" "}
                    <span className="text-zinc-500">$2,112</span>{" "}
                    <span className="text-emerald-400">+0.81%</span>{" "}
                    <span className="text-zinc-700">|</span>{" "}
                    <span className="text-zinc-600">Vol $13.7B</span>
                  </div>
                  <div>
                    <span className="text-violet-400">SOL</span>{" "}
                    <span className="text-zinc-500">$85.75</span>{" "}
                    <span className="text-emerald-400">+0.82%</span>{" "}
                    <span className="text-zinc-700">|</span>{" "}
                    <span className="text-zinc-600">Vol $3.3B</span>
                  </div>

                  <div className="mt-3 text-zinc-600">$ nexpul whales --watch --live</div>
                  <div className="mt-1">
                    <span className="text-cyan-400">WHALE</span>{" "}
                    <span className="text-zinc-500">0x742d...F2a</span>{" "}
                    <span className="text-zinc-600">moved</span>{" "}
                    <span className="text-amber-400">$2.4M ETH</span>{" "}
                    <span className="text-zinc-700">45m ago</span>
                  </div>
                  <div>
                    <span className="text-cyan-400">WHALE</span>{" "}
                    <span className="text-zinc-500">0x8b1A...9c3</span>{" "}
                    <span className="text-zinc-600">accumulating</span>{" "}
                    <span className="text-amber-400">SOL</span>{" "}
                    <span className="text-emerald-400">+12.8%</span>
                  </div>

                  <div className="mt-3 text-zinc-600">$ nexpul gas --all-chains</div>
                  <div className="mt-1 flex flex-wrap gap-x-4 text-[11px]">
                    <span><span className="text-blue-400">ETH</span> <span className="text-zinc-500">24 Gwei</span></span>
                    <span><span className="text-cyan-400">BASE</span> <span className="text-zinc-500">0.05</span></span>
                    <span><span className="text-sky-400">ARB</span> <span className="text-zinc-500">0.2</span></span>
                    <span><span className="text-violet-400">MATIC</span> <span className="text-zinc-500">50</span></span>
                    <span><span className="text-yellow-400">BSC</span> <span className="text-zinc-500">3</span></span>
                  </div>

                  <div className="mt-3 text-zinc-600">$ nexpul sentiment --fear-greed</div>
                  <div className="mt-1">
                    <span className="text-zinc-500">Fear & Greed Index:</span>{" "}
                    <span className="text-amber-400 font-medium">65</span>{" "}
                    <span className="text-zinc-600">(Greed)</span>{" "}
                    <span className="text-zinc-700">|</span>{" "}
                    <span className="text-zinc-500">BTC Dom:</span>{" "}
                    <span className="text-zinc-400">54.2%</span>
                  </div>

                  <div className="mt-3 flex items-center gap-1">
                    <span className="text-amber-400">$</span>
                    <span className="w-[7px] h-[14px] bg-amber-400/80 animate-pulse inline-block" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="border-t border-white/[0.06]" />
      </div>

      {/* ── STATS ── */}
      <section className="py-16 px-6">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "10+", label: "Tokens Tracked" },
            { value: "5", label: "Chains Supported" },
            { value: "8", label: "AI Modules" },
            { value: "60s", label: "Data Refresh" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-[28px] md:text-[32px] font-semibold tracking-[-0.8px] text-zinc-100 mb-1">{s.value}</div>
              <div className="font-mono text-[10px] tracking-[0.1em] uppercase text-zinc-600">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="border-t border-white/[0.06]" />
      </div>

      {/* ── MODULES ── */}
      <section id="modules" className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-amber-400/60 mb-2">Modules</div>
              <h2 className="text-[28px] md:text-[34px] font-semibold tracking-[-0.8px] text-zinc-100">
                Eight modules. One platform.
              </h2>
            </div>
            <div className="hidden md:block font-mono text-[10px] tracking-[0.08em] uppercase text-zinc-600">
              8 / 8 Active
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/[0.04] rounded-xl overflow-hidden">
            {FEATURES.map((f) => (
              <Link
                key={f.label}
                href={f.label === "AI Analyst" ? "/analyst" : `/${f.label.toLowerCase().replace(/ /g, "-")}`}
                className="group bg-[#09090b] p-5 hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: `${f.accent}12`, border: `1px solid ${f.accent}20` }}>
                      <f.icon size={14} style={{ color: f.accent }} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="font-mono text-[10px] tracking-[0.06em] text-zinc-600">{f.num}</span>
                      <span className="text-[14px] font-medium text-zinc-200 group-hover:text-zinc-100 transition-colors">{f.label}</span>
                      <ArrowUpRight size={12} className="text-zinc-700 group-hover:text-zinc-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                    <p className="text-[13px] text-zinc-500 leading-[1.6]">{f.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="border-t border-white/[0.06]" />
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-10">
            <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-amber-400/60 mb-2">Architecture</div>
            <h2 className="text-[28px] md:text-[34px] font-semibold tracking-[-0.8px] text-zinc-100">
              How it works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[1px] bg-white/[0.04] rounded-xl overflow-hidden">
            {STEPS.map((step) => (
              <div key={step.num} className="bg-[#09090b] p-6">
                <div className="font-mono text-[10px] tracking-[0.1em] text-amber-400/50 mb-3">{step.num}</div>
                <h3 className="text-[15px] font-medium text-zinc-200 mb-2">{step.title}</h3>
                <p className="text-[13px] text-zinc-500 leading-[1.6]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="border-t border-white/[0.06]" />
      </div>

      {/* ── CHAINS ── */}
      <section className="py-20 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-amber-400/60 mb-2">Supported</div>
              <h2 className="text-[28px] md:text-[34px] font-semibold tracking-[-0.8px] text-zinc-100">
                Multi-chain coverage
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {CHAINS.map((c) => (
              <div key={c.name} className="flex items-center gap-3 px-4 py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.02]">
                <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                <span className="text-[13px] text-zinc-300 font-medium">{c.name}</span>
                <span className="font-mono text-[9px] tracking-[0.08em] uppercase text-zinc-600 px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">{c.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="border-t border-white/[0.06]" />
      </div>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-[1100px] mx-auto text-center">
          <div className="font-mono text-[10px] tracking-[0.12em] uppercase text-amber-400/60 mb-3">Get Started</div>
          <h2 className="text-[28px] md:text-[36px] font-semibold tracking-[-0.8px] text-zinc-100 mb-3">
            Start analyzing on-chain data
          </h2>
          <p className="text-[15px] text-zinc-500 mb-8 max-w-md mx-auto">
            No sign-up required. Open the dashboard and start exploring real-time crypto intelligence.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.06em] uppercase px-6 py-2.5 rounded-md bg-amber-500 text-black hover:bg-amber-400 transition-colors shadow-[3px_3px_0px_0px_rgba(245,158,11,0.3)] hover:shadow-[1px_1px_0px_0px_rgba(245,158,11,0.3)] hover:translate-x-[2px] hover:translate-y-[2px]"
          >
            Launch NexPul <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-amber-500 flex items-center justify-center">
              <span className="text-black font-semibold text-[8px] leading-none">N</span>
            </div>
            <span className="font-mono text-[11px] text-zinc-600">NexPul</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="font-mono text-[10px] tracking-[0.06em] uppercase text-zinc-700 hover:text-zinc-400 transition-colors">About</Link>
            <Link href="/faq" className="font-mono text-[10px] tracking-[0.06em] uppercase text-zinc-700 hover:text-zinc-400 transition-colors">FAQ</Link>
            <a href="https://github.com/XinnBlueBird/nexpul" target="_blank" className="font-mono text-[10px] tracking-[0.06em] uppercase text-zinc-700 hover:text-zinc-400 transition-colors">GitHub</a>
            <Link href="/dashboard" className="font-mono text-[10px] tracking-[0.06em] uppercase text-zinc-700 hover:text-zinc-400 transition-colors">Dashboard</Link>
          </div>
          <span className="font-mono text-[10px] text-zinc-800">Built with MiMo v2.5 Pro</span>
        </div>
      </footer>
    </div>
  );
}
