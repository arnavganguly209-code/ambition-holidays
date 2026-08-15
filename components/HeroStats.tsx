const stats = [
  {
    value: "50+",
    label: "TREKKING ROUTES",
    detail: "Handpicked adventures",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="m3 18 6-10 4 6 2-3 6 7H3Z" strokeLinejoin="round" />
        <path d="M12 8V5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "1500+",
    label: "HAPPY ADVENTURERS",
    detail: "Trusted by many explorers",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M3.5 19c.8-3 2.8-4.5 5.5-4.5S14 16 14.8 19" strokeLinecap="round" />
        <path d="M14.5 14.8c1.5-.8 3.2-.7 4.8.4.7.5 1.2 1.3 1.5 2.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    value: "10+",
    label: "YEARS EXPERIENCE",
    detail: "Expertise you can trust",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="m12 7 1.4 2.9 3.2.4-2.4 2.2.7 3.1L12 14.2 8.1 15.6l.7-3.1-2.4-2.2 3.2-.4L12 7Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    value: "24/7",
    label: "SUPPORT",
    detail: "We're here for you anytime",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M4 12a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-1.5" strokeLinecap="round" />
        <rect x="3" y="11" width="3.5" height="6" rx="1.2" />
        <rect x="17.5" y="11" width="3.5" height="6" rx="1.2" />
        <path d="M12 19h2a2 2 0 0 0 2-2" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function HeroStats() {
  return (
    <div className="animate-fade-up-delay-3 w-full px-4 pb-5 sm:px-6 sm:pb-7 lg:px-10 lg:pb-8">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/15 bg-[rgba(8,12,18,0.58)] px-2 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-md sm:px-3 sm:py-3.5">
        <ul className="grid grid-cols-2 divide-y divide-white/10 sm:grid-cols-4 sm:divide-x sm:divide-y-0 sm:divide-[rgba(201,162,39,0.35)]">
          {stats.map((stat) => (
            <li
              key={stat.label}
              className="flex items-center gap-2.5 px-3 py-2.5 sm:justify-center sm:gap-3 sm:px-4 sm:py-1 lg:px-5"
            >
              <span className="shrink-0 text-gold">{stat.icon}</span>
              <div className="min-w-0">
                <p className="font-serif text-[1.35rem] leading-none tracking-wide text-gold sm:text-[1.45rem] lg:text-[1.6rem]">
                  {stat.value}
                </p>
                <p className="mt-1 text-[0.62rem] font-medium uppercase tracking-[0.12em] text-white sm:text-[0.68rem]">
                  {stat.label}
                </p>
                <p className="mt-0.5 hidden text-[0.68rem] text-white/70 lg:block">
                  {stat.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
