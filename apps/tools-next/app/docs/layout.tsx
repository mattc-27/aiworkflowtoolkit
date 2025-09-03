import type { Metadata } from "next";
import { Suspense } from "react";
import "../globals.css";
import DocsClientLayout from "./DocsClientLayout";

export const metadata: Metadata = {
  title: "Docs — AI Workflow Toolkit",
  description: "Docs and quick guides for the AI Workflow Toolkit.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="docs-root fullbleed-docs">
          <main className="docs-content" id="main">
            <p>Loading docs…</p>
          </main>
        </div>
      }
    >
      <DocsClientLayout>{children}</DocsClientLayout>
    </Suspense>
  );
}
