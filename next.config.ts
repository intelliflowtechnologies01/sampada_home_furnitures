import type { NextConfig } from "next";

const repo = "sampada_home_furnitures";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages hosting
  output: "export",
  basePath: `/${repo}`,
  assetPrefix: `/${repo}/`,
  // GitHub Pages serves over HTTPS from a subpath; trailing slash gives
  // clean directory-style URLs that resolve without a server.
  trailingSlash: true,
  // No Next.js image optimizer on a static host — serve images as-is.
  images: {
    unoptimized: true,
    qualities: [50, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
