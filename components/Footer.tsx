import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Brand from "./Brand";
import { STORE_URL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Brand />
            <p>Your files. Your devices. Instantly.</p>
          </div>
          <nav aria-label="Footer navigation">
            <Link href="/">Home</Link>
            <Link href="/#features">Features</Link>
            <Link href="/privacy">Privacy policy</Link>
            <Link href="/support">Support</Link>
            <a href={STORE_URL} target="_blank" rel="noopener noreferrer">
              Microsoft Store <ArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© 2026 Christian Kwame</p>
          <p>
            Independently developed. Not affiliated with or endorsed by
            Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
}
