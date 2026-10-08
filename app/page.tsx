import Hero from "@/components/Hero";
import ValueStrip from "@/components/ValueStrip";
import ProductPreview from "@/components/ProductPreview";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import PhoneShowcase from "@/components/PhoneShowcase";
import UseCases from "@/components/UseCases";
import PrivacySection from "@/components/PrivacySection";
import Screenshots from "@/components/Screenshots";
import FAQ from "@/components/FAQ";
import DownloadCTA from "@/components/DownloadCTA";

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <ValueStrip />
      <ProductPreview />
      <HowItWorks />
      <Features />
      <PhoneShowcase />
      <UseCases />
      <PrivacySection />
      <Screenshots />
      <FAQ />
      <DownloadCTA />
    </main>
  );
}
