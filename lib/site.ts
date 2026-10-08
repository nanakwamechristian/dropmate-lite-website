import type { Metadata } from "next";

export const STORE_URL = "https://apps.microsoft.com/detail/9MSSHHFC8D3R";
export const SUPPORT_EMAIL = "co3866307@gmail.com";

export const siteConfig = {
  name: "DropMate Lite",
  title: "DropMate Lite — Fast Phone & PC File Transfer",
  description:
    "Transfer files, photos, videos, documents and text between your phone and Windows PC with DropMate Lite.",
  // Optional: set to your final HTTPS domain after connecting it in Vercel.
  // Leave empty to use Vercel's automatically supplied production hostname.
  url: "",
  author: "Christian Kwame",
  ogImage: "/og/dropmate-og.png",
};

export function getSiteOrigin(): URL | undefined {
  const candidate =
    siteConfig.url ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "");

  if (!candidate) return undefined;

  try {
    const url = new URL(candidate);
    if (url.protocol !== "https:" || url.username || url.password)
      return undefined;
    return new URL(url.origin);
  } catch {
    return undefined;
  }
}

export function isProductionDeployment(): boolean {
  const vercelEnvironment =
    process.env.VERCEL_TARGET_ENV || process.env.VERCEL_ENV;
  return vercelEnvironment
    ? vercelEnvironment === "production"
    : process.env.NODE_ENV === "production";
}

type PageMetadata = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadata): Metadata {
  const origin = getSiteOrigin();
  const indexable = Boolean(origin) && isProductionDeployment();
  const canonical = indexable ? new URL(path, origin).href : undefined;
  const image = origin
    ? {
        url: new URL(siteConfig.ogImage, origin).href,
        width: 1200,
        height: 630,
        alt: "DropMate Lite. Your files. Your devices. Instantly.",
      }
    : undefined;

  return {
    title,
    description,
    ...(origin ? { metadataBase: origin } : {}),
    ...(canonical ? { alternates: { canonical } } : {}),
    robots: { index: indexable, follow: indexable },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      title,
      description,
      ...(canonical ? { url: canonical } : {}),
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
