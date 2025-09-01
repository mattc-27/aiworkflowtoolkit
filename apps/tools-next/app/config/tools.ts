export type Tool = {
  slug: string;
  title: string;
  desc: string;
  tags: string[];
  icon?: string;
};

export const tools: Tool[] = [
  {
    slug: "token-cost",
    title: "Token → Cost Calculator",
    desc: "Estimate API costs by model & token counts.",
    tags: ["Costs"],
    icon: "/icons/calc.svg",
  },
  {
    slug: "prompt-compression",
    title: "Prompt Compression Optimizer",
    desc: "Shorten prompts while preserving meaning.",
    tags: ["Compression"],
    icon: "/icons/compress.svg",
  },
  {
    slug: "prompt-to-json-schema",
    title: "Prompt → JSON Schema Generator",
    desc: "Convert natural language to JSON Schema.",
    tags: ["Schema"],
    icon: "/icons/schema.svg",
  },
  {
    slug: "model-picker",
    title: "Model Picker",
    desc: "Rank models by budget, speed, context, and capabilities.",
    tags: ["Picker", "Compare"],
    icon: "/icons/picker.svg",
  },
];
