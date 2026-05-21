"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const TECH = [
  { name: "Next.js 16", tag: "Framework" },
  { name: "MiMo v2.5 Pro", tag: "AI Model" },
  { name: "CoinGecko", tag: "Market Data" },
  { name: "Tailwind CSS v4", tag: "Styling" },
  { name: "TypeScript", tag: "Language" },
  { name: "Edge Runtime", tag: "API Layer" },
];

const MODULES = [
  { name: "Dashboard", desc: "Live prices from CoinGecko. 60-second auto-refresh with AI analysis chat.", accent: "bg-amber-400" },
  { name: "Whale Radar", desc: "Whale wallet tracking with confidence ratings (HIGH/MEDIUM/LOW).", accent: "bg-cyan-400" },
  { name: "Gas Oracle", desc: "Multi-chain gas: ETH, Base, Arbitrum, Polygon, BSC. Cost estimates per operation.", accent: "bg-green-400" },
  { name: "Portfolio", desc: "Holdings tracker with per-position P&L and AI rebalancing suggestions.", accent: "bg-blue-400" },
  { name: "AI Analyst", desc: "Full MiMo v2.5 Pro streaming chat. Each module has a dedicated system prompt.", accent: "bg-violet-400" },
  { name: "Airdrop Scanner", desc: "Upcoming airdrops with eligibility, farming steps, risk ratings.", accent: "bg-pink-400" },
  { name: "Sentiment Pulse", desc: "Fear & Greed Index, social volume, BTC dominance, token sentiment.", accent: "bg-orange-400" },
  { name: "Alert System", desc: "Configurable alerts for price, whales, gas, and volume. AI suggests thresholds.", accent: "bg-red-400" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#09090b]">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/90 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <span className="text-amber-400 font-bold text-xs">N</span>
            </div>
            <span className="font-semibold text-sm text-zinc-100">NexPul</span>
          </Link>
          <Link href="/dashboard" className="px-4 py-1.5 rounded-lg bg-amber-500 text-black text-sm font-medium hover:bg-amber-400 transition-colors">
            Open Dashboard
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors mb-8">
            <ArrowLeft size={14} /> Back
          </Link>

          {/* Header */}
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4">About NexPul</h1>
          <p className="text-zinc-500 leading-relaxed mb-4">
            NexPul is a real-time on-chain intelligence platform that combines live market data with AI-powered analysis. Eight specialized modules, each backed by a dedicated MiMo v2.5 Pro system prompt for domain-specific insights.
          </p>
          <p className="text-zinc-500 leading-relaxed mb-12">
            Built for crypto traders, DeFi participants, and on-chain analysts who need structured intelligence — not just raw data. Every module pairs real-time data ingestion with AI reasoning to deliver actionable insights.
          </p>

          {/* Differentiators */}
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">What makes it different</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {[
              { title: "Real API Integration", desc: "Live CoinGecko data, not mock. Prices update every 60 seconds with proper error handling." },
              { title: "Domain-Specific AI", desc: "Each module has a unique system prompt. Whale analyst understands wallet patterns; gas advisor knows L2 alternatives." },
              { title: "Edge Streaming", desc: "AI responses stream token-by-token via SSE on Vercel Edge Runtime. No buffering, true real-time." },
              { title: "Zero Sign-Up", desc: "No accounts, no tracking. Portfolio data stored in browser localStorage." },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-xl border border-zinc-800 bg-zinc-950">
                <h3 className="text-sm font-semibold text-zinc-200 mb-1.5">{item.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Modules */}
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {MODULES.map((m) => (
              <div key={m.name} className="p-5 rounded-xl border border-zinc-800 bg-zinc-950">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-2 h-2 rounded-full ${m.accent}`} />
                  <h3 className="text-sm font-semibold text-zinc-200">{m.name}</h3>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <h2 className="text-2xl font-bold text-zinc-100 mb-6">Tech Stack</h2>
          <div className="flex flex-wrap gap-3 mb-16">
            {TECH.map((t) => (
              <div key={t.name} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-800 bg-zinc-950">
                <span className="text-sm text-zinc-300">{t.name}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500">{t.tag}</span>
              </div>
            ))}
          </div>

          {/* Open Source */}
          <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-950">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-400"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-200 mb-1">Open Source</h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-3">
                  Fully open source. Clone, add your MiMo API key, deploy anywhere. The codebase includes all API routes, components, and AI system prompts.
                </p>
                <a href="https://github.com/XinnBlueBird/nexpul" target="_blank" className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
                  View on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
