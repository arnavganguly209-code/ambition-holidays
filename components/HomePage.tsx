"use client";

import Hero from "@/components/Hero";
import SignatureSection from "@/components/SignatureSection";
import SiteContentProvider, { useSiteContent } from "@/components/SiteContentProvider";
import type { SiteContent } from "@/lib/content-types";

function HomeSections() {
  const content = useSiteContent();
  return (
    <>
      <Hero />
      <SignatureSection content={content.signature} />
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
