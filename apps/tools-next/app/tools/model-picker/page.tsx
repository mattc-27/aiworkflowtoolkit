// apps/tools-next/app/tools/model-picker/page.tsx
"use client";
import { useMemo, useState } from "react";
import { scoreModels } from "../../../lib/model-picker";
//import { PRICING } from "../../../lib/pricing";
// import { FACTS } from "../../../lib/models"; // <-- use real FACTS

export default function ModelPickerPage() {
  const [budgetWeight, setBudgetWeight] = useState(0.6);
  const [speedWeight, setSpeedWeight] = useState(0.5);
  const [contextMinK, setContextMinK] = useState(32);
  const [needJSON, setNeedJSON] = useState(true);
  const [needTools, setNeedTools] = useState(false);
  const [needVision, setNeedVision] = useState(false);
  const [needReasoning, setNeedReasoning] = useState(false);
  const [promptTokens, setPromptTokens] = useState(200);
  const [completionTokens, setCompletionTokens] = useState(400);

  const results = useMemo(
    () =>
      scoreModels({
        budgetWeight,
        speedWeight,
        contextMinK,
        needJSON,
        needTools,
        needVision,
        needReasoning,
        promptTokens,
        completionTokens,
      }),
    [
      budgetWeight,
      speedWeight,
      contextMinK,
      needJSON,
      needTools,
      needVision,
      needReasoning,
      promptTokens,
      completionTokens,
    ]
  );

  const check = (v: number, th = 3) => (v >= th ? "✓" : "—");

  return (
    <div className="tool">
      <h1 className="h1">Pick the best model for your use-case</h1>
      <div className="card tool-card tool-section">
        <div className="tool-section">
          <label className="label">Budget importance</label>
          <input
            className="input"
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={budgetWeight}
            onChange={(e) => setBudgetWeight(parseFloat(e.target.value))}
          />
          <div className="help">Current: {budgetWeight}</div>
        </div>

        <div className="tool-section">
          <label className="label">Speed importance</label>
          <input
            className="input"
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={speedWeight}
            onChange={(e) => setSpeedWeight(parseFloat(e.target.value))}
          />
          <div className="help">Current: {speedWeight}</div>
        </div>

        <div className="tool-section kv">
          <div>
            <label className="label">Min context (K tokens)</label>
            <input
              className="input"
              type="number"
              value={contextMinK}
              onChange={(e) => setContextMinK(parseInt(e.target.value || "0"))}
            />
          </div>
          <div>
            <label className="label">Prompt tokens</label>
            <input
              className="input"
              type="number"
              value={promptTokens}
              onChange={(e) => setPromptTokens(parseInt(e.target.value || "0"))}
            />
          </div>
          <div>
            <label className="label">Completion tokens</label>
            <input
              className="input"
              type="number"
              value={completionTokens}
              onChange={(e) =>
                setCompletionTokens(parseInt(e.target.value || "0"))
              }
            />
          </div>
        </div>

        <div className="kv tool-section">
          <label>
            <input
              type="checkbox"
              checked={needJSON}
              onChange={(e) => setNeedJSON(e.target.checked)}
            />{" "}
            JSON outputs
          </label>
          <label>
            <input
              type="checkbox"
              checked={needTools}
              onChange={(e) => setNeedTools(e.target.checked)}
            />{" "}
            Tool use
          </label>
          <label>
            <input
              type="checkbox"
              checked={needVision}
              onChange={(e) => setNeedVision(e.target.checked)}
            />{" "}
            Vision
          </label>
          <label>
            <input
              type="checkbox"
              checked={needReasoning}
              onChange={(e) => setNeedReasoning(e.target.checked)}
            />{" "}
            Reasoning
          </label>
        </div>

        <div className="tool-section" style={{ overflowX: "auto" }}>
          <table className="table table--compact">
            <thead>
              <tr>
                <th>Model</th>
                <th>Context</th>
                <th>Est. cost</th>
                <th>JSON</th>
                <th>Tools</th>
                <th>Vision</th>
                <th>Reasoning</th>
                <th>Use-cases</th>
                <th>Score</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.key}>
                  <td>
                    <strong>{r.name}</strong>
                  </td>
                  <td className="text-muted">{r.contextK}K</td>
                  <td>${r.totalCost.toFixed(6)}</td>
                  <td>{check(r.facts.jsonReliability)}</td>
                  <td>{check(r.facts.toolUse)}</td>
                  <td>{check(r.facts.vision)}</td>
                  <td>{check(r.facts.reasoning)}</td>
                  <td>
                    {r.facts.useCases.slice(0, 3).map((u) => (
                      <span key={u} className="use-chip">
                        {u}
                      </span>
                    ))}
                  </td>
                  <td>
                    <strong>{r.score.toFixed(2)}</strong>
                  </td>
                  <td>
                    <a
                      className="btn btn-secondary"
                      href={`/tools/token-cost?model=${encodeURIComponent(
                        r.key
                      )}`}
                    >
                      Use this
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="help">
          Transparent scoring: budgetWeight inversely favors cost;
          sliders/checkboxes add capability points.
        </div>
      </div>
    </div>
  );
}
