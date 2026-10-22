/**
 * Optional bridge to a locally running LLM (Ollama, by default).
 *
 * The chatbot works fully without it — this simply upgrades the replies when
 * a local model is present. Nothing ever leaves the machine: the endpoint is
 * http://localhost by default and no other host is ever contacted.
 */
const OLLAMA_URL = 'http://localhost:11434';
const TIMEOUT_MS = 6000;

export interface OllamaStatus {
  available: boolean;
  models: string[];
}

export async function checkOllama(): Promise<OllamaStatus> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    const res = await fetch(`${OLLAMA_URL}/api/tags`, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return { available: false, models: [] };
    const data = (await res.json()) as { models?: { name: string }[] };
    const models = (data.models ?? []).map((m) => m.name);
    // Ollama can be running with no model pulled — that is not "available".
    return { available: models.length > 0, models };
  } catch {
    return { available: false, models: [] };
  }
}

export async function ollamaChat(
  prompt: string,
  history: { role: 'user' | 'assistant'; content: string }[],
  system: string,
  model?: string
): Promise<string | null> {
  try {
    const status = await checkOllama();
    const target = model ?? status.models[0];
    if (!target) return null;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    const res = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: target,
        stream: false,
        options: { temperature: 0.4 },
        messages: [
          { role: 'system', content: system },
          ...history.map((m) => ({ role: m.role, content: m.content })),
          { role: 'user', content: prompt },
        ],
      }),
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    const data = (await res.json()) as { message?: { content?: string } };
    const content = data.message?.content?.trim();
    return content && content.length > 0 ? content : null;
  } catch {
    return null;
  }
}

export const OLLAMA_SYSTEM_PROMPT = `You are the BharatVerse guide, a warm, cinematic travel companion for India.
Answer only about Indian states, union territories, culture, food, festivals, wildlife, landmarks and travel planning.
Be concise and evocative: 2 to 5 short lines, or a few bullet points. Never invent facts or statistics.
If you are unsure, say so and suggest asking about a specific state.`;
