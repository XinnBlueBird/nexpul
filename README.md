<div align="center">

# NexPul

**AI-Powered Crypto Command Center**

Real-time on-chain intelligence powered by MiMo v2.5 Pro

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/XinnBlueBird/nexpul)

[Live Demo](https://nexpul.vercel.app) · [GitHub](https://github.com/XinnBlueBird/nexpul)

</div>

---

## Overview

NexPul is a real-time crypto intelligence platform that combines live market data with AI-powered analysis. Eight specialized modules provide structured, actionable insights — not just raw data dumps.

**Key differentiators:**
- **Real API integration** — Live CoinGecko data, not mock data. Prices update every 60 seconds.
- **Domain-specific AI** — Each module has a dedicated system prompt encoding domain expertise.
- **Edge streaming** — AI responses stream token-by-token via SSE on Vercel Edge Runtime.
- **Zero sign-up** — No accounts, no tracking, no data collection.

## Modules

| Module | Description | Data Source |
|--------|-------------|-------------|
| **Dashboard** | Live prices, volume, market cap across top tokens | CoinGecko API |
| **Whale Radar** | Whale wallet tracking with confidence ratings | Curated profiles |
| **Gas Oracle** | Multi-chain gas tracking (ETH, Base, Arb, Polygon, BSC) | Etherscan + L2 APIs |
| **Portfolio** | Holdings tracker with per-position P&L | LocalStorage |
| **AI Analyst** | Full MiMo v2.5 Pro streaming chat | MiMo Token Plan API |
| **Airdrop Scanner** | Upcoming airdrops with farming steps and risk ratings | Curated database |
| **Sentiment Pulse** | Fear & Greed Index, social volume, token sentiment | Aggregated APIs |
| **Alert System** | Configurable alerts (price, whale, gas, volume) | Client-side |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (React 19, App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| AI Model | MiMo v2.5 Pro (Xiaomi) |
| Market Data | CoinGecko API |
| Runtime | Vercel Edge (SSE streaming) |
| Icons | Lucide React |
| Deployment | Vercel |

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client (React)                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │Dashboard │ │Whale     │ │Gas       │  ...        │
│  │+AI Chat  │ │Radar+AI  │ │Oracle+AI │             │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘            │
│       │             │            │                   │
│  ┌────▼─────────────▼────────────▼────┐             │
│  │       /api/agent (Edge SSE)        │             │
│  │   System prompt per module context │             │
│  └────────────────┬───────────────────┘             │
│                   │                                  │
│  ┌────────────────▼───────────────────┐             │
│  │    MiMo v2.5 Pro (Token Plan)      │             │
│  │    api-key auth, stream: true      │             │
│  └────────────────────────────────────┘             │
│                                                      │
│  ┌──────────────────────────────────┐               │
│  │  /api/crypto/prices (Edge)       │               │
│  │  CoinGecko → 60s cache           │               │
│  └──────────────────────────────────┘               │
└─────────────────────────────────────────────────────┘
```

## Getting Started

### Prerequisites

- Node.js 18+
- MiMo API key (Token Plan) — get one at [Xiaomi MiMo](https://token-plan-sgp.xiaomimimo.com)

### Installation

```bash
git clone https://github.com/XinnBlueBird/nexpul.git
cd nexpul
npm install
```

### Environment Variables

Copy the example and add your keys:

```bash
cp .env.example .env.local
```

```env
# Required: MiMo API (Token Plan)
MIMO_API_KEY=tp-your-key-here

# Optional: Etherscan API (for gas oracle)
ETHERSCAN_API_KEY=your-key-here
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Add env vars
echo -n "your-mimo-key" | vercel env add MIMO_API_KEY production

# Redeploy with env vars
vercel --prod
```

## Project Structure

```
nexpul/
├── src/
│   ├── app/
│   │   ├── (app)/                  # Route group with shared sidebar
│   │   │   ├── layout.tsx          # Sidebar + main layout
│   │   │   ├── dashboard/          # Live market overview
│   │   │   ├── whale-radar/        # Whale tracking
│   │   │   ├── gas-oracle/         # Gas monitoring
│   │   │   ├── portfolio/          # Holdings tracker
│   │   │   ├── analyst/            # AI chat
│   │   │   ├── airdrop-scanner/    # Airdrop discovery
│   │   │   ├── sentiment/          # Sentiment analysis
│   │   │   └── alerts/             # Alert management
│   │   ├── api/
│   │   │   ├── agent/route.ts      # AI streaming proxy
│   │   │   ├── crypto/
│   │   │   │   ├── prices/route.ts  # CoinGecko proxy
│   │   │   │   ├── gas/route.ts     # Gas price aggregation
│   │   │   │   └── trending/route.ts
│   │   │   └── mimo/route.ts        # Direct MiMo proxy
│   │   ├── about/                  # About page
│   │   ├── faq/                    # FAQ page
│   │   ├── page.tsx                # Landing page
│   │   ├── layout.tsx              # Root layout
│   │   └── globals.css             # Theme + animations
│   ├── components/
│   │   ├── sidebar.tsx             # Collapsible sidebar
│   │   └── page-header.tsx         # Reusable page header
│   └── lib/
│       ├── agent-prompts.ts        # System prompts per module
│       └── mimo-client.ts          # Streaming API client
├── public/
│   ├── favicon.svg
│   └── logo.svg
├── next.config.ts
└── .env.example
```

## API Routes

| Route | Runtime | Description |
|-------|---------|-------------|
| `POST /api/agent` | Edge | AI streaming with context-aware system prompts |
| `POST /api/mimo` | Edge | Direct MiMo API proxy |
| `GET /api/crypto/prices` | Edge | CoinGecko market data (60s cache) |
| `GET /api/crypto/gas` | Edge | Multi-chain gas prices (30s cache) |
| `GET /api/crypto/trending` | Edge | Trending tokens (5min cache) |

## Design System

- **Background:** `#09090b` (near-black)
- **Accent:** `#f59e0b` (amber-500)
- **Text:** `zinc-100` (primary), `zinc-500` (secondary), `zinc-600` (muted)
- **Borders:** `white/[0.06]` (subtle), `white/[0.08]` (standard)
- **Font:** Inter (system-ui fallback)
- **Style:** Linear/Stripe-inspired minimal dark UI. No glassmorphism, no gradients, no glow effects.

## License

MIT

---

<div align="center">

Built with [MiMo v2.5 Pro](https://xiaomimimo.com) · [Next.js](https://nextjs.org) · [Vercel](https://vercel.com)

</div>
