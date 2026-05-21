import { NextRequest } from "next/server";
import { SYSTEM_PROMPTS } from "@/lib/agent-prompts";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const MIMO_BASE = "https://token-plan-sgp.xiaomimimo.com/v1";
const MIMO_KEY = process.env.MIMO_API_KEY || "";

export async function POST(req: NextRequest) {
  try {
    const { messages, context, systemPrompt } = await req.json();

    const prompt = systemPrompt || SYSTEM_PROMPTS[context] || SYSTEM_PROMPTS.analyst;

    const apiMessages = [
      { role: "system", content: prompt },
      ...messages,
    ];

    const res = await fetch(`${MIMO_BASE}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": MIMO_KEY,
      },
      body: JSON.stringify({
        model: "mimo-v2.5-pro",
        messages: apiMessages,
        stream: true,
        temperature: 0.7,
        max_tokens: 2048,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return new Response(JSON.stringify({ error: err }), { status: res.status });
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
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown" }),
      { status: 500 }
    );
  }
}
