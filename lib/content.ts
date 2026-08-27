import { promises as fs } from "fs";
import path from "path";
import { DEFAULT_CONTENT, type SiteContent } from "@/lib/content-types";

const DATA_DIR = path.join(process.cwd(), "data");
const CONTENT_FILE = path.join(DATA_DIR, "site-content.json");

export async function ensureContentFile(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(CONTENT_FILE);
  } catch {
    await fs.writeFile(CONTENT_FILE, JSON.stringify(DEFAULT_CONTENT, null, 2), "utf8");
  }
}

export async function readContent(): Promise<SiteContent> {
  try {
    await ensureContentFile();
    const raw = await fs.readFile(CONTENT_FILE, "utf8");
    const parsed = JSON.parse(raw) as SiteContent;
    return {
      ...DEFAULT_CONTENT,
      ...parsed,
      header: { ...DEFAULT_CONTENT.header, ...parsed.header },
      hero: {
        ...DEFAULT_CONTENT.hero,
        ...parsed.hero,
        stats: parsed.hero?.stats ?? DEFAULT_CONTENT.hero.stats,
      },
      signature: {
        ...DEFAULT_CONTENT.signature,
        ...parsed.signature,
        images: parsed.signature?.images ?? DEFAULT_CONTENT.signature.images,
        features: parsed.signature?.features ?? DEFAULT_CONTENT.signature.features,
      },
      journeys: {
        ...DEFAULT_CONTENT.journeys,
        ...parsed.journeys,
        categories: parsed.journeys?.categories ?? DEFAULT_CONTENT.journeys.categories,
        packages: parsed.journeys?.packages ?? DEFAULT_CONTENT.journeys.packages,
      },
      why: {
        ...DEFAULT_CONTENT.why,
        ...parsed.why,
        cards: parsed.why?.cards ?? DEFAULT_CONTENT.why.cards,
        ratings: parsed.why?.ratings ?? DEFAULT_CONTENT.why.ratings,
      },
      experiences: {
        ...DEFAULT_CONTENT.experiences,
        ...parsed.experiences,
        cards: parsed.experiences?.cards ?? DEFAULT_CONTENT.experiences.cards,
      },
      availability: {
        ...DEFAULT_CONTENT.availability,
        ...parsed.availability,
        cards: parsed.availability?.cards ?? DEFAULT_CONTENT.availability.cards,
        footItems: parsed.availability?.footItems ?? DEFAULT_CONTENT.availability.footItems,
      },
    };
  } catch {
    return structuredClone(DEFAULT_CONTENT);
  }
}

export async function writeContent(content: SiteContent): Promise<SiteContent> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const next: SiteContent = {
    ...content,
    updatedAt: new Date().toISOString(),
  };
  await fs.writeFile(CONTENT_FILE, JSON.stringify(next, null, 2), "utf8");
  return next;
}

export function scrubUploadRefs(content: SiteContent, publicPath: string): SiteContent {
  const fallbackLogo = DEFAULT_CONTENT.header.logoSrc;

  return {
    ...content,
    header: {
      logoSrc: content.header.logoSrc === publicPath ? fallbackLogo : content.header.logoSrc,
    },
    hero: {
      ...content.hero,
      posterSrc:
        content.hero.posterSrc === publicPath
          ? DEFAULT_CONTENT.hero.posterSrc
          : content.hero.posterSrc,
      videoSrc:
        content.hero.videoSrc === publicPath
          ? DEFAULT_CONTENT.hero.videoSrc
          : content.hero.videoSrc,
      stats: content.hero.stats
        .map((stat) =>
          stat.iconSrc === publicPath ? { ...stat, iconSrc: undefined, iconKey: "custom" as const } : stat,
        )
        .filter((stat) => !(stat.iconSrc === undefined && stat.iconKey === "custom" && !stat.label)),
    },
    signature: {
      ...content.signature,
      images: content.signature.images.filter((img) => img.src !== publicPath),
    },
    journeys: {
      ...content.journeys,
      packages: content.journeys.packages.map((pkg) =>
        pkg.imageSrc === publicPath
          ? { ...pkg, imageSrc: DEFAULT_CONTENT.journeys.packages[0]?.imageSrc ?? pkg.imageSrc }
          : pkg,
      ),
    },
    why: {
      ...content.why,
      cards: content.why.cards.map((card, index) => ({
        ...card,
        imageSrc:
          card.imageSrc === publicPath
            ? DEFAULT_CONTENT.why.cards[index]?.imageSrc ?? DEFAULT_CONTENT.why.cards[0].imageSrc
            : card.imageSrc,
        iconSrc: card.iconSrc === publicPath ? undefined : card.iconSrc,
      })),
      ratings: content.why.ratings.map((rating) => ({
        ...rating,
        logoSrc: rating.logoSrc === publicPath ? undefined : rating.logoSrc,
      })),
    },
    experiences: {
      ...content.experiences,
      cards: (content.experiences?.cards ?? []).map((card, index) => ({
        ...card,
        imageSrc:
          card.imageSrc === publicPath
            ? DEFAULT_CONTENT.experiences.cards[index]?.imageSrc ??
              DEFAULT_CONTENT.experiences.cards[0].imageSrc
            : card.imageSrc,
        iconSrc: card.iconSrc === publicPath ? undefined : card.iconSrc,
      })),
    },
    availability: {
      ...content.availability,
      cards: (content.availability?.cards ?? []).map((card, index) => ({
        ...card,
        imageSrc:
          card.imageSrc === publicPath
            ? DEFAULT_CONTENT.availability.cards[index]?.imageSrc ??
              DEFAULT_CONTENT.availability.cards[0].imageSrc
            : card.imageSrc,
        routes: (card.routes ?? []).map((route) => ({
          ...route,
          iconSrc: route.iconSrc === publicPath ? undefined : route.iconSrc,
        })),
      })),
      footItems: (content.availability?.footItems ?? []).map((item) => ({
        ...item,
        iconSrc: item.iconSrc === publicPath ? undefined : item.iconSrc,
      })),
    },
  };
}
