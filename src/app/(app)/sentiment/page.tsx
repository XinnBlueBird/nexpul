"use client";

import { useState } from "react";
import { Activity, TrendingUp, TrendingDown, Send, Bot, Gauge, MessageSquare, Search, Globe } from "lucide-react";
import PageHeader from "@/components/page-header";

const SENTIMENT_DATA = {
  fearGreedIndex: 65,
  fearGreedLabel: "Greed",
  btcDominance: 54.2,
  socialVolume: 142000,
  trendingTopics: ["Bitcoin", "Ethereum", "Solana", "AI coins", "Memecoins", "RWA"],
  sentimentByToken: [
    { token: "Bitcoin", symbol: "BTC", sentiment: 72, change24h: 5, mentions: 45000, trend: "bullish" },
    { token: "Ethereum", symbol: "ETH", sentiment: 68, change24h: 3, mentions: 32000, trend: "bullish" },
    { token: "Solana", symbol: "SOL", sentiment: 75, change24h: 8, mentions: 28000, trend: "bullish" },
    { token: "Chainlink", symbol: "LINK", sentiment: 55, change24h: -2, mentions: 8000, trend: "neutral" },
    { token: "Cardano", symbol: "ADA", sentiment: 42, change24h: -5, mentions: 12000, trend: "bearish" },
    { token: "Avalanche", symbol: "AVAX", sentiment: 60, change24h: 1, mentions: 6000, trend: "neutral" },
  ],
};

function getSentimentColor(n: number): string {
  if (n >= 70) return "text-green-400";
  if (n >= 50) return "text-amber-400";
  if (n >= 30) return "text-orange-400";
  return "text-red-400";
}

function getSentimentBg(n: number): string {
  if (n >= 70) return "bg-green-500";
  if (n >= 50) return "bg-amber-500";
  if (n >= 30) return "bg-orange-500";
  return "bg-red-500";
}

export default function SentimentPage() {
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = { role: "user", content: chatInput };
    setChatMessages((p) => [...p, userMsg]);
    setChatInput("");
    setChatLoading(true);
    try {
      const ctx = `Fear & Greed: ${SENTIMENT_DATA.fearGreedIndex} (${SENTIMENT_DATA.fearGreedLabel}). BTC Dom: ${SENTIMENT_DATA.btcDominance}%. Social vol: ${SENTIMENT_DATA.socialVolume.toLocaleString()}.`;
      const res = await fetch("/api/agent/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...chatMessages, userMsg], context: "sentiment", systemPrompt: `You are NexPul Sentiment Pulse. ${ctx}` }),
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
      <PageHeader icon={Activity} title="Sentiment Pulse" subtitle="Social sentiment analysis and market mood" />

      {/* Overview cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
          <div className="flex items-center gap-2 mb-2"><Gauge size={14} className={getSentimentColor(SENTIMENT_DATA.fearGreedIndex)} /><span className="text-[11px] text-zinc-600 uppercase tracking-wider">Fear & Greed</span></div>
          <div className="flex items-end gap-2">
            <span className={`text-2xl font-bold ${getSentimentColor(SENTIMENT_DATA.fearGreedIndex)}`}>{SENTIMENT_DATA.fearGreedIndex}</span>
            <span className={`text-xs ${getSentimentColor(SENTIMENT_DATA.fearGreedIndex)} mb-1`}>{SENTIMENT_DATA.fearGreedLabel}</span>
          </div>
          <div className="mt-2 h-1.5 bg-zinc-800 rounded-full overflow-hidden"><div className={`h-full rounded-full ${getSentimentBg(SENTIMENT_DATA.fearGreedIndex)}`} style={{ width: `${SENTIMENT_DATA.fearGreedIndex}%` }} /></div>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
          <div className="flex items-center gap-2 mb-2"><Globe size={14} className="text-amber-400" /><span className="text-[11px] text-zinc-600 uppercase tracking-wider">BTC Dominance</span></div>
          <span className="text-2xl font-bold text-zinc-100">{SENTIMENT_DATA.btcDominance}%</span>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
          <div className="flex items-center gap-2 mb-2"><MessageSquare size={14} className="text-violet-400" /><span className="text-[11px] text-zinc-600 uppercase tracking-wider">Social Volume</span></div>
          <span className="text-2xl font-bold text-zinc-100">{(SENTIMENT_DATA.socialVolume / 1000).toFixed(0)}K</span>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4">
          <div className="flex items-center gap-2 mb-2"><Search size={14} className="text-cyan-400" /><span className="text-[11px] text-zinc-600 uppercase tracking-wider">Trending</span></div>
          <div className="flex flex-wrap gap-1.5">{SENTIMENT_DATA.trendingTopics.slice(0, 4).map((t) => <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">{t}</span>)}</div>
        </div>
      </div>

      {/* Token sentiment */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden mb-6">
        <div className="px-4 py-3 border-b border-zinc-800/50"><span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Token Sentiment</span></div>
        <div className="p-4 space-y-3">
          {SENTIMENT_DATA.sentimentByToken.map((t) => (
            <div key={t.symbol} className="flex items-center justify-between py-2 border-b border-zinc-800/30 last:border-0">
              <div className="flex items-center gap-3">
                <div>
                  <span className="text-sm text-zinc-200 font-medium">{t.token}</span>
                  <span className="text-[11px] text-zinc-600 ml-1.5 uppercase">{t.symbol}</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <span className="text-[10px] text-zinc-600 block">Mentions</span>
                  <span className="text-xs text-zinc-400">{(t.mentions / 1000).toFixed(0)}K</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-600 block">24h</span>
                  <span className={`text-xs flex items-center gap-0.5 ${t.change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {t.change24h >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                    {t.change24h >= 0 ? "+" : ""}{t.change24h}%
                  </span>
                </div>
                <div className="w-20">
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden"><div className={`h-full rounded-full ${getSentimentBg(t.sentiment)}`} style={{ width: `${t.sentiment}%` }} /></div>
                  <span className={`text-[10px] ${getSentimentColor(t.sentiment)} text-right block mt-0.5`}>{t.sentiment}/100</span>
                </div>
                <span className={`text-[10px] px-1.5 py-0.5 rounded capitalize ${
                  t.trend === "bullish" ? "text-green-400 bg-green-500/10" : t.trend === "bearish" ? "text-red-400 bg-red-500/10" : "text-zinc-400 bg-zinc-800"
                }`}>{t.trend}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Chat */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-800/50 flex items-center gap-2"><Bot size={14} className="text-orange-400" /><span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Sentiment AI</span></div>
        <div className="p-4">
          {chatMessages.length > 0 && <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">{chatMessages.map((msg, i) => <div key={i} className="text-sm"><span className="text-[10px] text-zinc-600 uppercase block mb-0.5">{msg.role === "user" ? "You" : "NexPul AI"}</span><div className={`whitespace-pre-wrap leading-relaxed ${msg.role === "user" ? "text-zinc-300" : "text-zinc-400"}`}>{msg.content}</div></div>)}</div>}
          <div className="flex items-center gap-2">
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()} placeholder="e.g. 'Is the market showing signs of capitulation?'" className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700" />
            <button onClick={sendChat} disabled={chatLoading} className="p-2 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500/20 transition-colors disabled:opacity-50"><Send size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
