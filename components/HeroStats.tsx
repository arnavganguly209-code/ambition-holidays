const iconClass = "h-10 w-10 shrink-0";

const features = [
  {
    label: "410+ TripAdvisor reviews",
    icon: (
      <svg viewBox="0 0 48 48" className={iconClass} fill="none" aria-hidden="true">
        {/* TripAdvisor owl — clean line mark */}
        <path
          d="M10.5 18.2c2.4-5.4 7.4-9 13.5-9s11.1 3.6 13.5 9"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinecap="round"
        />
        <path
          d="M15.2 15.6 17 12.8M32.8 15.6 31 12.8"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinecap="round"
        />
        <circle cx="17.2" cy="24.2" r="7.1" stroke="currentColor" strokeWidth="1.85" />
        <circle cx="30.8" cy="24.2" r="7.1" stroke="currentColor" strokeWidth="1.85" />
        <circle cx="17.2" cy="24.2" r="2.55" fill="currentColor" />
        <circle cx="30.8" cy="24.2" r="2.55" fill="currentColor" />
        <path
          d="M24 27.2 22.4 30.4h3.2L24 27.2Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: "11+ years of experience",
    icon: (
      <svg viewBox="0 0 48 48" className={iconClass} fill="none" aria-hidden="true">
        <circle cx="24" cy="19.5" r="10.2" stroke="currentColor" strokeWidth="1.85" />
        <path
          d="M24 13.4 25.85 17.4l4.35.45-3.3 2.95.95 4.2L24 22.9l-3.85 2.1.95-4.2-3.3-2.95 4.35-.45L24 13.4Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M17.6 28.2 14.2 40.2 24 35.4l9.8 4.8-3.4-12"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Best price guarantee",
    icon: (
      <svg viewBox="0 0 48 48" className={iconClass} fill="none" aria-hidden="true">
        <path
          d="M18.5 39.5H13.2a2 2 0 0 1-2-2V23.2a2 2 0 0 1 2-2h5.3"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinejoin="round"
        />
        <path
          d="M18.5 21.2v-4.6c0-3.4 1.9-5.7 4.9-5.7.9 0 1.7.8 1.7 1.7v5.4h5.4c2.3 0 4 2 3.6 4.3l-1.9 10.8c-.4 2.1-2.2 3.6-4.3 3.6H18.5V21.2Z"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinejoin="round"
        />
        <path d="M33.8 8.8v4.2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M31.2 10.2 33.8 12l2.6-1.8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m31.8 12.8 2-1 2 1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Responsible tourism",
    icon: (
      <svg viewBox="0 0 48 48" className={iconClass} fill="none" aria-hidden="true">
        <path
          d="M23.5 9c.2 3.6-1.4 6.3-4.2 8.2 3.1.2 5.6-.9 7.5-3-.1 3.7-2.2 6.3-5.5 7.5"
          stroke="currentColor"
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M22.6 21.2v6.2" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" />
        <ellipse cx="22.6" cy="28.2" rx="3.2" ry="1.4" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12.8 32.2c2-2.4 4.6-3.6 7.8-3.6h7.2c1.6 0 2.9 1.3 2.9 2.9 0 .6-.2 1.2-.6 1.6 1.4.2 2.4 1.4 2.4 2.9s-1 2.7-2.4 2.9c.4.4.6 1 .6 1.6 0 1.6-1.3 2.9-2.9 2.9H17.2c-3.6 0-6.5-3-6.5-6.7 0-1.6.6-3.1 1.7-4.3Z"
          stroke="currentColor"
          strokeWidth="1.85"
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
            className="flex items-center gap-3.5 px-2 py-4 sm:justify-center sm:px-4 sm:py-2 lg:px-5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center text-white">
              {feature.icon}
            </span>
            <p className="min-w-0 text-[0.92rem] font-medium leading-snug text-white sm:text-[0.95rem]">
              {feature.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
