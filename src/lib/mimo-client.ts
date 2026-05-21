export async function* streamChat(
  messages: { role: string; content: string }[],
  systemPrompt?: string
): AsyncGenerator<string> {
  const res = await fetch("/api/mimo/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, systemPrompt }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`API error ${res.status}: ${err}`);
  }

  const reader = res.body?.getReader();
  if (!reader) throw new Error("No response body");

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (data === "[DONE]") return;
      try {
        const json = JSON.parse(data);
        const content =
          json.choices?.[0]?.delta?.content ??
          json.choices?.[0]?.delta?.reasoning_content ??
          "";
        if (content) yield content;
      } catch {}
    }
  }

  // Process remaining buffer
  if (buffer.startsWith("data: ")) {
    const data = buffer.slice(6).trim();
    if (data !== "[DONE]") {
      try {
        const json = JSON.parse(data);
        const content =
          json.choices?.[0]?.delta?.content ??
          json.choices?.[0]?.delta?.reasoning_content ??
          "";
        if (content) yield content;
      } catch {}
    }
  }
}
