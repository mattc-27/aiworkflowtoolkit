import type { Metadata } from "next";
import { Suspense } from "react";
import "../globals.css";
import ChangelogClientLayout from "./ChangelogClientLayout";

export const metadata: Metadata = {
  title: "Docs — AI Workflow Toolkit",
  description: "Docs and quick guides for the AI Workflow Toolkit.",
};

export default function ChangelogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="docs-root">
          <main className="docs-content" id="main">
            <p>Loading changelog…</p>
          </main>
        </div>
      }
    >
      <ChangelogClientLayout>{children}</ChangelogClientLayout>
    </Suspense>
  );
}
