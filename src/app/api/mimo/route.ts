import { NextRequest } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const MIMO_BASE = "https://token-plan-sgp.xiaomimimo.com/v1";
const MIMO_KEY = process.env.MIMO_API_KEY || "";
const MIMO_MODEL = "mimo-v2.5-pro";

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt } = await req.json();

    const apiMessages = [];
    if (systemPrompt) {
      apiMessages.push({ role: "system", content: systemPrompt });
    }
    apiMessages.push(...messages);

    const res = await fetch(`${MIMO_BASE}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": MIMO_KEY,
      },
      body: JSON.stringify({
        model: MIMO_MODEL,
        messages: apiMessages,
        stream: true,
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(JSON.stringify({ error: errText }), {
        status: res.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(res.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
