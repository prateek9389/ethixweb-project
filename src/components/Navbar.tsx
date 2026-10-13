"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "./BrandLogo";
import { 
  Menu, 
  X, 
  PhoneCall, 
  ShieldCheck, 
  Calendar, 
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Our India Story", href: "/about" },
    { label: "Contact & Pitch", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#08090C]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/40 py-3.5"
          : "bg-transparent border-b border-transparent py-5"
      }`}
    >
      {/* Top micro ticker for India tech hubs */}
      <div className="hidden lg:block border-b border-white/[0.06] pb-2 mb-2">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-[11px] text-gray-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-gray-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Engineering Hubs: <strong>Bengaluru</strong> (Indiranagar) · <strong>Mumbai</strong> (BKC) · <strong>Delhi-NCR</strong></span>
            </span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">
              DPIIT Recognized Startup Partner · AWS ap-south-1 (Mumbai) Cloud Infrastructure
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/admin" 
              className="hover:text-white flex items-center gap-1 text-[11px] text-gray-400 hover:text-[#E30613] transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#E30613]" />
              <span>Admin Portal</span>
            </Link>
            <span className="text-gray-600">|</span>
            <span className="text-gray-300 flex items-center gap-1">
              <span>IST Desk: Mon-Sat 9:30 AM - 8:30 PM</span>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <BrandLogo size="md" />

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#12151E]/80 backdrop-blur-md border border-white/10 rounded-full px-5 py-1.5 shadow-inner shadow-black/50">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 ${
                  isActive
                    ? "text-white bg-[#E30613] shadow-md shadow-[#E30613]/40"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href="https://wa.me/919871234567?text=Hi%20Ethixweb%20India%20Team!%20I%20would%20like%20to%20discuss%20a%20digital%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/50 transition-all"
            title="Chat directly on WhatsApp"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          <Link
            href="/contact"
            className="btn-primary group inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-white transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book IST Call</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center p-2 rounded-lg bg-[#141722] border border-white/10 text-gray-200 hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-[#E30613]" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[70px] bg-[#0A0C11]/98 border-b border-white/15 p-6 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-medium text-gray-400">Engineering For Bharat</span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FF9933] bg-[#FF9933]/10 px-2 py-0.5 rounded border border-[#FF9933]/20">
                <Sparkles className="w-3 h-3" /> Bengaluru · Mumbai · Delhi
              </span>
            </div>

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
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </Link>
              );
            })}

            <Link
              href="/admin"
              className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-gray-400 hover:bg-white/5 hover:text-white border border-white/5 mt-1"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#E30613]" />
                <span>Admin Lead Portal</span>
              </span>
              <span className="text-xs bg-red-950/80 text-red-300 border border-red-800/40 px-2 py-0.5 rounded">
                Protected
              </span>
            </Link>

            <div className="pt-4 flex flex-col gap-2.5">
              <a
                href="https://wa.me/919871234567?text=Hi%20Ethixweb%20India%20Team!%20I%20would%20like%20to%20discuss%20a%20digital%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/15 py-3 text-sm font-bold text-emerald-400 hover:bg-emerald-500/25"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Instant WhatsApp Inquiry</span>
              </a>

              <Link
                href="/contact"
                className="btn-primary flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Discovery Call (IST)</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
