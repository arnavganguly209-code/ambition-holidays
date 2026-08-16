import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orbit | Ambition Holidays",
  robots: { index: false, follow: false },
};

export default function OrbitRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#070a10] text-white antialiased">
      {children}
    </div>
  );
}
