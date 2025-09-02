// Token counting using tiktoken "lite" with explicit WASM init via fetch.
// Works in Next.js (App Router, Webpack 5) without special webpack flags.

import type { Tiktoken as TiktokenType } from "@dqbd/tiktoken/lite";
import cl100k_base from "@dqbd/tiktoken/encoders/cl100k_base.json";

/** Shape of the encoder JSON shipped with @dqbd/tiktoken */
type EncodingJSON = {
  bpe_ranks: Record<string, number>;
  special_tokens: Record<string, number>;
  pat_str: string;
};

/** Runtime import types for the lite/init module */
type LiteInitModule = {
  init: (
    loader: (imports: WebAssembly.Imports) => Promise<WebAssembly.Instance>
  ) => Promise<void>;
  Tiktoken: new (
    ranks: EncodingJSON["bpe_ranks"],
    special: EncodingJSON["special_tokens"],
    pat: EncodingJSON["pat_str"]
  ) => TiktokenType;
};

let encoder: TiktokenType | null = null;
let ready: Promise<void> | null = null;

async function ensureEncoder(): Promise<void> {
  if (encoder) return;

  if (!ready) {
    ready = (async () => {
      // Dynamically import the lite/init module so we don't depend on build-time export shapes
      const lite = (await import("@dqbd/tiktoken/lite/init")) as unknown as LiteInitModule;

      // Resolve URL to the wasm binary and fetch it
      const wasmUrl = new URL(
        "@dqbd/tiktoken/lite/tiktoken_bg.wasm",
        import.meta.url
      ).toString();

      const resp = await fetch(wasmUrl);

      // Feature-detect instantiateStreaming
      const instantiateStreaming = (WebAssembly as unknown as {
        instantiateStreaming?: (
          r: Response,
          i: WebAssembly.Imports
        ) => Promise<WebAssembly.WebAssemblyInstantiatedSource>;
      }).instantiateStreaming;

      if (instantiateStreaming) {
        await lite.init((imports) =>
          instantiateStreaming(resp.clone(), imports).then((r) => r.instance)
        );
      } else {
        const bytes = await resp.arrayBuffer();
        await lite.init((imports) =>
          WebAssembly.instantiate(bytes, imports).then((r) => r.instance)
        );
      }

      const data = cl100k_base as unknown as EncodingJSON;
      encoder = new lite.Tiktoken(data.bpe_ranks, data.special_tokens, data.pat_str);
    })();
  }

  await ready;
}

export async function countTokens(text: string): Promise<number> {
  await ensureEncoder();
  return encoder!.encode(text).length;
}
