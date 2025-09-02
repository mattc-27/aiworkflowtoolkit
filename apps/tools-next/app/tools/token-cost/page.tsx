"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { PRICING, modelKeys } from "../../../lib/pricing";
import { countTokens } from "../../../lib/tokenize";
import { buildCompressorUrl } from "../../../lib/links";
import "../style.css"; // uses .tool, .tool-card, .kv, .textarea-xl, .output-panel, etc.  ← :contentReference[oaicite:2]{index=2}

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
  const router = useRouter();
  const search = useSearchParams();

  const urlPrompt = search.get("prompt");
  const urlCompletion = search.get("completion");
  const urlModel = search.get("model");

  const [model, setModel] = useState(
    urlModel && modelKeys.includes(urlModel) ? urlModel : modelKeys[0]
  );
  const [prompt, setPrompt] = useState(
    urlPrompt ? decodeURIComponent(urlPrompt) : ""
  );
  const [completion, setCompletion] = useState(
    urlCompletion ? decodeURIComponent(urlCompletion) : ""
  );
  const [promptTokens, setPromptTokens] = useState(0);
  const [completionTokens, setCompletionTokens] = useState(0);

  useEffect(() => {
    let ok = true;
    (async () => {
      const pt = await countTokens(prompt);
      const ct = await countTokens(completion);
      if (!ok) return;
      setPromptTokens(pt);
      setCompletionTokens(ct);
    })();
    return () => {
      ok = false;
    };
  }, [prompt, completion]);

  const pricing = PRICING[model];
  const totals = useMemo(
    () => estimateCostFor(model, promptTokens, completionTokens),
    [model, promptTokens, completionTokens]
  );

  function openInCompressor() {
    router.push(buildCompressorUrl({ input: prompt }));
  }

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

  async function copyBreakdown() {
    try {
      await navigator.clipboard.writeText(JSON.stringify(breakdown, null, 2));
    } catch {}
  }

  function downloadBreakdown() {
    const blob = new Blob([JSON.stringify(breakdown, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cost-estimate.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="page tool">
      <header className="tool-header">
        <h1 className="h1">Token → Cost Calculator</h1>
      </header>

      {/* Form card */}
      <section className="tool-card cost-card" aria-label="Cost inputs">
        {/* Model picker + quick rates */}
        <div
          className="kv cost-head"
          style={{ justifyContent: "space-between" }}
        >
          <label className="label" htmlFor="model">
            Model
          </label>
          <div className="help">
            Prompt: ${pricing.promptPer1K.toFixed(6)}/1K • Completion: $
            {pricing.completionPer1K.toFixed(6)}/1K
          </div>
        </div>
        <select
          id="model"
          className="input cost-model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          aria-describedby="rateHelp"
        >
          {modelKeys.map((k) => (
            <option key={k} value={k}>
              {PRICING[k].name}
            </option>
          ))}
        </select>
        <div id="rateHelp" className="help cost-rates" style={{ marginTop: 6 }}>
          Rates shown per 1K tokens.
        </div>

        {/* PROMPT Two columns on desktop */}
        <div className="tool-field">
          <textarea
            id="prompt"
            className="textarea-xl input-block"
            placeholder="Paste your prompt…"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <label className="field-label" htmlFor="prompt">
            Prompt Text
          </label>
          <div className="meter-label">~ {promptTokens} tokens</div>
        </div>

        {/* Completion */}
        <div className="tool-field">
          <textarea
            id="completion"
            className="textarea-xl input-block"
            placeholder="Paste a typical model response…"
            value={completion}
            onChange={(e) => setCompletion(e.target.value)}
          />
          <label className="field-label" htmlFor="completion">
            Expected Completion (sample)
          </label>
          <div className="meter-label">
            <span>~ {completionTokens} tokens</span>
          </div>
        </div>

        {/* Actions */}
        <div className="tool-actionbar cost-actions">
          <button onClick={openInCompressor} className="btn btn-secondary">
            Open in Prompt Compression
          </button>
          <button onClick={copyBreakdown} className="btn btn-secondary">
            Copy breakdown (JSON)
          </button>
          <button onClick={downloadBreakdown} className="btn btn-secondary">
            Download .json
          </button>
        </div>

        {/* Result panel */}
        <div
          className="output-panel cost-total"
          role="status"
          aria-live="polite"
        >
          <div className="label">
            Total estimated cost: ${totals.total.toFixed(6)} per request
          </div>
          <div className="help">
            Tip: Compress your prompt to reduce costs →{" "}
            <Link href="/tools/prompt-compress" className="link">
              Prompt Compression Optimizer
            </Link>
          </div>
        </div>
      </section>

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
