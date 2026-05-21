"use client";

import { useState } from "react";
import { Bell, Plus, Trash2, Send, Bot, AlertTriangle, TrendingUp, TrendingDown, Fuel, Wallet, Volume2, Zap, Check, X, Clock } from "lucide-react";
import PageHeader from "@/components/page-header";

interface Alert {
  id: string;
  type: "price" | "whale" | "gas" | "volume";
  token: string;
  condition: string;
  target: string;
  status: "active" | "triggered" | "paused";
  createdAt: string;
  triggeredAt?: string;
}

const INITIAL_ALERTS: Alert[] = [
  { id: "1", type: "price", token: "BTC", condition: "above", target: "$110,000", status: "active", createdAt: "2h ago" },
  { id: "2", type: "price", token: "ETH", condition: "below", target: "$2,800", status: "active", createdAt: "5h ago" },
  { id: "3", type: "whale", token: "ETH", condition: "transfer > $5M", target: "Any whale", status: "active", createdAt: "1d ago" },
  { id: "4", type: "gas", token: "ETH", condition: "below", target: "15 Gwei", status: "triggered", createdAt: "3d ago", triggeredAt: "2h ago" },
  { id: "5", type: "volume", token: "SOL", condition: "spike > 200%", target: "24h volume", status: "active", createdAt: "12h ago" },
  { id: "6", type: "price", token: "SOL", condition: "above", target: "$200", status: "paused", createdAt: "1d ago" },
];

