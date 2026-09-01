"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrbitLoginClient() {
  const router = useRouter();
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/orbit/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey }),
      });
      if (!res.ok) {
        setError("Access denied.");
        setPasskey("");
        return;
      }
      router.replace("/orbit");
      router.refresh();
    } catch {
      setError("Unable to reach Orbit.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070a10] px-5 text-white antialiased">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,162,39,0.16),_transparent_50%),linear-gradient(180deg,#0b1018_0%,#05070a_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cpath fill='none' stroke='%23c9a227' stroke-opacity='0.35' d='M0 40h180M0 80h180M0 120h180M40 0v180M80 0v180M120 0v180'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative w-full max-w-md rounded-2xl border border-gold/25 bg-[rgba(10,14,20,0.92)] p-8 shadow-2xl backdrop-blur-md sm:p-10">
        <p className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold">
          Ambition Holidays
        </p>
        <h1 className="mt-3 text-center font-[family-name:var(--font-cormorant)] text-4xl font-semibold tracking-tight text-white">
          Orbit
        </h1>
        <p className="mt-2 text-center text-sm text-white/55">
          Super admin control room
        </p>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="orbit-passkey"
              className="mb-2 block text-xs font-semibold uppercase tracking-[0.14em] text-white/60"
            >
              Passkey
            </label>
            <input
              id="orbit-passkey"
              type="password"
              autoComplete="current-password"
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              className="w-full rounded-lg border border-white/15 bg-black/40 px-4 py-3 text-base text-white outline-none transition focus:border-gold/60"
              required
            />
          </div>

          {error ? (
            <p className="text-sm text-red-300" role="alert">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading || !passkey}
            className="focus-ring w-full rounded-lg border border-gold/70 bg-gold/15 py-3 text-sm font-bold tracking-[0.08em] text-gold transition hover:bg-gold/25 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Unlocking…" : "Enter Orbit"}
          </button>
        </form>
      </div>
    </main>
  );
}
