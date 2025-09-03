"use client";

import "./docs.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const GROUPS = [
  {
    label: "Getting Started",
    items: [
      { label: "Overview", href: "/docs#overview" },
      { label: "Token → Cost", href: "/docs#token-cost" },
      { label: "Prompt Compression", href: "/docs#compression" },
      { label: "Prompt → JSON Schema", href: "/docs#json-schema" },
    ],
  },
  {
    label: "Workflows",
    items: [
      { label: "Compression → Cost", href: "/docs#flow-compress-cost" },
      { label: "Schema-first outputs", href: "/docs#flow-schema-first" },
      { label: "Comparing providers", href: "/docs#providers" },
    ],
  },
  {
    label: "Notes",
    items: [
      { label: "Model coverage", href: "/docs#model-coverage" },
      { label: "Privacy", href: "/docs#privacy" },
      { label: "Feedback", href: "/docs#feedback" },
    ],
  },
];

export default function DocsClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [q, setQ] = useState("");

  const filtered = GROUPS.map((g) => ({
    ...g,
    items: g.items.filter((i) =>
      i.label.toLowerCase().includes(q.toLowerCase())
    ),
  }));

  // Close mobile sidebar when clicking an in-page anchor
  useEffect(() => {
    const onClick = (e: Event) => {
      const el = e.target as HTMLElement | null;
      if (el?.closest("a[href^='#']")) {
        document.querySelector(".docs-root")?.classList.remove("sidebar-open");
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="docs-root fullbleed-docs">
      {/* Header */}
      <header className="docs-topbar" role="banner">
        <div className="docs-container topbar-row">
          <div className="topbar-left">
            <Link
              href="/"
              className="docs-brand"
              aria-label="AI Workflow Toolkit (Home)"
            >
              AI Workflow Toolkit
            </Link>
            <nav className="docs-toplinks" aria-label="Site">
              <Link href="/tools">Workflow</Link>
              <span aria-hidden>·</span>
              <Link href="/tools/browse">Browse Tools</Link>
              <span aria-hidden>·</span>
              <Link href="/docs" className="is-active">
                Docs
              </Link>
            </nav>
          </div>

          <div className="topbar-right">
            <button
              className="topbar-menu-btn"
              aria-label="Open sections"
              onClick={() =>
                document
                  .querySelector(".docs-root")
                  ?.classList.add("sidebar-open")
              }
            >
              Sections
            </button>

            <form
              className="topbar-search"
              role="search"
              onSubmit={(e) => e.preventDefault()}
            >
              <Search size={16} aria-hidden />
              <input
                type="search"
                placeholder="Search docs…"
                aria-label="Search docs"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </form>
          </div>
        </div>
      </header>

      {/* Main grid */}
      <div className="docs-body">
        <div className="docs-container docs-grid">
          {/* Overlay for mobile */}
          <div
            className="sidebar-overlay"
            onClick={() =>
              document
                .querySelector(".docs-root")
                ?.classList.remove("sidebar-open")
            }
            aria-hidden
          />

          {/* Left sidebar */}
          <aside className="docs-sidebar" aria-label="Sections">
            {filtered.map((group) => (
              <nav key={group.label} className="side-group">
                <button
                  className="side-group-title"
                  data-collapsible
                  aria-expanded="true"
                  aria-controls={`list-${group.label}`}
                >
                  {group.label}
                </button>
                <ul id={`list-${group.label}`} className="side-list">
                  {group.items.length ? (
                    group.items.map((i) => (
                      <li key={i.href}>
                        <a href={i.href} data-navlink>
                          {i.label}
                        </a>
                      </li>
                    ))
                  ) : (
                    <li className="side-empty">No matches</li>
                  )}
                </ul>
              </nav>
            ))}
          </aside>

          {/* Center content */}
          <main className="docs-content" id="main" role="main">
            {children}
          </main>

          {/* Right TOC */}
          <aside className="docs-toc" aria-label="On this page">
            <div className="docs-toc-title">On this page</div>
            <nav id="toc-list" />
          </aside>
        </div>
      </div>

      {/* Footer */}
      <footer className="docs-footer" role="contentinfo">
        <div className="docs-container">
          <small>
            Need the tools? <a href="/tools">Open the Workflow</a> or{" "}
            <a href="/tools/browse">Browse Tools</a>.
          </small>
        </div>
      </footer>
    </div>
  );
}
