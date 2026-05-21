"use client";

import Link from "next/link";
import {
  ArrowLeft, Bot, Zap, Shield, Globe, Code,
  Activity, Database, Brain, Layers, ArrowRight
} from "lucide-react";

const TECH_STACK = [
  { name: "Next.js 16", role: "Framework", desc: "React 19 with App Router, server components, and edge runtime for API routes." },
  { name: "MiMo v2.5 Pro", role: "AI Model", desc: "Xiaomi's reasoning model for deep analysis. Accessed via Token Plan API with SSE streaming." },
  { name: "CoinGecko API", role: "Market Data", desc: "Real-time crypto prices, market caps, volume, and trending tokens. 60-second cache." },
  { name: "Tailwind CSS v4", role: "Styling", desc: "Utility-first CSS with @theme inline configuration. Zero-config dark theme." },
  { name: "TypeScript", role: "Language", desc: "End-to-end type safety. All API responses, components, and state are fully typed." },
  { name: "Edge Runtime", role: "API Layer", desc: "SSE streaming routes on Vercel Edge for sub-second AI response latency." },
];

const MODULES = [
  { name: "Dashboard", desc: "Live market overview with real-time price tracking, volume analysis, and market cap data from CoinGecko. Includes AI chat for instant market analysis.", accent: "#f59e0b" },
  { name: "Whale Radar", desc: "Whale wallet monitoring with confidence ratings (HIGH/MEDIUM/LOW based on historical accuracy). Track accumulation, distribution, and holding patterns.", accent: "#06b6d4" },
  { name: "Gas Oracle", desc: "Multi-chain gas tracking across Ethereum, Base, Arbitrum, Polygon, and BSC. Provides cost estimates for common operations (swap, transfer, mint, deploy).", accent: "#22c55e" },
  { name: "Portfolio", desc: "Manual holdings tracker with per-position P&L calculation, allocation visualization, and AI-powered rebalancing suggestions. Data stored in browser localStorage.", accent: "#3b82f6" },
  { name: "AI Analyst", desc: "Full streaming chat interface powered by MiMo v2.5 Pro. Each module has a dedicated system prompt encoding domain expertise — whale analysis, gas optimization, sentiment mapping.", accent: "#8b5cf6" },
  { name: "Airdrop Scanner", desc: "Curated airdrop database with eligibility criteria, step-by-step farming guides, risk ratings, estimated rewards, and TVL data.", accent: "#ec4899" },
  { name: "Sentiment Pulse", desc: "Fear & Greed Index, social volume metrics, BTC dominance, trending topics, and per-token sentiment scoring with trend indicators.", accent: "#f97316" },
  { name: "Alert System", desc: "Configurable alerts for price targets, whale movements, gas thresholds, and volume anomalies. Toggle active/paused states, add/remove alerts.", accent: "#ef4444" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center">
              <span className="text-black font-semibold text-[10px]">N</span>
            </div>
            <span className="font-semibold text-sm text-zinc-100">NexPul</span>
          </Link>
          <Link href="/dashboard" className="px-3.5 py-1.5 rounded-lg bg-zinc-100 text-[#09090b] text-[12px] font-medium hover:bg-white transition-colors">
            Launch App
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <Link href="/" className="inline-flex items-center gap-1.5 text-[12px] text-zinc-600 hover:text-zinc-400 transition-colors mb-10">
            <ArrowLeft size={12} /> Back to home
          </Link>

          {/* Header */}
          <div className="mb-16">
            <div className="text-[11px] font-medium text-amber-400 uppercase tracking-wider mb-3">About</div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100 mb-4">
              NexPul — AI Crypto Command Center
            </h1>
            <p className="text-base text-zinc-500 leading-relaxed mb-6">
              NexPul is a real-time on-chain intelligence platform that combines live market data with AI-powered analysis. Built as a single-page application with eight specialized modules, each backed by a dedicated AI system prompt for domain-specific insights.
            </p>
            <p className="text-base text-zinc-500 leading-relaxed">
              The platform is designed for crypto traders, DeFi participants, and on-chain analysts who need structured intelligence — not just raw data. Every module pairs real-time data ingestion with MiMo v2.5 Pro reasoning to deliver actionable insights.
            </p>
          </div>

          {/* Key Differentiators */}
          <div className="mb-16">
            <h2 className="text-lg font-medium text-zinc-200 mb-6">What makes NexPul different</h2>
            <div className="space-y-4">
              {[
                { icon: Database, title: "Real API Integration", desc: "Live CoinGecko data, not mock data. Prices, volume, market cap, and trending tokens update every 60 seconds with proper error handling and null guards." },
                { icon: Brain, title: "Domain-Specific AI", desc: "Each module has a unique system prompt encoding domain expertise. The whale analyst understands wallet patterns; the gas advisor knows L2 alternatives. Not a generic chatbot." },
                { icon: Zap, title: "Edge Runtime Streaming", desc: "AI responses stream token-by-token via Server-Sent Events on Vercel Edge Runtime. No buffering, no batch delivery — true real-time streaming." },
                { icon: Layers, title: "Zero Sign-Up", desc: "All data is processed client-side or via serverless API routes. Portfolio data stored in localStorage. No accounts, no tracking, no data collection." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <item.icon size={15} className="text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-200 mb-1">{item.title}</h3>
                    <p className="text-[13px] text-zinc-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Modules */}
          <div className="mb-16">
            <h2 className="text-lg font-medium text-zinc-200 mb-6">Module Overview</h2>
            <div className="space-y-3">
              {MODULES.map((mod) => (
                <div key={mod.name} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: mod.accent }} />
                    <h3 className="text-sm font-medium text-zinc-200">{mod.name}</h3>
                  </div>
                  <p className="text-[13px] text-zinc-500 leading-relaxed">{mod.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-16">
            <h2 className="text-lg font-medium text-zinc-200 mb-6">Technical Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {TECH_STACK.map((tech) => (
                <div key={tech.name} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-zinc-200">{tech.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/[0.05] text-zinc-500">{tech.role}</span>
                  </div>
                  <p className="text-[12px] text-zinc-600 leading-relaxed">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Open Source */}
          <div className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-400"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-zinc-200 mb-1">Open Source</h3>
                <p className="text-[13px] text-zinc-500 leading-relaxed mb-3">
                  NexPul is fully open source. The codebase includes all API routes, components, and AI system prompts. Deploy your own instance or contribute to the project.
                </p>
                <a href="https://github.com/XinnBlueBird/nexpul" target="_blank" className="inline-flex items-center gap-1.5 text-[13px] text-amber-400 hover:text-amber-300 transition-colors">
                  View on GitHub <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
