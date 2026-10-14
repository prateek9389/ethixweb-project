import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ArrowUpRight, 
  TrendingUp, 
  ExternalLink,
  Calendar,
  Layers
} from "lucide-react";
import LeadForm from "@/components/LeadForm";

export const metadata = {
  title: "Our Work & Case Studies | Ethixweb India",
  description: "Real case studies from Ethixweb: websites, AI WhatsApp agents, and paid media that generated thousands of qualified leads and measurable revenue.",
};

export default function OurWorkPage() {
  const caseStudies = [
    {
      client: "All Phase Plumbing",
      category: "Web Design & Local SEO",
      headline: "From invisible online to fully booked in 90 days.",
      desc: "Replaced an outdated, slow website with a high-conversion Next.js platform paired with local Map Pack dominance. Direct click-to-call and quote requests tripled within the first quarter.",
      metrics: [
        { label: "Booked Jobs", value: "+340%" },
        { label: "Time to Full Schedule", value: "90 Days" },
        { label: "Cost Per Lead", value: "-45%" },
      ],
      tech: ["Next.js", "Tailwind CSS", "Local SEO", "CallRail"],
    },
    {
      client: "FinSetu Solutions",
      category: "Fintech & Web Portals",
      headline: "Scaling digital loan underwriting from 2,000 to 85,000 monthly borrowers.",
      desc: "Engineered a high-concurrency portal with Aadhaar e-KYC, DigiLocker verification, and instant UPI mandate setup. Reduced borrower drop-off from 48% to 14%.",
      metrics: [
        { label: "Monthly Borrowers", value: "85,000+" },
        { label: "Application Speed", value: "4.2x Faster" },
        { label: "Cloud Uptime", value: "99.99%" },
      ],
      tech: ["Next.js", "PostgreSQL", "Razorpay Mandates", "AWS Mumbai"],
    },
    {
      client: "Sutra Living",
      category: "D2C Headless Commerce",
      headline: "Sub-second mobile storefront delivering 42% higher UPI conversions.",
      desc: "Migrated from standard WooCommerce to headless Next.js frontend with 1-click Razorpay Magic Checkout and automated WhatsApp shipping updates.",
      metrics: [
        { label: "Mobile Page Load", value: "0.8s" },
        { label: "UPI Checkout Conversion", value: "+42%" },
        { label: "Cart Abandonment", value: "-31%" },
      ],
      tech: ["Next.js", "Shopify Headless", "Razorpay Magic", "WhatsApp API"],
    },
    {
      client: "Vayu Mobility",
      category: "EV Logistics & Fleet Dashboards",
      headline: "Real-time fleet dispatch dashboard handling 45,000+ daily deliveries.",
      desc: "Replaced sluggish legacy dispatch software with a high-performance operational web app. Connects telemetry data from 3,200 electric two-wheelers across 6 Indian metro cities.",
      metrics: [
        { label: "Daily Dispatches", value: "45,000+" },
        { label: "Dispatch Latency", value: "< 250ms" },
        { label: "Fleet Efficiency", value: "+28%" },
      ],
      tech: ["React", "Node.js", "Redis", "WebSockets", "Mapbox"],
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
            <span>Proven Track Record</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            We Build Things <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E30613] via-[#FF2B38] to-[#FF9933]">
              That Matter.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            From fast-moving local trades to scaling consumer brands &mdash; we ship websites and campaigns that drive real outcomes. A clear before and after, every time.
          </p>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
          {caseStudies.map((cs, idx) => (
            <div
              key={idx}
              className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 hover:border-[#E30613]/40 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-[#E30613] text-sm">{cs.client}</span>
                  <span className="text-gray-500">&bull;</span>
                  <span className="text-gray-400 font-mono text-[11px]">{cs.category}</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {cs.headline}
                </h2>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {cs.desc}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {cs.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded bg-[#0A0D15] border border-white/5 text-[11px] font-mono text-gray-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#0A0C13] rounded-2xl border border-white/5 p-6 space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Verified Outcomes:
                </p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  {cs.metrics.map((m, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-[#111420] border border-white/5">
                      <p className="text-base font-black text-emerald-400">{m.value}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-2 text-center">
                  <Link
                    href="/contact"
                    className="btn-primary w-full py-2.5 rounded-xl text-xs font-bold text-white inline-flex items-center justify-center gap-1.5"
                  >
                    <span>Request Similar System</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready For Measurable Growth?
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              Submit your requirements and let us engineer a system that delivers.
            </p>
          </div>
          <LeadForm source="Our Work Page Inquiry" />
        </div>
      </section>
    </div>
  );
}
