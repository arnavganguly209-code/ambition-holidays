import Image from "next/image";
import type { ReactNode } from "react";

type Feature = {
  label: string;
  iconSrc?: string;
  iconAlt?: string;
  icon?: ReactNode;
};

const features: Feature[] = [
  {
    label: "410+ TripAdvisor reviews",
    iconSrc: "/images/icons/tripadvisor.png",
    iconAlt: "TripAdvisor",
  },
  {
    label: "11+ years of experience",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9 sm:h-10 sm:w-10" fill="none" aria-hidden="true">
        <circle cx="24" cy="20" r="10" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M24 14.2 25.7 18l4.1.4-3.1 2.8.9 4-3.6-2.1-3.6 2.1.9-4-3.1-2.8 4.1-.4L24 14.2Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M18.2 28.5 15 39l9-4.2L33 39l-3.2-10.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Best price guarantee",
    iconSrc: "/images/icons/best-price.png",
    iconAlt: "Best price guarantee",
  },
  {
    label: "Responsible tourism",
    iconSrc: "/images/icons/responsible-tourism.png",
    iconAlt: "Responsible tourism",
  },
];

export default function HeroStats() {
  return (
    <div className="animate-fade-up-delay-3 w-full px-4 pb-6 sm:px-8 sm:pb-8 lg:px-12 lg:pb-10">
      <ul className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-white/25 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-white/30">
        {features.map((feature) => (
          <li
            key={feature.label}
            className="flex items-center gap-3 px-2 py-4 sm:justify-center sm:px-4 sm:py-2 lg:px-5"
          >
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center text-white sm:h-10 sm:w-10">
              {feature.iconSrc ? (
                <Image
                  src={feature.iconSrc}
                  alt={feature.iconAlt ?? ""}
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              ) : (
                feature.icon
              )}
            </span>
            <p className="text-[0.92rem] font-medium leading-snug text-white sm:text-[0.95rem]">
              {feature.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
