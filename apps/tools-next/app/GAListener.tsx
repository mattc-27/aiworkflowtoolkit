// app/GAListener.tsx
"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function GAListener() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
  
    window.gtag?.("config", process.env.NEXT_PUBLIC_GA_ID, {
      page_path: search?.toString() ? `${pathname}?${search}` : pathname,
    });
  }, [pathname, search]);

  return null;
}
