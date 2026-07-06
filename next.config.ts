import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/WetBulb",
  assetPrefix: "/WetBulb/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
