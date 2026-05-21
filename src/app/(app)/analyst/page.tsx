"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Trash2, Copy, Check } from "lucide-react";
import PageHeader from "@/components/page-header";

export default function AnalystPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/agent/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg], context: "analyst" }),
      });
      if (!res.ok) throw new Error("API error");
      const reader = res.body?.getReader();
      if (!reader) return;
      const decoder = new TextDecoder();
      let aiMsg = "";
      setMessages((p) => [...p, { role: "assistant", content: "" }]);

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
            if (c) { aiMsg += c; setMessages((p) => { const m = [...p]; m[m.length - 1] = { role: "assistant", content: aiMsg }; return m; }); }
          } catch {}
        }
      }
    } catch {
      setMessages((p) => [...p, { role: "assistant", content: "Failed to get response." }]);
    }
    setLoading(false);
  };

  const copyMsg = (content: string, idx: number) => {
    navigator.clipboard.writeText(content);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  const QUICK_PROMPTS = [
    "Analyze Bitcoin's current market position",
    "What are the best L2 opportunities right now?",
    "Compare ETH vs SOL for the next 3 months",
    "Explain the current DeFi yield landscape",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <PageHeader
        icon={Bot}
        title="AI Analyst"
        subtitle="MiMo v2.5 Pro powered crypto intelligence"
        action={<button onClick={() => setMessages([])} className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"><Trash2 size={12} /> Clear</button>}
      />

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
              <Bot size={24} className="text-amber-400" />
            </div>
            <h2 className="text-lg font-medium text-zinc-200 mb-1">NexPul AI Analyst</h2>
            <p className="text-sm text-zinc-500 mb-6 max-w-md">Ask anything about crypto markets, DeFi strategies, tokenomics, or on-chain data.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-lg w-full">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => { setInput(prompt); }}
                  className="text-left px-3 py-2.5 rounded-lg border border-zinc-800 bg-zinc-950 text-xs text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot size={14} className="text-amber-400" />
              </div>
            )}
            <div className={`max-w-[75%] rounded-xl px-4 py-3 ${msg.role === "user" ? "bg-amber-500/10 border border-amber-500/20" : "bg-zinc-900 border border-zinc-800"}`}>
              <div className="text-sm text-zinc-200 whitespace-pre-wrap leading-relaxed">{msg.content}</div>
              {msg.role === "assistant" && msg.content && (
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={() => copyMsg(msg.content, i)} className="text-zinc-600 hover:text-zinc-400 transition-colors">
                    {copied === i ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                  </button>
                </div>
              )}
            </div>
            {msg.role === "user" && (
              <div className="w-7 h-7 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                <User size={14} className="text-zinc-400" />
              </div>
            )}
          </div>
        ))}

        {loading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center"><Bot size={14} className="text-amber-400" /></div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3">
              <div className="flex gap-1"><span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-pulse" /><span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-pulse" style={{ animationDelay: "0.2s" }} /><span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-pulse" style={{ animationDelay: "0.4s" }} /></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-zinc-800/50 pt-4">
        <div className="flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
            placeholder="Ask the AI analyst..."
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700"
          />
          <button onClick={send} disabled={loading || !input.trim()} className="p-2.5 rounded-lg bg-amber-500 text-black hover:bg-amber-400 transition-colors disabled:opacity-50"><Send size={16} /></button>
        </div>
      </div>
    </div>
  );
}
