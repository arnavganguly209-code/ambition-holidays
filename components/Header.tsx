"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Destinations",
    href: "#destinations",
    children: [
      { label: "Nepal", href: "#nepal" },
      { label: "Tibet", href: "#tibet" },
      { label: "Bhutan", href: "#bhutan" },
      { label: "India", href: "#india" },
    ],
  },
  {
    label: "Trekking In Nepal",
    href: "#trekking",
    children: [
      { label: "Everest Region", href: "#everest" },
      { label: "Annapurna Region", href: "#annapurna" },
      { label: "Langtang Region", href: "#langtang" },
      { label: "Manaslu Circuit", href: "#manaslu" },
    ],
  },
  {
    label: "Travel Info",
    href: "#travel-info",
    children: [
      { label: "Visa & Entry", href: "#visa" },
      { label: "Best Time to Visit", href: "#best-time" },
      { label: "Packing Guide", href: "#packing" },
      { label: "Altitude Tips", href: "#altitude" },
    ],
  },
  {
    label: "Company",
    href: "#company",
    children: [
      { label: "About Us", href: "#about" },
      { label: "Why Choose Us", href: "#why-us" },
      { label: "Our Team", href: "#team" },
      { label: "Testimonials", href: "#testimonials" },
    ],
  },
  { label: "Travel Blogs", href: "#blogs" },
  { label: "Contact Us", href: "#contact" },
];

const WHATSAPP_URL = "https://wa.me/9779851017167";
const PHONE_DISPLAY = "+977 9851017167";

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

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
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
      <div className="mx-auto flex h-[4.25rem] max-w-[92rem] items-center gap-3 px-4 sm:h-[4.5rem] sm:px-5 lg:gap-4 lg:px-6 xl:px-8">
        <Link href="/" className="focus-ring relative z-10 shrink-0" aria-label="Ambition Holiday home">
          <Image
            src="/images/ambition-holiday-logo.png"
            alt="Ambition Holiday — Journeys Beyond Limits"
            width={280}
            height={80}
            priority
            className="h-11 w-auto object-contain sm:h-12 lg:h-[3.35rem]"
          />
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center xl:flex"
          aria-label="Primary"
        >
          <ul className="flex items-center gap-0.5 2xl:gap-1">
            {NAV_ITEMS.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const isOpen = openDropdown === item.label;

              return (
                <li key={item.label} className="relative">
                  {hasChildren ? (
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
                        <div
                          className="animate-dropdown absolute left-1/2 top-full z-50 mt-1 min-w-[13rem] -translate-x-1/2 rounded-lg border border-white/10 bg-[rgba(10,14,20,0.96)] py-2 shadow-xl backdrop-blur-md"
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

        <div className="ml-auto flex items-center gap-2 sm:gap-3 lg:gap-3.5">
          <button
            type="button"
            aria-label="Open search"
            className="focus-ring hidden rounded-full p-2 text-white/90 transition-colors hover:text-gold md:inline-flex"
          >
            <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Favourites"
            className="focus-ring hidden rounded-full p-2 text-white/90 transition-colors hover:text-gold md:inline-flex"
          >
            <svg viewBox="0 0 24 24" className="h-[1.1rem] w-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path
                d="M12 20s-7-4.4-7-9.2A3.8 3.8 0 0 1 12 7.8a3.8 3.8 0 0 1 7 3C19 15.6 12 20 12 20Z"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring hidden items-center gap-2 rounded-md border border-gold/80 px-3 py-2 transition-colors hover:border-gold hover:bg-white/5 lg:inline-flex"
            aria-label={`WhatsApp ${PHONE_DISPLAY}`}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#25D366]" fill="currentColor" aria-hidden="true">
              <path d="M20.5 3.5A11 11 0 0 0 2.1 16.7L1 23l6.5-1.7A11 11 0 0 0 20.5 3.5Zm-8.6 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.9 1 1-3.8-.2-.3a9.1 9.1 0 1 1 8 4.6Zm5-6.8c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.1-.3c0-.1 0-.3-.1-.4s-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3a2 2 0 0 0-.6 1.5 3.5 3.5 0 0 0 .7 1.9 8 8 0 0 0 3.1 3 10.4 10.4 0 0 0 2.3.9 2.8 2.8 0 0 0 1.8.1 2.4 2.4 0 0 0 1.5-1.1 1.9 1.9 0 0 0 .1-1.1c-.1-.1-.3-.2-.6-.3Z" />
            </svg>
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

      <div
        id={navId}
        className={`xl:hidden ${mobileOpen ? "block" : "hidden"}`}
      >
        <div className="max-h-[calc(100vh-4.25rem)] overflow-y-auto border-t border-white/10 bg-[rgba(8,12,18,0.96)] px-4 pb-8 pt-3 backdrop-blur-lg">
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const expanded = mobileExpanded === item.label;

              return (
                <li key={item.label} className="border-b border-white/10">
                  {hasChildren ? (
                    <>
                      <button
                        type="button"
                        className="focus-ring flex w-full items-center justify-between py-3.5 text-left text-[0.95rem] font-semibold text-white"
                        aria-expanded={expanded}
                        onClick={() =>
                          setMobileExpanded((current) =>
                            current === item.label ? null : item.label,
                          )
                        }
                      >
                        {item.label}
                        <Chevron open={expanded} />
                      </button>
                      {expanded ? (
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
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#25D366]" fill="currentColor" aria-hidden="true">
              <path d="M20.5 3.5A11 11 0 0 0 2.1 16.7L1 23l6.5-1.7A11 11 0 0 0 20.5 3.5Zm-8.6 17a9.1 9.1 0 0 1-4.6-1.3l-.3-.2-3.9 1 1-3.8-.2-.3a9.1 9.1 0 1 1 8 4.6Zm5-6.8c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.1-.3c0-.1 0-.3-.1-.4s-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3a2 2 0 0 0-.6 1.5 3.5 3.5 0 0 0 .7 1.9 8 8 0 0 0 3.1 3 10.4 10.4 0 0 0 2.3.9 2.8 2.8 0 0 0 1.8.1 2.4 2.4 0 0 0 1.5-1.1 1.9 1.9 0 0 0 .1-1.1c-.1-.1-.3-.2-.6-.3Z" />
            </svg>
            <span>
              <span className="block text-xs text-white/70">WhatsApp or call us 24/7</span>
              <span className="text-sm font-semibold text-gold">{PHONE_DISPLAY}</span>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
