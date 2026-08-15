"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type NavLink = { label: string; href: string };

type NavGroup = {
  title: string;
  href: string;
  links: NavLink[];
};

type NavItem = {
  label: string;
  href: string;
  groups?: NavGroup[];
  children?: NavLink[];
};

function slugify(label: string) {
  return `#${label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

function link(label: string): NavLink {
  return { label, href: slugify(label) };
}

function group(title: string, labels: string[]): NavGroup {
  return {
    title,
    href: slugify(title),
    links: labels.map(link),
  };
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Destinations",
    href: "#destinations",
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
    href: "#luxury-treks",
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
    href: "#experiences",
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
    href: "#travel-guide",
    children: [
      link("Visa & Entry"),
      link("Best Time to Visit"),
      link("Packing Guide"),
      link("Altitude Tips"),
      link("Permits & Fees"),
    ],
  },
  { label: "About Us", href: "#about" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

const WHATSAPP_URL = "https://wa.me/9779851148898";
const PHONE_DISPLAY = "+977 9851148898";

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
    >
      <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function hasMenu(item: NavItem) {
  return Boolean(item.groups?.length || item.children?.length);
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navId = useId();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={`absolute inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || mobileOpen
          ? "bg-[rgba(8,12,18,0.88)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[5rem] max-w-[92rem] items-center gap-3 px-4 sm:h-[5.25rem] sm:px-5 lg:gap-4 lg:px-6 xl:px-8">
        <Link href="/" className="focus-ring relative z-10 shrink-0" aria-label="Ambition Holiday home">
          <Image
            src="/images/ambition-holiday-logo.png"
            alt="Ambition Holiday — Journeys Beyond Limits"
            width={354}
            height={101}
            priority
            className="h-[3.48rem] w-auto object-contain sm:h-[3.8rem] lg:h-[4.24rem]"
          />
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center xl:flex"
          aria-label="Primary"
        >
          <ul className="flex items-center gap-0.5 2xl:gap-1">
            {NAV_ITEMS.map((item) => {
              const menu = hasMenu(item);
              const isOpen = openDropdown === item.label;
              const isMega = Boolean(item.groups?.length);

              return (
                <li key={item.label} className="relative">
                  {menu ? (
                    <>
                      <button
                        type="button"
                        className={`focus-ring inline-flex items-center gap-1.5 rounded-md px-2.5 py-2 text-[0.82rem] font-semibold tracking-[0.04em] text-white transition-colors duration-200 hover:text-gold 2xl:px-3 2xl:text-[0.88rem] ${
                          isOpen ? "text-gold" : ""
                        }`}
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        onClick={() =>
                          setOpenDropdown((current) =>
                            current === item.label ? null : item.label,
                          )
                        }
                        onMouseEnter={() => setOpenDropdown(item.label)}
                      >
                        {item.label}
                        <Chevron open={isOpen} />
                      </button>
                      {isOpen ? (
                        isMega ? (
                          <div
                            className={`animate-dropdown absolute top-full z-50 mt-1 rounded-xl border border-white/10 bg-[rgba(10,14,20,0.97)] p-5 shadow-2xl backdrop-blur-md ${
                              item.label === "Destinations"
                                ? "left-1/2 w-[min(92vw,58rem)] -translate-x-1/2"
                                : "left-0 w-[min(92vw,42rem)]"
                            }`}
                            onMouseLeave={() => setOpenDropdown(null)}
                          >
                            <div
                              className={`grid gap-6 ${
                                item.label === "Destinations"
                                  ? "grid-cols-3"
                                  : "grid-cols-3"
                              }`}
                            >
                              {item.groups!.map((section) => (
                                <div key={section.title}>
                                  <Link
                                    href={section.href}
                                    className="focus-ring mb-2 block text-[0.72rem] font-bold uppercase tracking-[0.12em] text-gold"
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    {section.title}
                                  </Link>
                                  <ul className="space-y-0.5">
                                    {section.links.map((child) => (
                                      <li key={child.label}>
                                        <Link
                                          href={child.href}
                                          className="focus-ring block rounded-md px-1 py-1.5 text-[0.8rem] text-white/85 transition-colors hover:bg-white/5 hover:text-gold"
                                          onClick={() => setOpenDropdown(null)}
                                        >
                                          {child.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div
                            className="animate-dropdown absolute left-1/2 top-full z-50 mt-1 min-w-[14rem] -translate-x-1/2 rounded-lg border border-white/10 bg-[rgba(10,14,20,0.96)] py-2 shadow-xl backdrop-blur-md"
                            onMouseLeave={() => setOpenDropdown(null)}
                          >
                            <ul role="menu">
                              {item.children!.map((child) => (
                                <li key={child.label} role="none">
                                  <Link
                                    href={child.href}
                                    role="menuitem"
                                    className="focus-ring block px-4 py-2 text-[0.8rem] text-white/85 transition-colors hover:bg-white/5 hover:text-gold"
                                    onClick={() => setOpenDropdown(null)}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      ) : null}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="focus-ring inline-flex items-center rounded-md px-2.5 py-2 text-[0.82rem] font-semibold tracking-[0.04em] text-white transition-colors duration-200 hover:text-gold 2xl:px-3 2xl:text-[0.88rem]"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2 lg:gap-2.5">
          <button
            type="button"
            aria-label="Favourites"
            className="focus-ring mr-3.5 hidden rounded-full p-2 text-white transition-colors hover:text-gold md:inline-flex lg:mr-5"
          >
            <svg viewBox="0 0 24 24" className="h-[1.33rem] w-[1.33rem]" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
              <path
                d="M12 20.4S4.8 15.7 4.8 10.4A3.95 3.95 0 0 1 12 7.35a3.95 3.95 0 0 1 7.2 3.05c0 5.3-7.2 10-7.2 10Z"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring hidden items-center gap-2.5 rounded-md border border-gold/80 px-2.5 py-1.5 transition-colors hover:border-gold hover:bg-white/5 lg:inline-flex"
            aria-label={`Call or WhatsApp ${PHONE_DISPLAY}`}
          >
            <span className="whatsapp-call-pulse relative flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_0_0_0_rgba(37,211,102,0.55)]">
              <svg viewBox="0 0 24 24" className="h-[1.05rem] w-[1.05rem]" fill="currentColor" aria-hidden="true">
                <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.8 21 3 13.2 3 3.7c0-.6.4-1 1-1H7c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.2Z" />
              </svg>
            </span>
            <span className="text-[0.84rem] font-semibold tracking-wide text-gold">
              {PHONE_DISPLAY}
            </span>
          </a>

          <button
            type="button"
            className="focus-ring inline-flex rounded-md p-2 text-white xl:hidden"
            aria-expanded={mobileOpen}
            aria-controls={navId}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div id={navId} className={`xl:hidden ${mobileOpen ? "block" : "hidden"}`}>
        <div className="max-h-[calc(100vh-4.75rem)] overflow-y-auto border-t border-white/10 bg-[rgba(8,12,18,0.96)] px-4 pb-8 pt-3 backdrop-blur-lg">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const menu = hasMenu(item);
              const expanded = mobileExpanded === item.label;

              return (
                <li key={item.label} className="border-b border-white/10">
                  {menu ? (
                    <>
                      <button
                        type="button"
                        className="focus-ring flex w-full items-center justify-between py-3.5 text-left text-[0.95rem] font-semibold text-white"
                        aria-expanded={expanded}
                        onClick={() => {
                          setMobileExpanded((current) =>
                            current === item.label ? null : item.label,
                          );
                          setMobileGroup(null);
                        }}
                      >
                        {item.label}
                        <Chevron open={expanded} />
                      </button>
                      {expanded ? (
                        item.groups ? (
                          <div className="animate-dropdown space-y-1 pb-3 pl-1">
                            {item.groups.map((section) => {
                              const groupOpen = mobileGroup === `${item.label}:${section.title}`;
                              return (
                                <div key={section.title}>
                                  <button
                                    type="button"
                                    className="focus-ring flex w-full items-center justify-between py-2.5 pl-2 text-left text-sm font-semibold text-gold"
                                    aria-expanded={groupOpen}
                                    onClick={() =>
                                      setMobileGroup((current) =>
                                        current === `${item.label}:${section.title}`
                                          ? null
                                          : `${item.label}:${section.title}`,
                                      )
                                    }
                                  >
                                    {section.title}
                                    <Chevron open={groupOpen} />
                                  </button>
                                  {groupOpen ? (
                                    <ul className="space-y-0.5 pb-2 pl-4">
                                      {section.links.map((child) => (
                                        <li key={child.label}>
                                          <Link
                                            href={child.href}
                                            className="focus-ring block py-2 text-sm text-white/75 hover:text-gold"
                                            onClick={() => setMobileOpen(false)}
                                          >
                                            {child.label}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : null}
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <ul className="animate-dropdown space-y-1 pb-3 pl-3">
                            {item.children!.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.href}
                                  className="focus-ring block py-2 text-sm text-white/75 hover:text-gold"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )
                      ) : null}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="focus-ring block py-3.5 text-[0.95rem] font-semibold text-white hover:text-gold"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring mt-5 flex items-center gap-3 rounded-xl border border-gold/25 bg-white/5 px-4 py-3"
          >
            <span className="whatsapp-call-pulse relative flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.8 21 3 13.2 3 3.7c0-.6.4-1 1-1H7c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.2Z" />
              </svg>
            </span>
            <span>
              <span className="block text-xs text-white/70">Call or WhatsApp 24/7</span>
              <span className="text-sm font-semibold text-gold">{PHONE_DISPLAY}</span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
