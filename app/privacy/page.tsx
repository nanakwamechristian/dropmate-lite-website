import Link from "next/link";
import { createPageMetadata, SUPPORT_EMAIL } from "@/lib/site";

export const metadata = createPageMetadata({
  title: "Privacy Policy | DropMate Lite",
  description:
    "How DropMate Lite handles local file transfers, shared clipboard content, device information, and transfer history.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main id="main-content" className="legal-shell">
      <header className="legal-hero">
        <Link href="/" className="back-link">
          ← Back to home
        </Link>
        <p className="eyebrow">YOUR FILES. YOUR CONTROL.</p>
        <h1>Privacy Policy</h1>
        <p>Built around local transfers. Written to be understood.</p>
        <p className="legal-date">Effective October 4, 2026</p>
      </header>

      <div className="legal-body">
        <section aria-labelledby="privacy-overview">
          <h2 id="privacy-overview">About this policy</h2>
          <p>
            DropMate Lite is a Windows application developed by Christian Kwame.
            This policy explains the information the app may process to connect
            your devices and transfer the content you choose to share.
          </p>
        </section>

        <section aria-labelledby="privacy-information">
          <h2 id="privacy-information">Information the app may process</h2>
          <ul>
            <li>Your device name, local IP address, and device identifier.</li>
            <li>
              Selected files, their filenames and sizes, and transfer status.
            </li>
            <li>Clipboard content you intentionally choose to share.</li>
            <li>Local transfer history and trusted device information.</li>
            <li>Your connection preferences.</li>
          </ul>
          <p>
            This information supports device discovery, connections, transfers,
            and the app&apos;s local history and device controls.
          </p>
        </section>

        <section aria-labelledby="privacy-transfers">
          <h2 id="privacy-transfers">Where your files go</h2>
          <p>
            Core local transfers are sent directly between your devices over
            your local network. DropMate Lite does not upload transferred files
            to an external DropMate server as part of normal local transfer
            functionality.
          </p>
          <p>
            You choose the files and the receiving device. Received files are
            saved on that device in the configured destination folder.
          </p>
        </section>

        <section aria-labelledby="privacy-clipboard">
          <h2 id="privacy-clipboard">Clipboard sharing</h2>
          <p>
            Clipboard content is transmitted only when you explicitly use the
            clipboard-sharing feature. Choose carefully what text or links you
            share and which device receives them.
          </p>
        </section>

        <section aria-labelledby="privacy-local">
          <h2 id="privacy-local">Information stored locally</h2>
          <p>
            Transfer history, trusted device information, and connection
            preferences may be stored locally on your device so you can review
            transfers and manage connections. Use the controls available in the
            app to manage your trusted devices and preferences.
          </p>
        </section>

        <section aria-labelledby="privacy-advertising">
          <h2 id="privacy-advertising">Accounts and advertising</h2>
          <p>
            The core local-transfer features do not require an account. DropMate
            Lite does not sell personal information and does not use advertising
            trackers.
          </p>
        </section>

        <section aria-labelledby="privacy-website">
          <h2 id="privacy-website">This website and external services</h2>
          <p>
            This website has no added analytics or advertising trackers. Its
            download buttons open the Microsoft Store, where Microsoft&apos;s
            own privacy terms apply. Emailing support shares the information you
            include through your email provider.
          </p>
        </section>

        <section aria-labelledby="privacy-contact">
          <h2 id="privacy-contact">Contact</h2>
          <p>
            For questions about this policy or how DropMate Lite handles your
            information, contact Christian Kwame at{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.
          </p>
          <p>
            For connection or transfer help, visit{" "}
            <Link href="/support">Support</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
