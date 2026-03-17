import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/cayqr",
  assetPrefix: "/cayqr/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
