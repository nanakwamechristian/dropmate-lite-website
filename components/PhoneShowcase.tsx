import Image from "next/image";
import Link from "next/link";
import { ArrowRight, QrCode, Wifi } from "lucide-react";

export default function PhoneShowcase() {
  return (
    <section className="section phone-section" aria-labelledby="phone-title">
      <div className="container">
        <div className="phone-intro">
          <div>
            <p className="eyebrow">
              <QrCode size={16} aria-hidden="true" /> POINT. SCAN. SEND.
            </p>
            <h2 id="phone-title">
              Phone to PC
              <br />
              <span>in seconds.</span>
            </h2>
          </div>
          <div>
            <p>
              Open QR Connect in DropMate Lite, scan the code with your phone,
              select your files, and send them directly to your PC over your
              local network.
            </p>
            <span className="network-hint">
              <Wifi size={16} aria-hidden="true" /> Keep both devices on the
              same Wi-Fi.
            </span>
          </div>
        </div>
        <div className="phone-stage">
          <div className="qr-desktop">
            <div className="device-label">
              <span>01 / ON YOUR PC</span>
              <span>Open QR Connect</span>
            </div>
            <Image
              src="/screenshots/qr.png"
              alt="DropMate QR Connect desktop screen with a demonstration code"
              width={1200}
              height={830}
              sizes="(max-width: 640px) 90vw, (max-width: 900px) 65vw, 780px"
            />
          </div>
          <div className="connection-path" aria-hidden="true">
            <span />
            <ArrowRight size={22} />
            <span />
          </div>
          <div className="phone-preview">
            <div className="device-label">
              <span>02 / ON YOUR PHONE</span>
            </div>
            <div className="phone-frame">
              <Image
                src="/screenshots/mobile-transfer.png"
                alt="DropMate mobile transfer page showing an illustrative connection to a Windows PC"
                width={390}
                height={844}
                sizes="(max-width: 640px) 220px, 240px"
              />
            </div>
          </div>
        </div>
        <div className="phone-footnote">
          <p>
            Development previews · Illustrative connection · Setup time varies
          </p>
          <Link href="/support">
            Need a hand connecting? <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
