import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  Building2, 
  ArrowRight,
  Globe2,
  Lock
} from "lucide-react";
import LeadForm from "@/components/LeadForm";

export const metadata = {
  title: "Contact & Discovery | Ethixweb India",
  description: "Connect with Ethixweb's senior technology team. Offices in Bengaluru, Mumbai, Delhi-NCR, and Wyoming. Reach out via phone, email, or our project discovery form.",
};

export default function ContactPage() {
  const hubs = [
    {
      city: "Bengaluru Tech Studio",
      address: "100ft Road, Indiranagar, Bengaluru, Karnataka 560038",
      specialty: "Core Next.js Engineering, AI WhatsApp Agents & ONDC Rails",
      badge: "India Tech Capital",
    },
    {
      city: "Mumbai BFSI & Growth",
      address: "One BKC, Bandra Kurla Complex, Mumbai, Maharashtra 400051",
      specialty: "Razorpay UPI Integrations, Fintech Portals & Performance Ads",
      badge: "Financial Hub",
    },
    {
      city: "Delhi-NCR Enterprise Lab",
      address: "Cyber City, DLF Phase 2, Gurugram, Haryana 122002",
      specialty: "D2C Headless Commerce, SEO Strategy & Cloud DevOps",
      badge: "Enterprise Corridors",
    },
    {
      city: "Ethixweb USA LLC (Headquarters)",
      address: "Registered in Wyoming & Serving Kent, WA, United States",
      specialty: "US Entity Governance, Global Architecture & 24/7 Redundancy",
      badge: "US Entity",
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E30613]/12 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E30613]/40 bg-[#160E12] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FF2B38]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Access to Senior Engineers</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Start A Project With <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E30613] via-[#FF2B38] to-[#FF9933]">
              A Team That Answers.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Tell us about your operation. We will review your requirements and come back with an actionable technical plan &mdash; no sales representatives, no pitch decks required.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Info */}
      <section className="py-6" id="inquiry-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Channels & Physical Hubs */}
            <div className="lg:col-span-5 space-y-8">
              {/* Direct channels */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Direct Technical Lines
                </h3>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0F1420] border border-emerald-500/30 text-gray-200">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-white">
                        Rapid Discovery Desk
                      </p>
                      <p className="text-emerald-400 font-mono text-[11px] mt-0.5">
                        Guaranteed Sub-4 Hour Response
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1">Direct assessment by a Senior Solutions Architect</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0F1420] border border-white/5 text-gray-200">
                    <div className="w-9 h-9 rounded-xl bg-[#E30613]/20 text-[#E30613] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Telephone Operations</p>
                      <p className="font-mono text-[11px] text-gray-300 mt-0.5">+91 80 4718 9000</p>
                      <p className="text-[10px] text-gray-400 mt-1">Mon-Sat &middot; 9:30 AM - 8:30 PM IST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0F1420] border border-white/5 text-gray-200">
                    <div className="w-9 h-9 rounded-xl bg-[#FF9933]/20 text-[#FF9933] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Official Correspondence</p>
                      <p className="font-mono text-[11px] text-gray-300 mt-0.5">
                        info@ethixweb.com &middot; india@ethixweb.com
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1">RFPs, enterprise contracts &amp; vendor onboarding</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Physical Office Hubs */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#FF9933]" />
                  Physical Studios &amp; Legal Entity
                </h3>

                <div className="space-y-3 text-xs text-gray-300">
                  {hubs.map((hub, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[#0D1018] border border-white/5 space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-white text-xs">{hub.city}</strong>
                        <span className="text-[10px] font-mono text-[#FF9933]">{hub.badge}</span>
                      </div>
                      <p className="text-[11px] text-gray-400">{hub.address}</p>
                      <p className="text-[10px] text-emerald-400 font-mono">{hub.specialty}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust & Mutual NDA */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#E30613]/10 to-[#FF9933]/10 border border-[#E30613]/30 text-xs space-y-2">
                <p className="font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Mutual NDA &amp; Fast Technical Assessment
                </p>
                <p className="text-gray-300 leading-relaxed text-[11px]">
                  Every inquiry is handled under strict professional confidentiality. If your organization requires a signed mutual Non-Disclosure Agreement before discussing technical specs or architecture, simply let us know.
                </p>
              </div>
            </div>

            {/* Right Column: Full Inquiry Form */}
            <div className="lg:col-span-7" id="contact-form">
              <LeadForm source="Contact Page Dedicated Form" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
