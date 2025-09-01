// apps/tools-next/lib/model-picker.ts
import { PRICING } from "./pricing";
import { FACTS } from "./models";

export type Preferences = {
  budgetWeight: number; // 0..1 (importance of cheap total cost)
  speedWeight: number; // 0..1 (importance of speed)
  contextMinK: number;
  needJSON: boolean;
  needTools: boolean;
  needVision: boolean;
  needReasoning: boolean;
  promptTokens: number;
  completionTokens: number;
};

export function scoreModels(p: Preferences) {
  const {
    budgetWeight,
    speedWeight,
    contextMinK,
    needJSON,
    needTools,
    needVision,
    needReasoning,
    promptTokens,
    completionTokens,
  } = p;

  return FACTS.filter(
    (f) => PRICING[f.key] && PRICING[f.key].contextK >= contextMinK
  )
    .map((f) => {
      const price = PRICING[f.key];
      const totalCost =
        (promptTokens / 1000) * price.promptPer1K +
        (completionTokens / 1000) * price.completionPer1K;

      // cheaper -> higher costScore
      const costScore = 1 / Math.max(totalCost, 1e-9);

      // capability points from toggles
      let capability = 0;
      capability += needJSON ? f.jsonReliability : 0;
      capability += needTools ? f.toolUse : 0;
      capability += needVision ? f.vision : 0;
      capability += needReasoning ? f.reasoning : 0;

      const base = f.quality + speedWeight * f.speed;
      const final =
        budgetWeight * costScore + (1 - budgetWeight) * (base + capability);

      return {
        key: f.key,
        name: price.name,
        totalCost,
        contextK: price.contextK,
        facts: f, // expose facts (for use-cases and checkmarks)
        score: final,
      };
    })
    .sort((a, b) => b.score - a.score);
}
