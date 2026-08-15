export type NavLink = { label: string; href: string };

export type NavGroup = {
  title: string;
  href: string;
  links: NavLink[];
};

export type NavItem = {
  label: string;
  href: string;
  groups?: NavGroup[];
  children?: NavLink[];
};

export function slugify(label: string) {
  return label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function toPath(label: string) {
  return `/${slugify(label)}`;
}

function link(label: string): NavLink {
  return { label, href: toPath(label) };
}

function group(title: string, labels: string[]): NavGroup {
  return {
    title,
    href: toPath(title),
    links: labels.map(link),
  };
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Destinations",
    href: "/destinations",
    groups: [
      group("Everest Region", [
        "Everest Base Camp",
        "Everest Luxury Lodge Trek",
        "Gokyo Valley",
        "Everest Three Passes",
      ]),
      group("Annapurna Region", [
        "Annapurna Base Camp",
        "Annapurna Circuit",
        "Mardi Himal",
        "Ghorepani Poon Hill",
      ]),
      group("Manaslu Region", [
        "Manaslu Circuit",
        "Tsum Valley",
        "Manaslu & Tsum Valley",
      ]),
      group("Langtang Region", [
        "Langtang Valley",
        "Gosaikunda",
        "Langtang & Gosaikunda",
      ]),
      group("Mustang", [
        "Upper Mustang",
        "Lower Mustang",
        "Mustang Luxury Journey",
      ]),
      group("Other Himalayan Regions", [
        "Makalu",
        "Kanchenjunga",
        "Dolpo",
        "Nar Phu Valley",
      ]),
    ],
  },
  {
    label: "Luxury Treks",
    href: "/luxury-treks",
    groups: [
      group("Featured Luxury Treks", [
        "Luxury Everest Base Camp Trek",
        "Luxury Annapurna Base Camp Trek",
        "Luxury Annapurna Circuit",
        "Luxury Manaslu Circuit Trek",
        "Luxury Upper Mustang Trek",
        "Luxury Mardi Himal Trek",
        "Luxury Langtang Valley Trek",
        "Luxury Ghorepani Poon Hill Trek",
      ]),
      group("Luxury Trek Styles", [
        "Luxury Lodge Treks",
        "Private Luxury Treks",
        "Luxury Family Treks",
        "Luxury Honeymoon Treks",
        "Luxury Short Treks",
        "Luxury Helicopter Treks",
      ]),
      group("Premium Experiences", [
        "Helicopter Tours",
        "Luxury Mountain Experiences",
        "Private Guided Expeditions",
      ]),
    ],
  },
  {
    label: "Experiences",
    href: "/experiences",
    children: [
      link("Helicopter Tours"),
      link("Luxury Mountain Experiences"),
      link("Private Guided Expeditions"),
      link("Cultural Journeys"),
      link("Photography Treks"),
    ],
  },
  {
    label: "Travel Guide",
    href: "/travel-guide",
    children: [
      link("Visa & Entry"),
      link("Best Time to Visit"),
      link("Packing Guide"),
      link("Altitude Tips"),
      link("Permits & Fees"),
    ],
  },
  { label: "About Us", href: "/about-us" },
  { label: "Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
];

export type RouteMeta = {
  slug: string;
  title: string;
  description: string;
};

export function getAllRoutes(): RouteMeta[] {
  const map = new Map<string, RouteMeta>();

  const add = (href: string, title: string) => {
    const slug = href.replace(/^\//, "");
    if (!slug || map.has(slug)) return;
    map.set(slug, {
      slug,
      title,
      description: `${title} with Ambition Holiday — premium Nepal trekking and adventure travel.`,
    });
  };

  for (const item of NAV_ITEMS) {
    add(item.href, item.label);
    for (const child of item.children ?? []) {
      add(child.href, child.label);
    }
    for (const g of item.groups ?? []) {
      add(g.href, g.title);
      for (const child of g.links) {
        add(child.href, child.label);
      }
    }
  }

  return Array.from(map.values());
}

export function getRouteBySlug(slug: string): RouteMeta | undefined {
  return getAllRoutes().find((route) => route.slug === slug);
}
