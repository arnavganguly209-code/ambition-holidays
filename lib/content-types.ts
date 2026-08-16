export type StatItem = {
  id: string;
  label: string;
  iconKey: "tripadvisor" | "years" | "price" | "responsible" | "custom";
  iconSrc?: string;
};

export type SignatureImage = {
  id: string;
  src: string;
  alt: string;
};

export type SignatureFeature = {
  id: string;
  icon: "hiker" | "peaks" | "lodge";
  title: string;
  subtitle: string;
};

export type SiteContent = {
  updatedAt: string;
  header: {
    logoSrc: string;
  };
  hero: {
    visible: boolean;
    taglineWords: string[];
    headline: string;
    searchPlaceholder: string;
    videoSrc: string;
    posterSrc: string;
    statsVisible: boolean;
    stats: StatItem[];
  };
  signature: {
    visible: boolean;
    eyebrow: string;
    headlineWhite: string;
    headlineGold: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
    images: SignatureImage[];
    features: SignatureFeature[];
  };
};

export const DEFAULT_CONTENT: SiteContent = {
  updatedAt: new Date(0).toISOString(),
  header: {
    logoSrc: "/images/ambition-holiday-logo.png",
  },
  hero: {
    visible: true,
    taglineWords: ["Discover", "Your", "Luxury", "Trek"],
    headline: "Start Planning Your Journey",
    searchPlaceholder: "Find an Adventure",
    videoSrc: "/videos/hero-background.mp4",
    posterSrc: "/images/hero-video-poster.jpg",
    statsVisible: true,
    stats: [
      { id: "tripadvisor", label: "410+ TripAdvisor reviews", iconKey: "tripadvisor" },
      { id: "years", label: "11+ years of experience", iconKey: "years" },
      { id: "price", label: "Best price guarantee", iconKey: "price" },
      { id: "responsible", label: "Responsible tourism", iconKey: "responsible" },
    ],
  },
  signature: {
    visible: true,
    eyebrow: "OUR SIGNATURE OF ADVENTURE",
    headlineWhite: "Beyond the Trail.",
    headlineGold: "Luxury Meets Ambition",
    body: "Experience Nepal through the art of luxury trekking. From private Himalayan trails and secluded mountain escapes to exceptional stays and authentic local encounters, Ambition Holidays curates extraordinary journeys where adventure meets refined comfort, every step of the way.",
    ctaLabel: "Explore Luxury Treks",
    ctaHref: "/luxury-treks",
    images: [
      {
        id: "sig-1",
        src: "/images/signature/sig-live-1.webp",
        alt: "Trekker on a stone path toward Himalayan peaks",
      },
      {
        id: "sig-3",
        src: "/images/signature/sig-live-2.webp",
        alt: "Traditional Nepalese temple against mountains",
      },
      {
        id: "sig-1786895806235",
        src: "/images/signature/sig-live-3.jpg",
        alt: "Signature image",
      },
      {
        id: "sig-1786895886212",
        src: "/images/signature/sig-live-4.jpg",
        alt: "Signature image",
      },
      {
        id: "sig-1786897478111",
        src: "/images/signature/sig-live-5.jpg",
        alt: "Signature image",
      },
      {
        id: "sig-1786897672121",
        src: "/images/signature/sig-live-6.jpg",
        alt: "Signature image",
      },
    ],
    features: [
      {
        id: "feat-1",
        icon: "hiker",
        title: "Private Journeys",
        subtitle: "Tailored Exclusively to You",
      },
      {
        id: "feat-2",
        icon: "peaks",
        title: "Expert Local Guides",
        subtitle: "Local Knowledge, Exceptional Care",
      },
      {
        id: "feat-3",
        icon: "lodge",
        title: "Handpicked Stays",
        subtitle: "Refined Comfort in the Himalayas",
      },
    ],
  },
};
