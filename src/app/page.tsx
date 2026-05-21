"use client";

import Link from "next/link";
import {
  LayoutDashboard, Radar, Fuel, Briefcase, Bot,
  Sparkles, Activity, Bell, ArrowRight, Menu, X,
  Layers, Zap, Lock
} from "lucide-react";
import { useState, useEffect } from "react";

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

      {/* Nav */}
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

      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-20 text-center sm:pt-28">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Powered by MiMo V2.5 Pro · 8 modules live
        </div>

        <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
          Real-time on-chain data,
          <br />
          <span className="text-amber-400">actionable intelligence</span>.
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-balance text-lg leading-relaxed text-white/65">
          NexPul is a crypto command center for traders, builders, and on-chain analysts. Track whales, optimize gas, analyze sentiment — with{" "}
          <strong className="text-white/80">eight specialized AI modules</strong>{" "}
          powered by MiMo V2.5 Pro.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:-translate-y-0.5 hover:bg-white/90"
          >
            Open Dashboard
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/analyst"
            className="flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Try AI Analyst
          </Link>
        </div>

        <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">
          No signup · No tracking · Streaming AI
        </p>
      </section>

      {/* Trust strip */}
      <section className="border-y border-white/5 bg-white/[0.015]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-6 py-10 text-center sm:grid-cols-4">
          {[
            { k: "8", v: "AI modules" },
            { k: "5", v: "Chains supported" },
            { k: "60s", v: "Data refresh" },
            { k: "0", v: "Signup friction" },
          ].map((s) => (
            <div key={s.v}>
              <div className="text-3xl font-semibold tracking-tight">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-white/40">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">Modules</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Everything you need<span className="text-amber-400">.</span>
          </h2>
          <p className="mt-3 text-white/60">
            Eight specialized modules. Each backed by a dedicated system prompt for domain-specific analysis.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: LayoutDashboard, title: "Dashboard", desc: "Real-time prices, volume, and market cap from CoinGecko. 60-second auto-refresh.", href: "/dashboard" },
            { icon: Radar, title: "Whale Radar", desc: "Track whale wallets with confidence ratings. Monitor accumulation and distribution.", href: "/whale-radar" },
            { icon: Fuel, title: "Gas Oracle", desc: "Multi-chain gas tracking — Ethereum, Base, Arbitrum, Polygon, BSC.", href: "/gas-oracle" },
            { icon: Briefcase, title: "Portfolio", desc: "Holdings tracker with per-position P&L and AI rebalancing suggestions.", href: "/portfolio" },
            { icon: Bot, title: "AI Analyst", desc: "MiMo v2.5 Pro streaming chat with domain-specific system prompts.", href: "/analyst" },
            { icon: Sparkles, title: "Airdrop Scanner", desc: "Upcoming airdrops with eligibility, farming steps, and risk ratings.", href: "/airdrop-scanner" },
            { icon: Activity, title: "Sentiment Pulse", desc: "Fear & Greed Index, social volume, and per-token sentiment scoring.", href: "/sentiment" },
            { icon: Bell, title: "Alert System", desc: "Price targets, whale movements, gas thresholds, volume anomalies.", href: "/alerts" },
          ].map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
            >
              <f.icon className="h-5 w-5 text-white/60" />
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-white/55 leading-relaxed">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why NexPul */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">Why NexPul</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">
            Most crypto dashboards show data<span className="text-amber-400">.</span>
            <br />
            NexPul shows <span className="text-amber-400">intelligence</span>.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { icon: Layers, title: "Structured analysis, not raw data", body: "Every module returns structured insights — whale patterns, gas optimization tips, sentiment signals — not walls of numbers you have to interpret." },
            { icon: Zap, title: "Real-time, not stale snapshots", body: "CoinGecko data refreshed every 60 seconds. Gas prices every 30 seconds. AI responses stream token-by-token via edge runtime." },
            { icon: Lock, title: "Zero signup, full privacy", body: "No accounts, no analytics, no tracking. Portfolio data stays in your browser localStorage. AI conversations are proxied but never stored." },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-colors hover:border-white/15 hover:bg-white/[0.04]"
            >
              <f.icon className="h-5 w-5 text-white/70" />
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent p-8 sm:p-12">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/40">Architecture</p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            From data to <span className="text-amber-400">intelligence</span> in three steps.
          </h3>
          <ol className="mt-8 space-y-4">
            {[
              { stage: "INGEST", action: "Real-time data from CoinGecko, on-chain endpoints, and gas APIs. Refreshed every 60 seconds." },
              { stage: "ANALYZE", action: "MiMo v2.5 Pro processes data through domain-specific prompts — whale patterns, gas optimization, sentiment mapping." },
              { stage: "DELIVER", action: "Structured insights via streaming chat. Set alerts, track portfolio P&L, discover airdrops. Not raw data — intelligence." },
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="mt-0.5 font-mono text-xs text-white/30">0{i + 1}</span>
                <div className="flex-1">
                  <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-white/50">
                    {step.stage}
                  </span>
                  <p className="mt-2 text-sm text-white/55">{step.action}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent p-12 text-center sm:p-16">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(245,158,11,0.12),transparent_55%),radial-gradient(circle_at_70%_80%,rgba(245,158,11,0.08),transparent_55%)]" />
          <h2 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Start analyzing on-chain data<span className="text-amber-400">.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/60">
            No sign-up. No tracking. Open the dashboard and start exploring real-time crypto intelligence.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:-translate-y-0.5 hover:bg-white/90"
            >
              Launch NexPul
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Read the docs
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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
