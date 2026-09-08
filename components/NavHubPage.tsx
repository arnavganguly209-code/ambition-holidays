import Link from "next/link";
import Header from "@/components/Header";
import type { NavGroup, NavItem } from "@/lib/nav";

const WHATSAPP_URL = "https://wa.me/9779851148898";

function hubCopy(label: string) {
  if (label === "Destinations") {
    return {
      eyebrow: "Explore Nepal",
      body: "Himalayan regions and curated treks — guided journeys beyond limits.",
    };
  }
  if (label === "Luxury Tour & Trek") {
    return {
      eyebrow: "Luxury journeys",
      body: "Lodge trails, private guiding, and elevated mountain experiences.",
    };
  }
  if (label === "Experiences") {
    return {
      eyebrow: "Signature moments",
      body: "Helicopter, private expeditions, culture, and photography.",
    };
  }
  if (label === "Travel Guide") {
    return {
      eyebrow: "Plan with confidence",
      body: "Visas, seasons, packing, altitude, and permits — clear and calm.",
    };
  }
  return {
    eyebrow: "Ambition Holiday",
    body: "Premium Nepal trekking and adventure travel.",
  };
}

function GroupPanel({ group, compact }: { group: NavGroup; compact?: boolean }) {
  return (
    <section
      id={group.href.replace(/^\//, "")}
      className={`rounded-[1.15rem] border border-[#c9a227]/30 ${compact ? "p-3.5" : "p-4 sm:p-5"}`}
      style={{
        background: "linear-gradient(165deg, #eef5fa 0%, #e8f0f6 55%, #f3eee6 100%)",
      }}
    >
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-[#c9a227]/22 pb-2.5">
        <h2
          className={`font-extrabold tracking-tight text-[#12151c] ${
            compact ? "text-[1rem]" : "text-[1.08rem]"
          }`}
        >
          {group.title}
        </h2>
        <Link href={group.href} className="focus-ring text-[0.7rem] font-bold text-[#7a5e0c]">
          View all →
        </Link>
      </div>
      <ul className={`grid gap-0.5 ${compact ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
        {group.links.map((child) => (
          <li key={child.href}>
            <Link
              href={child.href}
              className="focus-ring group inline-flex items-center gap-2 rounded-lg px-2 py-2 text-[0.88rem] font-semibold text-[#1a1f27] hover:bg-[#fbfcfe] hover:text-[#8f6f12]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#c9a227]" aria-hidden="true" />
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function NavHubPage({ item }: { item: NavItem }) {
  const copy = hubCopy(item.label);
  const groups = item.groups ?? [];
  const compact = item.label === "Experiences" || item.label === "Travel Guide";

  return (
    <main
      className="min-h-screen min-w-0 overflow-x-clip pb-[env(safe-area-inset-bottom)]"
      style={{
        background: "linear-gradient(180deg, #d8ebf6 0%, #e8eef4 50%, #f2eee6 100%)",
        fontFamily: "var(--font-manrope), ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div className="relative isolate">
        <Header />

        <section
          className={`relative mx-auto px-4 pb-14 pt-[max(8rem,calc(env(safe-area-inset-top)+6rem))] sm:px-6 lg:px-8 ${
            compact ? "max-w-3xl" : "max-w-6xl"
          }`}
        >
          <div
            className="overflow-hidden rounded-[1.15rem] border border-[#c9a227]/35 shadow-[0_20px_50px_rgba(28,48,72,0.14)]"
            style={{
              background: "linear-gradient(148deg, #d8ebf6 0%, #e8f2f8 48%, #f2eee4 100%)",
            }}
          >
            <div
              className="h-[2px] w-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #c9a227 20%, #e8d48a 50%, #c9a227 80%, transparent)",
              }}
              aria-hidden="true"
            />
            <div className="px-5 py-5 sm:px-7 sm:py-6">
              <p className="text-[0.64rem] font-bold uppercase tracking-[0.18em] text-[#7a5e0c]">
                {copy.eyebrow}
              </p>
              <h1 className="mt-1.5 text-[clamp(1.7rem,4.5vw,2.45rem)] font-extrabold tracking-tight text-[#12151c]">
                {item.label}
              </h1>
              <p className="mt-2 max-w-2xl text-[0.92rem] font-medium leading-relaxed text-[#2a3340]/85">
                {copy.body}
              </p>
            </div>
          </div>

          <div className={`mt-5 grid grid-cols-1 gap-3.5 ${compact ? "" : "lg:grid-cols-2"}`}>
            {groups.map((group) => (
              <GroupPanel key={group.title} group={group} compact={compact} />
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <Link
              href="/"
              className="focus-ring inline-flex min-h-10 items-center rounded-md border border-[#c9a227]/55 bg-[#fbfcfe] px-4 py-2 text-sm font-bold text-[#7a5e0c]"
            >
              Back to home
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex min-h-10 items-center rounded-md bg-[#12151c] px-4 py-2 text-sm font-bold text-white"
            >
              WhatsApp us
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
