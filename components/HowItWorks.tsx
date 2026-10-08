import { ArrowRight, Monitor, MousePointer2, QrCode } from "lucide-react";

const steps = [
  {
    title: "Open DropMate Lite",
    body: "Get it from the Microsoft Store and open it on your Windows PC.",
    icon: Monitor,
  },
  {
    title: "Connect your device",
    body: "Use nearby discovery or scan the QR code. Keep your devices on the same local network.",
    icon: QrCode,
  },
  {
    title: "Send your files",
    body: "Choose your files and transfer them over your local network. That’s your cue to keep creating.",
    icon: MousePointer2,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section steps-section"
      aria-labelledby="steps-title"
    >
      <div className="container">
        <div className="section-intro">
          <p className="eyebrow">LESS SETUP. MORE SENDING.</p>
          <h2 id="steps-title">Three steps. Then you’re moving.</h2>
          <p>
            No account to create. Just your devices and the files you choose.
          </p>
        </div>
        <div className="steps-grid">
          {steps.map(({ title, body, icon: Icon }, i) => (
            <article className="step" key={title}>
              <div className="step-top">
                <span className="step-number">0{i + 1}</span>
                <Icon size={28} aria-hidden="true" />
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
              {i < 2 && (
                <ArrowRight
                  className="step-arrow"
                  size={20}
                  aria-hidden="true"
                />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
