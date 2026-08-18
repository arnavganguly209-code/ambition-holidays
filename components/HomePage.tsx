"use client";

import DuskAtmosphere from "@/components/DuskAtmosphere";
import Hero from "@/components/Hero";
import LuxuryTreksSection from "@/components/LuxuryTreksSection";
import SignatureSection from "@/components/SignatureSection";
import SiteContentProvider, { useSiteContent } from "@/components/SiteContentProvider";
import type { SiteContent } from "@/lib/content-types";

function HomeSections() {
  const content = useSiteContent();
  return (
    <>
      <Hero />
      <div className="relative isolate overflow-hidden bg-[#1a1f27] text-white">
        <DuskAtmosphere />
        <SignatureSection content={content.signature} />
        <LuxuryTreksSection />
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
