import Link from "next/link";
import { 
  Building2, 
  Wrench, 
  ShoppingBag, 
  CreditCard, 
  Activity, 
  Truck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  Calendar,
  PhoneCall
} from "lucide-react";
import LeadForm from "@/components/LeadForm";

export const metadata = {
  title: "Industries We Serve | Ethixweb India",
  description: "Specialized digital operations, AI WhatsApp booking, and web platforms for Home Services, D2C Brands, Fintech, Healthcare, and Logistics in India.",
};

export default function IndustriesPage() {
  const industries = [
    {
      id: "contractors",
      icon: Wrench,
      title: "HVAC, Plumbing & Field Contractors",
      sub: "You handle the jobs. We handle the tech.",
      problem: "You spend thousands per lead, but miss 30% of incoming calls while on site. If customers cannot book immediately, they call another contractor.",
      solution: "We build high-converting websites and 24/7 AI WhatsApp receptionists that answer questions, qualify the job, and schedule service slots automatically.",
      results: "2,500+ Qualified Leads &middot; 30% Fewer Missed Calls",
      tools: ["Meta WhatsApp Cloud API", "ServiceTitan / Jobber", "Google LSA", "Local SEO"],
    },
    {
      id: "d2c",
      icon: ShoppingBag,
      title: "D2C Brands & Consumer Commerce",
      sub: "Sub-second checkout built for Bharat.",
      problem: "Slow mobile storefronts bleed customers on Indian 4G/5G connections. High cart abandonment due to multi-step checkout flows.",
      solution: "Headless Next.js storefronts with 1-click Razorpay Magic UPI checkout, automated Shiprocket tracking, and ONDC buyer network integration.",
      results: "0.8s Mobile Load &middot; +42% UPI Conversion",
      tools: ["Next.js 16", "Shopify Headless", "Razorpay Magic", "Shiprocket", "ONDC Rails"],
    },
    {
      id: "fintech",
      icon: CreditCard,
      title: "Fintech & Digital NBFCs",
      sub: "Bank-grade portals with high-concurrency throughput.",
      problem: "Drop-offs during document verification and lengthy loan underwriting pipelines.",
      solution: "Reactive borrower dashboards with Aadhaar e-KYC, DigiLocker integration, and instant UPI autopay mandate setup.",
      results: "85,000+ Monthly Borrowers &middot; 99.99% Cloud Uptime",
      tools: ["Next.js", "PostgreSQL", "DigiLocker API", "Razorpay Mandates", "AWS Mumbai"],
    },
    {
      id: "healthcare",
      icon: Activity,
      title: "Healthcare & Multi-Clinic Networks",
      sub: "24/7 WhatsApp consultation & appointment triage.",
      problem: "Front-desk receptionists get overwhelmed, leading to delayed responses and missed patient consultations.",
      solution: "Multilingual AI chatbots that triage symptoms, schedule in-clinic or tele-consultations, and send WhatsApp reminder notifications.",
      results: "+310% Booking Volume &middot; 45% Lower No-Show Rate",
      tools: ["WhatsApp Cloud API", "Custom CRM", "Google Calendar Sync", "HIPAA/ISO Practices"],
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
            <span>Vertical Specialization</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Built For Businesses Where <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E30613] via-[#FF2B38] to-[#FF9933]">
              Calls &amp; Bookings Can&apos;t Wait.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Different operations, same core challenge &mdash; every missed message is lost revenue. We engineer systems that capture demand 24/7.
          </p>
        </div>
      </section>

      {/* Industry Cards Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div
                key={ind.id}
                id={ind.id}
                className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 hover:border-[#E30613]/40 transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#E30613]/15 border border-[#E30613]/30 flex items-center justify-center text-[#E30613]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                          {ind.title}
                        </h2>
                        <p className="text-xs font-semibold text-[#FF9933]">
                          {ind.sub}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm text-gray-300 leading-relaxed">
                      <p>
                        <strong className="text-white">The Bottleneck:</strong> {ind.problem}
                      </p>
                      <p>
                        <strong className="text-white">The Ethixweb Solution:</strong> {ind.solution}
                      </p>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-2">
                      {ind.tools.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded bg-[#090C12] border border-white/5 text-[11px] font-mono text-gray-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-4 bg-[#0A0C13] rounded-2xl border border-white/5 p-6 space-y-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Proven Outcome:
                      </p>
                      <p className="text-base font-bold text-emerald-400 mt-1">
                        {ind.results}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Link
                        href={`/contact?industry=${encodeURIComponent(ind.title)}`}
                        className="btn-primary w-full py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5"
                      >
                        <span>Get Industry Roadmap</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <a
                        href={`https://wa.me/919871234567?text=Hi%20Ethixweb%20India%20team,%20I'd%20like%20to%20inquire%20about%20solutions%20for%20${encodeURIComponent(ind.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-emerald-500/20 transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Instant WhatsApp Triage</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Lead Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Which Industry Are You In?
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Tell us about your operation &mdash; we will come back with a clear plan tailored to your industry.
            </p>
          </div>
          <LeadForm source="Industries Page Inquiry" />
        </div>
      </section>
    </div>
  );
}
