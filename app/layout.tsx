import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ambition Holiday | Journeys Beyond Limits",
  description:
    "Premium Nepal trekking and adventure travel with Ambition Holiday. Discover handpicked routes, expert guides, and journeys beyond limits.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Ambition Holidays",
  },
  formatDetection: {
    telephone: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#1a1f27",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/images/hero-video-poster.jpg" />
      </head>
      <body className={`${outfit.variable} ${cormorant.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
