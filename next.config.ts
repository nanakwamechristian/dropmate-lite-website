import type { NextConfig } from "next";

const repoName = "dropmate-lite-website";
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },

  poweredByHeader: false,

  output: "export",

  trailingSlash: true,

  images: {
    unoptimized: true,
  },

  ...(isGitHubPages
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
      }
    : {}),
};

export default nextConfig;