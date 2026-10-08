import {
  Clipboard,
  File,
  FolderOpen,
  History,
  Monitor,
  Moon,
  QrCode,
  ShieldCheck,
  Smartphone,
  UserRound,
  Wifi,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { features } from "@/lib/content";

const icons: Record<string, LucideIcon> = {
  zap: Zap,
  phone: Smartphone,
  monitor: Monitor,
  qr: QrCode,
  folder: FolderOpen,
  clipboard: Clipboard,
  file: File,
  wifi: Wifi,
  history: History,
  shield: ShieldCheck,
  moon: Moon,
  user: UserRound,
};

export default function Features() {
  return (
    <section
      id="features"
      className="section features-section"
      aria-labelledby="features-title"
    >
      <div className="container">
        <div className="section-intro">
          <p className="eyebrow">SMALL APP. PLENTY OF POSSIBILITIES.</p>
          <h2 id="features-title">Made for files of all kinds.</h2>
          <p>
            The photo you just took. The project you just finished. The link you
            don’t want to retype.
          </p>
        </div>
        <div className="features-grid">
          {features.map(({ icon, title, body }) => {
            const Icon = icons[icon];
            return (
              <article className="feature-card" key={title}>
                <span className="feature-icon">
                  <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
