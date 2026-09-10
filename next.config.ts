import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Prototype: serve product photography straight from the Unsplash CDN.
    // <ProductImage> degrades to an on-brand illustration if any of these fail.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
