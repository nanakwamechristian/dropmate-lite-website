# Brand and screenshot assets

All requested image paths are present. The website can run immediately without
external images, fonts, accounts, or image-generation services.

## Original brand files

These files are **unaltered, byte-for-byte copies of this repository's existing
DropMate assets**, not newly invented logos:

| Website file | Original source | Dimensions |
| --- | --- | --- |
| `public/logo.svg` | `../assets/icons/dropmate.svg` | 128 × 128 viewBox |
| `public/logo.png` | `../assets/icons/dropmate.png` | 512 × 512 |
| `public/favicon.ico` | `../assets/icons/dropmate.ico` | Original multi-size Windows icon |

The copy hashes were verified against their originals. No logo needs to be
provided unless the Microsoft Store release has a separate approved **DropMate
Lite** brand asset. Preserve these paths when supplying replacements.

## Development previews

The desktop screenshots are rendered from the **actual PySide6 UI classes in this
repository**, using their normal dark theme. They are not fabricated app layouts.
The phone screenshot renders the actual `web/index.html` and `web/style.css`.

They are **development previews with illustrative data**, not captures verified
against the published Microsoft Store build. The UI currently displays its
existing "DropMate" name. Every desktop capture includes a development-preview
status-bar label, and the website should retain its visible preview captions.

| File under `public/` | Dimensions | Bytes | Contents |
| --- | --- | ---: | --- |
| `screenshots/hero-app.png` | 1200 × 830 | 61,334 | Send page; same capture as `send.png` |
| `screenshots/home.png` | 1200 × 830 | 75,518 | Actual home page |
| `screenshots/send.png` | 1200 × 830 | 61,334 | Two illustrative files and a nearby laptop |
| `screenshots/qr.png` | 1200 × 830 | 65,755 | Actual QR Connect page; nonfunctional example code |
| `screenshots/transfer.png` | 1200 × 830 | 72,591 | Actual Receive page; illustrative 40% progress |
| `screenshots/history.png` | 1200 × 830 | 69,633 | Four illustrative history entries |
| `screenshots/mobile-transfer.png` | 390 × 844 | 39,058 | Actual phone companion; illustrative connected state |
| `og/dropmate-og.png` | 1200 × 630 | 100,588 | Finished code-rendered social card using the original logo and development app capture |

The fixture uses generic device names (`My Windows PC`, `Study laptop`, `My
phone`) and example filenames. No personal files are read and no real transfer
occurs. An isolated controller writes temporary settings/history, then removes
them after capture. No desktop backend or discovery service starts. The phone
page's JavaScript is removed, all network requests are blocked, and only the
same connected-state fields normally populated by the app are supplied.

The QR code encodes a plain descriptive string, **not a pairing URL or secret**.
The example address `192.0.2.10` is from the documentation address range. The
transfer preview deliberately shows no invented throughput, average speed,
verification result, or benchmark. Its native UI displays `0 B/s` because this is
a static illustrative fixture.

## Before public launch

Replace the seven screenshots with approved captures from the released
Microsoft Store build, including its final Lite branding. `hero-app.png` may
reuse the approved Send capture. Use the table's dimensions as a starting point;
keep desktop images at a consistent ratio and retain portrait orientation for
the phone image. Check the website at phone, tablet, and desktop widths after
replacement. Remove the visible development-preview captions only when the
replacement images accurately represent the released app.

Use generic filenames, anonymized device names, and a nonfunctional example QR
code in public screenshots. Update the social card after the final screenshot
and brand assets are in place. The existing original logos are already usable.

Next.js optimizes these local PNGs for the visitor. Original PNG paths are kept
so replacements remain straightforward; the complete screenshot set is about
445 KB before Next.js optimization.

## Reproduce the supplied previews

From the **desktop repository root**, with its Python dependencies installed:

```powershell
.venv\Scripts\python.exe website\scripts\capture-assets.py
```

The script imports the desktop UI read-only and overwrites only the website's
listed image assets. It requires PySide6, Qt WebEngine, qrcode, and the desktop
project's existing dependencies. It is not needed to install, build, or deploy
the Next.js website. It reads installed Segoe UI fonts to render local screenshots
but **does not redistribute font files**. Website typography uses its own font
configuration.

The social image is a deterministic Qt/QPainter layout with original SVG and
native app screenshot layers. No AI image generation, raster retouching, stock
photo license, or external design dependency is involved.
