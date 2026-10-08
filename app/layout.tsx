import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalyticsSlot from "@/components/AnalyticsSlot";
import { createPageMetadata, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: siteConfig.title,
    description: siteConfig.description,
    path: "/",
  }),
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author }],
  keywords: [
    "Windows file transfer",
    "phone to PC",
    "local file transfer",
    "QR file transfer",
    "Windows file sharing",
    "large file transfer",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
        <AnalyticsSlot />
      </body>
    </html>
  );
}
