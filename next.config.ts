import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/meu-site-",
  images: { unoptimized: true },
};

export default nextConfig;
