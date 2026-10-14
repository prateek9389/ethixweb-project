"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "./BrandLogo";
import { 
  Menu, 
  X, 
  Sun, 
  ChevronDown, 
  ArrowUpRight,
  ShieldCheck,
  Clock,
  Sparkles
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timezoneDropdownOpen, setTimezoneDropdownOpen] = useState(false);
  const [currentTimeIST, setCurrentTimeIST] = useState("12:00 AM");
  const pathname = usePathname();

  // Live IST Clock calculation
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setCurrentTimeIST(istString);
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setTimezoneDropdownOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Industries", href: "/industries" },
    { label: "Services", href: "/services" },
    { label: "Our Work", href: "/our-work" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#090A0E]/90 backdrop-blur-md border-b border-white/10 shadow-xl shadow-black/50 py-3.5"
          : "bg-transparent border-b border-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Exact Ethixweb Logo on Left */}
        <div className="flex items-center">
          <BrandLogo size="md" />
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E30613] rounded-full shadow-[0_0_8px_#E30613]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Controls: Timezone Pill + Theme Icon + Start a project CTA */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Live Indian Timezone Pill (From Ethixweb.com) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setTimezoneDropdownOpen(!timezoneDropdownOpen)}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 cursor-pointer"
              title="Click to view timezone operations"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
              </span>

              <span className="inline-flex items-center justify-center rounded bg-[#E30613]/20 px-1 py-0.5 text-[9px] font-bold text-[#E30613] leading-none">
                IN
              </span>

              <span className="font-mono text-xs text-gray-200">
                {currentTimeIST}
              </span>

              <ChevronDown className="w-3 h-3 text-gray-500" />
            </button>

            {/* Timezone & Quick Navigation Dropdown */}
            {timezoneDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl bg-[#0D1018] border border-white/10 shadow-2xl p-3 text-xs space-y-2 z-50 animate-in fade-in zoom-in-95">
                <div className="pb-2 border-b border-white/10 text-[11px] text-gray-400">
                  <span className="text-white font-bold block">India Technical Desk (IST)</span>
                  <span>Active &middot; Response under 15 mins</span>
                </div>
                <div className="space-y-1 text-gray-300 text-[11px]">
                  <p className="flex justify-between"><span>New Delhi (IST):</span> <strong className="text-white">{currentTimeIST}</strong></p>
                  <p className="flex justify-between"><span>Seattle / WA (PST):</span> <span className="text-gray-400">Active Bridge</span></p>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 text-gray-300 hover:text-white p-1.5 rounded-lg hover:bg-white/5 font-semibold text-[11px]"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#E30613]" />
                    <span>Admin Leads Portal</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Theme Sun Icon Button */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Theme toggle"
            title="Theme: Dark Mode"
          >
            <Sun className="w-4 h-4" />
          </button>

          {/* "Start a project ↗" Pill Button (Exact as screenshot) */}
          <Link
            href="/contact"
            className="group inline-flex items-center gap-1.5 rounded-full bg-white text-black font-semibold px-4.5 py-2 text-xs transition-all duration-200 hover:bg-gray-200 hover:shadow-lg shadow-white/10"
          >
            <span>Start a project</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Mobile start project shortcut */}
          <Link
            href="/contact"
            className="inline-flex sm:hidden items-center gap-1 rounded-full bg-white text-black font-semibold px-3 py-1.5 text-xs"
          >
            <span>Start</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#141722] border border-white/10 text-gray-200 hover:text-white focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#E30613]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#0A0C11]/98 border-b border-white/15 p-5 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-top-3 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-[#E30613] text-white"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70" />
                </Link>
              );
            })}

            <div className="pt-3 border-t border-white/10 mt-2 space-y-2">
              <div className="flex items-center justify-between px-4 py-2 bg-[#121520] rounded-xl text-xs text-gray-300">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Time (India IST):</span>
                </span>
                <strong className="font-mono text-white">{currentTimeIST}</strong>
              </div>

              <Link
                href="/admin"
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-gray-300 hover:bg-white/5 hover:text-white border border-white/5"
              >
                <span className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#E30613]" />
                  <span>Admin Lead Portal</span>
                </span>
                <span className="text-[10px] font-mono bg-red-950 text-red-300 border border-red-800/40 px-2 py-0.5 rounded">
                  Protected
                </span>
              </Link>

              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-xl bg-white text-black py-3 text-sm font-bold shadow-md hover:bg-gray-200 transition-colors mt-2"
              >
                <span>Start a project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
