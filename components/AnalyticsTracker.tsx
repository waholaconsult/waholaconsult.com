"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (pathname && lastTracked.current !== pathname) {
      lastTracked.current = pathname;
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ route: pathname }),
      }).catch((err) => console.error("Analytics tracking failed:", err));
    }
  }, [pathname]);

  return null;
}
