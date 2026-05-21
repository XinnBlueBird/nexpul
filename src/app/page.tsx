"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, Radar, Fuel, Briefcase, Bot,
  Sparkles, Activity, Bell, ArrowRight, Zap, Shield, Globe,
  ChevronRight, ExternalLink, Menu, X
} from "lucide-react";

const FEATURES = [
  { href: "/dashboard", label: "Dashboard", desc: "Live prices, volume, and market cap across top tokens. Real-time CoinGecko data with 60-second refresh.", icon: LayoutDashboard, accent: "#f59e0b" },
  { href: "/whale-radar", label: "Whale Radar", desc: "Track whale wallets with confidence ratings. Monitor accumulation, distribution, and holding patterns.", icon: Radar, accent: "#06b6d4" },
  { href: "/gas-oracle", label: "Gas Oracle", desc: "Multi-chain gas tracking across ETH, Base, Arbitrum, Polygon, and BSC with cost estimation per operation.", icon: Fuel, accent: "#22c55e" },
  { href: "/portfolio", label: "Portfolio", desc: "Track holdings, P&L per position, allocation analysis, and AI-powered rebalancing recommendations.", icon: Briefcase, accent: "#3b82f6" },
  { href: "/analyst", label: "AI Analyst", desc: "Full MiMo v2.5 Pro streaming chat for deep market analysis, technical breakdowns, and strategy discussions.", icon: Bot, accent: "#8b5cf6" },
  { href: "/airdrop-scanner", label: "Airdrop Scanner", desc: "Upcoming airdrops with eligibility checks, farming steps, risk ratings, and estimated rewards.", icon: Sparkles, accent: "#ec4899" },
  { href: "/sentiment", label: "Sentiment Pulse", desc: "Fear & Greed Index, social volume, token-level sentiment scoring, and trend mapping.", icon: Activity, accent: "#f97316" },
  { href: "/alerts", label: "Alert System", desc: "Configurable alerts for price targets, whale movements, gas thresholds, and volume anomalies.", icon: Bell, accent: "#ef4444" },
];

const STATS = [
  { value: "10+", label: "Tokens Tracked", sub: "Real-time via CoinGecko" },
  { value: "5", label: "Chains Supported", sub: "ETH, Base, Arb, Polygon, BSC" },
  { value: "8", label: "AI Modules", sub: "Each with dedicated system prompt" },
  { value: "60s", label: "Data Refresh", sub: "Auto-updating dashboard" },
];

