"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, Radar, Fuel, Briefcase, Bot,
  Sparkles, Activity, Bell, ArrowRight, Menu, X
} from "lucide-react";

const FEATURES = [
  { title: "Dashboard", desc: "Real-time prices, volume, and market cap from CoinGecko. 60-second auto-refresh.", icon: LayoutDashboard },
  { title: "Whale Radar", desc: "Track whale wallets with confidence ratings. Monitor accumulation and distribution.", icon: Radar },
  { title: "Gas Oracle", desc: "Multi-chain gas tracking — Ethereum, Base, Arbitrum, Polygon, BSC.", icon: Fuel },
  { title: "Portfolio", desc: "Holdings tracker with per-position P&L and AI rebalancing suggestions.", icon: Briefcase },
  { title: "AI Analyst", desc: "MiMo v2.5 Pro streaming chat with domain-specific system prompts.", icon: Bot },
  { title: "Airdrop Scanner", desc: "Upcoming airdrops with eligibility, farming steps, and risk ratings.", icon: Sparkles },
  { title: "Sentiment Pulse", desc: "Fear & Greed Index, social volume, and per-token sentiment scoring.", icon: Activity },
  { title: "Alert System", desc: "Price targets, whale movements, gas thresholds, volume anomalies.", icon: Bell },
];

const STEPS = [
  { num: "1", title: "Data Ingestion", desc: "Real-time market data from CoinGecko, on-chain endpoints, and gas APIs. Refreshed every 60 seconds." },
  { num: "2", title: "AI Analysis", desc: "MiMo v2.5 Pro processes data through domain-specific prompts — whale patterns, gas optimization, sentiment." },
  { num: "3", title: "Actionable Output", desc: "Structured insights via streaming chat. Set alerts, track portfolio P&L, discover airdrops." },
];

const STACK = [
  { name: "Next.js", tag: "Framework" },
  { name: "MiMo v2.5 Pro", tag: "AI" },
  { name: "CoinGecko", tag: "Data" },
  { name: "Tailwind CSS", tag: "Styling" },
  { name: "TypeScript", tag: "Language" },
  { name: "Edge Runtime", tag: "API" },
  { name: "Vercel", tag: "Deploy" },
  { name: "Lucide", tag: "Icons" },
];

