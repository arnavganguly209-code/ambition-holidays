"use client";

import Link from "next/link";
import { useSiteContent } from "@/components/SiteContentProvider";
import { mediaSrc } from "@/lib/media-src";

function PeakMark({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="m3.5 17.5 5.4-8.2 3.2 4.4 2.6-3.6L20.5 17.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M4 19.2h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function MountainBand() {
  return (
    <svg
      viewBox="0 0 1440 120"
      className="h-auto w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 92 L120 58 L220 78 L340 34 L460 72 L580 28 L700 64 L820 22 L940 56 L1060 38 L1180 68 L1320 42 L1440 74 L1440 120 L0 120 Z"
        fill="rgba(255,255,255,0.04)"
      />
      <path
        d="M0 104 L180 70 L320 96 L500 52 L680 88 L860 48 L1040 82 L1220 58 L1440 90 L1440 120 L0 120 Z"
        fill="rgba(201,162,39,0.06)"
      />
    </svg>
  );
}

export default function ExperiencesSection() {
  const { experiences, updatedAt } = useSiteContent();
  if (!experiences?.visible) return null;

  const theme = experiences.theme;
  const gold = theme?.goldColor || "#c9a227";
  const border = theme?.borderColor || "rgba(201,162,39,0.55)";

  return (
    <section
      className="relative overflow-hidden border-t px-4 pb-10 pt-10 sm:px-8 sm:pb-12 sm:pt-12 lg:px-10"
      style={{
        backgroundColor: theme?.sectionBg || "#0c1016",
        borderColor: border,
        color: theme?.textColor || "#ffffff",
      }}
    >
      {theme?.showBackgroundArt !== false ? (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,162,39,0.08), transparent 60%)",
            }}
          />
          {theme?.backgroundImageSrc ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-cover bg-bottom bg-no-repeat opacity-35"
              style={{
                backgroundImage: `url(${mediaSrc(theme.backgroundImageSrc, updatedAt)})`,
              }}
            />
          ) : (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 opacity-80"
            >
              <MountainBand />
            </div>
          )}
        </>
      ) : null}

      <div className="relative mx-auto max-w-[88rem]">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="mb-3 flex flex-wrap items-center justify-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] sm:text-[0.72rem]"
            style={{ color: gold }}
          >
            <span className="h-px w-8 bg-current opacity-60 sm:w-12" aria-hidden="true" />
            <PeakMark className="h-3.5 w-3.5 shrink-0" />
            <span>{experiences.eyebrow}</span>
            <span aria-hidden="true">→</span>
            <span className="h-px w-8 bg-current opacity-60 sm:w-12" aria-hidden="true" />
          </div>

          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,5.8vw,3.45rem)] font-semibold leading-[1.1] tracking-tight">
            <span style={{ color: theme?.textColor || "#fff" }}>
              {experiences.headlineWhite}{" "}
            </span>
            <em
              className="font-[family-name:var(--font-cormorant)] italic"
              style={{ color: gold }}
            >
              {experiences.headlineGold}
            </em>
          </h2>

          <p
            className="mx-auto mt-3 max-w-2xl text-[0.9rem] leading-relaxed sm:text-[0.98rem]"
            style={{ color: theme?.mutedTextColor || "rgba(255,255,255,0.72)" }}
          >
            {experiences.body}
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:grid-cols-4 lg:gap-5">
          {(experiences.cards ?? []).map((card) => (
            <article
              key={card.id}
              className="group flex h-full flex-col overflow-hidden rounded-[0.85rem] transition-transform duration-500 [@media(hover:hover)]:hover:-translate-y-1"
              style={{
                backgroundColor: theme?.cardBg || "#121820",
                border: `1px solid ${border}`,
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mediaSrc(card.imageSrc, updatedAt)}
                  alt={card.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 to-transparent"
                  aria-hidden="true"
                />
              </div>

              <div className="flex flex-1 flex-col px-4 pb-5 pt-4 text-center sm:px-5">
                <h3
                  className="font-[family-name:var(--font-cormorant)] text-[1.35rem] font-semibold leading-snug sm:text-[1.45rem]"
                  style={{ color: theme?.textColor || "#fff" }}
                >
                  {card.title}
                </h3>
                {card.countLabel ? (
                  <p
                    className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: gold }}
                  >
                    {card.countLabel}
                  </p>
                ) : null}
                <p
                  className="mt-2.5 flex-1 text-[0.8rem] leading-relaxed sm:text-[0.84rem]"
                  style={{ color: theme?.mutedTextColor || "rgba(255,255,255,0.72)" }}
                >
                  {card.body}
                </p>
                <Link
                  href={card.href || "/luxury-treks"}
                  className="mx-auto mt-4 inline-flex items-center gap-1.5 border px-4 py-2 text-[0.68rem] font-semibold tracking-[0.12em] transition-colors hover:bg-white/5"
                  style={{ borderColor: gold, color: gold }}
                >
                  {card.ctaLabel || "EXPLORE MORE"} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="relative mt-10 flex flex-col items-center sm:mt-12">
          <Link
            href={experiences.ctaHref || "/luxury-treks"}
            className="focus-ring inline-flex items-center gap-2.5 border px-7 py-3 text-[0.76rem] font-semibold tracking-[0.14em] transition-colors hover:bg-white/5 sm:px-9 sm:text-[0.8rem]"
            style={{ borderColor: gold, color: gold }}
          >
            <PeakMark className="h-4 w-4" />
            {experiences.ctaLabel}
            <span aria-hidden="true">→</span>
          </Link>
          <div
            aria-hidden="true"
            className="mt-3 h-px w-[min(100%,22rem)]"
            style={{
              background: `linear-gradient(90deg, transparent, ${gold}, transparent)`,
              boxShadow: `0 0 18px ${gold}55`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
