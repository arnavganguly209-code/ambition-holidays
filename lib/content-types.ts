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

export type WhyCardIcon =
  | "years"
  | "tripadvisor"
  | "guide"
  | "stay"
  | "support"
  | "responsible"
  | "custom";

export type WhyCard = {
  id: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  icon: WhyCardIcon;
  iconSrc?: string;
};

export type WhyRating = {
  id: string;
  label: string;
  value: string;
  brand: "tripadvisor" | "google" | "facebook" | "instagram" | "custom";
  logoSrc?: string;
};

export type WhyContent = {
  visible: boolean;
  eyebrow: string;
  headline: string;
  body: string;
  cards: WhyCard[];
  awardTitle: string;
  awardSubtitle: string;
  ratings: WhyRating[];
};

export type ExperienceIcon =
  | "heli"
  | "lodge"
  | "culture"
  | "flight"
  | "wellness"
  | "wildlife"
  | "custom";

export type ExperienceCard = {
  id: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  icon: ExperienceIcon;
  iconSrc?: string;
  href: string;
};

export type ExperiencesContent = {
  visible: boolean;
  eyebrow: string;
  headlineWhite: string;
  headlineGold: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  cards: ExperienceCard[];
};

export type AvailabilityRouteIcon = "peaks" | "temple" | "trek" | "heli" | "custom";

export type AvailabilityRoute = {
  id: string;
  label: string;
  icon: AvailabilityRouteIcon;
  iconSrc?: string;
};

export type AvailabilityCard = {
  id: string;
  monthShort: string;
  monthFull: string;
  badge: string;
  imageSrc: string;
  imageAlt: string;
  routes: AvailabilityRoute[];
  availableCount: number;
  availableLabel: string;
  ctaLabel: string;
  ctaHref: string;
};

export type AvailabilityFootItem = {
  id: string;
  title: string;
  body: string;
  icon: "calendar" | "secure" | "concierge" | "custom";
  iconSrc?: string;
};

export type AvailabilityContent = {
  visible: boolean;
  eyebrow: string;
  headlineBefore: string;
  headlineGold: string;
  headlineAfter: string;
  body: string;
  cards: AvailabilityCard[];
  footItems: AvailabilityFootItem[];
  liveLabel: string;
  liveTimestamp: string;
};

export type JournalVideo = {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  /** Poster / thumbnail image */
  imageSrc: string;
  imageAlt: string;
  /**
   * YouTube watch/share URL or ID, or uploaded /uploads/*.mp4 path.
   * Empty = preview-only until Orbit adds a video.
   */
  videoSrc: string;
};

export type JournalFeatureIcon = "peaks" | "camera" | "play" | "heart" | "custom";

export type JournalFeature = {
  id: string;
  title: string;
  body: string;
  icon: JournalFeatureIcon;
  iconSrc?: string;
};

