"use client";

// Put any client-only logic/providers specific to the tools area here.
// For now it just renders children to preserve current behavior.

export default function ChangelogClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