const TYPE_CONFIG: Record<string, { icon: typeof TrendingUp; color: string; label: string }> = {
  price: { icon: TrendingUp, color: "text-amber-400 bg-amber-500/10 border-amber-500/20", label: "Price" },
  whale: { icon: Wallet, color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20", label: "Whale" },
  gas: { icon: Fuel, color: "text-green-400 bg-green-500/10 border-green-500/20", label: "Gas" },
  volume: { icon: Volume2, color: "text-violet-400 bg-violet-500/10 border-violet-500/20", label: "Volume" },
};

const STATUS_CONFIG: Record<string, { color: string; icon: typeof Check }> = {
  active: { color: "text-green-400 bg-green-500/10", icon: Zap },
  triggered: { color: "text-amber-400 bg-amber-500/10", icon: Check },
  paused: { color: "text-zinc-500 bg-zinc-800", icon: Clock },
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);
  const [showAdd, setShowAdd] = useState(false);
  const [newAlert, setNewAlert] = useState({ type: "price" as Alert["type"], token: "", condition: "above", target: "" });
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  const addAlert = () => {
    if (!newAlert.token || !newAlert.target) return;
    setAlerts((p) => [
      { id: Date.now().toString(), ...newAlert, status: "active", createdAt: "now" },
      ...p,
    ]);
    setNewAlert({ type: "price", token: "", condition: "above", target: "" });
    setShowAdd(false);
  };

  const removeAlert = (id: string) => setAlerts((p) => p.filter((a) => a.id !== id));
  const toggleAlert = (id: string) => setAlerts((p) =>
    p.map((a) => a.id === id ? { ...a, status: a.status === "paused" ? "active" : "paused" } : a)
  );

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = { role: "user", content: chatInput };
    setChatMessages((p) => [...p, userMsg]);
    setChatInput("");
    setChatLoading(true);
    try {
      const ctx = alerts.map((a) => `${a.type}: ${a.token} ${a.condition} ${a.target} [${a.status}]`).join("\n");
      const res = await fetch("/api/agent/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...chatMessages, userMsg], context: "alerts", systemPrompt: `You are NexPul Alert Configurator. Active alerts:\n${ctx}` }),
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

  const activeCount = alerts.filter((a) => a.status === "active").length;
  const triggeredCount = alerts.filter((a) => a.status === "triggered").length;

  return (
    <div>
      <PageHeader icon={Bell} title="Alerts" subtitle="Smart crypto alerts and notifications" action={<button onClick={() => setShowAdd(!showAdd)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition-colors"><Plus size={12} /> New Alert</button>} />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Alerts", value: alerts.length.toString(), icon: Bell, color: "text-amber-400" },
          { label: "Active", value: activeCount.toString(), icon: Zap, color: "text-green-400" },
          { label: "Triggered", value: triggeredCount.toString(), icon: AlertTriangle, color: "text-amber-400" },
          { label: "Paused", value: alerts.filter((a) => a.status === "paused").length.toString(), icon: Clock, color: "text-zinc-400" },
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <select value={newAlert.type} onChange={(e) => setNewAlert((p) => ({ ...p, type: e.target.value as Alert["type"] }))} className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-zinc-700">
              <option value="price">Price Alert</option>
              <option value="whale">Whale Alert</option>
              <option value="gas">Gas Alert</option>
              <option value="volume">Volume Alert</option>
            </select>
            <input value={newAlert.token} onChange={(e) => setNewAlert((p) => ({ ...p, token: e.target.value.toUpperCase() }))} placeholder="Token (e.g. BTC)" className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700" />
            <select value={newAlert.condition} onChange={(e) => setNewAlert((p) => ({ ...p, condition: e.target.value }))} className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-zinc-700">
              <option value="above">Above</option>
              <option value="below">Below</option>
              <option value="spike">Spike</option>
            </select>
            <input value={newAlert.target} onChange={(e) => setNewAlert((p) => ({ ...p, target: e.target.value }))} placeholder="Target value" className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700" />
          </div>
          <button onClick={addAlert} className="mt-3 px-4 py-1.5 rounded-lg bg-amber-500 text-black text-sm font-medium hover:bg-amber-400 transition-colors">Create Alert</button>
        </div>
      )}

      {/* Alert list */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden mb-6">
        <div className="px-4 py-3 border-b border-zinc-800/50"><span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Alerts</span></div>
        <div className="divide-y divide-zinc-800/30">
          {alerts.map((alert) => {
            const typeCfg = TYPE_CONFIG[alert.type];
            const statusCfg = STATUS_CONFIG[alert.status];
            const TypeIcon = typeCfg.icon;
            const StatusIcon = statusCfg.icon;
            return (
              <div key={alert.id} className="flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${typeCfg.color}`}>
                    <TypeIcon size={14} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-zinc-200 font-medium">{alert.token}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-500">{typeCfg.label}</span>
                      <span className={`text-xs ${alert.condition === "above" ? "text-green-400" : alert.condition === "below" ? "text-red-400" : "text-amber-400"}`}>{alert.condition}</span>
                      <span className="text-sm text-zinc-300 font-mono">{alert.target}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-zinc-600">{alert.createdAt}</span>
                      {alert.triggeredAt && <span className="text-[10px] text-amber-400">Triggered {alert.triggeredAt}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded flex items-center gap-1 ${statusCfg.color}`}>
                    <StatusIcon size={10} /> {alert.status}
                  </span>
                  <button onClick={() => toggleAlert(alert.id)} className="text-zinc-600 hover:text-zinc-400 transition-colors p-1">
                    {alert.status === "paused" ? <Zap size={14} /> : <Clock size={14} />}
                  </button>
                  <button onClick={() => removeAlert(alert.id)} className="text-zinc-600 hover:text-red-400 transition-colors p-1">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Chat */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden">
        <div className="px-4 py-3 border-b border-zinc-800/50 flex items-center gap-2"><Bot size={14} className="text-red-400" /><span className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Alert Advisor</span></div>
        <div className="p-4">
          {chatMessages.length > 0 && <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">{chatMessages.map((msg, i) => <div key={i} className="text-sm"><span className="text-[10px] text-zinc-600 uppercase block mb-0.5">{msg.role === "user" ? "You" : "NexPul AI"}</span><div className={`whitespace-pre-wrap leading-relaxed ${msg.role === "user" ? "text-zinc-300" : "text-zinc-400"}`}>{msg.content}</div></div>)}</div>}
          <div className="flex items-center gap-2">
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendChat()} placeholder="e.g. 'What price alerts should I set for ETH?'" className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700" />
            <button onClick={sendChat} disabled={chatLoading} className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"><Send size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
