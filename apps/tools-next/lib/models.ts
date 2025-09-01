// apps/tools-next/lib/models.ts
export type ModelFacts = {
  key: string; // must match PRICING key
  quality: number; // 1..5
  speed: number; // 1..5 (higher = faster/cheaper generally)
  jsonReliability: number; // 0..5
  toolUse: number; // 0..5
  vision: number; // 0..5
  reasoning: number; // 0..5
  useCases: string[]; // display on results table
};

export const FACTS: ModelFacts[] = [
  // --- OpenAI ---
  {
    key: "gpt-4o-mini",
    quality: 3,
    speed: 5,
    jsonReliability: 4,
    toolUse: 4,
    vision: 2,
    reasoning: 1,
    useCases: ["Chatbots", "JSON extraction", "Fast prototyping"],
  },
  {
    key: "gpt-4o",
    quality: 5,
    speed: 3,
    jsonReliability: 4,
    toolUse: 5,
    vision: 4,
    reasoning: 2,
    useCases: ["Multi-modal Q&A", "Agents with tools", "Education"],
  },
  {
    key: "o3-mini",
    quality: 4,
    speed: 3,
    jsonReliability: 4,
    toolUse: 4,
    vision: 1,
    reasoning: 4,
    useCases: ["Reasoning tasks", "Structured outputs", "Research assistants"],
  },

  // --- Anthropic (Claude) ---
  {
    key: "claude-3-haiku",
    quality: 3,
    speed: 5,
    jsonReliability: 4,
    toolUse: 3,
    vision: 0,
    reasoning: 2,
    useCases: ["Cheap summarization", "High-volume extraction"],
  },
  {
    key: "claude-3-sonnet",
    quality: 4,
    speed: 3,
    jsonReliability: 4,
    toolUse: 3,
    vision: 3,
    reasoning: 3,
    useCases: ["Balanced writing", "Vision Q&A", "Creative writing"],
  },
  {
    key: "claude-3-opus",
    quality: 5,
    speed: 2,
    jsonReliability: 5,
    toolUse: 3,
    vision: 4,
    reasoning: 5,
    useCases: ["Deep reasoning", "Complex analysis", "Multi-step planning"],
  },

  // --- Google (Gemini) ---
  {
    key: "gemini-1.5-flash",
    quality: 4,
    speed: 5,
    jsonReliability: 4,
    toolUse: 3,
    vision: 4,
    reasoning: 3,
    useCases: ["Fast multi-modal", "Classroom demos", "Realtime assistants"],
  },
  {
    key: "gemini-1.5-pro",
    quality: 5,
    speed: 3,
    jsonReliability: 5,
    toolUse: 4,
    vision: 5,
    reasoning: 5,
    useCases: ["Multi-modal reasoning", "Enterprise KB", "Complex Q&A"],
  },

  // --- xAI (Grok) ---
  {
    key: "grok-1",
    quality: 4,
    speed: 4,
    jsonReliability: 3,
    toolUse: 3,
    vision: 0,
    reasoning: 4,
    useCases: ["Reasoning-heavy chat", "Code & math", "General productivity"],
  },
];
