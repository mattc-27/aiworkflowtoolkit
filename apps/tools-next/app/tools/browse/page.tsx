"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { Search, Filter, X, ArrowRight } from "lucide-react";
import { tools } from "@/app/config/tools";
import { ALL_TAGS } from "@/app/config/tags";
import './browse.css'

export default function ToolsBrowsePage() {
  /** search (debounced for smoother filtering) */
  const [qInput, setQInput] = useState("");
  const [q, setQ] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setQ(qInput.trim().toLowerCase()), 160);
    return () => clearTimeout(t);
  }, [qInput]);

  /** tag filter + counts */
  const [tag, setTag] = useState<(typeof ALL_TAGS)[number]>("All");
  const counts = useMemo(() => {
    const map = new Map<string, number>();
    ALL_TAGS.forEach((t) => map.set(t, 0));
    tools.forEach((tool) => {
      tool.tags.forEach((t) => map.set(t, (map.get(t) || 0) + 1));
    });
    map.set("All", tools.length);
    return map;
  }, [tools]);

  /** filtered list */
  const filtered = useMemo(() => {
    return tools.filter((t) => {
      const matchesTag = tag === "All" || t.tags.includes(tag);
      const matchesText =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q);
      return matchesTag && matchesText;
    });
  }, [q, tag]);

  /** enter anim */
  const gridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".toolcard", {
        opacity: 0,
        y: 12,
        duration: 0.38,
        ease: "power2.out",
        stagger: 0.055,
      });
    }, gridRef);
    return () => ctx.revert();
  }, [filtered.length, tag, q]);

  /** keyboard nav for pills */
  const pillsRef = useRef<HTMLDivElement>(null);
  const onPillKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (!pillsRef.current) return;
    const pills = Array.from(
      pillsRef.current.querySelectorAll<HTMLButtonElement>(".pill")
    );
    if (e.key === "ArrowRight") {
      e.preventDefault();
      pills[(i + 1) % pills.length]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      pills[(i - 1 + pills.length) % pills.length]?.focus();
    }
  };

  return (
    <div className="page tools">
      {/* Header / intro */}
      <header className="tools-hero">
        <h1 className="h1">Tools</h1>
        <p>
          Fast wins for prompt engineering. Browse the launch set, or search and
          filter to find what you need.
        </p>
      </header>

      {/* Toolbar */}
      <div className="tools-toolbar">
        <div className="tools-search" role="search">
          <Search size={16} aria-hidden />
          <input
            aria-label="Search tools"
            placeholder="Search tools…"
            value={qInput}
            onChange={(e) => setQInput(e.target.value)}
          />
          {qInput && (
            <button
              type="button"
              className="search-clear"
              aria-label="Clear search"
              onClick={() => setQInput("")}
            >
              <X size={14} aria-hidden />
            </button>
          )}
        </div>

        <div
          ref={pillsRef}
          className="filter-pills"
          role="tablist"
          aria-label="Filter tools"
        >
          {ALL_TAGS.map((t, i) => (
            <button
              key={t}
              className={`pill ${tag === t ? "is-active" : ""}`}
              role="tab"
              aria-selected={tag === t}
              onClick={() => setTag(t)}
              onKeyDown={(e) => onPillKey(e, i)}
            >
              <Filter size={14} aria-hidden style={{ opacity: 0.8 }} />
              {t} <span className="pill-count">{counts.get(t)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section aria-labelledby="launch-title" className="tools-section">
        <div className="section-head">
          <div className="section-kicker">Launch Set</div>
          <h2 id="launch-title" className="h3">
            Fast wins for prompt engineering.
          </h2>
        </div>

        <div className="grid-cards" ref={gridRef}>
          {filtered.map((t) => (
            <Link
              prefetch
              key={t.slug}
              href={`/tools/${t.slug}`}
              className="toolcard tool-card"
              aria-label={`Open ${t.title}`}
            >
              <div className="toolcard-head">
                <div className="toolcard-title">{t.title}</div>
                <span className="toolcard-badge">{t.tags[0]}</span>
              </div>
              <p className="toolcard-desc">{t.desc}</p>
              <div className="toolcard-cta">
                Open tool <ArrowRight size={14} aria-hidden />
              </div>
            </Link>
          ))}

          {filtered.length === 0 && (
            <div className="toolcard tool-card empty">
              <div className="section-kicker">No matches</div>
              <div className="h3" style={{ margin: "4px 0 6px" }}>
                Nothing found
              </div>
              <p className="help">Try clearing search or switching filters.</p>
              <div style={{ marginTop: 10 }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setQInput("");
                    setTag("All");
                  }}
                >
                  Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
