// lib/links.ts

export function boolFromParam(v: string | null): boolean {
  return v === "1" || v === "true";
}

export function buildCompressorUrl(opts: {
  input?: string;
  aggressive?: boolean;
}) {
  const params = new URLSearchParams();
  if (opts.input) params.set("input", opts.input);
  if (typeof opts.aggressive === "boolean")
    params.set("aggressive", opts.aggressive ? "1" : "0");
  return `/tools/prompt-compress?${params.toString()}`;
}

export function buildTokenCostUrl(opts: {
  prompt?: string;
  completion?: string;
  model?: string;
}) {
  const params = new URLSearchParams();
  if (opts.prompt) params.set("prompt", opts.prompt);
  if (opts.completion) params.set("completion", opts.completion);
  if (opts.model) params.set("model", opts.model);
  const q = params.toString();
  return q ? `/tools/token-cost?${q}` : `/tools/token-cost`;
}
