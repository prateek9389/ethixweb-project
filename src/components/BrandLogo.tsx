import Link from "next/link";
import Image from "next/image";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function BrandLogo({ className = "", size = "md" }: BrandLogoProps) {
  const heightClasses = {
    sm: "h-6 sm:h-7",
    md: "h-7 sm:h-8",
    lg: "h-8 sm:h-10",
  };

  return (
    <Link
      href="/"
      className={`group inline-flex items-center transition-transform duration-200 hover:scale-[1.03] ${className}`}
      aria-label="Ethixweb Home"
    >
      <img
        src="/ethixweb-logo.webp"
        alt="Ethixweb"
        width={214}
        height={32}
        className={`${heightClasses[size]} w-auto object-contain brightness-105`}
      />
    </Link>
  );
}
