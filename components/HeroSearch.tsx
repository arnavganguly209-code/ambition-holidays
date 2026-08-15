"use client";

import { FormEvent, useState } from "react";

export default function HeroSearch() {
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    // Search wiring will be connected in a later stage.
    console.info("Search query:", trimmed);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-up-delay-2 relative mx-auto w-full max-w-[42rem] px-4 sm:max-w-[52rem] sm:px-6 lg:w-[68vw] lg:max-w-[70rem]"
      role="search"
    >
      <label htmlFor="hero-search" className="sr-only">
        Find an adventure, trek or destination
      </label>
      <div className="flex items-center rounded-full border border-white/70 bg-white/95 py-1.5 pl-4 pr-1.5 shadow-[0_10px_40px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:pl-5 sm:pr-2">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="mr-2 h-4 w-4 shrink-0 text-neutral-400 sm:mr-3 sm:h-5 sm:w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <input
          id="hero-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Find an Adventure, trek or destination"
          className="min-w-0 flex-1 bg-transparent text-[0.9rem] text-neutral-800 placeholder:text-neutral-400 outline-none sm:text-[1rem]"
          autoComplete="off"
        />
        <button
          type="submit"
          aria-label="Search adventures"
          className="focus-ring ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold text-white transition duration-200 hover:bg-gold-soft hover:scale-[1.03] sm:h-12 sm:w-12"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 sm:h-5 sm:w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </form>
  );
}
