"use client";

import "./flow.css";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CheckCircle2, Circle, SkipForward, ArrowRight } from "lucide-react";

import TokenCostTool from "@/app/components/tools/TokenCostTool";
import PromptCompressTool from "@/app/components/tools/PromptCompressTool";
import PromptToJsonSchemaTool from "@/app/components/tools/PromptToJsonSchemaTool";

type StepStatus = "idle" | "active" | "completed" | "skipped";
type StepId = "baseline" | "compression" | "schema" | "calculator";

interface Step {
  id: StepId;
  title: string;
  subtitle?: string;
  optional?: boolean;
  status: StepStatus;
}

function StatusIcon({ status }: { status: StepStatus }) {
  if (status === "completed") return <CheckCircle2 className="ic" />;
  return <Circle className="ic" />;
}

export default function FlowPage() {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: "baseline",
      title: "Baseline Calculator",
      subtitle: "Optional — get a before snapshot",
      optional: true,
      status: "active",
    },
    {
      id: "compression",
      title: "Compression",
      subtitle: "Tighten without losing intent",
      status: "idle",
    },
    {
      id: "schema",
      title: "Schema",
      subtitle: "Define structured output",
      status: "idle",
    },
    {
      id: "calculator",
      title: "Calculator / Re-calc",
      subtitle: "Estimate cost & iterate",
      status: "idle",
    },
  ]);

  const activeIndex = steps.findIndex((s) => s.status === "active");

  // Refs for GSAP
  const contentRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLOListElement | null>(null);
  const stepKey = steps[activeIndex]?.id;

  // Animate content on step change
  useLayoutEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }
      );
    }, contentRef);
    return () => ctx.revert();
  }, [stepKey]);

  // Pulse the active step
  useLayoutEffect(() => {
    if (!listRef.current) return;
    const items = listRef.current.querySelectorAll("li");
    const activeLi = items[activeIndex];
    if (activeLi) {
      gsap.fromTo(
        activeLi,
        { scale: 0.98 },
        { scale: 1, duration: 0.18, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  const next = (as: "completed" | "skipped") => {
    setSteps((curr) => {
      const idx = curr.findIndex((s) => s.status === "active");
      if (idx === -1) return curr;
      const updated = curr.map((s, i) =>
        i === idx ? { ...s, status: as } : s
      );
      const nextIdx = Math.min(idx + 1, curr.length - 1);
      if (nextIdx !== idx)
        updated[nextIdx] = { ...updated[nextIdx], status: "active" };
      return updated;
    });
  };

  const goTo = (index: number) => {
    setSteps((curr) =>
      curr.map((s, i) => {
        if (i < index)
          return {
            ...s,
            status: s.status === "skipped" ? "skipped" : "completed",
          };
        if (i === index) return { ...s, status: "active" };
        return { ...s, status: s.status === "skipped" ? "skipped" : "idle" };
      })
    );
  };

  const renderStep = () => {
    const id = steps[activeIndex]?.id;
    switch (id) {
      case "baseline":
        return (
          <>
            <header className="tool-header">
              <h1 className="h1">Token → Cost Calculator</h1>
            </header>
            <TokenCostTool />
          </>
        );
      case "compression":
        return (
          <>
            <header className="tool-header">
              <h1 className="h1">Prompt Compression Optimizer</h1>
            </header>
            <PromptCompressTool />
          </>
        );
      case "schema":
        return (
          <>
            <header className="tool-header">
              <h1 className="h1">Prompt → JSON Schema Generator</h1>
            </header>
            <PromptToJsonSchemaTool />
          </>
        );
      case "calculator":
        return (
          <>
            <header className="tool-header">
              <h1 className="h1">Recalculate & Iterate</h1>
            </header>
            <TokenCostTool />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <main className="page tool">
      <div className="flow-layout">
        {/* Left Stepper */}
        <aside className="flow-sidebar">
          <nav className="flow-panel" aria-label="Workflow">
            <div className="flow-head">Workflow</div>
            <ol className="flow-list" ref={listRef}>
              {steps.map((s, i) => {
                const isActive = s.status === "active";
                return (
                  <li
                    key={s.id}
                    className={`flow-step${isActive ? " is-active" : ""}`}
                    onClick={() => goTo(i)}
                  >
                    <span className="flow-step__num">{i + 1}</span>
                    <div className="flow-step__title">
                      {s.title}
                      {s.optional && (
                        <span className="badge-optional">optional</span>
                      )}
                    </div>
                    {s.subtitle && (
                      <div className="flow-step__subtitle">{s.subtitle}</div>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>

        {/* Right Content */}
        <section className="flow-content">
          <div className="tool-card" ref={contentRef}>
            {renderStep()}

            <div className="flow-controls">
              <div className="flow-dots">
                {steps.map((s, i) => (
                  <span
                    key={s.id}
                    className={`dot ${
                      s.status === "completed"
                        ? "dot-done"
                        : s.status === "active"
                        ? "dot-active"
                        : "dot-idle"
                    }`}
                    title={`${i + 1}. ${s.title} — ${s.status}`}
                  />
                ))}
              </div>
              <div className="flow-actions">
                <button
                  className="btn btn-ghost btn-lg"
                  onClick={() => next("skipped")}
                >
                  <SkipForward className="ic" /> Skip
                </button>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => next("completed")}
                >
                  Next <ArrowRight className="ic" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
