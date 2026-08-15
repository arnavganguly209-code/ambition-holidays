const features = [
  {
    label: "410+ TripAdvisor reviews",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9 sm:h-10 sm:w-10" fill="currentColor" aria-hidden="true">
        {/* TripAdvisor-style owl mark */}
        <path d="M24 8.5c-7.2 0-13.2 4.9-14.8 11.5 1.9-1.4 4.2-2.2 6.7-2.2 3.4 0 6.4 1.6 8.1 4.1 1.7-2.5 4.7-4.1 8.1-4.1 2.5 0 4.8.8 6.7 2.2C37.2 13.4 31.2 8.5 24 8.5Z" />
        <circle cx="16.8" cy="24.2" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="31.2" cy="24.2" r="6.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="16.8" cy="24.2" r="2.4" />
        <circle cx="31.2" cy="24.2" r="2.4" />
        <path
          d="M21.2 30.8c.8 1.6 2.1 2.7 3.8 2.7s3-1.1 3.8-2.7"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "11+ years of experience",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9 sm:h-10 sm:w-10" fill="none" aria-hidden="true">
        {/* Award badge with star + ribbons */}
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
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9 sm:h-10 sm:w-10" fill="none" aria-hidden="true">
        {/* Thumbs up with motion accents */}
        <path
          d="M20 40H14.5a2 2 0 0 1-2-2V23.5a2 2 0 0 1 2-2H20"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M20 21.5V17c0-3.2 1.8-5.5 4.6-5.5.9 0 1.6.7 1.6 1.6V18h5.2c2.2 0 3.8 2 3.4 4.1l-1.8 10.2c-.4 2-2.1 3.5-4.2 3.5H20V21.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M33 12.5c1.1-.9 2.4-1.4 3.8-1.5M34.5 16c1.3-.4 2.6-.5 4-.3M35 19.5c1.2.1 2.4.4 3.5 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Responsible tourism",
    icon: (
      <svg viewBox="0 0 48 48" className="h-9 w-9 sm:h-10 sm:w-10" fill="none" aria-hidden="true">
        {/* Hand holding sprout */}
        <path
          d="M24 8c.2 3.5-1.2 6.2-3.8 8.2 2.8.4 5.2-.6 7-2.6-.1 3.6-2.2 6.2-5.4 7.4"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M22.8 20.8V28" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <path
          d="M12 32.5c2.2-2.8 5-4.2 8.2-4.2h4.6c1.8 0 3.2 1.4 3.2 3.2 0 .7-.2 1.3-.6 1.8 1.4.2 2.5 1.4 2.5 2.9 0 1.4-1 2.6-2.3 2.9.4.4.6 1 .6 1.7 0 1.6-1.3 2.9-2.9 2.9H16.5C13 43.7 10 40.2 10 35.8c0-1.2.3-2.3.9-3.3Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
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
