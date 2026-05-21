import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexPul — AI Crypto Command Center",
  description: "Real-time on-chain intelligence powered by AI. Whale tracking, gas oracle, portfolio analytics, and more.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090b] text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
