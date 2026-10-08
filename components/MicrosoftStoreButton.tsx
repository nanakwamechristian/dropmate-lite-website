import { ArrowUpRight } from "lucide-react";
import { STORE_URL } from "@/lib/site";

export function WindowsIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="19"
      height="19"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M1 1h8v8H1zm10 0h8v8h-8zM1 11h8v8H1zm10 0h8v8h-8z" />
    </svg>
  );
}

export default function MicrosoftStoreButton({
  className = "",
  compact = false,
  children = "Get DropMate Lite",
}: {
  className?: string;
  compact?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={STORE_URL}
      className={`store-button ${compact ? "store-button-compact" : ""} ${className}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WindowsIcon />
      <span>{children}</span>
      <ArrowUpRight size={17} aria-hidden="true" />
      <span className="sr-only"> (opens Microsoft Store in a new tab)</span>
    </a>
  );
}
