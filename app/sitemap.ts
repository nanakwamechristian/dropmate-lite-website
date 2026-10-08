import type { MetadataRoute } from "next";
import { getSiteOrigin, isProductionDeployment } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteOrigin();
  if (!origin || !isProductionDeployment()) return [];

  return [
    { url: new URL("/", origin).href, changeFrequency: "monthly", priority: 1 },
    {
      url: new URL("/privacy", origin).href,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: new URL("/support", origin).href,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
