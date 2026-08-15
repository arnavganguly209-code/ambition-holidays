import Image from "next/image";

const iconBox = "flex h-11 w-11 shrink-0 items-center justify-center text-white";
const iconClass = "h-11 w-11";

const features = [
  {
    label: "410+ TripAdvisor reviews",
    icon: (
      <Image
        src="/images/icons/tripadvisor.png"
        alt=""
        width={44}
        height={44}
        className={`${iconClass} object-contain`}
        aria-hidden="true"
        priority
      />
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
        <path
          d="M31.2 10.2 33.8 12l2.6-1.8"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="m31.8 12.8 2-1 2 1"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Responsible tourism",
    icon: (
      <svg viewBox="0 0 48 48" className={iconClass} fill="none" aria-hidden="true">
        {/* Two leaves */}
        <path
          d="M24.2 20.8c-3.2-3.6-7.2-4.2-9.8-3.2 1.6 3.8 5 6.2 9.8 6.6"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.2 20.8c3.2-3.6 7.2-4.2 9.8-3.2-1.6 3.8-5 6.2-9.8 6.6"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Stem */}
        <path
          d="M24.2 24.2v-5.6"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
        {/* Soil mound */}
        <path
          d="M18 26.4c1.7-1.5 3.8-2.3 6.2-2.3s4.5.8 6.2 2.3"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
        {/* Hand cupping plant */}
        <path
          d="M10.8 30.2c2.4-3.2 5.8-5 9.8-5h7.2c2 0 3.6 1.6 3.6 3.6 0 .7-.2 1.4-.6 2 1.7.2 3 1.6 3 3.4 0 1.9-1.5 3.4-3.4 3.4H19c-4.4 0-8-3.6-8-8 0-.5.1-.9.2-1.3 0-.1 0-.1 0-.1Z"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
        {/* Wrist / lower palm line */}
        <path
          d="M12.6 38.2h18.2c1.7 0 3.1 1.2 3.4 2.8"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function HeroStats() {
  return (
    <div className="animate-fade-up-delay-3 w-full px-4 pb-6 sm:px-8 sm:pb-8 lg:px-10 lg:pb-10">
      <ul className="mx-auto grid max-w-6xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <li
            key={feature.label}
            className="flex min-h-[3.5rem] items-center gap-3.5 px-3 py-3.5 sm:justify-center sm:px-5 lg:px-6"
          >
            <span className={iconBox}>{feature.icon}</span>
            <p className="min-w-0 text-left text-[0.92rem] font-medium leading-snug text-white sm:text-[0.95rem]">
              {feature.label}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
