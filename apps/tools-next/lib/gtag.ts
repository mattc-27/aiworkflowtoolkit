// lib/gtag.ts
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

declare global {
  interface Window {
    // Minimal gtag typing
    gtag?: (...args: unknown[]) => void;
  }
}

export function pageview(url: string): void {
  if (!GA_ID || typeof window === "undefined" || !window.gtag) return;
  // event: config
  window.gtag("config", GA_ID, { page_path: url } as Record<string, unknown>);
}

export function event(
  name: string,
  params: Record<string, unknown> = {}
): void {
  if (!GA_ID || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
