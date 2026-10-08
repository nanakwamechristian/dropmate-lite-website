import Link from "next/link";
import { createPageMetadata, SUPPORT_EMAIL } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Support | DropMate Lite",
  description:
    "Get help connecting devices, scanning QR codes, transferring files, and choosing a save folder in DropMate Lite.",
  path: "/support",
});

export default function SupportPage() {
  return (
    <main id="main-content" className="legal-shell">
      <header className="legal-hero">
        <Link href="/" className="back-link">
          ← Back to home
        </Link>
        <p className="eyebrow">A LITTLE HELP, RIGHT HERE.</p>
        <h1>DropMate Lite Support</h1>
        <p>Let&apos;s get your files moving again.</p>
      </header>

      <div className="support-grid">
        <section className="support-card" aria-labelledby="support-discovery">
          <span className="support-number" aria-hidden="true">
            01
          </span>
          <h2 id="support-discovery">Device Not Appearing</h2>
          <ul>
            <li>Connect both devices to the same local network.</li>
            <li>Keep DropMate Lite open on the receiving PC.</li>
            <li>Check nearby visibility settings in the app.</li>
            <li>
              Check that Windows Firewall allows DropMate Lite on your trusted
              private network. Keep the firewall enabled.
            </li>
          </ul>
          <p>Guest Wi-Fi may prevent devices from connecting to each other.</p>
        </section>

        <section className="support-card" aria-labelledby="support-qr">
          <span className="support-number" aria-hidden="true">
            02
          </span>
          <h2 id="support-qr">QR Code Not Connecting</h2>
          <ul>
            <li>Make sure your phone and PC are on the same Wi-Fi network.</li>
            <li>Keep QR Connect open while you connect your phone.</li>
            <li>
              QR codes expire after three minutes. Refresh the code and scan
              again.
            </li>
          </ul>
          <p>
            If your phone shows a certificate warning, see the guidance below
            before continuing.
          </p>
        </section>

        <section
          className="support-card"
          aria-labelledby="support-interruption"
        >
          <span className="support-number" aria-hidden="true">
            03
          </span>
          <h2 id="support-interruption">Transfer Interrupted</h2>
          <ul>
            <li>Keep both devices awake and connected to the same network.</li>
            <li>Avoid switching Wi-Fi networks during a transfer.</li>
            <li>Keep DropMate Lite and the phone transfer page open.</li>
            <li>Reconnect and retry the transfer.</li>
          </ul>
        </section>

        <section className="support-card" aria-labelledby="support-save">
          <span className="support-number" aria-hidden="true">
            04
          </span>
          <h2 id="support-save">Cannot Save File</h2>
          <ul>
            <li>Check that the receiving device has enough free disk space.</li>
            <li>
              Verify that your destination folder exists and is accessible.
            </li>
            <li>Select a folder you have permission to save to, then retry.</li>
          </ul>
        </section>

        <section className="support-card" aria-labelledby="support-location">
          <span className="support-number" aria-hidden="true">
            05
          </span>
          <h2 id="support-location">Where Are Files Saved?</h2>
          <p>
            The default destination may be <code>Downloads\DropMate</code>,
            unless you selected another folder. Check the destination in your
            app settings to find or change where received files go.
          </p>
        </section>

        <section className="support-card" aria-labelledby="support-certificate">
          <span className="support-number" aria-hidden="true">
            06
          </span>
          <h2 id="support-certificate">Phone Browser Certificate Warning</h2>
          <p>
            The phone connection uses a local certificate that your browser may
            not automatically trust.
          </p>
          <ol>
            <li>Confirm you scanned the QR code shown on your own PC.</li>
            <li>
              Compare the certificate fingerprint shown in DropMate Lite with
              the fingerprint in your phone browser&apos;s certificate details.
            </li>
            <li>
              Only if they match, and you recognize the PC and local address,
              use the browser&apos;s option to continue for that connection.
            </li>
          </ol>
          <p>
            If the fingerprints differ or you cannot verify them, stop and
            contact support. Do not disable your browser&apos;s security checks.
          </p>
        </section>
      </div>

      <section className="support-contact" aria-labelledby="support-contact">
        <p className="eyebrow">LET&apos;S FIGURE IT OUT.</p>
        <h2 id="support-contact">Still Need Help?</h2>
        <p>
          Email Christian Kwame with your Windows version, app version, and a
          short description of what happened. Include any error message, but
          leave out private files and sensitive information.
        </p>
        <a href={`mailto:${SUPPORT_EMAIL}`} className="support-email">
          {SUPPORT_EMAIL} <span aria-hidden="true">↗</span>
        </a>
        <Link href="/#faq" className="text-link">
          Explore the FAQs <span aria-hidden="true">→</span>
        </Link>
      </section>
    </main>
  );
}
