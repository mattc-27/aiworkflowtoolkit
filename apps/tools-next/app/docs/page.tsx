"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function DocsPage() {
  useEffect(() => {
    // Build right-side TOC from h2s
    const headings = Array.from(
      document.querySelectorAll<HTMLHeadingElement>(".docs-content h2[id]")
    );
    const toc = document.getElementById("toc-list");
    if (toc) {
      toc.innerHTML = "";
      headings.forEach((h) => {
        const a = document.createElement("a");
        a.href = `#${h.id}`;
        a.textContent = h.textContent || "";
        toc.appendChild(a);
      });
    }

    // Scrollspy: highlight TOC + left nav
    const linksRight = toc
      ? Array.from(toc.querySelectorAll<HTMLAnchorElement>("a"))
      : [];
    const leftLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-navlink]")
    );
    const linkMap = new Map<string, HTMLAnchorElement>();
    [...linksRight, ...leftLinks].forEach((a) =>
      linkMap.set(a.getAttribute("href")!, a)
    );

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const id = `#${e.target.id}`;
          const el = linkMap.get(id);
          if (!el) return;
          if (el.closest("#toc-list")) {
            linksRight.forEach((l) => l.classList.toggle("active", l === el));
          } else {
            leftLinks.forEach((l) => l.classList.toggle("is-active", l === el));
          }
        });
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0.1 }
    );

    headings.forEach((h) => {
      if (!h.querySelector(".autolink")) {
        const al = document.createElement("a");
        al.href = `#${h.id}`;
        al.className = "autolink";
        al.textContent = "🔗";
        h.appendChild(al);
      }
      obs.observe(h);
    });

    // Collapsible groups
    document
      .querySelectorAll<HTMLButtonElement>("[data-collapsible]")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          const list = btn.nextElementSibling as HTMLElement | null;
          if (!list) return;
          const expanded = btn.getAttribute("aria-expanded") === "true";
          btn.setAttribute("aria-expanded", (!expanded).toString());
          list.style.display = expanded ? "none" : "block";
        });
      });

    // Code copy buttons
    document.querySelectorAll("pre").forEach((pre) => {
      if (pre.querySelector(".copy-btn")) return;
      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "Copy";
      btn.addEventListener("click", async () => {
        const text = pre.textContent || "";
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = "Copied!";
          setTimeout(() => (btn.textContent = "Copy"), 1500);
        } catch {
          btn.textContent = "Error";
          setTimeout(() => (btn.textContent = "Copy"), 1500);
        }
      });
      pre.appendChild(btn);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <article>
      <header>
        <h1 id="overview">Docs & Guides</h1>
        <p className="lead">
          Short, practical notes to get results quickly. No fluff.
        </p>
        <hr />
      </header>

      {/* Token → Cost */}
      <section id="token-cost">
        <h2>Token → Cost</h2>
        <p>
          Paste your prompt and a sample completion to estimate costs across
          models. Export JSON for CI or reviews.
        </p>
        <p>
          <Link href="/tools/token-cost">Open the calculator →</Link>
        </p>
        <div className="callout">
          <strong>Tip:</strong> Add a realistic sample completion—completion
          tokens often dominate cost.
        </div>
        <pre>{`{
  "model": "gpt-4o-mini",
  "prompt_tokens": 128,
  "completion_tokens": 512
}`}</pre>
      </section>

      <section className="example-block" aria-labelledby="ex-cost">
        <div className="example-head">
          <h3 id="ex-cost" className="example-title">
            Example
          </h3>
          <p className="example-desc">
            Realistic prompt + completion so cost reflects both sides.
          </p>
        </div>

        <div className="example-grid">
          <div>
            <div className="label">Prompt</div>
            <pre className="example-pre">{`Summarize the following meeting notes into:
- 3 bullet highlights
- 2 action items with owners
- 1 risk

Notes:
- Marketing requests product screenshots by Friday.
- Data team waiting on API quota.
- Launch date tentatively Oct 12.`}</pre>
          </div>
          <div>
            <div className="label">Sample completion</div>
            <pre className="example-pre">{`Highlights:
• Screenshots needed by Fri
• API quota blocks data work
• Tentative launch Oct 12

Actions:
• @Sam: deliver 6 screenshots by Thu EOD
• @Priya: confirm API quota increase with vendor

Risk:
• Delay if quota not approved by Wednesday.`}</pre>
          </div>
        </div>

        <div className="usecase-card">
          <div className="usecase-title">
            Use-case: forecast spend before choosing a model
          </div>
          <p className="usecase-p">
            Paste a representative prompt and completion to compare{" "}
            <em>per-request</em> totals across models. For planning
            spreadsheets, export the JSON breakdown and multiply by your
            expected daily volume.
          </p>
        </div>
      </section>

      {/* Prompt Compression */}
      <section id="compression">
        <h2>Prompt Compression</h2>
        <p>
          Trim filler and normalize structure; re-cost to validate savings—no
          guessing.
        </p>
        <p>
          <Link href="/tools/prompt-compress">Open compression →</Link>
        </p>
      </section>

      <section className="example-block" aria-labelledby="ex-compress">
        <div className="example-head">
          <h3 id="ex-compress" className="example-title">
            Example
          </h3>
          <p className="example-desc">
            Trim filler and standardize phrasing, then re-cost to verify
            savings.
          </p>
        </div>

        <div className="example-grid">
          <div>
            <div className="label">Original (noisy)</div>
            <pre className="example-pre">{`Hey there! Could you please, like, read the customer's message and maybe figure out
if it's a bug report or just general feedback? If it's a bug, we also want the
product area and severity if you can guess it. Thanks a ton!`}</pre>
          </div>
          <div>
            <div className="label">Compressed (intent-keeping)</div>
            <pre className="example-out">{`Classify the message.
Return JSON: { "type": "bug|feedback", "area": "string?", "severity": "low|med|high?" }`}</pre>
          </div>
        </div>

        <div className="usecase-card">
          <div className="usecase-title">Use-case: support triage at scale</div>
          <p className="usecase-p">
            Compress the triage prompt used by your helpdesk bot to cut tokens
            per ticket. Click “Recalculate cost” with this compressed prompt to
            confirm savings for your daily volume.
          </p>
        </div>
      </section>

      {/* Prompt → JSON Schema */}
      <section id="json-schema">
        <h2>Prompt → JSON Schema</h2>
        <p>
          Describe fields in natural language and generate a strict schema for
          predictable outputs.
        </p>
        <p>
          <Link href="/tools/prompt-to-json-schema">Open schema tool →</Link>
        </p>
      </section>

      <section className="example-block" aria-labelledby="ex-schema">
        <div className="example-head">
          <h3 id="ex-schema" className="example-title">
            Example
          </h3>
          <p className="example-desc">
            Describe fields in English → get a strict, copyable schema.
          </p>
        </div>

        <div className="example-grid">
          <div>
            <div className="label">Field descriptions</div>
            <pre className="example-pre">{`name: string
email: email
age: number min=0 max=120
newsletterOptIn: boolean optional
role: enum(admin|editor|viewer)`}</pre>
          </div>
          <div>
            <div className="label">Generated schema (preview)</div>
            <pre className="example-out">{`{
  "type": "object",
  "required": ["name", "email","age","role"],
  "properties": {
    "name": { "type": "string" },
    "email": { "type": "string", "format": "email" },
    "age":   { "type": "number", "minimum": 0, "maximum": 120 },
    "newsletterOptIn": { "type": "boolean" },
    "role":  { "type": "string", "enum": ["admin","editor","viewer"] }
  },
  "additionalProperties": false
}`}</pre>
          </div>
        </div>

        <div className="usecase-card">
          <div className="usecase-title">
            Use-case: schema-first integrations
          </div>
          <p className="usecase-p">
            Generate a JSON Schema for forms, contracts, or API outputs. Use it
            to validate responses in your pipeline, preventing downstream
            parsing errors.
          </p>
        </div>
      </section>

      {/* Workflows */}
      <section id="flow-compress-cost">
        <h2>Workflow: Compression → Cost</h2>
        <p>
          Compress the prompt, then immediately re-cost to confirm savings.
          Repeat until targets are met.
        </p>
      </section>

      <section id="flow-schema-first">
        <h2>Workflow: Schema-first outputs</h2>
        <p>
          Define the schema first, then tune prompts to satisfy required fields
          and types.
        </p>
      </section>

      {/* Notes */}
      <section id="providers">
        <h2>Comparing providers</h2>
        <p>
          Costs vary widely across models and vendors—always measure with your
          own prompts and outputs.
        </p>
      </section>

      <section id="model-coverage">
        <h2>Model coverage</h2>
        <p>
          The calculator includes current providers and models common in
          production; we add new ones regularly.
        </p>
      </section>

      <section id="privacy">
        <h2>Privacy</h2>
        <p>
          No accounts, no servers: all tools run in your browser. Your inputs
          never leave the page.
        </p>
      </section>

      <section id="feedback">
        <h2>Feedback</h2>
        <p>
          Found a bug or want a feature? Open an issue on GitHub or drop a note
          via the footer link.
        </p>
      </section>
    </article>
  );
}
