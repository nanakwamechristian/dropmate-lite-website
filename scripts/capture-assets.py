"""Rebuild website preview assets from the actual DropMate UI source.

Run from the desktop repository: .venv\\Scripts\\python website\\scripts\\capture-assets.py
This is an isolated marketing fixture: no controller, sockets, pairing service,
real personal files, or real authentication tokens are used. All application
source is read-only. Generated previews are not Microsoft Store release captures.
"""

from __future__ import annotations

import os
from pathlib import Path
import re
import shutil
import sys
import tempfile
import time

os.environ["QT_QPA_PLATFORM"] = "offscreen"
os.environ.setdefault("QTWEBENGINE_CHROMIUM_FLAGS", "--disable-gpu")
ROOT = Path(__file__).resolve().parents[2]
PUBLIC = ROOT / "website" / "public"
sys.path.insert(0, str(ROOT))

from PySide6.QtCore import QObject, QRectF, Qt, QUrl, Signal
from PySide6.QtGui import QColor, QFont, QImage, QPainter, QPainterPath, QPen, QRadialGradient
from PySide6.QtSvg import QSvgRenderer
from PySide6.QtTest import QTest
from PySide6.QtWebEngineCore import QWebEnginePage, QWebEngineProfile, QWebEngineUrlRequestInterceptor
from PySide6.QtWebEngineWidgets import QWebEngineView
from PySide6.QtWidgets import QApplication

from storage.settings_store import SettingsStore
from storage.transfer_history import TransferHistory
from ui.main_window import MainWindow


class PreviewController(QObject):
    """No backend is instantiated; UI callbacks deliberately do nothing."""

    event = Signal(str, dict)

    def __init__(self, folder: Path):
        super().__init__()
        self.settings = SettingsStore(folder / "settings.json")
        self.settings.update({
            "device_name": "My Windows PC", "device_id": "website-preview",
            "download_folder": r"C:\Users\You\Downloads\DropMate",
            "theme": "dark", "onboarding_complete": True,
            "minimize_to_tray": False, "notifications": False,
            "discovery_enabled": False,
        })
        self.history = TransferHistory(folder / "history.sqlite3")

    def __getattr__(self, _name):
        return lambda *args, **kwargs: None


def settle(app: QApplication, duration: int = 120) -> None:
    until = time.monotonic() + duration / 1000
    while time.monotonic() < until:
        app.processEvents()
        QTest.qWait(10)


def desktop(app: QApplication) -> None:
    with tempfile.TemporaryDirectory(prefix="dropmate-website-preview-") as folder:
        controller = PreviewController(Path(folder))
        for index, (name, peer, size, direction) in enumerate([
            ("Weekend photos.zip", "My phone", 18432000, "receive"),
            ("Project notes.pdf", "Study laptop", 2406400, "send"),
            ("Presentation.pptx", "Study laptop", 8126464, "receive"),
            ("Ideas.txt", "My phone", 4096, "receive"),
        ]):
            controller.history.record({
                "transfer_id": f"illustration-{index}", "peer": peer,
                "files": [{"path": name, "size": size}], "total_size": size,
                "direction": direction, "status": "Completed",
                "timestamp": f"2026-10-04T{14 - index}:24:00+00:00",
                "destination": r"C:\Users\You\Downloads\DropMate" if direction == "receive" else "",
            })
        window = MainWindow(controller)
        window.resize(1200, 830)
        window.show()
        window.handle_event("ready", {
            "device": {"name": "My Windows PC"}, "local_ip": "192.0.2.10",
            "interfaces": [{"name": "Preview Wi-Fi", "address": "192.0.2.10"}],
            "port": 47685, "discovery_enabled": True,
        })
        window.handle_event("peers", {"devices": [
            {"id": "preview-laptop", "name": "Study laptop", "kind": "desktop", "os": "Windows"},
            {"id": "preview-phone", "name": "My phone", "kind": "phone"},
        ]})

        def capture(name: str, page: str) -> None:
            window.navigate(page)
            window.statusBar().showMessage("Development preview  ·  Illustrative devices and files")
            settle(app, 350)
            window.pages[page].verticalScrollBar().setValue(0)
            settle(app)
            assert window.grab().save(str(PUBLIC / "screenshots" / f"{name}.png"), "PNG")

        capture("home", "home")
        for name, size in [("Weekend photos.zip", 18432000), ("Project notes.pdf", 2406400)]:
            path = f"C:/Example files/{name}"
            window.send.roots[path] = {"source": path, "name": name, "size": size, "count": 1, "folder": False}
        window.send.refresh_selection()
        capture("send", "send")
        shutil.copyfile(PUBLIC / "screenshots" / "send.png", PUBLIC / "screenshots" / "hero-app.png")

        # QR encodes a harmless descriptive string, never a functional URL/token.
        window.qr.set_qr({
            "url": "DropMate Lite development preview - not a pairing code",
            "expires_at": time.time() + 180, "local_ip": "192.0.2.10 (example)",
            "fingerprint": "Illustrative preview - no live connection",
        })
        window.qr.timer.stop()
        window.qr.countdown.setText("Illustrative QR code  ·  Open the app to connect")
        capture("qr", "qr connect")

        window.receive.update_progress({
            "transfer_id": "illustrative-transfer", "direction": "receive",
            "peer": "My phone", "status": "Receiving", "filename": "Weekend photos.zip",
            "total_size": 18432000, "bytes_done": 7372800,
            "speed": 0,
        })
        capture("transfer", "receive")
        capture("history", "history")
        window.close()
        controller.history.close()


