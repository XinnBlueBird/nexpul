"use client";

import { useState, useEffect, useCallback } from "react";
import {
  LayoutDashboard, TrendingUp, TrendingDown, RefreshCw,
  BarChart3, Globe, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Bot, Send
} from "lucide-react";
import PageHeader from "@/components/page-header";

interface Token {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_7d_in_currency?: number;
  market_cap_rank: number;
  image: string;
}

function fmt(n: number | null | undefined, decimals = 2): string {
  if (n == null) return "--";
  if (Math.abs(n) >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (Math.abs(n) >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  if (Math.abs(n) >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(decimals)}`;
}

function fmtPrice(n: number | null | undefined): string {
  if (n == null) return "--";
  if (n >= 1000) return `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (n >= 1) return `$${n.toFixed(2)}`;
  if (n >= 0.01) return `$${n.toFixed(4)}`;
  return `$${n.toFixed(6)}`;
}

export default function DashboardPage() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // AI chat
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  const fetchPrices = useCallback(async () => {
    try {
      const res = await fetch("/api/crypto/prices/");
      if (res.ok) {
        const data = await res.json();
        setTokens(data);
        setLastUpdate(new Date());
      }
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  const totalMcap = tokens.reduce((sum, t) => sum + (t.market_cap || 0), 0);
  const totalVol = tokens.reduce((sum, t) => sum + (t.total_volume || 0), 0);
  const avgChange = tokens.length
    ? tokens.reduce((sum, t) => sum + (t.price_change_percentage_24h || 0), 0) / tokens.length
    : 0;
  const gainers = tokens.filter((t) => (t.price_change_percentage_24h || 0) > 0).length;

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = { role: "user", content: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput("");
    setChatLoading(true);

    try {
      const marketContext = tokens.slice(0, 5).map((t) =>
        `${t.name} (${t.symbol.toUpperCase()}): $${t.current_price}, 24h: ${t.price_change_percentage_24h?.toFixed(1)}%`
      ).join("\n");

      const res = await fetch("/api/agent/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg],
          context: "dashboard",
          systemPrompt: `You are NexPul AI dashboard assistant. Current market data:\n${marketContext}\n\nBe concise. Use bullet points.`,
        }),
      });

      if (!res.ok) throw new Error("API error");
      const reader = res.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      let aiMsg = "";
      setChatMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") continue;
          try {
            const json = JSON.parse(data);
            const content = json.choices?.[0]?.delta?.content ?? json.choices?.[0]?.delta?.reasoning_content ?? "";
            if (content) {
              aiMsg += content;
              setChatMessages((prev) => {
                const msgs = [...prev];
                msgs[msgs.length - 1] = { role: "assistant", content: aiMsg };
                return msgs;
              });
            }
          } catch {}
        }
      }
    } catch {
      setChatMessages((prev) => [...prev, { role: "assistant", content: "Failed to get response." }]);
    }
    setChatLoading(false);
  };

  return (
    <div>
      <PageHeader
        icon={LayoutDashboard}
        title="Dashboard"
        subtitle="Real-time crypto market overview"
        action={
          <button onClick={fetchPrices} className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
            <RefreshCw size={12} className={loading ? "animate-spin" : ""} />
            {lastUpdate ? lastUpdate.toLocaleTimeString() : "Loading..."}
          </button>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Market Cap", value: fmt(totalMcap), icon: Globe, color: "text-amber-400" },
          { label: "24h Volume", value: fmt(totalVol), icon: BarChart3, color: "text-cyan-400" },
          { label: "Avg 24h Change", value: `${avgChange >= 0 ? "+" : ""}${avgChange.toFixed(2)}%`, icon: avgChange >= 0 ? TrendingUp : TrendingDown, color: avgChange >= 0 ? "text-green-400" : "text-red-400" },
          { label: "Gainers", value: `${gainers}/${tokens.length}`, icon: Activity, color: "text-violet-400" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon size={14} className={stat.color} />
              <span className="text-[11px] text-zinc-600 uppercase tracking-wider">{stat.label}</span>
            </div>
            <div className="text-xl font-semibold text-zinc-100">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Token table */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden mb-6">
        <div className="px-4 py-3 border-b border-zinc-800/50">
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Top Tokens</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[11px] text-zinc-600 uppercase tracking-wider">
                <th className="text-left px-4 py-3 font-medium">#</th>
                <th className="text-left px-4 py-3 font-medium">Token</th>
                <th className="text-right px-4 py-3 font-medium">Price</th>
                <th className="text-right px-4 py-3 font-medium">1h</th>
                <th className="text-right px-4 py-3 font-medium">24h</th>
                <th className="text-right px-4 py-3 font-medium">7d</th>
                <th className="text-right px-4 py-3 font-medium">Volume</th>
                <th className="text-right px-4 py-3 font-medium">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-zinc-600">Loading market data...</td>
                </tr>
              ) : tokens.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-zinc-600">No data available</td>
                </tr>
              ) : (
                tokens.map((t) => {
                  const h1 = t.price_change_percentage_1h_in_currency;
                  const h24 = t.price_change_percentage_24h;
                  const d7 = t.price_change_percentage_7d_in_currency;
                  return (
                    <tr key={t.id} className="border-t border-zinc-800/30 hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 text-zinc-600">{t.market_cap_rank}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <img src={t.image} alt={t.name} width={20} height={20} className="rounded-full" />
                          <div>
                            <span className="text-zinc-200 font-medium">{t.name}</span>
                            <span className="ml-1.5 text-[11px] text-zinc-600 uppercase">{t.symbol}</span>
                          </div>
                        </div>
                      </td>
                      <td className="text-right px-4 py-3 text-zinc-200 font-mono">{fmtPrice(t.current_price)}</td>
                      <td className="text-right px-4 py-3">
                        <ChangeCell value={h1} />
                      </td>
                      <td className="text-right px-4 py-3">
                        <ChangeCell value={h24} />
                      </td>
                      <td className="text-right px-4 py-3">
                        <ChangeCell value={d7} />
                      </td>
                      <td className="text-right px-4 py-3 text-zinc-400 font-mono">{fmt(t.total_volume)}</td>
                      <td className="text-right px-4 py-3 text-zinc-400 font-mono">{fmt(t.market_cap)}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Quick Analysis */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-800/50 flex items-center gap-2">
          <Bot size={14} className="text-amber-400" />
          <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">AI Market Analysis</span>
        </div>
        <div className="p-4">
          {chatMessages.length > 0 && (
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`text-sm ${msg.role === "user" ? "text-zinc-300" : "text-zinc-400"}`}>
                  <span className="text-[11px] text-zinc-600 uppercase block mb-1">{msg.role === "user" ? "You" : "NexPul AI"}</span>
                  <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-center gap-2">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendChat()}
              placeholder="Ask about the market... e.g. 'Which tokens are outperforming?'"
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"
            />
            <button
              onClick={sendChat}
              disabled={chatLoading}
              className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-colors disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChangeCell({ value }: { value?: number | null }) {
  if (value == null) return <span className="text-zinc-600">--</span>;
  const positive = value >= 0;
  return (
    <span className={`inline-flex items-center gap-0.5 font-mono text-xs ${positive ? "text-green-400" : "text-red-400"}`}>
      {positive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
      {Math.abs(value).toFixed(2)}%
    </span>
  );
}
