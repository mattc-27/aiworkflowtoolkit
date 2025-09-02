"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { compressPrompt } from "../../../lib/compress";
import { countTokens } from "../../../lib/tokenize";
import {
  boolFromParam,
  buildTokenCostUrl,
  buildCompressorUrl,
} from "../../../lib/links";

export default function PromptCompressPage() {
  const router = useRouter();
  const search = useSearchParams();

  // Prefill from URL (?input=...&aggressive=1)
  const initialInput = search.get("input")
    ? decodeURIComponent(search.get("input") as string)
    : "";
  const initialAggressive = boolFromParam(search.get("aggressive"));

  const [input, setInput] = useState(initialInput);
  const [aggressive, setAggressive] = useState(initialAggressive);
  const [alsoUseAsCompletion, setAlsoUseAsCompletion] = useState(false);

  const [originalTokens, setOriginalTokens] = useState(0);
  const [compressedTokens, setCompressedTokens] = useState(0);

  const result = useMemo(
    () => compressPrompt(input, { aggressive }),
    [input, aggressive]
  );

  useEffect(() => {
    let alive = true;
    (async () => {
      const o = await countTokens(result.original);
      const c = await countTokens(result.compressed);
      if (!alive) return;
      setOriginalTokens(o);
      setCompressedTokens(c);
    })();
    return () => {
      alive = false;
    };
  }, [result.original, result.compressed]);

  function goToTokenCost() {
    const url = buildTokenCostUrl({
      prompt: result.compressed,
      completion: alsoUseAsCompletion ? result.compressed : undefined,
    });
    router.push(url);
  }

  function copyShareLink() {
    const url = `${window.location.origin}${buildCompressorUrl({
      input,
      aggressive,
    })}`;
    navigator.clipboard.writeText(url).catch(() => {});
  }

  return (
    <div className="tool">
      <h1 className="h1">Prompt Compression Optimizer</h1>
      <div className="card tool-card tool-section">
        <label className="label">Enter Prompt</label>
        <textarea
          className="textarea textarea-xl"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="kv tool-section">
          <label>
            <input
              type="checkbox"
              checked={aggressive}
              onChange={(e) => setAggressive(e.target.checked)}
            />{" "}
            Aggressive mode
          </label>
          <label>
            <input
              type="checkbox"
              checked={alsoUseAsCompletion}
              onChange={(e) => setAlsoUseAsCompletion(e.target.checked)}
            />{" "}
            Use compressed as completion too
          </label>
        </div>

        <div className="actions">
          <button className="btn btn-secondary" onClick={copyShareLink}>
            Copy share link
          </button>
          <button className="btn btn-primary" onClick={goToTokenCost}>
            Recalculate cost with this compressed prompt
          </button>
        </div>

        <div className="tool-section">
          <div className="label">Original</div>
          <div className="output-panel">{result.original}</div>
          <div className="help">~ {originalTokens} tokens</div>
        </div>

        <div className="tool-section">
          <div className="label">Compressed</div>
          <div className="output-panel">{result.compressed}</div>
          <div className="help">~ {compressedTokens} tokens</div>
        </div>

        <div className="help">
          Saved: <strong>{result.savedChars}</strong> chars (~
          {result.savedPercent}%).
        </div>
      </div>
    </div>
  );
}
