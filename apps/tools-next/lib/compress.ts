// Simple heuristic prompt compressor

type CompressOptions = { aggressive?: boolean };

export function compressPrompt(input: string, opts: CompressOptions = {}) {
  let text = input.trim();

  // normalize spaces & line breaks
  text = text.replace(/\s+/g, " ");

  // remove common filler phrases
  const filler = [
    /\bplease\b/gi,
    /\bkindly\b/gi,
    /\bas you can see\b/gi,
    /\bas mentioned earlier\b/gi,
    /\bin order to\b/gi,
    /\bi would like to\b/gi,
  ];
  filler.forEach((rx) => (text = text.replace(rx, "")));

  // Aggressive: strip adjectives / weakeners
  if (opts.aggressive) {
    const aggressive = [
      /\bvery\b/gi,
      /\breally\b/gi,
      /\bjust\b/gi,
      /\bperhaps\b/gi,
      /\bmight\b/gi,
      /\bmaybe\b/gi,
      /\bas much as possible\b/gi,
      /\bif possible\b/gi,
    ];
    aggressive.forEach((rx) => (text = text.replace(rx, "")));
  }

  // trim leftover whitespace again
  text = text.replace(/\s+/g, " ").trim();

  return {
    original: input,
    compressed: text,
    savedChars: input.length - text.length,
    savedPercent:
      input.length > 0
        ? Math.round(((input.length - text.length) / input.length) * 100)
        : 0,
  };
}