export type JournalContent = {
  visible: boolean;
  eyebrow: string;
  headlineBefore: string;
  headlineGold: string;
  headlineAfter: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  videos: JournalVideo[];
  features: JournalFeature[];
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
  why: WhyContent;
  experiences: ExperiencesContent;
  availability: AvailabilityContent;
  journal: JournalContent;
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
    videoSrc: "/videos/hero-bg.mp4",
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
  why: {
    visible: true,
    eyebrow: "WHY TRAVEL WITH US",
    headline: "Why Ambition Holidays",
    body: "We don't just organize trips — we craft transformative journeys with unmatched care, local expertise, and a passion for the Himalayas.",
    awardTitle: "Proudly Recognized for Excellence",
    awardSubtitle: "Awarded by TripAdvisor & our incredible guests",
    cards: [
      {
        id: "years",
        title: "11+ Years of Experience",
        body: "Over a decade of crafting extraordinary Himalayan journeys with excellence and passion.",
        imageSrc: "/images/why/years-photo.jpg",
        imageAlt: "Hiker watching a Himalayan sunrise",
        icon: "years",
      },
      {
        id: "reviews",
        title: "410+ TripAdvisor Reviews",
        body: "Consistently trusted by hundreds of happy travelers who recommend us for our service and reliability.",
        imageSrc: "/images/why/reviews-photo.jpg",
        imageAlt: "Luxury lodge terrace at dusk",
        icon: "tripadvisor",
      },
      {
        id: "guides",
        title: "Expert Local Guides",
        body: "Our professional, certified local guides ensure your journey is safe, insightful, and unforgettable.",
        imageSrc: "/images/why/guides-photo.jpg",
        imageAlt: "Trekkers walking toward a snow peak",
        icon: "guide",
      },
      {
        id: "stays",
        title: "Handpicked Stays",
        body: "Carefully selected luxury lodges and hotels that offer comfort, character, and exceptional service.",
        imageSrc: "/images/why/stays-photo.jpg",
        imageAlt: "Warmly lit mountain lodge at night",
        icon: "stay",
      },
      {
        id: "support",
        title: "24/7 Guest Support",
        body: "We're with you at every step of your journey with round-the-clock care and personal attention.",
        imageSrc: "/images/why/support-photo.jpg",
        imageAlt: "Guest support planning a Himalayan journey",
        icon: "support",
      },
      {
        id: "responsible",
        title: "Responsible Tourism",
        body: "We travel with purpose—supporting local communities and preserving the natural beauty of Nepal.",
        imageSrc: "/images/why/responsible-photo.jpg",
        imageAlt: "Local community in a Himalayan village",
        icon: "responsible",
      },
    ],
    ratings: [
      { id: "ta", label: "Tripadvisor", value: "410+ Reviews", brand: "tripadvisor" },
      { id: "google", label: "Google", value: "4.9 Rating", brand: "google" },
      { id: "facebook", label: "Facebook", value: "4.8 Rating", brand: "facebook" },
      { id: "instagram", label: "Instagram", value: "4.9 Rating", brand: "instagram" },
    ],
  },
  experiences: {
    visible: true,
    eyebrow: "OUR SIGNATURE EXPERIENCES",
    headlineWhite: "More Than Treks.",
    headlineGold: "Extraordinary Experiences.",
    body: "Go beyond the ordinary and discover the Himalayas in the most exclusive ways. Curated experiences that elevate your journey and create memories for a lifetime.",
    ctaLabel: "Explore All Experiences",
    ctaHref: "/luxury-treks",
    cards: [
      {
        id: "heli",
        title: "Helicopter Experiences",
        body: "Scenic flights, heli-tours and private transfers to explore Nepal from the sky.",
        imageSrc: "/images/experiences/heli-photo.jpg",
        imageAlt: "Helicopter flying over snow-capped Himalayan peaks",
        icon: "heli",
        href: "/luxury-helicopter-treks",
      },
      {
        id: "lodges",
        title: "Luxury Lodges & Stays",
        body: "Handpicked luxury lodges and hotels offering comfort, elegance and world-class hospitality.",
        imageSrc: "/images/experiences/lodges-photo.jpg",
        imageAlt: "Luxury mountain lodge interior with a fireplace and peak views",
        icon: "lodge",
        href: "/luxury-treks",
      },
      {
        id: "culture",
        title: "Private Cultural Journeys",
        body: "Immerse in authentic local culture, heritage sites and spiritual experiences with private guides.",
        imageSrc: "/images/experiences/culture-photo.jpg",
        imageAlt: "Nepalese stupa and temples at sunset",
        icon: "culture",
        href: "/luxury-treks",
      },
      {
        id: "flights",
        title: "Mountain Flights",
        body: "Breathtaking scenic flights over Everest and the Himalayas for unforgettable views.",
        imageSrc: "/images/experiences/flights-photo.jpg",
        imageAlt: "Small aircraft flying past Himalayan snow peaks",
        icon: "flight",
        href: "/luxury-helicopter-treks",
      },
      {
        id: "wellness",
        title: "Wellness Journeys",
        body: "Rejuvenate your mind, body and soul with yoga retreats, spa therapies and mindful experiences.",
        imageSrc: "/images/experiences/wellness-photo.jpg",
        imageAlt: "Guest meditating toward a Himalayan sunrise",
        icon: "wellness",
        href: "/luxury-treks",
      },
      {
        id: "wildlife",
        title: "Wildlife & Jungle Safaris",
        body: "Explore Nepal's rich wildlife with private jungle safaris in Chitwan and beyond.",
        imageSrc: "/images/experiences/wildlife-photo.jpg",
        imageAlt: "Leopard resting in a jungle setting",
        icon: "wildlife",
        href: "/luxury-treks",
      },
    ],
  },
  availability: {
    visible: true,
    eyebrow: "LIVE AVAILABILITY",
    headlineBefore: "YOUR",
    headlineGold: "JOURNEY",
    headlineAfter: "AWAITS",
    body: "Secure your private Himalayan escape while your preferred dates are available.",
    cards: [
      {
        id: "sep",
        monthShort: "SEP",
        monthFull: "September",
        badge: "PEAK SEASON",
        imageSrc: "/images/availability/sep.jpg",
        imageAlt: "Luxury lodge patio with fire pit overlooking Himalayan peaks at dusk",
        routes: [
          { id: "sep-1", label: "Everest Base Camp", icon: "peaks" },
          { id: "sep-2", label: "Annapurna Luxury Trek", icon: "temple" },
          { id: "sep-3", label: "Upper Mustang", icon: "trek" },
          { id: "sep-4", label: "Private Helicopter Experiences", icon: "heli" },
        ],
        availableCount: 12,
        availableLabel: "JOURNEYS AVAILABLE",
        ctaLabel: "VIEW AVAILABILITY",
        ctaHref: "/luxury-treks",
      },
      {
        id: "oct",
        monthShort: "OCT",
        monthFull: "October",
        badge: "PRIME SEASON",
        imageSrc: "/images/availability/oct.jpg",
        imageAlt: "Mountain terrace with stupa overlooking a Himalayan valley",
        routes: [
          { id: "oct-1", label: "Everest Region", icon: "peaks" },
          { id: "oct-2", label: "Annapurna Region", icon: "temple" },
          { id: "oct-3", label: "Manaslu", icon: "trek" },
          { id: "oct-4", label: "Luxury Mustang Escape", icon: "heli" },
        ],
        availableCount: 18,
        availableLabel: "JOURNEYS AVAILABLE",
        ctaLabel: "VIEW AVAILABILITY",
        ctaHref: "/luxury-treks",
      },
      {
        id: "nov",
        monthShort: "NOV",
        monthFull: "November",
        badge: "GOLDEN SEASON",
        imageSrc: "/images/availability/nov.jpg",
        imageAlt: "Helicopter flying beside a sunlit Himalayan peak",
        routes: [
          { id: "nov-1", label: "Everest", icon: "peaks" },
          { id: "nov-2", label: "Annapurna", icon: "temple" },
          { id: "nov-3", label: "Luxury Cultural Journeys", icon: "trek" },
          { id: "nov-4", label: "Private Mountain Escapes", icon: "heli" },
        ],
        availableCount: 14,
        availableLabel: "JOURNEYS AVAILABLE",
        ctaLabel: "VIEW AVAILABILITY",
        ctaHref: "/luxury-treks",
      },
    ],
    footItems: [
      {
        id: "live",
        title: "LIVE AVAILABILITY",
        body: "Real-time updates from our booking system",
        icon: "calendar",
      },
      {
        id: "secure",
        title: "SECURE YOUR DATE",
        body: "Limited departures. Book early to secure your date.",
        icon: "secure",
      },
      {
        id: "concierge",
        title: "PERSONAL CONCIERGE",
        body: "Our travel experts are here to craft your perfect journey.",
        icon: "concierge",
      },
    ],
    liveLabel: "UPDATED LIVE",
    liveTimestamp: "24 May 2025, 10:30 AM NPT",
  },
  journal: {
    visible: true,
    eyebrow: "VIDEO JOURNAL",
    headlineBefore: "HIMALAYAN",
    headlineGold: "TRAVEL",
    headlineAfter: "MOMENTS",
    body: "Real journeys. Real experiences. Witness the Himalayas through the eyes of our travellers.",
    ctaLabel: "EXPLORE ALL VIDEOS",
    ctaHref: "#",
    videos: [
      {
        id: "everest",
        title: "Everest Base Camp Trek",
        subtitle: "14 Days Journey",
        duration: "04:28",
        imageSrc: "/images/journal/everest-clean.jpg",
        imageAlt: "Hikers at sunset on the Everest Base Camp trail",
        videoSrc: "",
      },
      {
        id: "annapurna",
        title: "Annapurna Circuit Trek",
        subtitle: "16 Days Adventure",
        duration: "05:12",
        imageSrc: "/images/journal/annapurna-clean.jpg",
        imageAlt: "Traveller overlooking Annapurna peaks",
        videoSrc: "",
      },
      {
        id: "mustang",
        title: "Upper Mustang Expedition",
        subtitle: "13 Days Journey",
        duration: "03:55",
        imageSrc: "/images/journal/mustang-clean.jpg",
        imageAlt: "Stupa and prayer flags with Himalayan peaks",
        videoSrc: "",
      },
    ],
    features: [
      {
        id: "real",
        title: "REAL EXPERIENCES",
        body: "Authentic stories from travellers like you.",
        icon: "peaks",
      },
      {
        id: "moments",
        title: "BEAUTIFUL MOMENTS",
        body: "Capturing the raw beauty of the Himalayas.",
        icon: "camera",
      },
      {
        id: "expert",
        title: "EXPERTLY CREATED",
        body: "Professional videos crafted by our travel experts.",
        icon: "play",
      },
      {
        id: "passion",
        title: "MADE WITH PASSION",
        body: "Our love for the mountains in every frame.",
        icon: "heart",
      },
    ],
  },
};
