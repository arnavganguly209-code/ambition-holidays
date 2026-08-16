"use client";

import { FormEvent, useState } from "react";

type Props = {
  placeholder: string;
};

export default function HeroSearch({ placeholder }: Props) {
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    console.info("Search query:", trimmed);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-up-delay-2 relative mx-auto w-full max-w-[40rem] px-2 sm:max-w-[48rem] sm:px-4 lg:max-w-[56rem]"
      role="search"
    >
      <label htmlFor="hero-search" className="sr-only">
        Find an adventure
      </label>
      <div className="flex items-center rounded-full bg-white py-1.5 pl-5 pr-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.28)] sm:pl-6 sm:pr-2">
        <input
          id="hero-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-[0.95rem] text-neutral-700 placeholder:text-neutral-400 outline-none sm:text-[1.05rem]"
          autoComplete="off"
        />
        <button
          type="submit"
          aria-label="Search adventures"
          className="focus-ring ml-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold text-white transition duration-200 hover:bg-gold-soft hover:scale-[1.03] sm:h-12 sm:w-12"
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
