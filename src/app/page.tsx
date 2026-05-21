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
    <div className="min-h-screen bg-[#0a0a0f] text-white">

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all ${scrolled ? "bg-[#0a0a0f]/80 border-b border-white/[0.06]" : "bg-transparent"}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20">
              <span className="text-amber-400 font-bold text-xs">N</span>
            </div>
            <span className="text-sm font-semibold">NexPul</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm text-white/60 hover:text-white transition-colors">Dashboard</Link>
            <Link href="/analyst" className="text-sm text-white/60 hover:text-white transition-colors">AI Analyst</Link>
            <Link href="/about" className="text-sm text-white/60 hover:text-white transition-colors">About</Link>
            <Link href="/faq" className="text-sm text-white/60 hover:text-white transition-colors">FAQ</Link>
            <Link href="/dashboard" className="ml-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition hover:bg-white/90">
              Open Dashboard
            </Link>
          </div>
          <button onClick={() => setMobileNav(!mobileNav)} className="md:hidden text-white/60">
            {mobileNav ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {mobileNav && (
          <div className="md:hidden border-b border-white/[0.06] bg-[#0a0a0f]/95 backdrop-blur-xl px-6 py-5 space-y-3">
            <Link href="/dashboard" onClick={() => setMobileNav(false)} className="block text-sm text-white/60">Dashboard</Link>
            <Link href="/analyst" onClick={() => setMobileNav(false)} className="block text-sm text-white/60">AI Analyst</Link>
            <Link href="/about" onClick={() => setMobileNav(false)} className="block text-sm text-white/60">About</Link>
            <Link href="/faq" onClick={() => setMobileNav(false)} className="block text-sm text-white/60">FAQ</Link>
            <Link href="/dashboard" onClick={() => setMobileNav(false)} className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black">Open Dashboard</Link>
          </div>
        )}
      </nav>

      {/* ── HERO (exact Prism structure) ── */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 text-center sm:pt-28">
        {/* Badge */}
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Powered by MiMo V2.5 Pro
          </div>
        </div>

        {/* Headline — EXACT Prism sizing */}
        <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          Real-time on-chain data,
          <br />
          <span className="text-amber-400">actionable intelligence</span>.
        </h1>

        {/* Body */}
        <p className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-relaxed text-white/65">
          Eight AI-powered modules for crypto market analysis. Whale tracking, gas optimization, portfolio analytics, and sentiment analysis — all in one command center.
        </p>

        {/* CTAs — pill buttons like Prism */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link href="/dashboard" className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:-translate-y-0.5 hover:bg-white/90">
            Start Analyzing
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <a href="#modules" className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white">
            View Modules
          </a>
        </div>

        {/* Micro label */}
        <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">No signup · No tracking · Streaming AI</p>

        {/* Terminal */}
        <div className="mx-auto mt-16 max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] text-left">
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
            <span className="ml-2 text-[11px] text-white/30">NexPul</span>
          </div>
          <div className="p-5 font-mono text-[13px] leading-relaxed">
            <div className="text-white/40">$ nexpul analyze --market</div>
            <div className="mt-2">
              <span className="text-amber-400">BTC</span>{" "}
              <span className="text-white/70">$76,832</span>{" "}
              <span className="text-emerald-400">+0.66%</span>{" "}
              <span className="text-white/20">|</span>{" "}
              <span className="text-white/40">Vol $29.0B</span>
            </div>
            <div>
              <span className="text-blue-400">ETH</span>{" "}
              <span className="text-white/70">$2,112</span>{" "}
              <span className="text-emerald-400">+0.81%</span>{" "}
              <span className="text-white/20">|</span>{" "}
              <span className="text-white/40">Vol $13.7B</span>
            </div>
            <div>
              <span className="text-violet-400">SOL</span>{" "}
              <span className="text-white/70">$85.75</span>{" "}
              <span className="text-emerald-400">+0.82%</span>{" "}
              <span className="text-white/20">|</span>{" "}
              <span className="text-white/40">Vol $3.3B</span>
            </div>
            <div className="mt-3 text-white/40">$ nexpul whales --watch</div>
            <div className="mt-1">
              <span className="text-cyan-400">WHALE</span>{" "}
              <span className="text-white/60">0x742d...F2a</span>{" "}
              <span className="text-white/40">moved</span>{" "}
              <span className="text-amber-400">$2.4M ETH</span>{" "}
              <span className="text-white/30">45m ago</span>
            </div>
            <div className="mt-3 text-white/40">$ nexpul gas --all</div>
            <div className="mt-1">
              <span className="text-blue-400">ETH</span>{" "}
              <span className="text-white/40">24 Gwei</span>{" "}
              <span className="text-white/20">|</span>{" "}
              <span className="text-cyan-400">BASE</span>{" "}
              <span className="text-white/40">0.05</span>{" "}
              <span className="text-white/20">|</span>{" "}
              <span className="text-sky-400">ARB</span>{" "}
              <span className="text-white/40">0.2</span>
            </div>
            <div className="mt-3 flex items-center gap-1">
              <span className="text-amber-400">$</span>
              <span className="inline-block h-4 w-2 animate-pulse bg-amber-400" />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS (exact Prism structure) ── */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-6 py-10 text-center sm:grid-cols-4">
          {[
            { value: "10+", label: "Tokens tracked" },
            { value: "5", label: "Chains supported" },
            { value: "8", label: "AI modules" },
            { value: "60s", label: "Data refresh" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-semibold tracking-tight">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-white/40">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES (exact Prism card pattern) ── */}
      <section id="modules" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">Modules</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything you need<span className="text-amber-400">.</span>
          </h2>
          <p className="mt-3 text-white/60">
            Eight specialized modules, each backed by dedicated AI system prompts for domain-specific analysis.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => {
            const href = f.title === "AI Analyst" ? "/analyst" : `/${f.title.toLowerCase().replace(/ /g, "-")}`;
            return (
              <Link
                key={f.title}
                href={href}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
              >
                <f.icon size={20} className="text-white/60" />
                <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-white/55 leading-relaxed">{f.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── HOW IT WORKS (exact Prism card pattern) ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">Architecture</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            How it works<span className="text-amber-400">.</span>
          </h2>
          <p className="mt-3 text-white/60">
            Three steps from raw data to actionable intelligence.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div key={step.num} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-white/15 hover:bg-white/[0.04]">
              <span className="font-mono text-xs text-white/30">{step.num}</span>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TECH STACK (exact Prism pill pattern) ── */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">Stack</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Built with modern stack<span className="text-amber-400">.</span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {STACK.map((tech) => (
            <span key={tech.name} className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-white/65">
              {tech.name}
              <span className="ml-1.5 text-[10px] text-white/30">{tech.tag}</span>
            </span>
          ))}
        </div>
      </section>

      {/* ── CTA (exact Prism gradient card) ── */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent p-12 text-center sm:p-16">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.12),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.08),transparent_55%)]" />
          <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Start analyzing<span className="text-amber-400">.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            No sign-up required. Open the dashboard and start exploring real-time crypto intelligence.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/dashboard" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:-translate-y-0.5 hover:bg-white/90">
              Launch NexPul
            </Link>
            <Link href="/about" className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white">
              Read the docs
            </Link>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/[0.06] py-10 px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-amber-500/10 border border-amber-500/20">
              <span className="text-amber-400 font-bold text-[9px]">N</span>
            </div>
            <span className="text-xs text-white/40">NexPul</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-xs text-white/30 hover:text-white/60 transition-colors">About</Link>
            <Link href="/faq" className="text-xs text-white/30 hover:text-white/60 transition-colors">FAQ</Link>
            <a href="https://github.com/XinnBlueBird/nexpul" target="_blank" className="text-xs text-white/30 hover:text-white/60 transition-colors">GitHub</a>
            <Link href="/dashboard" className="text-xs text-white/30 hover:text-white/60 transition-colors">Dashboard</Link>
          </div>
          <span className="text-[11px] text-white/20">Built with MiMo v2.5 Pro</span>
        </div>
      </footer>
    </div>
  );
}
