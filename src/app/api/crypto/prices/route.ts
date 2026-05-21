import { NextRequest } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const COINGECKO = "https://api.coingecko.com/api/v3";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const ids = searchParams.get("ids") || "bitcoin,ethereum,solana,binancecoin,avalanche-2,cardano,polkadot,chainlink,uniswap,aave";
    const vs = searchParams.get("vs") || "usd";

    const res = await fetch(
      `${COINGECKO}/coins/markets?vs_currency=${vs}&ids=${ids}&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=1h,24h,7d`,
      { headers: { Accept: "application/json" }, next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return new Response(JSON.stringify({ error: `CoinGecko ${res.status}` }), {
        status: res.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json", "Cache-Control": "s-maxage=60, stale-while-revalidate=120" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Failed to fetch prices" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