class BlockNetwork(QWebEngineUrlRequestInterceptor):
    def interceptRequest(self, info):
        if info.requestUrl().scheme() not in {"data", "about"}:
            info.block(True)


def mobile(app: QApplication) -> None:
    """Render actual phone HTML/CSS; scripts and networking stay disabled."""
    html = (ROOT / "web" / "index.html").read_text(encoding="utf-8")
    html = re.sub(r'<script[^>]*>.*?</script>', '', html, flags=re.S)
    css = (ROOT / "web" / "style.css").read_text(encoding="utf-8")
    html = html.replace('<link rel="stylesheet" href="/style.css">', f"<style>{css}</style>")
    # The fixture changes only the same connected-state fields set by app.js.
    html = html.replace("CONNECTING TO YOUR COMPUTER", "CONNECTED ON YOUR LOCAL NETWORK")
    html = html.replace("One moment…", "My Windows PC")
    html = html.replace('class="status-dot pending"', 'class="status-dot"')
    html = html.replace(' disabled', '')
    profile = QWebEngineProfile()
    interceptor = BlockNetwork(profile)
    profile.setUrlRequestInterceptor(interceptor)
    page = QWebEnginePage(profile)
    page.setBackgroundColor(QColor("#f6f7f3"))
    view = QWebEngineView()
    view.setPage(page)
    view.resize(390, 844)
    loaded = []
    page.loadFinished.connect(lambda ok: loaded.append(ok))
    view.show()
    page.setHtml(html, QUrl("about:blank"))
    deadline = time.monotonic() + 20
    while not loaded and time.monotonic() < deadline:
        settle(app, 50)
    assert loaded and loaded[-1], "Phone preview HTML failed to load"
    settle(app, 500)
    assert view.grab().save(str(PUBLIC / "screenshots" / "mobile-transfer.png"), "PNG")
    view.close()
    page.deleteLater()
    settle(app)
    profile.deleteLater()
    settle(app)


def social_card() -> None:
    """Code-native brand layout with the original mark and native app capture."""
    canvas = QImage(1200, 630, QImage.Format.Format_ARGB32)
    canvas.fill(QColor("#080c15"))
    painter = QPainter(canvas)
    painter.setRenderHint(QPainter.RenderHint.Antialiasing)
    painter.setRenderHint(QPainter.RenderHint.SmoothPixmapTransform)
    gradient = QRadialGradient(990, 270, 650)
    gradient.setColorAt(0, QColor("#24294e"))
    gradient.setColorAt(1, QColor("#080c15"))
    painter.fillRect(canvas.rect(), gradient)
    QSvgRenderer(str(PUBLIC / "logo.svg")).render(painter, QRectF(62, 52, 44, 44))

    def text(value, x, y, size, color="#f3f5ff", weight=QFont.Weight.DemiBold):
        font = QFont("Segoe UI")
        font.setPixelSize(size)
        font.setWeight(weight)
        painter.setFont(font)
        painter.setPen(QColor(color))
        painter.drawText(x, y, value)

    text("DropMate Lite", 121, 83, 26)
    text("Your files.", 62, 211, 69, weight=QFont.Weight.Bold)
    text("Your devices.", 62, 291, 69, weight=QFont.Weight.Bold)
    text("Instantly.", 62, 371, 69, "#a2f0da", QFont.Weight.Bold)
    text("A little less friction. A lot more flow.", 65, 426, 21, "#a5aec3", QFont.Weight.Normal)

    painter.setPen(Qt.PenStyle.NoPen)
    painter.setBrush(QColor("#b4aaff"))
    painter.drawRoundedRect(QRectF(64, 472, 270, 53), 11, 11)
    text("Get it on Microsoft Store", 85, 506, 18, "#10111e")
    text("WINDOWS 10 & 11  ·  LOCAL FILE SHARING", 65, 570, 12, "#909bb4")

    frame = QRectF(630, 137, 690, 482)
    painter.setBrush(QColor("#242c42"))
    painter.setPen(QPen(QColor("#454e70"), 1))
    painter.drawRoundedRect(frame, 15, 15)
    text("DropMate", 653, 161, 12, "#cbd3ea")
    screenshot = QImage(str(PUBLIC / "screenshots" / "hero-app.png"))
    clip = QPainterPath()
    clip.addRoundedRect(QRectF(632, 175, 686, 441), 8, 8)
    painter.save()
    painter.setClipPath(clip)
    painter.drawImage(QRectF(632, 175, 686, 474.5), screenshot)
    painter.restore()
    text("DEVELOPMENT PREVIEW · ILLUSTRATIVE DATA", 802, 608, 9, "#8994ab", QFont.Weight.Normal)
    painter.end()
    assert canvas.save(str(PUBLIC / "og" / "dropmate-og.png"), "PNG")


def main() -> None:
    (PUBLIC / "screenshots").mkdir(parents=True, exist_ok=True)
    (PUBLIC / "og").mkdir(parents=True, exist_ok=True)
    for original, target in [("dropmate.svg", "logo.svg"), ("dropmate.png", "logo.png"), ("dropmate.ico", "favicon.ico")]:
        shutil.copyfile(ROOT / "assets" / "icons" / original, PUBLIC / target)
    app = QApplication.instance() or QApplication([])
    desktop(app)
    mobile(app)
    social_card()
    for path in sorted(PUBLIC.rglob("*.png")):
        image = QImage(str(path))
        print(f"{path.relative_to(PUBLIC)}: {image.width()}x{image.height()}, {path.stat().st_size:,} bytes")


if __name__ == "__main__":
    main()
