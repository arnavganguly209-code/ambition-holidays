import Image from "next/image";
import Header from "@/components/Header";
import HeroSearch from "@/components/HeroSearch";
import HeroStats from "@/components/HeroStats";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden">
      <Image
        src="/images/ambition-holiday-hero.png"
        alt="Hiker overlooking snow-capped Himalayan peaks above a sea of clouds at golden hour"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_35%] sm:object-center"
      />

      {/* Cinematic overlays — keep peaks readable while masking mockup chrome in the photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-black/70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(0,0,0,0.4)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-black/75 via-black/35 to-transparent"
      />

      <Header />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-6 pt-24 sm:pt-28 lg:pb-8 lg:pt-24">
          <div className="relative w-full max-w-5xl">
            {/* Local scrim so any baked-in mockup text cannot ghost through */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-[140%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(6,10,16,0.72)_0%,rgba(6,10,16,0.45)_45%,transparent_72%)]"
            />

            <div className="relative">
              <div className="animate-fade-up mb-4 flex w-full items-center justify-center gap-3 sm:mb-5 sm:gap-4">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold sm:w-14 md:w-20" />
                <p className="flex items-center gap-2 text-center text-[0.62rem] font-medium uppercase tracking-[0.22em] text-gold sm:text-[0.7rem] sm:tracking-[0.28em]">
                  <svg
                    viewBox="0 0 24 24"
                    className="hidden h-3.5 w-3.5 shrink-0 text-gold sm:block"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M3 18 8.5 9l3.2 4.5L14 11l7 7H3Z" />
                  </svg>
                  Discover and book tours and activities
                </p>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold sm:w-14 md:w-20" />
              </div>

              <h1 className="animate-fade-up-delay-1 mb-7 text-center font-serif text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-tight tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] sm:mb-8 sm:whitespace-nowrap sm:text-[clamp(2.35rem,4.2vw,3.85rem)]">
                Start Planning Your Journey
              </h1>

              <HeroSearch />
            </div>
          </div>
        </div>

        <HeroStats />
      </div>
    </section>
  );
}
