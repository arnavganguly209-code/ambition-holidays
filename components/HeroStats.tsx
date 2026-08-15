const features = [
  {
    label: "20+ years of experience",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9 sm:h-10 sm:w-10" fill="none" aria-hidden="true">
        <path
          d="M24 8c-2.2 3.8-5.2 6.4-8.8 8.2 1.4 4.6 4.6 7.8 8.8 9.8 4.2-2 7.4-5.2 8.8-9.8C29.2 14.4 26.2 11.8 24 8Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M15 28.5c-2.8 1.4-5 3.6-6.5 6.5M33 28.5c2.8 1.4 5 3.6 6.5 6.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="m18.5 38.5 2.2-2.2 1.8 1.6 2.5-3.2 2.2 2.4 2.3-2.6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Supporting local communities",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9 sm:h-10 sm:w-10" fill="none" aria-hidden="true">
        <path
          d="M24 8 10 20h4v16h20V20h4L24 8Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M20 36V26h8v10" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <circle cx="24" cy="18.5" r="2.2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M16 40h16" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Responsible tourism",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9 sm:h-10 sm:w-10" fill="none" aria-hidden="true">
        <path
          d="M14 28c0-4.5 3.2-8.2 7.5-9.2C20.8 14.5 22.2 11 24 9c1.8 2 3.2 5.5 2.5 9.8 4.3 1 7.5 4.7 7.5 9.2 0 3.2-1.5 5.8-4 7.5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 38c2-3.5 4.5-5 6-5s4 1.5 6 5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path d="M24 19v6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Run by experts",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9 sm:h-10 sm:w-10" fill="none" aria-hidden="true">
        <circle cx="24" cy="16" r="5.5" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M12 38c1.8-7 5.8-10.5 12-10.5S34.2 31 36 38"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M30 14.5c1.2-.8 2.8-1 4.2-.2 1.8 1 2.5 3 1.8 4.8"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
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
            <span className="shrink-0 text-white">{feature.icon}</span>
            <p className="text-[0.92rem] font-medium leading-snug text-white sm:text-[0.95rem]">
              {feature.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
