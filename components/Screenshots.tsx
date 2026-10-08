"use client";

import Image from "next/image";
import { Expand, X } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";

const screens = [
  {
    label: "Home",
    file: "home",
    description: "Your nearby devices and quick actions, all in one place.",
  },
  {
    label: "Send",
    file: "send",
    description:
      "Pick your files, choose a device, and send them on their way.",
  },
  {
    label: "QR connection",
    file: "qr",
    description: "Connect your phone from the QR Connect screen on your PC.",
  },
  {
    label: "Transfers",
    file: "transfer",
    description: "Follow your files as they move between devices.",
  },
  {
    label: "History",
    file: "history",
    description: "Look back at completed, failed, and cancelled transfers.",
  },
];

export default function Screenshots() {
  const [active, setActive] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const expand = useRef<HTMLButtonElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const screen = screens[active];

  function navigateTabs(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % screens.length;
    else if (event.key === "ArrowLeft")
      next = (index + screens.length - 1) % screens.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = screens.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  function openPreview() {
    dialog.current?.showModal();
  }
  function onClose() {
    expand.current?.focus();
  }

  return (
    <section
      id="screenshots"
      className="section screenshots-section"
      aria-labelledby="screenshots-title"
    >
      <div className="container">
        <div className="section-intro">
          <p className="eyebrow">TAKE A LOOK AROUND</p>
          <h2 id="screenshots-title">Feels right at home on Windows.</h2>
          <p>A clear view of your devices, files, and everything in between.</p>
        </div>
        <div
          className="screenshot-tabs"
          role="tablist"
          aria-label="App screenshots"
        >
          {screens.map((item, i) => (
            <button
              key={item.file}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`tab-${item.file}`}
              aria-controls="screenshot-panel"
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(event) => navigateTabs(event, i)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div
          id="screenshot-panel"
          role="tabpanel"
          aria-labelledby={`tab-${screen.file}`}
          tabIndex={0}
          className="screenshot-panel"
        >
          <div className="gallery-frame">
            <Image
              src={`/screenshots/${screen.file}.png`}
              alt={`DropMate ${screen.label} desktop screen with illustrative data`}
              width={1200}
              height={830}
              sizes="(max-width: 768px) 90vw, 1040px"
            />
            <button
              ref={expand}
              type="button"
              className="expand-button"
              aria-label="Expand screenshot"
              onClick={openPreview}
            >
              <Expand size={19} aria-hidden="true" />
              <span>Expand screenshot</span>
            </button>
          </div>
          <div className="gallery-caption">
            <p>{screen.description}</p>
            <span>Development preview · Illustrative data</span>
          </div>
        </div>
        <dialog
          ref={dialog}
          className="screenshot-dialog"
          onClose={onClose}
          aria-labelledby="preview-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) dialog.current?.close();
          }}
        >
          <div className="dialog-content">
            <div className="dialog-header">
              <h3 id="preview-title">{screen.label} · Development preview</h3>
              <button
                className="close-preview"
                type="button"
                aria-label="Close preview"
                onClick={() => dialog.current?.close()}
              >
                <X size={23} aria-hidden="true" />
              </button>
            </div>
            <Image
              src={`/screenshots/${screen.file}.png`}
              alt={`Expanded DropMate ${screen.label} screen with illustrative data`}
              width={1200}
              height={830}
              sizes="95vw"
            />
          </div>
        </dialog>
      </div>
    </section>
  );
}
