import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false, // disables React Strict Mode
  eslint: {
    ignoreDuringBuilds: true, // disables ESLint during build
  },
  images: {
    domains: ["images.unsplash.com", "plus.unsplash.com"],
  },
};

export default nextConfig;
