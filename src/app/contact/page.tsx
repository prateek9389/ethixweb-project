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
  ArrowRight
} from "lucide-react";
import LeadForm from "@/components/LeadForm";

export const metadata = {
  title: "Contact & Start a Project | Ethixweb India",
  description: "Get in touch with Ethixweb India technical team in Bengaluru, Mumbai, or Delhi-NCR. Inquire about AI WhatsApp agents, Next.js web apps, or schedule a technical discovery call.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 sm:pt-28 pb-20">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E30613]/12 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E30613]/40 bg-[#160E12] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FF2B38]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect With Our Technical Pod</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Let&apos;s Build Something <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E30613] via-[#FF2B38] to-[#FF9933]">
              Exceptional in India
            </span>.
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have a project brief, an AI automation request, or want to discuss a dedicated engineering pod? Talk directly with our senior technology directors.
          </p>
        </div>
      </section>

      {/* Main Grid: Form + Info */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Info & Hubs */}
            <div className="lg:col-span-5 space-y-8">
              {/* Direct channels */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Direct Technical Lines (IST)
                </h3>

                <div className="space-y-4 text-xs">
                  <a
                    href="https://wa.me/919871234567?text=Hi%20Ethixweb%20India%20team,%20I'd%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0F1420] border border-emerald-500/30 hover:border-emerald-500/60 transition-all text-gray-200 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-white group-hover:text-emerald-400 transition-colors">
                        Instant WhatsApp Desk
                      </p>
                      <p className="text-emerald-400 font-mono text-[11px] mt-0.5">
                        +91 98712 34567 &middot; Online
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1">Average response &lt; 5 mins during business hours</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0F1420] border border-white/5 text-gray-200">
                    <div className="w-9 h-9 rounded-xl bg-[#E30613]/20 text-[#E30613] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Telephone Support</p>
                      <p className="font-mono text-[11px] text-gray-300 mt-0.5">+91 80 4718 9000</p>
                      <p className="text-[10px] text-gray-400 mt-1">Mon-Sat &middot; 9:30 AM - 8:30 PM IST</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0F1420] border border-white/5 text-gray-200">
                    <div className="w-9 h-9 rounded-xl bg-[#FF9933]/20 text-[#FF9933] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Direct Email Inquiries</p>
                      <p className="font-mono text-[11px] text-gray-300 mt-0.5">india@ethixweb.com</p>
                      <p className="text-[10px] text-gray-400 mt-1">RFPs, enterprise procurement &amp; security questionnaires</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Physical Office Hubs */}
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#FF9933]" />
                  Physical Laboratories in India
                </h3>

                <div className="space-y-3.5 text-xs text-gray-300">
                  <div className="p-3 rounded-xl bg-[#0D1018] border border-white/5">
                    <p className="font-bold text-white flex items-center justify-between">
                      <span>Bengaluru Tech Studio</span>
                      <span className="text-[10px] text-gray-400">Karnataka</span>
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      100ft Road, Indiranagar, Bengaluru 560038
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0D1018] border border-white/5">
                    <p className="font-bold text-white flex items-center justify-between">
                      <span>Mumbai BFSI Hub</span>
                      <span className="text-[10px] text-gray-400">Maharashtra</span>
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      One BKC, Bandra Kurla Complex, Mumbai 400051
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0D1018] border border-white/5">
                    <p className="font-bold text-white flex items-center justify-between">
                      <span>Delhi-NCR Enterprise Lab</span>
                      <span className="text-[10px] text-gray-400">Haryana</span>
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      Cyber City, DLF Phase 2, Gurugram 122002
                    </p>
                  </div>
                </div>
              </div>

              {/* Trust Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#E30613]/10 to-[#FF9933]/10 border border-[#E30613]/30 text-xs space-y-2">
                <p className="font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Mutual NDA &amp; Fast Assessment
                </p>
                <p className="text-gray-300 leading-relaxed text-[11px]">
                  Every inquiry is handled under strict professional confidentiality. If your organization requires a signed mutual Non-Disclosure Agreement before discussing technical specs, simply let us know.
                </p>
              </div>
            </div>

            {/* Right Column: Full Inquiry Form */}
            <div className="lg:col-span-7">
              <LeadForm source="Contact Page Dedicated Form" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
