import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Browsers request /favicon.ico first; serve the profile image so the tab icon updates reliably.
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/profile.png" }];
  },
};

export default nextConfig;
