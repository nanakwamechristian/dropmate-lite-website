import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="legal-shell not-found">
      <p className="eyebrow">404 · A LITTLE OFF TRACK</p>
      <h1>This page wandered off.</h1>
      <p>Your next file transfer is still just a few clicks away.</p>
      <Link href="/" className="button button-dark">
        Back to DropMate Lite
      </Link>
    </main>
  );
}
