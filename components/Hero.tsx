"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import HeroSearch from "@/components/HeroSearch";
import HeroStats from "@/components/HeroStats";
import HeroTagline from "@/components/HeroTagline";
import { useSiteContent } from "@/components/SiteContentProvider";

const DEFAULT_DESKTOP_VIDEO = "/videos/hero-bg.mp4";
const DEFAULT_MOBILE_VIDEO = "/videos/hero-bg-mobile.mp4";

export default function Hero() {
  const { hero } = useSiteContent();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState(hero.videoSrc);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const src =
      mobile && hero.videoSrc === DEFAULT_DESKTOP_VIDEO
        ? DEFAULT_MOBILE_VIDEO
        : hero.videoSrc;
    setVideoSrc(src);
    setShowVideo(true);
  }, [hero.videoSrc]);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!showVideo || !video || !section) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("playsinline", "true");

    let inView = true;

    const sync = () => {
      if (inView && !document.hidden) {
        const play = video.play();
        if (play) play.catch(() => {});
      } else {
        video.pause();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = Boolean(entry?.isIntersecting);
        sync();
      },
      { threshold: 0.08 },
    );
    io.observe(section);

    const onVisibility = () => sync();
    document.addEventListener("visibilitychange", onVisibility);
    video.addEventListener("canplay", sync);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      video.removeEventListener("canplay", sync);
      video.pause();
    };
  }, [showVideo, videoSrc]);

  if (!hero.visible) return null;

  return (
    <section
      ref={sectionRef}
      className="relative isolate flex min-h-[100dvh] w-full flex-col overflow-hidden bg-black"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={hero.posterSrc}
        alt=""
        fetchPriority="high"
        decoding="async"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      {showVideo ? (
        <video
          ref={videoRef}
          key={videoSrc}
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={hero.posterSrc}
          aria-hidden="true"
          src={videoSrc}
        />
      ) : null}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/65"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,0.35)_100%)]"
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
              <HeroTagline words={hero.taglineWords} />

              <h1 className="animate-fade-up-delay-1 mb-7 text-center font-sans text-[clamp(2.15rem,5vw,3.9rem)] font-bold leading-[1.1] tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.55)] sm:mb-8 sm:whitespace-nowrap">
                {hero.headline}
              </h1>

              <HeroSearch placeholder={hero.searchPlaceholder} />
            </div>
          </div>
        </div>

        {hero.statsVisible ? <HeroStats stats={hero.stats} /> : null}
      </div>
    </section>
  );
}
