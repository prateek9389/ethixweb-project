import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Clock, 
  ShieldCheck, 
  ArrowUpRight, 
  CheckCircle2,
  Lock
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#050608] border-t border-white/10 text-gray-300 pt-16 pb-12 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[#E30613]/10 blur-[120px] pointer-events-none" />

      {/* Tricolor India subtle top accent */}
      <div className="h-0.5 w-full india-tricolor-line opacity-70 mb-12" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="md" />
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              India&apos;s premier digital engineering &amp; AI growth partner. We combine Silicon Valley software rigor with relentless Indian execution speed to build digital products that scale.
            </p>

            {/* Indian Trust & Compliance Badges */}
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#131722] border border-white/10 text-gray-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>DPIIT Startup India</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#131722] border border-white/10 text-gray-300">
                <ShieldCheck className="w-3.5 h-3.5 text-[#E30613]" />
                <span>GST Compliant Invoicing</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#131722] border border-white/10 text-gray-300">
                <Lock className="w-3.5 h-3.5 text-[#FF9933]" />
                <span>AWS ap-south-1 (Mumbai)</span>
              </span>
            </div>

            <div className="pt-2 text-xs text-gray-400">
              <p>Global Bridge: Backed by Ethixweb USA LLC (Sheridan, WY &amp; Kent, WA)</p>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E30613]" />
              Engineering Services
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link href="/services#ai-agents" className="hover:text-white hover:text-[#E30613] transition-colors">
                  AI Agents &amp; WhatsApp Bots
                </Link>
              </li>
              <li>
                <Link href="/services#web-apps" className="hover:text-white hover:text-[#E30613] transition-colors">
                  Next.js Web Applications
                </Link>
              </li>
              <li>
                <Link href="/services#d2c-commerce" className="hover:text-white hover:text-[#E30613] transition-colors">
                  D2C Commerce &amp; ONDC
                </Link>
              </li>
              <li>
                <Link href="/services#seo-growth" className="hover:text-white hover:text-[#E30613] transition-colors">
                  Google &amp; Meta Performance Ads
                </Link>
              </li>
              <li>
                <Link href="/services#cloud-ops" className="hover:text-white hover:text-[#E30613] transition-colors">
                  24/7 Cloud DevOps &amp; Support
                </Link>
              </li>
              <li>
                <Link href="/services#cost-calculator" className="text-[#FF9933] hover:underline flex items-center gap-1 font-semibold">
                  <span>₹ ROI &amp; Pod Estimator</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* India Hubs & Locations */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF9933]" />
              Our India Hubs
            </h3>
            <div className="space-y-3 text-xs text-gray-400">
              <div className="border-l-2 border-[#E30613]/50 pl-2.5 py-0.5">
                <p className="font-semibold text-gray-200">Bengaluru Tech Studio</p>
                <p className="text-[11px] text-gray-400">Indiranagar 100ft Road, Bengaluru 560038</p>
              </div>

              <div className="border-l-2 border-white/20 pl-2.5 py-0.5">
                <p className="font-semibold text-gray-200">Mumbai BFSI &amp; Growth</p>
                <p className="text-[11px] text-gray-400">One BKC, Bandra Kurla Complex, Mumbai 400051</p>
              </div>

              <div className="border-l-2 border-white/20 pl-2.5 py-0.5">
                <p className="font-semibold text-gray-200">Delhi-NCR Enterprise</p>
                <p className="text-[11px] text-gray-400">Cyber City, DLF Phase 2, Gurugram 122002</p>
              </div>
            </div>
          </div>

          {/* Direct Communication & Portal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Direct Communication
            </h3>
            <ul className="space-y-3 text-xs text-gray-400">
              <li className="flex items-center gap-2 text-gray-300">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>+91 80 4718 9000</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <Mail className="w-3.5 h-3.5 text-[#E30613] shrink-0" />
                <a href="mailto:india@ethixweb.com" className="hover:text-white transition-colors">
                  india@ethixweb.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>Mon-Sat · 9:30 AM - 8:30 PM IST</span>
              </li>

              <li className="pt-2 border-t border-white/10">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-[#141824] hover:bg-[#1a2030] px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E30613]" />
                  <span>Lead Management Portal</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            <p>© 2026 Ethixweb India &amp; Ethixweb USA LLC. All rights reserved.</p>
            <p className="text-[11px] text-gray-400">
              Designed &amp; Engineered specifically for Indian Businesses, Startups, and Enterprises.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">
              About Ethixweb
            </Link>
            <Link href="/services" className="hover:text-white transition-colors">
              Capabilities
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Start a Project
            </Link>
            <a
              href="https://ethixweb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-300 flex items-center gap-1"
            >
              <span>Global Site</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
