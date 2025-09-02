import { Suspense } from "react";
import ToolsClientLayout from "./ToolsClientLayout";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <main className="page tool">
          <p>Loading…</p>
        </main>
      }
    >
      <ToolsClientLayout>{children}</ToolsClientLayout>
    </Suspense>
  );
}
