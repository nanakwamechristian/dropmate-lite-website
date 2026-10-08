import Link from "next/link";
import {
  ArrowRight,
  Check,
  Monitor,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export default function PrivacySection() {
  return (
    <section
      className="section privacy-section"
      aria-labelledby="privacy-title"
    >
      <div className="container privacy-grid">
        <div className="privacy-art" aria-hidden="true">
          <div className="privacy-orbit">
            <ShieldCheck size={84} strokeWidth={1.1} />
          </div>
          <div className="privacy-route">
            <span>
              <Smartphone size={27} />
            </span>
            <i />
            <ShieldCheck size={20} />
            <i />
            <span>
              <Monitor size={27} />
            </span>
          </div>
          <p>YOUR DEVICES. YOUR CONTROL.</p>
        </div>
        <div>
          <p className="eyebrow">A LITTLE MORE PEACE OF MIND</p>
          <h2 id="privacy-title">Your files stay between your devices.</h2>
          <p className="section-description">
            DropMate Lite is designed for local device-to-device transfers. Core
            transfers happen over your local network and do not require
            uploading your files to a DropMate cloud server.
          </p>
          <ul className="privacy-list">
            {[
              "No account required",
              "No advertising trackers",
              "No cloud upload for core local transfers",
              "Local transfer history",
              "Trusted device controls",
            ].map((item) => (
              <li key={item}>
                <Check size={17} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <Link href="/privacy" className="text-link">
            Read Privacy Policy <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