export default function LandingPage() {
  const [mobileNav, setMobileNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#09090b]/90 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-amber-500 flex items-center justify-center">
              <span className="text-black font-semibold text-xs">N</span>
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-zinc-100">NexPul</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-[13px] text-zinc-500 hover:text-zinc-200 transition-colors">Dashboard</Link>
            <Link href="/analyst" className="text-[13px] text-zinc-500 hover:text-zinc-200 transition-colors">AI Analyst</Link>
            <Link href="/about" className="text-[13px] text-zinc-500 hover:text-zinc-200 transition-colors">About</Link>
            <Link href="/faq" className="text-[13px] text-zinc-500 hover:text-zinc-200 transition-colors">FAQ</Link>
            <a href="https://github.com/XinnBlueBird/nexpul" target="_blank" className="text-zinc-600 hover:text-zinc-300 transition-colors"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>
            <Link href="/dashboard" className="px-4 py-1.5 rounded-lg bg-zinc-100 text-[#09090b] text-[13px] font-medium hover:bg-white transition-colors">
              Launch App
            </Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileNav(!mobileNav)} className="md:hidden text-zinc-400">
            {mobileNav ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileNav && (
          <div className="md:hidden bg-[#09090b]/95 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4 space-y-3">
            <Link href="/dashboard" onClick={() => setMobileNav(false)} className="block text-sm text-zinc-400 hover:text-zinc-200">Dashboard</Link>
            <Link href="/analyst" onClick={() => setMobileNav(false)} className="block text-sm text-zinc-400 hover:text-zinc-200">AI Analyst</Link>
            <Link href="/about" onClick={() => setMobileNav(false)} className="block text-sm text-zinc-400 hover:text-zinc-200">About</Link>
            <Link href="/faq" onClick={() => setMobileNav(false)} className="block text-sm text-zinc-400 hover:text-zinc-200">FAQ</Link>
            <Link href="/dashboard" onClick={() => setMobileNav(false)} className="inline-block px-4 py-1.5 rounded-lg bg-zinc-100 text-[#09090b] text-sm font-medium">Launch App</Link>
          </div>
        )}
      </nav>

      {/* === HERO === */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Atmospheric glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/[0.04] blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-40 right-0 w-[300px] h-[300px] bg-amber-600/[0.03] blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-[12px] text-zinc-500 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Powered by MiMo v2.5 Pro
          </div>

          {/* Headline */}
          <h1 className="text-[40px] md:text-[56px] font-semibold leading-[1.05] tracking-[-1.2px] text-zinc-100 mb-6">
            On-chain intelligence.
            <br />
            <span className="text-amber-400">Real-time.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-zinc-500 leading-relaxed max-w-xl mx-auto mb-10">
            Eight integrated AI modules for crypto market analysis. Whale tracking, gas optimization, portfolio analytics, and AI-powered insights — all in one command center.
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-3 mb-16">
            <Link href="/dashboard" className="px-5 py-2.5 rounded-lg bg-amber-500 text-black text-sm font-medium hover:bg-amber-400 transition-colors flex items-center gap-2">
              Open Dashboard <ArrowRight size={14} />
            </Link>
            <a href="#modules" className="px-5 py-2.5 rounded-lg border border-white/[0.08] bg-white/[0.02] text-sm text-zinc-400 hover:text-zinc-200 hover:border-white/[0.15] transition-colors">
              Explore Modules
            </a>
          </div>

          {/* Live Terminal Demo */}
          <div className="max-w-2xl mx-auto rounded-xl border border-white/[0.08] bg-[#0c0c0e] overflow-hidden shadow-2xl shadow-black/40">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.06]">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
              <span className="ml-3 text-[11px] text-zinc-600 font-mono">nexpul — AI Crypto Terminal</span>
            </div>
            <div className="p-5 font-mono text-[13px] text-left leading-relaxed">
              <div className="text-zinc-600">$ nexpul analyze market</div>
              <div className="mt-2 text-zinc-400">
                <span className="text-amber-400">BTC</span> <span className="text-zinc-600">$76,832</span> <span className="text-green-400">+0.66%</span> <span className="text-zinc-700">|</span> Vol $29.0B
              </div>
              <div className="text-zinc-400">
                <span className="text-blue-400">ETH</span> <span className="text-zinc-600">$2,112</span> <span className="text-green-400">+0.81%</span> <span className="text-zinc-700">|</span> Vol $13.7B
              </div>
              <div className="text-zinc-400">
                <span className="text-violet-400">SOL</span> <span className="text-zinc-600">$85.75</span> <span className="text-green-400">+0.82%</span> <span className="text-zinc-700">|</span> Vol $3.3B
              </div>
              <div className="mt-3 text-zinc-600">$ nexpul whales --watch</div>
              <div className="mt-1 text-zinc-400">
                <span className="text-cyan-400">WHALE</span> 0x742d...F2a moved <span className="text-amber-400">$2.4M</span> ETH <span className="text-zinc-600">45m ago</span>
              </div>
              <div className="text-zinc-400">
                <span className="text-cyan-400">WHALE</span> 0x8b1A...9c3 accumulating <span className="text-amber-400">SOL</span> <span className="text-green-400">+12.8%</span>
              </div>
              <div className="mt-3 text-zinc-600">$ nexpul gas --all-chains</div>
              <div className="mt-1 grid grid-cols-5 gap-2 text-[12px]">
                <div><span className="text-blue-400">ETH</span> <span className="text-zinc-500">24 Gwei</span></div>
                <div><span className="text-cyan-400">BASE</span> <span className="text-zinc-500">0.05</span></div>
                <div><span className="text-sky-400">ARB</span> <span className="text-zinc-500">0.2</span></div>
                <div><span className="text-violet-400">MATIC</span> <span className="text-zinc-500">50</span></div>
                <div><span className="text-yellow-400">BSC</span> <span className="text-zinc-500">3</span></div>
              </div>
              <div className="mt-3 flex items-center gap-1">
                <span className="text-amber-400">$</span>
                <span className="w-2 h-4 bg-amber-400/80 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === STATS STRIP === */}
      <section className="py-16 px-6 border-y border-white/[0.06]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-100 mb-1">{stat.value}</div>
              <div className="text-sm text-zinc-400 mb-0.5">{stat.label}</div>
              <div className="text-[11px] text-zinc-600">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* === FEATURE SHOWCASE === */}
      <section id="modules" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[11px] font-medium text-amber-400 uppercase tracking-wider mb-3">Modules</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100 mb-3">Eight modules. One platform.</h2>
            <p className="text-zinc-500 max-w-lg mx-auto">Each module is purpose-built with dedicated AI prompts, real-time data integration, and contextual intelligence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FEATURES.map((f, i) => (
              <Link
                key={f.href}
                href={f.href}
                className="group p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${f.accent}15`, border: `1px solid ${f.accent}25` }}>
                    <f.icon size={18} style={{ color: f.accent }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[15px] font-medium text-zinc-200 group-hover:text-zinc-100 transition-colors">{f.label}</span>
                      <ChevronRight size={14} className="text-zinc-700 group-hover:text-zinc-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <p className="text-[13px] text-zinc-500 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* === HOW IT WORKS === */}
      <section className="py-24 px-6 border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[11px] font-medium text-amber-400 uppercase tracking-wider mb-3">Architecture</div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100 mb-3">How it works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { num: "01", title: "Data Ingestion", desc: "Real-time market data from CoinGecko, on-chain RPC endpoints, and gas oracle APIs. Refreshed every 60 seconds." },
              { num: "02", title: "AI Analysis", desc: "MiMo v2.5 Pro processes market data through domain-specific prompts — whale analysis, gas optimization, sentiment mapping." },
              { num: "03", title: "Actionable Output", desc: "Structured insights, not raw data. Chat with AI for deep dives, set smart alerts, track portfolio P&L." },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="text-[11px] font-mono text-amber-400/60 mb-3">{step.num}</div>
                <h3 className="text-[15px] font-medium text-zinc-200 mb-2">{step.title}</h3>
                <p className="text-[13px] text-zinc-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === CTA === */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-zinc-100 mb-4">Start analyzing on-chain data</h2>
          <p className="text-zinc-500 mb-8">No sign-up required. Open the dashboard and start exploring.</p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-amber-500 text-black text-sm font-medium hover:bg-amber-400 transition-colors">
            Launch NexPul <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-amber-500 flex items-center justify-center">
              <span className="text-black font-semibold text-[9px]">N</span>
            </div>
            <span className="text-[13px] text-zinc-500">NexPul</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-[12px] text-zinc-600 hover:text-zinc-400 transition-colors">About</Link>
            <Link href="/faq" className="text-[12px] text-zinc-600 hover:text-zinc-400 transition-colors">FAQ</Link>
            <a href="https://github.com/XinnBlueBird/nexpul" target="_blank" className="text-[12px] text-zinc-600 hover:text-zinc-400 transition-colors">GitHub</a>
            <Link href="/dashboard" className="text-[12px] text-zinc-600 hover:text-zinc-400 transition-colors">Dashboard</Link>
          </div>
          <span className="text-[11px] text-zinc-700">Built with MiMo v2.5 Pro</span>
        </div>
      </footer>
    </div>
  );
}
