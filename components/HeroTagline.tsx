"use client";

import { useEffect, useState } from "react";

const WORDS = ["Discover", "Your", "Luxury", "Trek"] as const;
const WORD_DELAY_MS = 420;
const HOLD_MS = 2200;
const RESET_GAP_MS = 500;

export default function HeroTagline() {
  const [visibleWords, setVisibleWords] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setVisibleWords(WORDS.length);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    const clearTimers = () => {
      timers.forEach((id) => window.clearTimeout(id));
      timers.length = 0;
    };

    const runCycle = () => {
      if (cancelled) return;
      clearTimers();
      setVisibleWords(0);

      WORDS.forEach((_, index) => {
        timers.push(
          window.setTimeout(() => {
            if (!cancelled) setVisibleWords(index + 1);
          }, RESET_GAP_MS + index * WORD_DELAY_MS),
        );
      });

      const cycleEnd = RESET_GAP_MS + WORDS.length * WORD_DELAY_MS + HOLD_MS;
      timers.push(window.setTimeout(runCycle, cycleEnd));
    };

    runCycle();

    return () => {
      cancelled = true;
      clearTimers();
    };
  }, []);

  return (
    <p
      className="mb-1.5 text-center text-[0.88rem] font-semibold tracking-[0.1em] text-gold sm:mb-2 sm:text-[1.05rem]"
      aria-label={WORDS.join(" ")}
    >
      <span className="inline-flex flex-wrap items-baseline justify-center gap-x-[0.35em]">
        {WORDS.map((word, index) => (
          <span
            key={word}
            className={`inline-block transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              index < visibleWords
                ? "translate-x-0 opacity-100"
                : "-translate-x-5 opacity-0"
            }`}
          >
            {word}
          </span>
        ))}
      </span>
    </p>
  );
}
