import Link from "next/link";
import Image from "next/image";
import "./globals.css";

import {
  Calculator,
  Scissors,
  Braces,
  ArrowRight,
  Users,
  Code2,
  ServerCog,
  Sparkles,
} from "lucide-react";

export default function Page() {
  return (
    <main id="main" className="page" role="main" aria-labelledby="home-title">
      {/* HERO (left content, right visual) */}
      <section className="hero-left container-wide" aria-label="Hero">
        <div className="hero-grid">
          {/* Left: copy */}
          <div className="hero-copy">
            <h1 id="home-title" className="hero2-title">
              AI workflow tools for developers, systems analysts, and creators
            </h1>
            <p className="hero2-lead">
              Estimate costs, compress prompts, and generate JSON Schemas—all in
              one place. Run in your browser, no accounts required.
            </p>
            <div
              className="hero2-ctas"
              role="group"
              aria-label="Primary actions"
            >
              <Link prefetch href="/tools" className="btn btn-primary">
                Open tools now
              </Link>
              <Link
                prefetch
                href="/tools/token-cost"
                className="btn btn-secondary"
              >
                Try Cost Calculator <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            {/* quick trust strip */}
            <div className="trust-strip" aria-label="Highlights">
              <span className="badge">
                <Sparkles size={14} aria-hidden="true" /> No data stored
              </span>
              <span className="badge">Export and copy results</span>
              <span className="badge">Cross-tool bridges</span>
            </div>
          </div>

          {/* Right: image placeholder (drop your Canva image here) */}
          <div className="hero-visual" aria-hidden="true">
            <figure className="hero-art hero-art--softfade">
              <Image
                src="/ai-toolkit-1.png"
                alt="Preview of AI Toolkit"
                fill
                priority
                sizes="(min-width: 980px) 560px, 92vw"
                className="hero-img"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* WHO IT’S FOR (cards) */}
      <section className="section section--who" aria-labelledby="who-title">
        <h2 id="who-title" className="section-title lg">
          Clear value for different workflows
        </h2>
        <p className="section-sub lg">Clear value for different workflows.</p>

        <div className="who-cards">
          <article className="who-card">
            <div className="who-head">
              <Code2 size={18} aria-hidden="true" /> Developers
            </div>
            <p className="who-copy">
              Ship faster with predictable costs and structured outputs.
            </p>
            <ul className="who-list">
              <li>Cost breakdown JSON for CI</li>
              <li>Compression + re-cost in one click</li>
              <li>Schema generation for contracts, APIs, and validators</li>
            </ul>
          </article>

          <article className="who-card">
            <div className="who-head">
              <ServerCog size={18} aria-hidden="true" /> Systems &amp; Ops
              Analysts
            </div>
            <p className="who-copy">
              Ensure predictable costs and reliable outputs before rolling into
              production systems.
            </p>
            <ul className="who-list">
              <li>Forecast token usage and costs</li>
              <li>Validate structured outputs</li>
              <li>Benchmark providers before deployment</li>
            </ul>
          </article>

          <article className="who-card">
            <div className="who-head">
              <Users size={18} aria-hidden="true" /> Creators
            </div>
            <p className="who-copy">
              Share prompts and artifacts your audience can reuse.
            </p>
            <ul className="who-list">
              <li>Public share links</li>
              <li>Readable, styled outputs</li>
              <li>Bridges across related tools</li>
            </ul>
          </article>
        </div>
      </section>

      {/* One unified band: Benefits + Tools */}
      <section className="full-bleed band--light section section--suite">
        <div className="container">
          <header className="section-head">
            <h2 className="section-title">
              Streamline costs, prompts, and structure—side by side
            </h2>
            <p className="section-sub">
              Practical utilities designed for real projects. Move between tools
              without friction, export outputs you can reuse anywhere.
            </p>
          </header>

          {/* Row A: benefits */}
          <div className="suite-grid suite-grid--benefits">
            <article className="info-card">
              <div className="info-head">
                <span className="icon-bubble icon-indigo" aria-hidden="true">
                  <Calculator size={18} />
                </span>
                <h3 className="info-title">Know the cost before you ship</h3>
              </div>
              <p className="info-desc">
                Estimate per-request spend across multiple models. Export JSON
                breakdowns for CI or reviews → predictable costs, fewer
                surprises.
              </p>
            </article>

            <article className="info-card">
              <div className="info-head">
                <span className="icon-bubble icon-emerald" aria-hidden="true">
                  <Scissors size={18} />
                </span>
                <h3 className="info-title">Shrink prompts, keep meaning</h3>
              </div>
              <p className="info-desc">
                Trim filler and normalize structure, then re-cost to confirm
                savings → reduce wasted tokens before deployment.
              </p>
            </article>

            <article className="info-card">
              <div className="info-head">
                <span className="icon-bubble icon-violet" aria-hidden="true">
                  <Braces size={18} />
                </span>
                <h3 className="info-title">
                  Lock in structure with JSON Schema
                </h3>
              </div>
              <p className="info-desc">
                Describe fields in plain English and get a copyable schema →
                consistent outputs that integrate cleanly with your systems.
              </p>
            </article>
          </div>

          {/* Row B: concrete tools */}
          <div className="suite-grid suite-grid--tools">
            <Link
              prefetch
              href="/tools/token-cost"
              className="tool-card-mini"
              aria-label="Open Token to Cost Calculator"
            >
              <div className="tool-mini-body">
                <div className="tool-mini-title">Token → Cost Calculator</div>
                <p className="tool-mini-desc">
                  Paste a prompt + sample completion and compare model costs
                  instantly.
                </p>
              </div>
              <div className="tool-mini-cta">Open tool →</div>
            </Link>

            <Link
              prefetch
              href="/tools/prompt-compression"
              className="tool-card-mini"
              aria-label="Open Prompt Compression Optimizer"
            >
              <div className="tool-mini-body">
                <div className="tool-mini-title">
                  Prompt Compression Optimizer
                </div>
                <p className="tool-mini-desc">
                  Reduce tokens, then send directly to the cost calculator with
                  one click.
                </p>
              </div>
              <div className="tool-mini-cta">Open tool →</div>
            </Link>

            <Link
              prefetch
              href="/tools/prompt-to-json-schema"
              className="tool-card-mini"
              aria-label="Open Prompt to JSON Schema"
            >
              <div className="tool-mini-body">
                <div className="tool-mini-title">Prompt → JSON Schema</div>
                <p className="tool-mini-desc">
                  Turn natural language into strict schema. Copy or download for
                  reuse.
                </p>
              </div>
              <div className="tool-mini-cta">Open tool →</div>
            </Link>
          </div>
        </div>
      </section>

      <hr className="hr-band" aria-hidden />

      {/* Get Started CTA */}
      <section
        className="section container-wide getstarted"
        aria-labelledby="getstarted-title"
      >
        <div className="getstarted-inner">
          <div>
            <h2 id="getstarted-title" className="section-title lg">
              Try the AI Workflow Toolkit now
            </h2>
            <p className="section-sub lg">
              No signup. No installs. Open a tool and start testing.
            </p>
          </div>

          <div
            className="getstarted-actions"
            role="group"
            aria-label="Get started actions"
          >
            <Link prefetch href="/tools" className="btn btn-primary">
              Explore Tools
            </Link>
            <Link prefetch href="/docs" className="btn btn-secondary">
              View Docs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
