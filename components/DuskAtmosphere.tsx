/** Cream–sky-blue glass daylight atmosphere (hero excluded via HomePage wrapper). */
export default function DuskAtmosphere() {
  return (
    <>
      {/* Cream sky-blue full wash — carries through to footer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#7eb8e8_0%,#a8d0f0_14%,#cfe4f6_28%,#e4eef6_48%,#ebe6dc_72%,#e8eef5_88%,#e4ecf4_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 100% 50% at 50% 0%, rgba(255,255,255,0.85), transparent 55%), radial-gradient(ellipse 60% 40% at 8% 30%, rgba(255,252,245,0.5), transparent 55%), radial-gradient(ellipse 55% 35% at 92% 40%, rgba(190,220,245,0.45), transparent 50%), radial-gradient(ellipse 80% 35% at 50% 100%, rgba(232,238,245,0.9), transparent 60%)",
        }}
      />

      {/* Soft frosted glass veil over the whole post-hero canvas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(165deg,rgba(255,255,255,0.34)_0%,rgba(232,240,248,0.22)_40%,rgba(245,240,230,0.26)_100%)] backdrop-blur-[2.5px]"
      />

      {/* Horizon cream-blue haze */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[18%] h-[28%] bg-gradient-to-b from-transparent via-[#eef3f8]/50 to-[#e8eef5]/70"
      />

      {/* Mountain band — visible toward lower page / footer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[min(62vh,42rem)]"
      >
        <svg
          viewBox="0 0 1440 480"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="xMidYMax slice"
        >
          <defs>
            <linearGradient id="skyMtnFar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8f1f8" />
              <stop offset="55%" stopColor="#c0d4e6" />
              <stop offset="100%" stopColor="#a3bcd2" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="skyMtnMid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d2e2ef" />
              <stop offset="40%" stopColor="#97b0c7" />
              <stop offset="100%" stopColor="#7a94ab" stopOpacity="0.55" />
            </linearGradient>
            <linearGradient id="skyMtnNear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#b7cce0" />
              <stop offset="35%" stopColor="#7d95ab" />
              <stop offset="100%" stopColor="#5c7388" stopOpacity="0.55" />
            </linearGradient>
            <linearGradient id="snowCap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#eef5fb" stopOpacity="0.9" />
            </linearGradient>
          </defs>

          <path
            d="M0 320 L90 250 L170 285 L260 195 L340 255 L430 160 L520 240 L620 130 L720 220 L820 115 L920 205 L1020 145 L1120 230 L1240 155 L1340 225 L1440 180 L1440 480 L0 480 Z"
            fill="url(#skyMtnFar)"
          />
          <path
            d="M0 365 L130 290 L230 330 L350 235 L470 310 L600 210 L740 295 L880 200 L1020 285 L1160 225 L1300 300 L1440 250 L1440 480 L0 480 Z"
            fill="url(#skyMtnMid)"
          />
          <path
            d="M0 410 L150 350 L280 385 L420 315 L580 375 L760 300 L940 365 L1120 310 L1300 370 L1440 335 L1440 480 L0 480 Z"
            fill="url(#skyMtnNear)"
          />

          <path d="M400 195 L430 160 L465 200 L430 172 L405 205 Z" fill="url(#snowCap)" opacity="0.9" />
          <path d="M590 165 L620 130 L655 175 L620 145 L595 180 Z" fill="url(#snowCap)" opacity="0.95" />
          <path d="M790 150 L820 115 L855 160 L820 130 L795 165 Z" fill="url(#snowCap)" />
          <path d="M990 175 L1020 145 L1050 180 L1020 155 L995 185 Z" fill="url(#snowCap)" opacity="0.88" />
          <path d="M1210 185 L1240 155 L1275 195 L1240 168 L1215 198 Z" fill="url(#snowCap)" opacity="0.85" />
        </svg>

        <div className="absolute inset-x-0 bottom-0 h-[72%] bg-[url('/images/footer/ambition-silhouette-clear.jpg')] bg-[length:100%_100%] bg-bottom bg-no-repeat opacity-[0.22] mix-blend-multiply" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#e4ecf4] via-[#e8eef5]/80 to-transparent" />
      </div>
    </>
  );
}
