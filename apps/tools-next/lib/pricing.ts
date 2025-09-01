export type ModelPricing = {
  name: string;
  family: "openai" | "anthropic" | "google" | "mistral" | "meta" | "xai" | "other";
  modality: ("text" | "vision" | "function" | "reasoning" | "json")[]; // rough capabilities
  contextK: number; // context window (in thousands)
  promptPer1K: number; // USD per 1K prompt tokens
  completionPer1K: number; // USD per 1K completion tokens
  notes?: string;
};

// NOTE: update these numbers as vendor pricing changes.
export const PRICING: Record<string, ModelPricing> = {
  "gpt-4o-mini": {
    name: "GPT-4o mini",
    family: "openai",
    modality: ["text", "json"],
    contextK: 128,
    promptPer1K: 0.00015,
    completionPer1K: 0.0006,
  },
  "gpt-4o": {
    name: "GPT-4o",
    family: "openai",
    modality: ["text", "vision", "json", "function"],
    contextK: 128,
    promptPer1K: 0.005,
    completionPer1K: 0.015,
  },
  "o3-mini": {
    name: "o3-mini",
    family: "openai",
    modality: ["text", "reasoning", "json"],
    contextK: 200,
    promptPer1K: 0.008,
    completionPer1K: 0.016,
  },
  // --- Anthropic Claude ---
  "claude-3-haiku": {
    name: "Claude 3 Haiku",
    family: "anthropic",
    modality: ["text", "json"],
    contextK: 200,
    promptPer1K: 0.0008,
    completionPer1K: 0.004,
  },
  "claude-3-sonnet": {
    name: "Claude 3 Sonnet",
    family: "anthropic",
    modality: ["text", "json", "vision"],
    contextK: 200,
    promptPer1K: 0.003,
    completionPer1K: 0.015,
  },
  "claude-3-opus": {
    name: "Claude 3 Opus",
    family: "anthropic",
    modality: ["text", "json", "vision", "reasoning"],
    contextK: 200,
    promptPer1K: 0.015,
    completionPer1K: 0.075,
  },

  // --- Google Gemini ---
  "gemini-1.5-flash": {
    name: "Gemini 1.5 Flash",
    family: "google",
    modality: ["text", "vision", "json"],
    contextK: 1000,
    promptPer1K: 0.00035,
    completionPer1K: 0.00105,
  },
  "gemini-1.5-pro": {
    name: "Gemini 1.5 Pro",
    family: "google",
    modality: ["text", "vision", "json", "reasoning"],
    contextK: 2000,
    promptPer1K: 0.0025,
    completionPer1K: 0.0075,
  },

  // --- Grok (xAI) ---
  "grok-1": {
    name: "Grok-1",
    family: "xai",
    modality: ["text", "json", "reasoning"],
    contextK: 128,
    promptPer1K: 0.003,
    completionPer1K: 0.006,
  },
  // add non-OpenAI if you want cross-vendor comparisons later
  // "claude-3-haiku": { name:"Claude 3 Haiku", family:"anthropic", modality:["text","json"], contextK: 200, promptPer1K: 0.0008, completionPer1K: 0.004 },
  // ...
};

export const modelKeys = Object.keys(PRICING);
