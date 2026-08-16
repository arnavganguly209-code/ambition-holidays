import Link from "next/link";
import Header from "@/components/Header";

type Props = {
  title: string;
  description: string;
};

export default function PageShell({ title, description }: Props) {
  return (
    <main className="min-h-screen bg-[#1c1814] text-white">
      <div className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,162,39,0.14),_transparent_55%),linear-gradient(180deg,#2a241c_0%,#1c1814_50%,#14110e_100%)]"
        />
        <Header />
        <section className="relative mx-auto max-w-4xl px-5 pb-24 pt-36 sm:px-6 sm:pt-40 lg:px-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-gold">
            Ambition Holiday
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
            {description}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/50">
            Full page content is coming next. This route is live with a proper
            SEO URL so navigation works without errors.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/"
              className="focus-ring inline-flex items-center rounded-md border border-gold/70 bg-gold/10 px-4 py-2.5 text-sm font-semibold text-gold transition-colors hover:bg-gold/20"
            >
              Back to home
            </Link>
            <a
              href="https://wa.me/9779851148898"
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center rounded-md border border-white/20 px-4 py-2.5 text-sm font-semibold text-white/85 transition-colors hover:border-white/40 hover:text-white"
            >
              WhatsApp us
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
