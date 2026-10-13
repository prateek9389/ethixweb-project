import Link from "next/link";

interface BrandLogoProps {
  showIndiaBadge?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function BrandLogo({ showIndiaBadge = true, className = "", size = "md" }: BrandLogoProps) {
  const fontSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  const markSizes = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
  };

  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.02] ${className}`}
      aria-label="Ethixweb India Home"
    >
      {/* Red Hexagonal/Geometric Brand Symbol */}
      <div
        className={`${markSizes[size]} relative flex items-center justify-center rounded-lg bg-gradient-to-br from-[#E30613] to-[#A0030C] font-black text-white shadow-lg shadow-[#E30613]/30 ring-1 ring-white/20`}
      >
        <span className="tracking-tighter">E</span>
        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#FF9933] ring-1 ring-[#08090C]" title="India Edition" />
      </div>

      {/* Brand Name Typography */}
      <div className="flex items-baseline gap-1.5">
        <span className={`${fontSizes[size]} font-black tracking-tight text-white uppercase`}>
          ETHIX<span className="text-[#E30613]">WEB</span>
        </span>
        {showIndiaBadge && (
          <span className="inline-flex items-center gap-1 rounded border border-[#FF9933]/30 bg-[#FF9933]/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#FF9933]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF9933] animate-pulse" />
            INDIA
          </span>
        )}
      </div>
    </Link>
  );
}
