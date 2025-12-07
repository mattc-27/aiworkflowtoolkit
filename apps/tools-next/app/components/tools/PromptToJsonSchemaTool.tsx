"use client";

import { useMemo, useState } from "react";
import { buildZodFromSpec, toJsonSchema } from "../../../lib/schema/build";
import "../../tools/style.css"

export default function PromptToJsonSchemaTool() {
  const [spec, setSpec] = useState(
    `name: string
email: email
age: number min=0 max=120
newsletterOptIn: boolean optional
role: enum(admin|editor|viewer)`
  );

  const schema = useMemo(() => {
    try {
      const zod = buildZodFromSpec(spec);
      return JSON.stringify(toJsonSchema(zod), null, 2);
    } catch {
      return "";
    }
  }, [spec]);

  return (
    <section className="tool-card json2s-card" aria-label="Schema form">
      <div className="json2s-grid">
        <div className="json2s-leftcol">
          <label className="label" htmlFor="spec">Describe your fields (one per line)</label>
          <textarea
            id="spec"
            className="textarea textarea-xl json2s-textarea"
            value={spec}
            onChange={(e) => setSpec(e.target.value)}
          />

          <div className="hint json2s-hint">
            Examples: <code>email: email</code>, <code>age: number min=0 max=120</code>,{" "}
            <code>role: enum(admin|editor|viewer)</code>, <code>tags: string optional</code>
          </div>

          <div className="json2s-actions">
            <button
              className="btn btn-primary"
              onClick={() => navigator.clipboard.writeText(schema)}
              disabled={!schema}
            >
              Copy JSON
            </button>
            <button
              className="btn btn-secondary"
              disabled={!schema}
              onClick={() => {
                const blob = new Blob([schema], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "schema.json";
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
              }}
            >
              Download .json
            </button>
          </div>
        </div>

        <div className="json2s-right">
          <div className="output-panel json2s-output" aria-live="polite">
            <pre className="json2s-pre">{schema || "/* Schema will appear here */"}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}
