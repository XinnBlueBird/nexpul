export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/search/trending", {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: `CoinGecko ${res.status}` }), {
        status: res.status,
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json", "Cache-Control": "s-maxage=300" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Failed" }),
      { status: 500 }
    );
  }
}
