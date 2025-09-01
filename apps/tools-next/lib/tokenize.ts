// Lightweight token counter with a real tokenizer if available
// Falls back to ~4 chars/token heuristic when @dqbd/tiktoken isn't loaded.

let loaded = false;
let encode: ((s: string) => number[]) | null = null;

async function load() {
  if (loaded) return;
  try {
    const tk = await import("@dqbd/tiktoken");
    const enc = await tk.get_encoding("cl100k_base");
    encode = (s: string) => enc.encode(s);
    loaded = true;
  } catch {
    // Fallback: rough estimate
    encode = (s: string) => {
      const approx = Math.ceil(s.trim().length / 4);
      return Array.from({ length: approx }, (_, i) => i);
    };
    loaded = true;
  }
}

export async function countTokens(text: string): Promise<number> {
  await load();
  return encode ? encode(text).length : Math.ceil(text.trim().length / 4);
}