export default function LandingPage() {
  const [mobileNav, setMobileNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-zinc-100">

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 ${scrolled ? "bg-[#0a0a0f]/80 border-b border-white/[0.06]" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
              <span className="text-amber-400 font-bold text-xs">N</span>
            </div>
            <span className="text-sm font-semibold text-zinc-100">NexPul</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">Dashboard</Link>
            <Link href="/analyst" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">AI Analyst</Link>
            <Link href="/about" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">About</Link>
            <Link href="/faq" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">FAQ</Link>
            <Link href="/dashboard" className="ml-2 rounded-lg bg-amber-500 px-4 py-1.5 text-sm font-medium text-black hover:bg-amber-400 transition-colors">
              Open Dashboard
            </Link>
          </div>

          <button onClick={() => setMobileNav(!mobileNav)} className="md:hidden text-zinc-400">
            {mobileNav ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileNav && (
          <div className="md:hidden border-b border-white/[0.06] bg-[#0a0a0f]/95 backdrop-blur-xl px-6 py-5 space-y-3">
            <Link href="/dashboard" onClick={() => setMobileNav(false)} className="block text-sm text-zinc-400">Dashboard</Link>
            <Link href="/analyst" onClick={() => setMobileNav(false)} className="block text-sm text-zinc-400">AI Analyst</Link>
            <Link href="/about" onClick={() => setMobileNav(false)} className="block text-sm text-zinc-400">About</Link>
            <Link href="/faq" onClick={() => setMobileNav(false)} className="block text-sm text-zinc-400">FAQ</Link>
            <Link href="/dashboard" onClick={() => setMobileNav(false)} className="inline-block rounded-lg bg-amber-500 px-4 py-1.5 text-sm font-medium text-black">Open Dashboard</Link>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 text-center sm:pt-28">
        {/* Badge */}
        <div className="mb-9 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-500">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Powered by MiMo V2.5 Pro
          </div>
        </div>

        {/* Headline — EXACT Prism sizing */}
        <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          Real-time on-chain data,
          <br />
          <span className="text-amber-400">actionable intelligence.</span>
        </h1>

        {/* Body */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-500 leading-relaxed">
          Eight AI-powered modules for crypto market analysis. Whale tracking, gas optimization, portfolio analytics, and sentiment analysis — all in one command center.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/dashboard" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-black hover:bg-amber-400 transition-colors sm:w-auto">
            Start Analyzing <ArrowRight size={16} />
          </Link>
          <a href="#modules" className="inline-flex w-full items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.03] px-6 py-3 text-sm text-zinc-400 hover:border-white/[0.2] hover:text-zinc-200 transition-colors sm:w-auto">
            View Modules
          </a>
        </div>

        {/* Terminal */}
        <div className="mx-auto mt-16 max-w-2xl overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c0e] text-left">
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
            <span className="ml-2 text-[11px] text-zinc-600">NexPul</span>
          </div>
          <div className="p-5 font-mono text-[13px] leading-relaxed">
            <div className="text-zinc-500">$ nexpul analyze --market</div>
            <div className="mt-2">
              <span className="text-amber-400">BTC</span>{" "}
              <span className="text-zinc-400">$76,832</span>{" "}
              <span className="text-green-400">+0.66%</span>{" "}
              <span className="text-zinc-700">|</span>{" "}
              <span className="text-zinc-500">Vol $29.0B</span>
            </div>
            <div>
              <span className="text-blue-400">ETH</span>{" "}
              <span className="text-zinc-400">$2,112</span>{" "}
              <span className="text-green-400">+0.81%</span>{" "}
              <span className="text-zinc-700">|</span>{" "}
              <span className="text-zinc-500">Vol $13.7B</span>
            </div>
            <div>
              <span className="text-violet-400">SOL</span>{" "}
              <span className="text-zinc-400">$85.75</span>{" "}
              <span className="text-green-400">+0.82%</span>{" "}
              <span className="text-zinc-700">|</span>{" "}
              <span className="text-zinc-500">Vol $3.3B</span>
            </div>
            <div className="mt-3 text-zinc-500">$ nexpul whales --watch</div>
            <div className="mt-1">
              <span className="text-cyan-400">WHALE</span>{" "}
              <span className="text-zinc-400">0x742d...F2a</span>{" "}
              <span className="text-zinc-500">moved</span>{" "}
              <span className="text-amber-400">$2.4M ETH</span>{" "}
              <span className="text-zinc-600">45m ago</span>
            </div>
            <div className="mt-3 text-zinc-500">$ nexpul gas --all</div>
            <div className="mt-1">
              <span className="text-blue-400">ETH</span>{" "}
              <span className="text-zinc-500">24 Gwei</span>{" "}
              <span className="text-zinc-700">|</span>{" "}
              <span className="text-cyan-400">BASE</span>{" "}
              <span className="text-zinc-500">0.05</span>{" "}
              <span className="text-zinc-700">|</span>{" "}
              <span className="text-sky-400">ARB</span>{" "}
              <span className="text-zinc-500">0.2</span>
            </div>
            <div className="mt-3 flex items-center gap-1">
              <span className="text-amber-400">$</span>
              <span className="inline-block h-4 w-2 animate-pulse bg-amber-400" />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS (Prism style: border-y bg-white/1.5%) ── */}
      <section className="border-y border-white/[0.05] bg-white/[0.015]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-6 py-10 text-center sm:grid-cols-4">
          {[
            { value: "10+", label: "Tokens Tracked" },
            { value: "5", label: "Chains Supported" },
            { value: "8", label: "AI Modules" },
            { value: "60s", label: "Data Refresh" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-semibold tracking-tight text-zinc-100">{s.value}</div>
              <div className="mt-1 text-xs text-zinc-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="modules" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything you need.
          </h2>
          <p className="mt-3 text-lg text-zinc-500">
            From real-time market data to AI-powered analysis. Eight specialized modules, each backed by dedicated system prompts.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => {
            const href = f.title === "AI Analyst" ? "/analyst" : `/${f.title.toLowerCase().replace(/ /g, "-")}`;
            return (
              <Link
                key={f.title}
                href={href}
                className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 hover:bg-white/[0.04] transition-colors"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
                  <f.icon size={18} className="text-amber-400" />
                </div>
                <h3 className="text-base font-semibold text-zinc-200 mb-1">{f.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            How it works.
          </h2>
          <p className="mt-3 text-lg text-zinc-500">
            Three steps from raw data to actionable intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.num} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/20">
                <span className="text-sm font-bold text-amber-400">{step.num}</span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-200 mb-2">{step.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Built with modern stack.
          </h2>
          <p className="mt-3 text-lg text-zinc-500">Production-grade architecture from day one.</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {STACK.map((tech) => (
            <div key={tech.name} className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-2.5">
              <span className="text-sm text-zinc-300">{tech.name}</span>
              <span className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] text-zinc-500">{tech.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent p-12 text-center sm:p-16">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Start analyzing on-chain data</h2>
          <p className="mx-auto mt-3 max-w-md text-zinc-500">No sign-up required. Open the dashboard and start exploring.</p>
          <Link href="/dashboard" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-black hover:bg-amber-400 transition-colors">
            Launch NexPul <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.06] py-10 px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-amber-500/10 border border-amber-500/20">
              <span className="text-amber-400 font-bold text-[9px]">N</span>
            </div>
            <span className="text-xs text-zinc-600">NexPul</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">About</Link>
            <Link href="/faq" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">FAQ</Link>
            <a href="https://github.com/XinnBlueBird/nexpul" target="_blank" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">GitHub</a>
            <Link href="/dashboard" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">Dashboard</Link>
          </div>
          <span className="text-[11px] text-zinc-700">Built with MiMo v2.5 Pro</span>
        </div>
      </footer>
    </div>
  );
}
