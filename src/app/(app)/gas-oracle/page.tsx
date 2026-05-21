"use client";

import { useState, useEffect } from "react";
import { Fuel, Zap, TrendingDown, TrendingUp, Send, Bot, Clock, ArrowRight } from "lucide-react";
import PageHeader from "@/components/page-header";

interface GasData {
  ethereum: { low: number; avg: number; high: number };
  networks: { name: string; chain: string; low: number; avg: number; high: number; unit: string }[];
  timestamp: number;
}

const CHAIN_COLORS: Record<string, string> = {
  ETH: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  BASE: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  ARB: "text-sky-400 bg-sky-500/10 border-sky-500/20",
  MATIC: "text-violet-400 bg-violet-500/10 border-violet-500/20",
  BSC: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
};

const GAS_TIERS = [
  { label: "Transfer ETH", gasUnits: 21000 },
  { label: "ERC-20 Transfer", gasUnits: 65000 },
  { label: "Uniswap Swap", gasUnits: 150000 },
  { label: "NFT Mint", gasUnits: 200000 },
  { label: "Contract Deploy", gasUnits: 1500000 },
];

export default function GasOraclePage() {
  const [gasData, setGasData] = useState<GasData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedNetwork, setSelectedNetwork] = useState(0);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    const fetchGas = async () => {
      try {
        const res = await fetch("/api/crypto/gas/");
        if (res.ok) setGasData(await res.json());
      } catch {}
      setLoading(false);
    };
    fetchGas();
    const interval = setInterval(fetchGas, 30000);
    return () => clearInterval(interval);
  }, []);

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = { role: "user", content: chatInput };
    setChatMessages((p) => [...p, userMsg]);
    setChatInput("");
    setChatLoading(true);
    try {
      const ctx = gasData ? `Current gas: ETH low=${gasData.ethereum.low} avg=${gasData.ethereum.avg} high=${gasData.ethereum.high} Gwei` : "";
      const res = await fetch("/api/agent/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...chatMessages, userMsg], context: "gas", systemPrompt: `You are NexPul Gas Oracle. ${ctx}` }),
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
          try {
            const j = JSON.parse(d);
            const c = j.choices?.[0]?.delta?.content ?? j.choices?.[0]?.delta?.reasoning_content ?? "";
            if (c) { aiMsg += c; setChatMessages((p) => { const m = [...p]; m[m.length - 1] = { role: "assistant", content: aiMsg }; return m; }); }
          } catch {}
        }
      }
    } catch { setChatMessages((p) => [...p, { role: "assistant", content: "Failed to get response." }]); }
    setChatLoading(false);
  };

  const network = gasData?.networks?.[selectedNetwork];

  return (
    <div>
      <PageHeader icon={Fuel} title="Gas Oracle" subtitle="Multi-chain gas tracking and optimization" />

      {/* Network selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {gasData?.networks?.map((n, i) => (
          <button
            key={n.chain}
            onClick={() => setSelectedNetwork(i)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm whitespace-nowrap transition-colors ${
              selectedNetwork === i
                ? CHAIN_COLORS[n.chain] || "text-amber-400 bg-amber-500/10 border-amber-500/20"
                : "border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700"
            }`}
          >
            <span className="font-medium">{n.name}</span>
          </button>
        ))}
      </div>

      {/* Gas tiers */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden mb-6">
        <div className="px-4 py-3 border-b border-zinc-800/50 flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            {network?.name || "Ethereum"} — Gas Estimates
          </span>
          {gasData?.timestamp && (
            <span className="text-[11px] text-zinc-600 flex items-center gap-1">
              <Clock size={10} /> Updated {new Date(gasData.timestamp).toLocaleTimeString()}
            </span>
          )}
        </div>
        <div className="p-4">
          {loading ? (
            <div className="text-center py-8 text-zinc-600">Loading gas data...</div>
          ) : (
            <>
              {/* Speed tiers */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { label: "Slow", price: network?.low || 0, icon: TrendingDown, color: "text-green-400" },
                  { label: "Standard", price: network?.avg || 0, icon: ArrowRight, color: "text-amber-400" },
                  { label: "Fast", price: network?.high || 0, icon: TrendingUp, color: "text-red-400" },
                ].map((tier) => (
                  <div key={tier.label} className="rounded-lg border border-zinc-800 bg-[#09090b] p-4 text-center">
                    <tier.icon size={16} className={`mx-auto mb-2 ${tier.color}`} />
                    <span className="text-[11px] text-zinc-600 block mb-1">{tier.label}</span>
                    <span className="text-xl font-semibold text-zinc-100 font-mono">{tier.price}</span>
                    <span className="text-xs text-zinc-500 ml-1">{network?.unit || "Gwei"}</span>
                  </div>
                ))}
              </div>

              {/* Operation estimates */}
              <div className="space-y-2">
                <span className="text-xs text-zinc-500 uppercase tracking-wider">Estimated Costs</span>
                {GAS_TIERS.map((tier) => {
                  const costEth = (tier.gasUnits * (network?.avg || 0)) / 1e9;
                  return (
                    <div key={tier.label} className="flex items-center justify-between py-2 border-b border-zinc-800/30 last:border-0">
                      <span className="text-sm text-zinc-300">{tier.label}</span>
                      <div className="text-right">
                        <span className="text-sm font-mono text-zinc-200">{costEth.toFixed(6)} ETH</span>
                        <span className="text-[11px] text-zinc-600 block">{(tier.gasUnits * (network?.avg || 0)).toLocaleString()} gas units</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {/* AI Chat */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-800/50 flex items-center gap-2">
          <Bot size={14} className="text-green-400" />
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Gas Advisor</span>
        </div>
        <div className="p-4">
          {chatMessages.length > 0 && (
            <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <div key={i} className="text-sm">
                  <span className="text-[10px] text-zinc-600 uppercase block mb-0.5">{msg.role === "user" ? "You" : "NexPul AI"}</span>
                  <div className={`whitespace-pre-wrap leading-relaxed ${msg.role === "user" ? "text-zinc-300" : "text-zinc-400"}`}>{msg.content}</div>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2">
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()} placeholder="e.g. 'Best time to swap on Ethereum?'" className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700" />
            <button onClick={sendChat} disabled={chatLoading} className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 transition-colors disabled:opacity-50"><Send size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
