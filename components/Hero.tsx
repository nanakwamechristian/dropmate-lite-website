import Image from "next/image";
import { ArrowDown, ArrowUpRight, FileImage, Wifi } from "lucide-react";
import MicrosoftStoreButton from "./MicrosoftStoreButton";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> LESS FRICTION. MORE FLOW.
          </p>
          <h1 id="hero-title">
            Your files.
            <br />
            Your devices.
            <br />
            <span>Instantly.</span>
          </h1>
          <p className="hero-description">
            Transfer photos, videos, documents, folders and text between your
            phone and Windows PC over your local network.
          </p>
          <div className="hero-actions">
            <MicrosoftStoreButton />
            <a className="hero-secondary" href="#how-it-works">
              See How It Works <ArrowDown size={17} aria-hidden="true" />
            </a>
          </div>
          <p className="hero-trust">
            Available on the Microsoft Store<span aria-hidden="true"> · </span>
            No account required
          </p>
        </div>
        <div className="hero-visual">
          <div className="connection-label">
            <Wifi size={16} aria-hidden="true" /> One local network. All your
            devices.
          </div>
          <div className="hero-app-frame">
            <Image
              src="/screenshots/hero-app.png"
              alt="DropMate desktop Send screen with example files and a nearby laptop"
              width={1200}
              height={830}
              sizes="(max-width: 900px) 92vw, 54vw"
              preload
            />
          </div>
          <div className="file-note" aria-hidden="true">
            <span className="file-note-icon">
              <FileImage size={24} />
            </span>
            <div>
              <strong>From camera roll</strong>
              <span>to your next big idea.</span>
            </div>
            <ArrowUpRight size={22} />
          </div>
          <p className="preview-caption">
            Development preview · Illustrative devices and files
          </p>
        </div>
      </div>
      <div className="container hero-bottom">
        <span>MADE FOR THE WAY YOU MOVE FILES.</span>
        <span>
          Windows 10 &amp; 11 <ArrowDown size={15} aria-hidden="true" />
        </span>
      </div>
    </section>
  );
}
