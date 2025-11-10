// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  images: {
    domains: ['cdn.doorstepfoodstuffs.com.ng', 'images.unsplash.com'],
  },
};

export default nextConfig;