import { Suspense } from "react";
import PromptCompressionClient from "./client";

export default function PromptCompressionPage() {
  return (
    <Suspense
      fallback={
        <main className="page tool">
          <header className="tool-header">
            <h1 className="h1">Prompt Compression Optimizer</h1>
          </header>
          <p>Loading…</p>
        </main>
      }
    >
      <PromptCompressionClient />
    </Suspense>
  );
}
