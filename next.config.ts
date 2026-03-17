import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/cayqr",
  assetPrefix: "/cayqr/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
