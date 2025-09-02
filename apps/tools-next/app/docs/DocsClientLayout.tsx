"use client";

import "./docs.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

// (same GROUPS + component body you already have)
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

  useEffect(() => {
    const onClick = (e: Event) => {
      const a = e.target as HTMLElement;
      if (a.tagName !== "A") return;
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="docs-root fullbleed-docs">
      {/* Topbar */}
      <header className="docs-topbar" role="banner">
        <div className="docs-container topbar-row">
          <div className="topbar-left">
            <Link
              href="/"
              className="docs-brand"
              aria-label="AI Tools Hub (Home)"
            >
              AI Tools Hub
            </Link>
            <nav className="docs-toplinks" aria-label="Site">
              <Link href="/tools">Tools</Link>
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
              ☰ Sections
            </button>

            <div className="topbar-search" role="search">
              <Search size={16} aria-hidden />
              <input
                type="search"
                placeholder="Search docs…"
                aria-label="Search docs"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>

            <div className="version-chip" title="Docs version">
              stable
            </div>
          </div>
        </div>
      </header>

      {/* Main grid */}
      <div className="docs-container docs-grid">
        <div
          className="sidebar-overlay"
          onClick={() =>
            document
              .querySelector(".docs-root")
              ?.classList.remove("sidebar-open")
          }
        />
        <aside className="docs-sidebar" aria-label="Sections">
          <button
            className="topbar-menu-btn"
            style={{ marginBottom: 8, display: "none" }}
            onClick={() =>
              document
                .querySelector(".docs-root")
                ?.classList.remove("sidebar-open")
            }
          >
            Close
          </button>
          {filtered.map((group) => (
            <nav key={group.label} className="side-group">
              <button
                className="side-group-title"
                aria-expanded="true"
                data-collapsible
              >
                {group.label}
              </button>
              <ul className="side-list">
                {group.items.length === 0 && (
                  <li className="side-empty">No matches</li>
                )}
                {group.items.map((i) => (
                  <li key={i.href}>
                    <a href={i.href} data-navlink>
                      {i.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </aside>

        <main className="docs-content" id="main">
          {children}
        </main>

        <aside className="docs-toc" aria-label="On this page">
          <div className="docs-toc-title">On this page</div>
          <nav id="toc-list" />
        </aside>
      </div>

      <footer className="docs-footer" role="contentinfo">
        <div className="docs-container">
          © {new Date().getFullYear()} AI Tools Hub ·{" "}
          <a href="https://github.com/mattc-27/aiworkflowtoolkit">GitHub</a> ·{" "}
          <a href="mailto:mattc927.dev@gmail.com">Contact</a>
        </div>
      </footer>
    </div>
  );
}
