import { Message } from "./constants";

export async function callClaude(
  system: string,
  messages: Message[]
): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ system, messages }),
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.text as string;
}

export function jaccardSimilarity(a: string, b: string): number {
  const wordsA = new Set(a.toLowerCase().split(/\W+/).filter(Boolean));
  const wordsB = new Set(b.toLowerCase().split(/\W+/).filter(Boolean));
  const intersection = new Set([...wordsA].filter((w) => wordsB.has(w)));
  const union = new Set([...wordsA, ...wordsB]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

export function computeSimilarity(texts: string[]): number {
  if (texts.length < 2) return 100;
  let total = 0,
    pairs = 0;
  for (let i = 0; i < texts.length; i++) {
    for (let j = i + 1; j < texts.length; j++) {
      total += jaccardSimilarity(texts[i], texts[j]);
      pairs++;
    }
  }
  return Math.round((total / pairs) * 100);
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}
