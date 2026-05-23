import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    // Serve AVIF (best compression) then WebP to modern browsers.
    // Falls back to original PNG for older browsers.
    // Reduces carousel image size by ~60–80% vs raw PNG → faster slide loads.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
