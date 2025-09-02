"use client";
import { useState } from "react";

export function useToast() {
  const [msg, setMsg] = useState<string | null>(null);
  function show(message: string, ms = 1400) {
    setMsg(message);
    window.setTimeout(() => setMsg(null), ms);
  }
  return { msg, show };
}

export default function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div role="status" aria-live="polite" className="toast">
      {message}
    </div>
  );
}
