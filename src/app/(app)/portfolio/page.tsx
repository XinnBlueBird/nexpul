"use client";

import { useState } from "react";
import { Briefcase, Plus, Trash2, TrendingUp, TrendingDown, Send, Bot, PieChart, DollarSign } from "lucide-react";
import PageHeader from "@/components/page-header";

interface Holding {
  id: string;
  token: string;
  symbol: string;
  amount: number;
  avgBuy: number;
  currentPrice: number;
  color: string;
}

const INITIAL_HOLDINGS: Holding[] = [
  { id: "1", token: "Ethereum", symbol: "ETH", amount: 5.2, avgBuy: 2800, currentPrice: 3070, color: "#3b82f6" },
  { id: "2", token: "Solana", symbol: "SOL", amount: 120, avgBuy: 145, currentPrice: 172, color: "#8b5cf6" },
  { id: "3", token: "Bitcoin", symbol: "BTC", amount: 0.15, avgBuy: 62000, currentPrice: 103500, color: "#f59e0b" },
  { id: "4", token: "Chainlink", symbol: "LINK", amount: 200, avgBuy: 12.5, currentPrice: 16.8, color: "#06b6d4" },
];

function fmt(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function PortfolioPage() {
  const [holdings, setHoldings] = useState<Holding[]>(INITIAL_HOLDINGS);
  const [showAdd, setShowAdd] = useState(false);
  const [newToken, setNewToken] = useState({ token: "", symbol: "", amount: "", avgBuy: "", currentPrice: "" });
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  const totalValue = holdings.reduce((sum, h) => sum + h.amount * h.currentPrice, 0);
  const totalCost = holdings.reduce((sum, h) => sum + h.amount * h.avgBuy, 0);
  const totalPnl = totalValue - totalCost;
  const totalPnlPct = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0;

  const addHolding = () => {
    if (!newToken.token || !newToken.amount) return;
    const colors = ["#ef4444", "#10b981", "#f97316", "#ec4899", "#14b8a6"];
    setHoldings((p) => [
      ...p,
      {
        id: Date.now().toString(),
        token: newToken.token,
        symbol: newToken.symbol.toUpperCase(),
        amount: parseFloat(newToken.amount),
        avgBuy: parseFloat(newToken.avgBuy) || 0,
        currentPrice: parseFloat(newToken.currentPrice) || 0,
        color: colors[p.length % colors.length],
      },
    ]);
    setNewToken({ token: "", symbol: "", amount: "", avgBuy: "", currentPrice: "" });
    setShowAdd(false);
  };

  const removeHolding = (id: string) => setHoldings((p) => p.filter((h) => h.id !== id));

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = { role: "user", content: chatInput };
    setChatMessages((p) => [...p, userMsg]);
    setChatInput("");
    setChatLoading(true);
    try {
      const ctx = holdings.map((h) => `${h.token} (${h.symbol}): ${h.amount} units, avg buy $${h.avgBuy}, current $${h.currentPrice}, PnL $${fmt(h.amount * (h.currentPrice - h.avgBuy))}`).join("\n");
      const res = await fetch("/api/agent/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...chatMessages, userMsg], context: "portfolio", systemPrompt: `You are NexPul Portfolio Advisor. Current holdings:\n${ctx}\nTotal value: $${fmt(totalValue)}, PnL: $${fmt(totalPnl)} (${totalPnlPct.toFixed(1)}%)` }),
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
          try { const j = JSON.parse(d); const c = j.choices?.[0]?.delta?.content ?? j.choices?.[0]?.delta?.reasoning_content ?? ""; if (c) { aiMsg += c; setChatMessages((p) => { const m = [...p]; m[m.length - 1] = { role: "assistant", content: aiMsg }; return m; }); } } catch {}
        }
      }
    } catch { setChatMessages((p) => [...p, { role: "assistant", content: "Failed." }]); }
    setChatLoading(false);
  };

  return (
    <div>
      <PageHeader icon={Briefcase} title="Portfolio" subtitle="Track holdings and analyze allocation" action={<button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-colors"><Plus size={12} /> Add</button>} />

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Value", value: `$${fmt(totalValue)}`, icon: DollarSign, color: "text-amber-400" },
          { label: "Total Cost", value: `$${fmt(totalCost)}`, icon: PieChart, color: "text-blue-400" },
          { label: "P&L", value: `${totalPnl >= 0 ? "+" : ""}$${fmt(totalPnl)}`, icon: totalPnl >= 0 ? TrendingUp : TrendingDown, color: totalPnl >= 0 ? "text-green-400" : "text-red-400" },
          { label: "P&L %", value: `${totalPnlPct >= 0 ? "+" : ""}${totalPnlPct.toFixed(2)}%`, icon: totalPnlPct >= 0 ? TrendingUp : TrendingDown, color: totalPnlPct >= 0 ? "text-green-400" : "text-red-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center gap-2 mb-2"><s.icon size={14} className={s.color} /><span className="text-[11px] text-zinc-600 uppercase tracking-wider">{s.label}</span></div>
            <div className="text-xl font-semibold text-zinc-100">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 mb-6 animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[{ k: "token", p: "Token name" }, { k: "symbol", p: "Symbol" }, { k: "amount", p: "Amount" }, { k: "avgBuy", p: "Avg buy price" }, { k: "currentPrice", p: "Current price" }].map((f) => (
              <input key={f.k} value={(newToken as any)[f.k]} onChange={(e) => setNewToken((p) => ({ ...p, [f.k]: e.target.value }))} placeholder={f.p} className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700" />
            ))}
          </div>
          <button onClick={addHolding} className="mt-3 px-4 py-1.5 rounded-lg bg-amber-500 text-black text-sm font-medium hover:bg-amber-400 transition-colors">Add Holding</button>
        </div>
      )}

      {/* Holdings */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden mb-6">
        <div className="px-4 py-3 border-b border-zinc-800/50"><span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Holdings</span></div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="text-[11px] text-zinc-600 uppercase tracking-wider"><th className="text-left px-4 py-3 font-medium">Token</th><th className="text-right px-4 py-3 font-medium">Amount</th><th className="text-right px-4 py-3 font-medium">Avg Buy</th><th className="text-right px-4 py-3 font-medium">Current</th><th className="text-right px-4 py-3 font-medium">Value</th><th className="text-right px-4 py-3 font-medium">P&L</th><th className="text-right px-4 py-3 font-medium"></th></tr></thead>
            <tbody>
              {holdings.map((h) => {
                const value = h.amount * h.currentPrice;
                const pnl = h.amount * (h.currentPrice - h.avgBuy);
                const pnlPct = h.avgBuy > 0 ? ((h.currentPrice - h.avgBuy) / h.avgBuy) * 100 : 0;
                return (
                  <tr key={h.id} className="border-t border-zinc-800/30 hover:bg-white/[0.02]">
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ background: h.color }} /><span className="text-zinc-200 font-medium">{h.token}</span><span className="text-[11px] text-zinc-600 uppercase">{h.symbol}</span></div></td>
                    <td className="text-right px-4 py-3 text-zinc-300 font-mono">{h.amount}</td>
                    <td className="text-right px-4 py-3 text-zinc-400 font-mono">${fmt(h.avgBuy)}</td>
                    <td className="text-right px-4 py-3 text-zinc-200 font-mono">${fmt(h.currentPrice)}</td>
                    <td className="text-right px-4 py-3 text-zinc-200 font-mono">${fmt(value)}</td>
                    <td className="text-right px-4 py-3"><span className={`font-mono text-xs ${pnl >= 0 ? "text-green-400" : "text-red-400"}`}>{pnl >= 0 ? "+" : ""}${fmt(pnl)} ({pnlPct >= 0 ? "+" : ""}{pnlPct.toFixed(1)}%)</span></td>
                    <td className="text-right px-4 py-3"><button onClick={() => removeHolding(h.id)} className="text-zinc-600 hover:text-red-400 transition-colors"><Trash2 size={14} /></button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Chat */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-800/50 flex items-center gap-2"><Bot size={14} className="text-blue-400" /><span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Portfolio Advisor</span></div>
        <div className="p-4">
          {chatMessages.length > 0 && <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">{chatMessages.map((msg, i) => <div key={i} className="text-sm"><span className="text-[10px] text-zinc-600 uppercase block mb-0.5">{msg.role === "user" ? "You" : "NexPul AI"}</span><div className={`whitespace-pre-wrap leading-relaxed ${msg.role === "user" ? "text-zinc-300" : "text-zinc-400"}`}>{msg.content}</div></div>)}</div>}
          <div className="flex items-center gap-2">
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()} placeholder="e.g. 'Should I rebalance my portfolio?'" className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700" />
            <button onClick={sendChat} disabled={chatLoading} className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-colors disabled:opacity-50"><Send size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
