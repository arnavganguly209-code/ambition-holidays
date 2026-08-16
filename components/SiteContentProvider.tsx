"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_CONTENT, type SiteContent } from "@/lib/content-types";

const SiteContentContext = createContext<SiteContent | null>(null);

export function useSiteContent() {
  return useContext(SiteContentContext) ?? DEFAULT_CONTENT;
}

type Props = {
  initial: SiteContent;
  children: ReactNode;
  pollMs?: number;
};

export default function SiteContentProvider({
  initial,
  children,
  pollMs = 2000,
}: Props) {
  const [content, setContent] = useState(initial);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch(`/api/content?t=${Date.now()}`, {
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = (await res.json()) as SiteContent;
      setContent((prev) =>
        prev.updatedAt === data.updatedAt ? prev : data,
      );
    } catch {
      // ignore network blips
    }
  }, []);

  useEffect(() => {
    setContent(initial);
  }, [initial]);

  useEffect(() => {
    const onFocus = () => {
      void refresh();
    };
    window.addEventListener("focus", onFocus);
    const id = window.setInterval(() => {
      void refresh();
    }, pollMs);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.clearInterval(id);
    };
  }, [pollMs, refresh]);

  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}
