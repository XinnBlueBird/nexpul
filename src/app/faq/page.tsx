"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";

const FAQS = [
  { q: "What is NexPul?", a: "A real-time on-chain intelligence platform with eight AI-powered modules for crypto market analysis — whale tracking, gas optimization, portfolio analytics, sentiment analysis, and more." },
  { q: "Is it free?", a: "Yes. No sign-up, no paywall, no data collection. Open the dashboard and start using all modules immediately." },
  { q: "Where does the data come from?", a: "Market data from CoinGecko API (prices, volume, market cap). Gas data from Etherscan. AI analysis from MiMo v2.5 Pro. All data refreshes automatically." },
  { q: "What AI model does it use?", a: "MiMo v2.5 Pro, Xiaomi's reasoning model, via the Token Plan API. Each module has a dedicated system prompt encoding domain expertise." },
  { q: "Is the AI analysis financial advice?", a: "No. The AI provides analytical commentary, not financial advice. Always do your own research before making investment decisions." },
  { q: "Can the AI execute trades?", a: "No. NexPul is read-only. It analyzes data and provides insights but cannot execute transactions, connect to wallets, or modify your portfolio." },
  { q: "Is my data private?", a: "Yes. Portfolio data is stored in browser localStorage and never sent to any server. AI chat conversations are proxied but not logged or stored." },
  { q: "Can I self-host?", a: "Yes. Clone the GitHub repo, add your MiMo API key to .env.local, and deploy to any platform that supports Next.js (Vercel, Docker, VPS)." },
  { q: "How often does data refresh?", a: "Market prices every 60 seconds. Gas prices every 30 seconds. AI responses stream in real-time via Server-Sent Events." },
  { q: "What can I ask the AI?", a: "Anything crypto-related: market analysis, DeFi strategies, tokenomics, technical analysis, on-chain data, gas optimization, airdrop eligibility, sentiment analysis." },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

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

          <h1 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-3">Frequently Asked Questions</h1>
          <p className="text-zinc-500 mb-10">Everything you need to know about NexPul.</p>

          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-medium text-zinc-200">{faq.q}</span>
                  <ChevronDown size={16} className={`text-zinc-600 transition-transform flex-shrink-0 ml-4 ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-zinc-500 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-zinc-500 mb-4">Still have questions?</p>
            <Link href="/dashboard" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-black text-sm font-medium hover:bg-amber-400 transition-colors">
              Try NexPul <ArrowLeft size={14} className="rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
