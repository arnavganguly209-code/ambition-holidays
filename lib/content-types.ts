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

export type JourneyCategoryIcon = "peaks" | "helicopter";

export type JourneyCategory = {
  id: string;
  label: string;
  icon: JourneyCategoryIcon;
};

export type JourneyPackage = {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  categoryIds: string[];
  badge: string;
  days: number;
  maxAltitude: string;
  difficulty: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

export type JourneysContent = {
  visible: boolean;
  eyebrow: string;
  headlineGold: string;
  headlineWhite: string;
  line1: string;
  line2: string;
  allLabel: string;
  categories: JourneyCategory[];
  packages: JourneyPackage[];
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
  journeys: JourneysContent;
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
  journeys: {
    visible: true,
    eyebrow: "OUR SIGNATURE JOURNEYS",
    headlineGold: "Luxury Treks",
    headlineWhite: "in Nepal",
    line1: "Handpicked routes. Exceptional comfort. Unforgettable experiences.",
    line2: "Explore our most loved luxury trekking packages.",
    allLabel: "All Treks",
    categories: [
      { id: "everest", label: "Everest Region", icon: "peaks" },
      { id: "annapurna", label: "Annapurna Region", icon: "peaks" },
      { id: "mustang", label: "Mustang Region", icon: "peaks" },
      { id: "helicopter", label: "Helicopter Experiences", icon: "helicopter" },
    ],
    packages: [
      {
        id: "ebc",
        title: "Everest Base Camp",
        subtitle: "Luxury Trek",
        location: "Everest Region, Nepal",
        categoryIds: ["everest", "helicopter"],
        badge: "Most Popular",
        days: 12,
        maxAltitude: "5,364 m",
        difficulty: "Moderate",
        description:
          "Walk private Himalayan trails by day and rest in handpicked lodges by night, with a helicopter option that turns the return into a once-in-a-lifetime flight over Everest.",
        href: "/luxury-everest-base-camp-trek",
        imageSrc: "/images/packages/everest.jpg",
        imageAlt: "Luxury breakfast terrace with a helicopter over Everest peaks",
      },
      {
        id: "abc",
        title: "Annapurna Base Camp",
        subtitle: "Luxury Trek",
        location: "Annapurna Region, Nepal",
        categoryIds: ["annapurna"],
        badge: "Best Seller",
        days: 10,
        maxAltitude: "4,130 m",
        difficulty: "Moderate",
        description:
          "A refined sanctuary-to-sanctuary journey through rhododendron forests and amphitheatre peaks, staying in elevated lodges with firelit evenings and exceptional local cuisine.",
        href: "/luxury-annapurna-base-camp-trek",
        imageSrc: "/images/packages/annapurna.jpg",
        imageAlt: "Luxury stone lodge with fire pit beneath Annapurna peaks",
      },
      {
        id: "annapurna-circuit",
        title: "Annapurna Circuit",
        subtitle: "Luxury Trek",
        location: "Annapurna Region, Nepal",
        categoryIds: ["annapurna"],
        badge: "",
        days: 14,
        maxAltitude: "5,416 m",
        difficulty: "Moderate",
        description:
          "Cross Thorong La in comfort with private guiding, carefully paced acclimatisation, and the finest available lodges on Nepal’s most legendary high-pass circuit.",
        href: "/luxury-annapurna-circuit",
        imageSrc: "/images/packages/annapurna-circuit.jpg",
        imageAlt: "Prayer flags on the Annapurna Circuit with snow peaks beyond",
      },
      {
        id: "mustang",
        title: "Upper Mustang",
        subtitle: "Luxury Journey",
        location: "Mustang Region, Nepal",
        categoryIds: ["mustang"],
        badge: "",
        days: 11,
        maxAltitude: "4,200 m",
        difficulty: "Moderate",
        description:
          "Enter the forbidden kingdom of Lo through ochre canyons and walled cities, staying in boutique lodges that honour Mustang’s ancient culture with quiet luxury.",
        href: "/luxury-upper-mustang-trek",
        imageSrc: "/images/packages/mustang.jpg",
        imageAlt: "Upper Mustang cliffs and a luxury lodge courtyard at sunset",
      },
      {
        id: "heli",
        title: "Everest Helicopter",
        subtitle: "Luxury Experience",
        location: "Everest Region, Nepal",
        categoryIds: ["helicopter", "everest"],
        badge: "",
        days: 5,
        maxAltitude: "5,364 m",
        difficulty: "Easy",
        description:
          "A short, spectacular Himalayan escape — scenic helicopter flights, Everest views, and nights in premium lodges without long trail days.",
        href: "/luxury-helicopter-treks",
        imageSrc: "/images/packages/helicopter.jpg",
        imageAlt: "Helicopter on a luxury lodge helipad in the Everest region",
      },
    ],
  },
};
