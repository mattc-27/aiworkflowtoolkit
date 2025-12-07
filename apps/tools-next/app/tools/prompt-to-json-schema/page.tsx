"use client";
import PromptToJsonSchemaTool from "@/app/components/tools/PromptToJsonSchemaTool";

export default function PromptToJsonSchemaPage() {
  return (
    <main className="page tool">
      <header className="tool-header">
        <h1 className="h1">Prompt → JSON Schema Generator</h1>
      </header>
      <PromptToJsonSchemaTool />
      {/* The compare table section from your current page can remain here if you want it ONLY on the standalone page */}
    </main>
  );
}
