"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PRICING, modelKeys } from "../../../lib/pricing";

import "../style.css"; // uses .tool, .tool-card, .kv, .textarea-xl, .output-panel, etc.  ← :contentReference[oaicite:2]{index=2}
import TokenCostTool from "@/app/components/tools/TokenCostTool";

function estimateCostFor(
  modelKey: string,
  promptTokens: number,
  completionTokens: number
) {
  const p = PRICING[modelKey];
  const promptCost = (promptTokens / 1000) * p.promptPer1K;
  const completionCost = (completionTokens / 1000) * p.completionPer1K;
  return { total: promptCost + completionCost, promptCost, completionCost };
}

export default function TokenCostPage() {
  const search = useSearchParams();

  const urlModel = search.get("model");

  const [model, setModel] = useState(
    urlModel && modelKeys.includes(urlModel) ? urlModel : modelKeys[0]
  );
  const [promptTokens, setPromptTokens] = useState(0);
  const [completionTokens, setCompletionTokens] = useState(0);

  const totals = useMemo(
    () => estimateCostFor(model, promptTokens, completionTokens),
    [model, promptTokens, completionTokens]
  );

  const breakdown = useMemo(
    () => ({
      model,
      modelName: PRICING[model].name,
      promptTokens,
      completionTokens,
      totalCost: Number(totals.total.toFixed(6)),
    }),
    [model, promptTokens, completionTokens, totals.total]
  );

  return (
    <main className="page tool">
      <header className="tool-header">
        <h1 className="h1">Token → Cost Calculator</h1>
      </header>
      <TokenCostTool />
      {/* The compare table section from your current page can remain here if you want it ONLY on the standalone page */}

      {/* Simple compare table */}
      <section className="tool-section">
        <h2 className="h3">Compare across models</h2>
        <div className="help">
          Same token counts: {promptTokens} prompt / {completionTokens}{" "}
          completion
        </div>
        <div className="tool-card cost-compare" style={{ marginTop: 10 }}>
          <table className="table table--compact cost-table" role="table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Context</th>
                <th>Prompt/1K</th>
                <th>Completion/1K</th>
                <th>Est. Total</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {modelKeys.map((k) => {
                const p = PRICING[k];
                const c = estimateCostFor(
                  k,
                  promptTokens,
                  completionTokens
                ).total;
                const active = k === model ? "row--active" : "";
                return (
                  <tr key={k} className={active}>
                    <td>{p.name}</td>
                    <td>{p.contextK}</td>
                    <td>${p.promptPer1K.toFixed(6)}</td>
                    <td>${p.completionPer1K.toFixed(6)}</td>
                    <td>${c.toFixed(6)}</td>
                    <td>
                      <button
                        className="btn btn-secondary cost-select"
                        onClick={() => setModel(k)}
                        aria-label={`Select ${p.name}`}
                      >
                        {k === model ? "Selected" : "Select"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
