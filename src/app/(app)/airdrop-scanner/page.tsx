"use client";

import { useState } from "react";
import { Sparkles, ExternalLink, Clock, Shield, TrendingUp, Send, Bot, ChevronRight, AlertTriangle } from "lucide-react";
import PageHeader from "@/components/page-header";

const AIRDROPS = [
  { id: "1", project: "LayerZero", token: "ZRO", status: "Upcoming", eligibility: "Bridge users", estimated: "$500-2000", deadline: "Q2 2026", risk: "LOW", tvl: "$12.4B", steps: ["Bridge assets via Stargate", "Use at least 3 dApps on LayerZero", "Maintain activity for 30+ days"], color: "blue" },
  { id: "2", project: "EigenLayer", token: "EIGEN", status: "Active", eligibility: "Restakers", estimated: "$1000-5000", deadline: "Ongoing", risk: "LOW", tvl: "$8.2B", steps: ["Restake ETH/LSTs", "Delegate to operators", "Participate in AVS"], color: "violet" },
  { id: "3", project: "zkSync", token: "ZK", status: "Upcoming", eligibility: "Testnet + Mainnet users", estimated: "$200-800", deadline: "Q2 2026", risk: "MEDIUM", tvl: "$3.1B", steps: ["Bridge to zkSync Era", "Swap on native DEXs", "Provide liquidity", "Use at least 5 protocols"], color: "cyan" },
  { id: "4", project: "Starknet", token: "STRK", status: "Active", eligibility: "Stakers + Users", estimated: "$300-1200", deadline: "Ongoing", risk: "LOW", tvl: "$2.8B", steps: ["Bridge to Starknet", "Stake STRK", "Use DeFi protocols"], color: "orange" },
  { id: "5", project: "Scroll", token: "SCR", status: "Upcoming", eligibility: "Bridge users", estimated: "$150-600", deadline: "Q3 2026", risk: "MEDIUM", tvl: "$1.5B", steps: ["Bridge ETH to Scroll", "Use native DEXs", "Provide liquidity", "Mint NFTs"], color: "amber" },
  { id: "6", project: "Berachain", token: "BERA", status: "Confirmed", eligibility: "Testnet users", estimated: "$800-3000", deadline: "Q1 2026", risk: "LOW", tvl: "$5.6B", steps: ["Use Bartio testnet", "Provide liquidity", "Stake BGT", "Participate in governance"], color: "pink" },
];

const RISK_COLORS: Record<string, string> = {
  LOW: "text-green-400 bg-green-500/10 border-green-500/20",
  MEDIUM: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  HIGH: "text-red-400 bg-red-500/10 border-red-500/20",
};

const STATUS_COLORS: Record<string, string> = {
  Active: "text-green-400",
  Upcoming: "text-amber-400",
  Confirmed: "text-blue-400",
};

export default function AirdropScannerPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  const filtered = AIRDROPS.filter((a) => filter === "all" || a.status.toLowerCase() === filter);

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = { role: "user", content: chatInput };
    setChatMessages((p) => [...p, userMsg]);
    setChatInput("");
    setChatLoading(true);
    try {
      const res = await fetch("/api/agent/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...chatMessages, userMsg], context: "airdrops" }),
      });
      if (!res.ok) throw new Error("API error");
      const reader = res.body?.getReader();
      if (!reader) return;
      const decoder = new TextDecoder();
      let aiMsg = "";
      setChatMessages((p) => [...p, { role: "assistant", content: "" }]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const d = line.slice(6).trim();
          if (d === "[DONE]") continue;
          try { const j = JSON.parse(d); const c = j.choices?.[0]?.delta?.content ?? j.choices?.[0]?.delta?.reasoning_content ?? ""; if (c) { aiMsg += c; setChatMessages((p) => { const m = [...p]; m[m.length - 1] = { role: "assistant", content: aiMsg }; return m; }); }
          } catch {}
        }
      }
    } catch { setChatMessages((p) => [...p, { role: "assistant", content: "Failed." }]); }
    setChatLoading(false);
  };

  return (
    <div>
      <PageHeader icon={Sparkles} title="Airdrop Scanner" subtitle="Discover and track upcoming airdrops" />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Tracked", value: AIRDROPS.length.toString() },
          { label: "Active", value: AIRDROPS.filter((a) => a.status === "Active").length.toString() },
          { label: "Avg Reward", value: "$800" },
          { label: "Low Risk", value: AIRDROPS.filter((a) => a.risk === "LOW").length.toString() },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <span className="text-[11px] text-zinc-600 uppercase tracking-wider block mb-1">{s.label}</span>
            <span className="text-xl font-semibold text-zinc-100">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {["all", "active", "upcoming", "confirmed"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === f ? "bg-amber-500/10 border border-amber-500/20 text-amber-400" : "border border-zinc-800 text-zinc-500 hover:text-zinc-300"}`}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Airdrop list */}
      <div className="space-y-2 mb-6">
        {filtered.map((a) => (
          <div key={a.id} className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
            <button onClick={() => setExpanded(expanded === a.id ? null : a.id)} className="w-full p-4 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
                  <Sparkles size={14} className="text-pink-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-zinc-200">{a.project}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500 font-mono">{a.token}</span>
                    <span className={`text-[11px] font-medium ${STATUS_COLORS[a.status]}`}>{a.status}</span>
                  </div>
                  <span className="text-xs text-zinc-600">{a.eligibility} | Est. {a.estimated} | TVL {a.tvl}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] px-1.5 py-0.5 rounded border ${RISK_COLORS[a.risk]}`}>{a.risk}</span>
                <ChevronRight size={14} className={`text-zinc-600 transition-transform ${expanded === a.id ? "rotate-90" : ""}`} />
              </div>
            </button>
            {expanded === a.id && (
              <div className="px-4 pb-4 border-t border-zinc-800/50 pt-4 animate-fade-in">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-xs">
                  <div><span className="text-zinc-600 block">Status</span><span className={STATUS_COLORS[a.status]}>{a.status}</span></div>
                  <div><span className="text-zinc-600 block">Deadline</span><span className="text-zinc-300">{a.deadline}</span></div>
                  <div><span className="text-zinc-600 block">Est. Reward</span><span className="text-zinc-300">{a.estimated}</span></div>
                  <div><span className="text-zinc-600 block">Risk Level</span><span className={RISK_COLORS[a.risk].split(" ")[0]}>{a.risk}</span></div>
                </div>
                <div>
                  <span className="text-xs text-zinc-500 uppercase tracking-wider block mb-2">Farming Steps</span>
                  <ol className="space-y-1.5">
                    {a.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                        <span className="text-[11px] text-zinc-600 font-mono mt-0.5">{i + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AI Chat */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-800/50 flex items-center gap-2"><Bot size={14} className="text-pink-400" /><span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Airdrop Advisor</span></div>
        <div className="p-4">
          {chatMessages.length > 0 && <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">{chatMessages.map((msg, i) => <div key={i} className="text-sm"><span className="text-[10px] text-zinc-600 uppercase block mb-0.5">{msg.role === "user" ? "You" : "NexPul AI"}</span><div className={`whitespace-pre-wrap leading-relaxed ${msg.role === "user" ? "text-zinc-300" : "text-zinc-400"}`}>{msg.content}</div></div>)}</div>}
          <div className="flex items-center gap-2">
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()} placeholder="e.g. 'Which airdrop has the best risk/reward ratio?'" className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700" />
            <button onClick={sendChat} disabled={chatLoading} className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 hover:bg-pink-500/20 transition-colors disabled:opacity-50"><Send size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
