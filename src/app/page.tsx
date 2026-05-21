"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, Radar, Fuel, Briefcase, Bot,
  Sparkles, Activity, Bell, ArrowRight, Menu, X
} from "lucide-react";

const FEATURES = [
  { title: "Dashboard", desc: "Real-time prices, volume, and market cap from CoinGecko. 60-second auto-refresh with live data.", icon: LayoutDashboard },
  { title: "Whale Radar", desc: "Track whale wallets with confidence ratings. Monitor accumulation, distribution, and holding patterns.", icon: Radar },
  { title: "Gas Oracle", desc: "Multi-chain gas tracking across Ethereum, Base, Arbitrum, Polygon, and BSC. Cost estimates per operation.", icon: Fuel },
  { title: "Portfolio", desc: "Track holdings with per-position P&L. Allocation analysis and AI rebalancing recommendations.", icon: Briefcase },
  { title: "AI Analyst", desc: "MiMo v2.5 Pro streaming chat with domain-specific system prompts. Not a generic chatbot.", icon: Bot },
  { title: "Airdrop Scanner", desc: "Upcoming airdrops with eligibility, farming steps, risk ratings, and estimated rewards.", icon: Sparkles },
  { title: "Sentiment Pulse", desc: "Fear & Greed Index, social volume, BTC dominance, and per-token sentiment scoring.", icon: Activity },
  { title: "Alert System", desc: "Price targets, whale movements, gas thresholds, volume anomalies. AI suggests optimal thresholds.", icon: Bell },
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
    <div className="min-h-screen bg-[#09090b] text-zinc-100">

      {/* ── NAV ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#09090b]/90 backdrop-blur-xl border-b border-zinc-800/50" : ""}`}>
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <span className="text-amber-400 font-bold text-xs">N</span>
            </div>
            <span className="font-semibold text-sm text-zinc-100">NexPul</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">Dashboard</Link>
            <Link href="/analyst" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">AI Analyst</Link>
            <Link href="/about" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">About</Link>
            <Link href="/faq" className="text-sm text-zinc-400 hover:text-zinc-200 transition-colors">FAQ</Link>
            <Link href="/dashboard" className="ml-2 px-4 py-1.5 rounded-lg bg-amber-500 text-black text-sm font-medium hover:bg-amber-400 transition-colors">
              Open Dashboard
            </Link>
          </div>

          <button onClick={() => setMobileNav(!mobileNav)} className="md:hidden text-zinc-400">
            {mobileNav ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileNav && (
          <div className="md:hidden bg-[#09090b]/95 backdrop-blur-xl border-b border-zinc-800/50 px-6 py-4 space-y-3">
            <Link href="/dashboard" onClick={() => setMobileNav(false)} className="block text-sm text-zinc-400 hover:text-zinc-200">Dashboard</Link>
            <Link href="/analyst" onClick={() => setMobileNav(false)} className="block text-sm text-zinc-400 hover:text-zinc-200">AI Analyst</Link>
            <Link href="/about" onClick={() => setMobileNav(false)} className="block text-sm text-zinc-400 hover:text-zinc-200">About</Link>
            <Link href="/faq" onClick={() => setMobileNav(false)} className="block text-sm text-zinc-400 hover:text-zinc-200">FAQ</Link>
            <Link href="/dashboard" onClick={() => setMobileNav(false)} className="inline-block px-4 py-1.5 rounded-lg bg-amber-500 text-black text-sm font-medium">Open Dashboard</Link>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="pt-36 pb-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-500 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Powered by MiMo V2.5 Pro
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-100 mb-6 leading-tight">
            Real-time on-chain data,
            <br />
            <span className="text-amber-400">actionable intelligence.</span>
          </h1>

          {/* Paragraph */}
          <p className="text-lg text-zinc-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Eight AI-powered modules for crypto market analysis. Whale tracking, gas optimization, portfolio analytics, and sentiment analysis — all in one command center.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
            <Link href="/dashboard" className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition-colors flex items-center justify-center gap-2">
              Start Analyzing <ArrowRight size={16} />
            </Link>
            <a href="#modules" className="w-full sm:w-auto px-6 py-3 rounded-xl border border-zinc-800 bg-zinc-900 text-sm text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors text-center">
              View Modules
            </a>
          </div>

          {/* Terminal Card */}
          <div className="max-w-lg mx-auto rounded-xl border border-zinc-800 bg-[#0c0c0e] overflow-hidden text-left">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800/50">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <span className="ml-2 text-xs text-zinc-600">NexPul</span>
            </div>
            <div className="p-5 font-mono text-sm leading-relaxed">
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
                <span className="w-2 h-4 bg-amber-400 animate-pulse inline-block" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="modules" className="py-24 px-6 border-t border-zinc-800/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-100 mb-3">Everything you need</h2>
            <p className="text-zinc-500 max-w-lg mx-auto">From real-time market data to AI-powered analysis. Eight specialized modules, each backed by dedicated system prompts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {FEATURES.map((f) => {
              const href = f.title === "AI Analyst" ? "/analyst" : `/${f.title.toLowerCase().replace(/ /g, "-")}`;
              return (
                <Link
                  key={f.title}
                  href={href}
                  className="group p-6 rounded-xl border border-zinc-800 bg-zinc-950 hover:border-zinc-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                    <f.icon size={18} className="text-amber-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-200 mb-1.5">{f.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{f.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-6 border-t border-zinc-800/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-100 mb-3">How it works</h2>
            <p className="text-zinc-500">Three steps from raw data to actionable intelligence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { num: "1", title: "Describe", desc: "NexPul pulls real-time data from CoinGecko, on-chain endpoints, and gas APIs. Refreshed every 60 seconds." },
              { num: "2", title: "Analyze", desc: "MiMo v2.5 Pro processes data through domain-specific prompts — whale patterns, gas optimization, sentiment mapping." },
              { num: "3", title: "Act", desc: "Structured insights via streaming chat. Set alerts, track portfolio P&L, discover airdrops. Not raw data — intelligence." },
            ].map((step) => (
              <div key={step.num} className="p-6 rounded-xl border border-zinc-800 bg-zinc-950 text-center">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-amber-400 text-sm font-bold">{step.num}</span>
                </div>
                <h3 className="text-base font-semibold text-zinc-200 mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECH STACK ── */}
      <section className="py-24 px-6 border-t border-zinc-800/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-100 mb-3">Built with modern stack</h2>
            <p className="text-zinc-500">Production-grade architecture from day one.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "Next.js", tag: "Framework" },
              { name: "MiMo v2.5 Pro", tag: "AI Model" },
              { name: "CoinGecko", tag: "Market Data" },
              { name: "Tailwind CSS", tag: "Styling" },
              { name: "TypeScript", tag: "Language" },
              { name: "Edge Runtime", tag: "API Layer" },
              { name: "Vercel", tag: "Deployment" },
              { name: "Lucide", tag: "Icons" },
            ].map((tech) => (
              <div key={tech.name} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-950">
                <span className="text-sm text-zinc-300">{tech.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500">{tech.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 border-t border-zinc-800/20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-zinc-100 mb-3">Ready to analyze?</h2>
          <p className="text-zinc-500 mb-8">No sign-up required. Open the dashboard and start exploring.</p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition-colors">
            Launch NexPul <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-zinc-800/30 py-8 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
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