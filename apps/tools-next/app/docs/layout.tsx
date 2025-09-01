import type { Metadata } from "next";
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
  return <DocsClientLayout>{children}</DocsClientLayout>;
}
