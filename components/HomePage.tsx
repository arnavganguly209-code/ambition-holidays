"use client";

import DuskAtmosphere from "@/components/DuskAtmosphere";
import Hero from "@/components/Hero";
import LuxuryTreksSection from "@/components/LuxuryTreksSection";
import SignatureSection from "@/components/SignatureSection";
import WhyAmbitionSection from "@/components/WhyAmbitionSection";
import ExperiencesSection from "@/components/ExperiencesSection";
import AvailabilitySection from "@/components/AvailabilitySection";
import VideoJournalSection from "@/components/VideoJournalSection";
import SiteContentProvider, { useSiteContent } from "@/components/SiteContentProvider";
import type { SiteContent } from "@/lib/content-types";

function HomeSections() {
  const content = useSiteContent();
  return (
    <>
      <Hero />
      <div className="relative isolate overflow-x-clip bg-[#1a1f27] text-white">
        <DuskAtmosphere />
        <SignatureSection content={content.signature} />
        <LuxuryTreksSection />
        <WhyAmbitionSection />
        <ExperiencesSection />
        <AvailabilitySection />
        <VideoJournalSection />
      </div>
    </>
  );
}

export default function HomePage({ initial }: { initial: SiteContent }) {
  return (
    <SiteContentProvider initial={initial}>
      <main>
        <HomeSections />
      </main>
    </SiteContentProvider>
  );
}
