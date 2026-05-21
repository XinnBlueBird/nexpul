"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Radar, Fuel, Briefcase, Bot,
  Sparkles, Activity, Bell, ChevronLeft, ChevronRight, Menu, X
} from "lucide-react";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/whale-radar", label: "Whale Radar", icon: Radar },
  { href: "/gas-oracle", label: "Gas Oracle", icon: Fuel },
  { href: "/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/analyst", label: "AI Analyst", icon: Bot },
  { href: "/airdrop-scanner", label: "Airdrop Scanner", icon: Sparkles },
  { href: "/sentiment", label: "Sentiment", icon: Activity },
  { href: "/alerts", label: "Alerts", icon: Bell },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navContent = (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-zinc-800/50">
        <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
          <span className="text-amber-400 font-bold text-sm">N</span>
        </div>
        {!collapsed && (
          <div>
            <span className="font-semibold text-sm text-zinc-100">NexPul</span>
            <span className="block text-[10px] text-zinc-600">v1.0</span>
          </div>
        )}
      </div>

      {/* Live indicator */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="live-dot" />
          {!collapsed && <span className="text-[11px] text-zinc-500 uppercase tracking-wider">Live</span>}
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-0.5">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              <item.icon size={16} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-zinc-800/50">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center gap-2 text-[11px] text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400"
      >
        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/60 z-40" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen bg-[#0c0c0e] border-r border-zinc-800/50 flex flex-col transition-all duration-200 ${
          collapsed ? "w-[68px]" : "w-[220px]"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {navContent}
      </aside>
    </>
  );
}
