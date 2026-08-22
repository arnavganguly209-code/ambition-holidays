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
  /** Public pages omit this so visitors are not polled every few seconds. */
  pollMs?: number;
};

export default function SiteContentProvider({
  initial,
  children,
  pollMs = 0,
}: Props) {
  const [content, setContent] = useState(initial);

  const refresh = useCallback(async () => {
    if (document.visibilityState === "hidden") return;
    try {
      const res = await fetch(`/api/content?t=${Date.now()}`, {
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = (await res.json()) as SiteContent;
      const merged: SiteContent = {
        ...DEFAULT_CONTENT,
        ...data,
        why: {
          ...DEFAULT_CONTENT.why,
          ...data.why,
          cards: data.why?.cards ?? DEFAULT_CONTENT.why.cards,
          ratings: data.why?.ratings ?? DEFAULT_CONTENT.why.ratings,
        },
      };
      setContent((prev) => (prev.updatedAt === merged.updatedAt ? prev : merged));
    } catch {
      // ignore network blips
    }
  }, []);

  useEffect(() => {
    setContent(initial);
  }, [initial]);

  useEffect(() => {
    const onWake = () => {
      void refresh();
    };
    window.addEventListener("focus", onWake);
    document.addEventListener("visibilitychange", onWake);

    let id: number | undefined;
    if (pollMs > 0) {
      id = window.setInterval(() => {
        void refresh();
      }, pollMs);
    }

    return () => {
      window.removeEventListener("focus", onWake);
      document.removeEventListener("visibilitychange", onWake);
      if (id) window.clearInterval(id);
    };
  }, [pollMs, refresh]);

  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}
