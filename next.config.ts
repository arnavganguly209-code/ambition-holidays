import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [96, 128, 256, 384],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/orbit/login",
          destination: "/orbit-login",
        },
        {
          source: "/uploads/:filename",
          destination: "/api/media/:filename",
        },
      ],
    };
  },
};

export default nextConfig;