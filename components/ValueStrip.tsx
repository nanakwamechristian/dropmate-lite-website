import { CloudOff, QrCode, UserRound, Zap } from "lucide-react";
import { WindowsIcon } from "./MicrosoftStoreButton";

export default function ValueStrip() {
  return (
    <div className="value-strip" aria-label="DropMate Lite at a glance">
      <ul className="container value-list">
        <li>
          <UserRound size={18} aria-hidden="true" />
          No Account Required
        </li>
        <li>
          <Zap size={18} aria-hidden="true" />
          Fast Local Transfers
        </li>
        <li>
          <QrCode size={18} aria-hidden="true" />
          QR Phone Connect
        </li>
        <li>
          <CloudOff size={18} aria-hidden="true" />
          No Cloud Upload for Core Transfers
        </li>
        <li>
          <WindowsIcon />
          Windows 10 &amp; 11
        </li>
      </ul>
    </div>
  );
}
