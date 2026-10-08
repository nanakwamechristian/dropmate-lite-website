import { ArrowUpRight } from "lucide-react";
import MicrosoftStoreButton from "./MicrosoftStoreButton";

export default function DownloadCTA() {
  return (
    <section className="download-section" aria-labelledby="download-title">
      <div className="container">
        <div className="download-panel">
          <div>
            <p className="eyebrow">LESS EMAIL. MORE DROP MATE.</p>
            <h2 id="download-title">
              Ready to stop emailing files to yourself?
            </h2>
            <p>Move files between your phone and PC with DropMate Lite.</p>
            <MicrosoftStoreButton className="store-button-dark" />
            <span className="store-availability">
              Available on the Microsoft Store
            </span>
          </div>
          <div className="download-decoration" aria-hidden="true">
            <ArrowUpRight strokeWidth={1} />
          </div>
        </div>
      </div>
    </section>
  );
}
