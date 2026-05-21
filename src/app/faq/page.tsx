"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, ArrowRight } from "lucide-react";

const FAQS = [
  {
    category: "General",
    items: [
      {
        q: "What is NexPul?",
        a: "NexPul is an AI-powered crypto command center that provides real-time on-chain intelligence through eight specialized modules. It combines live market data from CoinGecko with AI analysis powered by MiMo v2.5 Pro to deliver structured, actionable insights — not just raw data.",
      },
      {
        q: "Is NexPul free to use?",
        a: "Yes. NexPul has no sign-up, no paywall, and no data collection. All features are accessible immediately. Portfolio data is stored locally in your browser via localStorage.",
      },
      {
        q: "Do I need to create an account?",
        a: "No. NexPul is entirely account-less. Open the dashboard and start using all modules immediately. Your portfolio data persists in your browser until you clear it.",
      },
      {
        q: "Is NexPul open source?",
        a: "Yes. The full source code is available on GitHub at XinnBlueBird/nexpul. You can deploy your own instance, contribute features, or audit the codebase.",
      },
    ],
  },
  {
    category: "Data & Accuracy",
    items: [
      {
        q: "Where does the market data come from?",
        a: "All market data (prices, volume, market cap, trending tokens) comes from the CoinGecko public API. Data refreshes every 60 seconds on the dashboard. We use null guards and error handling for tokens with missing data fields.",
      },
      {
        q: "Is the AI analysis financial advice?",
        a: "No. NexPul AI provides analytical commentary, not financial advice. The AI is designed to present both bull and bear cases, flag risks, and provide data context. Always do your own research before making investment decisions.",
      },
      {
        q: "How accurate is the whale tracking?",
        a: "Whale data is currently based on curated wallet profiles with confidence ratings (HIGH/MEDIUM/LOW) based on historical patterns. Each whale entry shows balance, recent direction, top tokens, and last transaction time.",
      },
      {
        q: "How often does the gas data update?",
        a: "Gas prices refresh every 30 seconds. We track Ethereum gas via Etherscan's gas oracle API. Other chains (Base, Arbitrum, Polygon, BSC) show estimated ranges. Cost estimates are calculated per-operation using gas unit multipliers.",
      },
    ],
  },
  {
    category: "AI Features",
    items: [
      {
        q: "What AI model does NexPul use?",
        a: "NexPul uses MiMo v2.5 Pro, Xiaomi's reasoning model, accessed via the Token Plan API. The model runs on edge runtime for low-latency streaming — responses arrive token-by-token, not in batches.",
      },
      {
        q: "How does the AI context work?",
        a: "Each module has a dedicated system prompt encoding domain expertise. For example, the Dashboard AI knows current market data, the Whale Radar AI understands wallet patterns, and the Gas Advisor knows L2 alternatives. The AI receives relevant context with each query.",
      },
      {
        q: "Can the AI execute trades or transactions?",
        a: "No. NexPul AI is read-only — it analyzes data and provides insights but cannot execute any on-chain transactions, connect to wallets, or modify your portfolio. Your funds are never at risk from the AI.",
      },
      {
        q: "What can I ask the AI Analyst?",
        a: "Anything crypto-related: market analysis, DeFi strategies, tokenomics breakdowns, technical analysis, on-chain data interpretation, gas optimization tips, airdrop eligibility, and sentiment analysis. The AI provides balanced views with both bull and bear cases.",
      },
    ],
  },
  {
    category: "Technical",
    items: [
      {
        q: "What is the tech stack?",
        a: "Next.js 16 with React 19, TypeScript, Tailwind CSS v4, and Lucide icons. API routes run on Vercel Edge Runtime with SSE streaming. Market data from CoinGecko, AI from MiMo v2.5 Pro Token Plan API.",
      },
      {
        q: "How does the streaming work?",
        a: "AI responses use Server-Sent Events (SSE) over Vercel Edge Runtime. The API route proxies to MiMo's streaming endpoint and forwards chunks in real-time. The client parses each SSE data event and renders tokens as they arrive.",
      },
      {
        q: "Is my data private?",
        a: "Yes. NexPul collects zero user data. Portfolio holdings are stored in your browser's localStorage and never sent to any server. AI chat conversations are proxied through our API route but not logged or stored.",
      },
      {
        q: "Can I self-host NexPul?",
        a: "Yes. Clone the GitHub repo, add your MiMo API key to .env.local, and deploy to any platform that supports Next.js (Vercel, Netlify, Docker, VPS). The only external dependency is the MiMo API key.",
      },
    ],
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>(null);

  const toggle = (id: string) => setOpen(open === id ? null : id);

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
          <div className="mb-12">
            <div className="text-[11px] font-medium text-amber-400 uppercase tracking-wider mb-3">FAQ</div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100 mb-3">
              Frequently Asked Questions
            </h1>
            <p className="text-zinc-500">Everything you need to know about NexPul — the AI crypto command center.</p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-10">
            {FAQS.map((category) => (
              <div key={category.category}>
                <h2 className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-4 pb-3 border-b border-white/[0.06]">{category.category}</h2>
                <div className="space-y-1">
                  {category.items.map((item) => {
                    const id = `${category.category}-${item.q}`;
                    const isOpen = open === id;
                    return (
                      <div key={id} className="border-b border-white/[0.04] last:border-0">
                        <button
                          onClick={() => toggle(id)}
                          className="w-full flex items-center justify-between py-4 text-left group"
                        >
                          <span className={`text-[14px] font-medium transition-colors ${isOpen ? "text-zinc-100" : "text-zinc-300 group-hover:text-zinc-100"}`}>
                            {item.q}
                          </span>
                          <ChevronDown size={16} className={`text-zinc-600 transition-transform flex-shrink-0 ml-4 ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isOpen && (
                          <div className="pb-4 pr-8 animate-fade-in">
                            <p className="text-[13px] text-zinc-500 leading-relaxed">{item.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 pt-10 border-t border-white/[0.06] text-center">
            <p className="text-sm text-zinc-500 mb-4">Still have questions?</p>
            <div className="flex items-center justify-center gap-3">
              <a href="https://github.com/XinnBlueBird/nexpul/issues" target="_blank" className="px-4 py-2 rounded-lg border border-white/[0.08] bg-white/[0.02] text-[13px] text-zinc-400 hover:text-zinc-200 hover:border-white/[0.15] transition-colors">
                Open GitHub Issue
              </a>
              <Link href="/dashboard" className="px-4 py-2 rounded-lg bg-amber-500 text-black text-[13px] font-medium hover:bg-amber-400 transition-colors flex items-center gap-1.5">
                Try NexPul <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
