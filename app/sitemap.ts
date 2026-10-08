import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.GITHUB_ACTIONS === "true"
      ? "https://nanakwamechristian.github.io/dropmate-lite-website"
      : "http://localhost:3000";

  return [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/support/`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}