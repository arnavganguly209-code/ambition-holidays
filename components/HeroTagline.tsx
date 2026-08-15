"use client";

import { useEffect, useState } from "react";

const TEXT = "Discover Your Luxury Trek";

export default function HeroTagline() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setVisibleCount(TEXT.length);
      return;
    }

    setVisibleCount(0);
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      setVisibleCount(index);
      if (index >= TEXT.length) {
        window.clearInterval(interval);
      }
    }, 42);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <p
      className="animate-tagline-enter mb-1.5 text-center text-[0.88rem] font-semibold tracking-[0.1em] text-gold sm:mb-2 sm:text-[1.05rem]"
      aria-label={TEXT}
    >
      <span className="inline-flex overflow-hidden">
        {TEXT.split("").map((char, index) => (
          <span
            key={`${char}-${index}`}
            className={`inline-block transition-[opacity,transform] duration-300 ease-out ${
              index < visibleCount
                ? "translate-x-0 opacity-100"
                : "-translate-x-2 opacity-0"
            }`}
            style={{ transitionDelay: `${Math.min(index, 24) * 12}ms` }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
      <span
        aria-hidden="true"
        className={`ml-0.5 inline-block h-[1em] w-[1.5px] translate-y-[0.12em] bg-gold align-baseline ${
          visibleCount >= TEXT.length ? "animate-tagline-caret-fade" : "animate-tagline-caret"
        }`}
      />
    </p>
  );
}
