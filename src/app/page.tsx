"use client";

import Link from "next/link";
import {
  LayoutDashboard, Radar, Fuel, Briefcase, Bot,
  Sparkles, Activity, Bell, ArrowRight, Zap, Shield, Globe
} from "lucide-react";

const FEATURES = [
  { href: "/dashboard", label: "Dashboard", desc: "Real-time market overview with live prices, volume, and market cap tracking across top tokens.", icon: LayoutDashboard, color: "amber" },
  { href: "/whale-radar", label: "Whale Radar", desc: "Track whale wallets, large transactions, and accumulation patterns in real-time.", icon: Radar, color: "cyan" },
  { href: "/gas-oracle", label: "Gas Oracle", desc: "Multi-chain gas tracking with optimization recommendations and L2 alternatives.", icon: Fuel, color: "green" },
  { href: "/portfolio", label: "Portfolio", desc: "Track your holdings, analyze allocation, and get rebalancing suggestions.", icon: Briefcase, color: "blue" },
  { href: "/analyst", label: "AI Analyst", desc: "Chat with MiMo v2.5 Pro for deep crypto analysis and market insights.", icon: Bot, color: "violet" },
  { href: "/airdrop-scanner", label: "Airdrop Scanner", desc: "Discover upcoming airdrops, check eligibility, and optimize farming strategies.", icon: Sparkles, color: "pink" },
  { href: "/sentiment", label: "Sentiment", desc: "Social sentiment analysis combining Twitter trends, Fear & Greed Index, and on-chain signals.", icon: Activity, color: "orange" },
  { href: "/alerts", label: "Alerts", desc: "Smart alerts for price targets, whale movements, gas spikes, and volume anomalies.", icon: Bell, color: "red" },
];

const ACCENT: Record<string, string> = {
  amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  green: "text-green-400 bg-green-500/10 border-green-500/20",
  blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  violet: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  pink: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  red: "text-red-400 bg-red-500/10 border-red-500/20",
};

const STATS = [
  { label: "AI Model", value: "MiMo v2.5 Pro" },
  { label: "Chains", value: "6+" },
  { label: "Modules", value: "8" },
  { label: "Refresh", value: "60s" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090b]">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <span className="text-amber-400 font-bold text-xs">N</span>
            </div>
            <span className="font-semibold text-sm text-zinc-100">NexPul</span>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-1.5 rounded-lg bg-amber-500 text-black text-sm font-medium hover:bg-amber-400 transition-colors"
          >
            Launch App
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-500 mb-6 animate-fade-in">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Powered by MiMo v2.5 Pro
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-100 mb-6 animate-fade-in stagger-1">
            On-chain intelligence,
            <br />
            <span className="text-amber-400">real-time</span>
          </h1>

          <p className="text-lg text-zinc-500 max-w-2xl mx-auto mb-10 animate-fade-in stagger-2">
            Eight integrated modules for crypto market analysis. Whale tracking, gas optimization, portfolio analytics, and AI-powered insights — all in one command center.
          </p>

          <div className="flex items-center justify-center gap-3 animate-fade-in stagger-3">
            <Link
              href="/dashboard"
              className="px-6 py-2.5 rounded-lg bg-amber-500 text-black text-sm font-medium hover:bg-amber-400 transition-colors flex items-center gap-2"
            >
              Open Dashboard <ArrowRight size={16} />
            </Link>
            <a
              href="#features"
              className="px-6 py-2.5 rounded-lg border border-zinc-800 text-sm text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors"
            >
              Explore Modules
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800/50 rounded-xl overflow-hidden">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-[#09090b] p-6 text-center">
                <div className="text-xl font-semibold text-zinc-100 mb-1">{stat.value}</div>
                <div className="text-xs text-zinc-600 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section id="features" className="pb-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-2">Eight modules. One platform.</h2>
            <p className="text-sm text-zinc-500">Everything you need for on-chain intelligence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800/50 rounded-xl overflow-hidden">
            {FEATURES.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="bg-[#09090b] p-5 hover:bg-zinc-900/50 transition-colors group"
              >
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center mb-3 ${ACCENT[f.color]}`}>
                  <f.icon size={15} />
                </div>
                <h3 className="text-sm font-medium text-zinc-200 mb-1 group-hover:text-zinc-100 transition-colors">{f.label}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Real-time", desc: "60-second data refresh across all modules. Live prices, gas, and whale tracking." },
              { icon: Shield, title: "AI-Powered", desc: "MiMo v2.5 Pro reasoning model for deep analysis, not just data display." },
              { icon: Globe, title: "Multi-chain", desc: "Ethereum, Base, Arbitrum, Polygon, BSC, and Solana coverage." },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-xl border border-zinc-800 bg-zinc-950">
                <item.icon size={18} className="text-amber-400 mb-3" />
                <h3 className="text-sm font-medium text-zinc-200 mb-1">{item.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-8 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <span className="text-amber-400 font-bold text-[9px]">N</span>
            </div>
            <span className="text-xs text-zinc-600">NexPul</span>
          </div>
          <span className="text-[11px] text-zinc-700">Built with MiMo v2.5 Pro</span>
        </div>
      </footer>
    </div>
  );
}
