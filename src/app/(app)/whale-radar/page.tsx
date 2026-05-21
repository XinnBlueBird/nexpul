"use client";

import { useState, useEffect } from "react";
import { Radar, Wallet, ArrowUpRight, ArrowDownRight, Search, Send, Bot, ExternalLink } from "lucide-react";
import PageHeader from "@/components/page-header";

const WHALE_DATA = [
  { address: "0drFc...3k9T", label: "Whale #1", balance: "12,450 ETH", value: "$38.2M", change24h: "+5.2%", direction: "accumulating", tokens: ["ETH", "LINK", "ARB"], lastTx: "2h ago", confidence: "HIGH" },
  { address: "0x742d...F2a", label: "Whale #2", balance: "8,200 ETH", value: "$25.2M", change24h: "-3.1%", direction: "distributing", tokens: ["ETH", "UNI", "AAVE"], lastTx: "45m ago", confidence: "HIGH" },
  { address: "0x8b1A...9c3", label: "Whale #3", balance: "5,600 ETH", value: "$17.2M", change24h: "+12.8%", direction: "accumulating", tokens: ["SOL", "JUP", "WIF"], lastTx: "1h ago", confidence: "MEDIUM" },
  { address: "0xcEf2...1dE", label: "Whale #4", balance: "22,100 ETH", value: "$67.8M", change24h: "+1.4%", direction: "holding", tokens: ["ETH", "stETH", "rETH"], lastTx: "6h ago", confidence: "HIGH" },
  { address: "0x4A2b...8f7", label: "Whale #5", balance: "3,800 ETH", value: "$11.7M", change24h: "-8.3%", direction: "distributing", tokens: ["MATIC", "AAVE", "CRV"], lastTx: "30m ago", confidence: "LOW" },
  { address: "0x9F3e...2bA", label: "Whale #6", balance: "15,700 ETH", value: "$48.2M", change24h: "+6.7%", direction: "accumulating", tokens: ["BTC", "ETH", "LINK"], lastTx: "3h ago", confidence: "HIGH" },
];

const CONFIDENCE_COLORS: Record<string, string> = {
  HIGH: "text-green-400 bg-green-500/10 border-green-500/20",
  MEDIUM: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  LOW: "text-red-400 bg-red-500/10 border-red-500/20",
};

const DIR_COLORS: Record<string, string> = {
  accumulating: "text-green-400",
  distributing: "text-red-400",
  holding: "text-zinc-400",
};

export default function WhaleRadarPage() {
  const [search, setSearch] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  const filtered = WHALE_DATA.filter((w) =>
    w.address.toLowerCase().includes(search.toLowerCase()) ||
    w.tokens.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
    w.direction.includes(search.toLowerCase())
  );

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
        body: JSON.stringify({ messages: [...chatMessages, userMsg], context: "whales" }),
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
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const c = json.choices?.[0]?.delta?.content ?? json.choices?.[0]?.delta?.reasoning_content ?? "";
            if (c) { aiMsg += c; setChatMessages((p) => { const m = [...p]; m[m.length - 1] = { role: "assistant", content: aiMsg }; return m; }); }
          } catch {}
        }
      }
    } catch { setChatMessages((p) => [...p, { role: "assistant", content: "Failed to get response." }]); }
    setChatLoading(false);
  };

  return (
    <div>
      <PageHeader icon={Radar} title="Whale Radar" subtitle="Track whale wallets and large transactions" />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Whales Tracked", value: WHALE_DATA.length.toString() },
          { label: "Accumulating", value: WHALE_DATA.filter((w) => w.direction === "accumulating").length.toString() },
          { label: "Distributing", value: WHALE_DATA.filter((w) => w.direction === "distributing").length.toString() },
          { label: "Total Value", value: "$208.3M" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <span className="text-[11px] text-zinc-600 uppercase tracking-wider block mb-1">{s.label}</span>
            <span className="text-xl font-semibold text-zinc-100">{s.value}</span>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by address, token, or direction..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"
        />
      </div>

      {/* Whale list */}
      <div className="space-y-2 mb-6">
        {filtered.map((w) => (
          <div key={w.address} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                  <Wallet size={14} className="text-cyan-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-zinc-200">{w.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${CONFIDENCE_COLORS[w.confidence]}`}>{w.confidence}</span>
                  </div>
                  <span className="text-xs text-zinc-600 font-mono">{w.address}</span>
                </div>
              </div>
              <span className={`text-xs font-medium capitalize ${DIR_COLORS[w.direction]}`}>
                {w.direction === "accumulating" ? <ArrowUpRight size={12} className="inline mr-0.5" /> : w.direction === "distributing" ? <ArrowDownRight size={12} className="inline mr-0.5" /> : null}
                {w.direction}
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
              <div><span className="text-zinc-600 block">Balance</span><span className="text-zinc-300 font-mono">{w.balance}</span></div>
              <div><span className="text-zinc-600 block">Value</span><span className="text-zinc-300 font-mono">{w.value}</span></div>
              <div><span className="text-zinc-600 block">24h Change</span><span className={`font-mono ${w.change24h.startsWith("+") ? "text-green-400" : "text-red-400"}`}>{w.change24h}</span></div>
              <div><span className="text-zinc-600 block">Last Tx</span><span className="text-zinc-400">{w.lastTx}</span></div>
              <div><span className="text-zinc-600 block">Top Tokens</span><span className="text-zinc-400">{w.tokens.join(", ")}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Chat */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-800/50 flex items-center gap-2">
          <Bot size={14} className="text-cyan-400" />
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Whale AI</span>
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
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()} placeholder="Ask about whale activity..." className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700" />
            <button onClick={sendChat} disabled={chatLoading} className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20 transition-colors disabled:opacity-50"><Send size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
