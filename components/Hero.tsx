import Header from "@/components/Header";
import HeroSearch from "@/components/HeroSearch";
import HeroStats from "@/components/HeroStats";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/ambition-holiday-hero.png"
        aria-hidden="true"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/65"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.35)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-black/70 via-black/30 to-transparent"
      />

      <Header />

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center px-4 pb-6 pt-24 sm:pt-28 lg:pb-8 lg:pt-24">
          <div className="relative w-full max-w-5xl">
            <div className="relative">
              <p className="animate-fade-up mb-1.5 text-center text-[0.8rem] font-semibold tracking-[0.08em] text-gold sm:mb-2 sm:text-[0.95rem]">
                Discover Your Luxury Trek
              </p>

              <h1 className="animate-fade-up-delay-1 mb-7 text-center font-sans text-[clamp(2.15rem,5vw,3.9rem)] font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] sm:mb-8 sm:whitespace-nowrap">
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
