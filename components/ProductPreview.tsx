import Image from "next/image";
import { ArrowDownLeft, ScanLine, Send, Wifi } from "lucide-react";

export default function ProductPreview() {
  return (
    <section
      className="section product-section"
      aria-labelledby="product-title"
    >
      <div className="container">
        <div className="section-intro split-intro">
          <div>
            <p className="eyebrow">A NEW HOME FOR YOUR FILE FLOW</p>
            <h2 id="product-title">
              Everything you need to move files between devices.
            </h2>
          </div>
          <p>
            Discover nearby devices, connect your phone with a QR code, and
            follow every transfer. All in one simple Windows app.
          </p>
        </div>
        <div className="product-stage">
          <div className="product-stage-top">
            <span>
              <span className="status-dot" /> YOUR DEVICES, TOGETHER
            </span>
            <ArrowDownLeft size={23} aria-hidden="true" />
          </div>
          <Image
            className="app-image"
            src="/screenshots/home.png"
            alt="DropMate home screen showing nearby devices and quick transfer actions with illustrative data"
            width={1200}
            height={830}
            sizes="(max-width: 768px) 90vw, 960px"
          />
        </div>
        <div className="preview-footer">
          <p>Development preview · Illustrative devices and files</p>
          <div>
            <span>
              <Wifi size={15} aria-hidden="true" /> Discover
            </span>
            <span>
              <ScanLine size={15} aria-hidden="true" /> Connect
            </span>
            <span>
              <Send size={15} aria-hidden="true" /> Transfer
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
