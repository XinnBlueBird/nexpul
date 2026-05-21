import { NextRequest } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    // Use multiple free gas APIs
    const [ethRes, blockRes] = await Promise.all([
      fetch("https://api.etherscan.io/api?module=gastracker&action=gasoracle", {
        next: { revalidate: 30 },
      }),
      fetch("https://eth.blockscout.com/api/v1/stats", {
        next: { revalidate: 60 },
      }),
    ]);

    let ethGas = { low: 0, avg: 0, high: 0 };
    if (ethRes.ok) {
      const data = await ethRes.json();
      if (data.status === "1" && data.result) {
        ethGas = {
          low: parseInt(data.result.SafeGasPrice) || 0,
          avg: parseInt(data.result.ProposeGasPrice) || 0,
          high: parseInt(data.result.FastGasPrice) || 0,
        };
      }
    }

    let blockInfo = { gasUsed: 0, gasLimit: 0 };
    if (blockRes.ok) {
      const data = await blockRes.json();
      blockInfo = {
        gasUsed: data.gas_used || 0,
        gasLimit: data.gas_limit || 0,
      };
    }

    return new Response(
      JSON.stringify({
        ethereum: ethGas,
        networks: [
          { name: "Ethereum", chain: "ETH", ...ethGas, unit: "Gwei" },
          { name: "Base", chain: "BASE", low: 0.01, avg: 0.05, high: 0.1, unit: "Gwei" },
          { name: "Arbitrum", chain: "ARB", low: 0.1, avg: 0.2, high: 0.5, unit: "Gwei" },
          { name: "Polygon", chain: "MATIC", low: 30, avg: 50, high: 100, unit: "Gwei" },
          { name: "BSC", chain: "BSC", low: 1, avg: 3, high: 5, unit: "Gwei" },
        ],
        blockInfo,
        timestamp: Date.now(),
      }),
      { headers: { "Content-Type": "application/json", "Cache-Control": "s-maxage=30" } }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Failed to fetch gas" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
