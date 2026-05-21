"use client";

import { type LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  accent?: string;
  action?: React.ReactNode;
}

export default function PageHeader({ icon: Icon, title, subtitle, accent = "text-amber-400", action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <Icon size={18} className={accent} />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-zinc-100">{title}</h1>
          <p className="text-sm text-zinc-500">{subtitle}</p>
        </div>
      </div>
      {action}
    </div>
  );
}
