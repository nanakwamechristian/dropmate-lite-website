import type { MetadataRoute } from "next";
import { getSiteOrigin, isProductionDeployment } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const origin = getSiteOrigin();
  if (!origin || !isProductionDeployment()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", origin).href,
    host: origin.origin,
  };
}
