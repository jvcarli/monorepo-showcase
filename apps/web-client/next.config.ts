import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // static export
  basePath: "/monorepo-showcase", // GitHub Pages repo subpath
  assetPrefix: "/monorepo-showcase", // fixes JS/CSS asset paths
  trailingSlash: true, // ensures correct folder structure for GitHub Pages
};

export default nextConfig;
