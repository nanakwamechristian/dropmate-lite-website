import Image from "next/image";
import Link from "next/link";

export default function Brand() {
  return (
    <Link href="/" className="brand" aria-label="DropMate Lite home">
      <Image src="/logo.svg" alt="" width={34} height={34} />
      <span>
        DropMate <span className="brand-lite">Lite</span>
      </span>
    </Link>
  );
}
