import Link from "next/link";
import { useSiteContent } from "@/components/SiteContentProvider";
import type { ExperienceIcon } from "@/lib/content-types";
import { mediaSrc } from "@/lib/media-src";

function CircleIcon({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-gold/80 text-gold sm:h-12 sm:w-12">
      {children}
    </span>
  );
}

function CardIcon({ icon, iconSrc }: { icon: ExperienceIcon; iconSrc?: string }) {
  const cls = "h-6 w-6 sm:h-[1.45rem] sm:w-[1.45rem]";
  if (icon === "custom" && iconSrc) {
    return (
      <CircleIcon>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={iconSrc} alt="" className="h-6 w-6 object-contain" />
      </CircleIcon>
    );
  }
  if (icon === "heli") {
    return (
      <CircleIcon>
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M3.5 8.2h12.2" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
          <path d="M10.2 6.4v1.8" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
          <path
            d="M6.4 14.2c0-2.2 1.7-3.8 4-3.8h3.6l2.8 3.8h2.7"
            stroke="currentColor"
            strokeWidth="1.55"
            strokeLinejoin="round"
          />
          <path d="M19.5 14.2v-2.4" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
          <path d="M18.4 10.6h2.4" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
          <path d="M5.6 17.6h11.2" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
          <path d="M8.2 14.2v3.4M15.6 14.2v3.4" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
        </svg>
      </CircleIcon>
    );
  }
  if (icon === "lodge") {
    return (
      <CircleIcon>
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path
            d="M4 18.2V11.2a2 2 0 0 1 2-2h4.2a2 2 0 0 1 2 2v1.2H20v5.8"
            stroke="currentColor"
            strokeWidth="1.55"
            strokeLinejoin="round"
          />
          <path d="M4 18.2h16" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
          <path d="M4 14.2h16" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
          <path d="M7.2 9.2V7.6" stroke="currentColor" strokeWidth="1.45" strokeLinecap="round" />
        </svg>
      </CircleIcon>
    );
  }
  if (icon === "culture") {
    return (
      <CircleIcon>
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path d="M12 3.6v1.8" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
          <path d="m8.2 8.4 3.8-2.8 3.8 2.8H8.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M6.4 12.2h11.2l-1.7-3.2H8.1L6.4 12.2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M5.2 16h13.6l-1.8-3.2H7L5.2 16Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M9.4 16v3.2h5.2V16" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M6.2 19.2h11.6" stroke="currentColor" strokeWidth="1.55" strokeLinecap="round" />
        </svg>
      </CircleIcon>
    );
  }
  if (icon === "flight") {
    return (
      <CircleIcon>
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path
            d="m3.6 18.4 6.4-10.4 3.2 4.8L16.6 7.6 20.4 18.4H3.6Z"
            stroke="currentColor"
            strokeWidth="1.55"
            strokeLinejoin="round"
          />
          <path d="m11.2 14.6 1.7-2.4 1.8 2.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </CircleIcon>
    );
  }
  if (icon === "wellness") {
    return (
      <CircleIcon>
        <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
          <path
            d="M12 19.4c-3.8-3.4-6.2-6.2-6.2-9.1A3.5 3.5 0 0 1 12 8.2a3.5 3.5 0 0 1 6.2 2.1c0 2.9-2.4 5.7-6.2 9.1Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M12 8.4c-.2-2.6 1.4-4.6 3.5-5"
            stroke="currentColor"
            strokeWidth="1.45"
            strokeLinecap="round"
          />
          <path
            d="M12 8.4c.2-2.6-1.4-4.6-3.5-5"
            stroke="currentColor"
            strokeWidth="1.45"
            strokeLinecap="round"
          />
          <path
            d="M7.4 11.2C5 10.6 3.6 11.8 3.5 13.8"
            stroke="currentColor"
            strokeWidth="1.45"
            strokeLinecap="round"
          />
          <path
            d="M16.6 11.2c2.4-.6 3.8.6 3.9 2.6"
            stroke="currentColor"
            strokeWidth="1.45"
            strokeLinecap="round"
          />
        </svg>
      </CircleIcon>
    );
  }
  return (
    <CircleIcon>
      <svg viewBox="0 0 24 24" className={cls} fill="none" aria-hidden="true">
        <ellipse cx="12" cy="15.4" rx="3.4" ry="2.7" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="7.1" cy="10.6" r="1.55" stroke="currentColor" strokeWidth="1.45" />
        <circle cx="10.15" cy="8.15" r="1.5" stroke="currentColor" strokeWidth="1.45" />
        <circle cx="13.85" cy="8.15" r="1.5" stroke="currentColor" strokeWidth="1.45" />
        <circle cx="16.9" cy="10.6" r="1.55" stroke="currentColor" strokeWidth="1.45" />
      </svg>
    </CircleIcon>
  );
}

export default function ExperiencesSection() {
  const { experiences, updatedAt } = useSiteContent();
  if (!experiences?.visible) return null;

  return (
    <section className="relative border-t border-gold/15 px-4 pb-12 pt-10 sm:px-8 sm:pb-14 sm:pt-12 lg:px-10">
      <div className="mx-auto max-w-[88rem]">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-2 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold/70 sm:w-16" aria-hidden="true" />
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-gold sm:text-[0.72rem] sm:tracking-[0.22em]">
              {experiences.eyebrow}
            </p>
            <span className="h-px w-10 bg-gold/70 sm:w-16" aria-hidden="true" />
          </div>
          <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(1.9rem,5.5vw,3.35rem)] font-semibold leading-[1.12] tracking-tight">
            <span className="text-white">{experiences.headlineWhite} </span>
            <span className="text-gold">{experiences.headlineGold}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[0.9rem] leading-relaxed text-white/80 sm:text-[1rem]">
            {experiences.body}
          </p>
        </div>

        <div className="relative z-0 mt-8 grid grid-cols-1 gap-3 overflow-visible sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-3.5">
          {experiences.cards?.map((card) => (
            <article
              key={card.id}
              className="group flex h-full origin-center flex-col overflow-hidden rounded-[0.9rem] border border-gold/55 bg-[#1c222c]/55 px-3 pb-4 pt-5 text-center transition-transform duration-500 ease-out hover:z-10 hover:scale-[1.06] hover:border-gold sm:px-3.5"
            >
              <CardIcon icon={card.icon} iconSrc={card.iconSrc} />
              <div className="mt-4 overflow-hidden rounded-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mediaSrc(card.imageSrc, updatedAt)}
                  alt={card.imageAlt}
                  className="h-[7.4rem] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 sm:h-[8.1rem]"
                />
              </div>
              <h3 className="mt-3.5 font-[family-name:var(--font-cormorant)] text-[1.12rem] font-semibold leading-snug text-white sm:text-[1.2rem]">
                {card.title}
              </h3>
              <p className="mt-2 flex-1 text-[0.74rem] leading-relaxed text-white/72 sm:text-[0.78rem]">
                {card.body}
              </p>
              <Link
                href={card.href || "/luxury-treks"}
                className="mt-3 inline-flex items-center justify-center gap-1 text-[0.78rem] font-medium text-gold transition-colors hover:text-white"
              >
                Learn More <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-9 flex justify-center sm:mt-10">
          <Link
            href={experiences.ctaHref || "/luxury-treks"}
            className="focus-ring inline-flex items-center gap-2 border border-gold/85 px-5 py-2.5 text-[0.8rem] font-semibold tracking-[0.04em] text-white transition-colors hover:border-gold hover:bg-gold/10"
          >
            {experiences.ctaLabel} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
