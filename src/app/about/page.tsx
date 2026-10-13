import Link from "next/link";
import { 
  Sparkles, 
  MapPin, 
  Users, 
  ShieldCheck, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Cpu, 
  Globe2, 
  Award,
  Zap,
  TrendingUp,
  Heart,
  Check,
  Star
} from "lucide-react";

export const metadata = {
  title: "About - Ethixweb India | Our Story & Philosophy",
  description: "Built for founders tired of big agency theater. We're a tight-knit senior team that bridges Silicon Valley rigor with India's high-velocity innovation.",
};

export default function AboutPage() {
  const hubs = [
    {
      city: "Bengaluru",
      name: "Core Tech & AI Studio",
      address: "100ft Road, Indiranagar, Bengaluru, Karnataka 560038",
      focus: "AI WhatsApp Agents, Next.js Full-Stack Engineering, High-Concurrency DBs",
      tag: "India Tech Capital",
    },
    {
      city: "Mumbai",
      name: "BFSI & FinTech Hub",
      address: "One BKC, Bandra Kurla Complex, Mumbai, Maharashtra 400051",
      focus: "Razorpay Checkout, Aadhaar e-KYC, Digital Lending Portals & Compliance",
      tag: "Financial Center",
    },
    {
      city: "Delhi-NCR",
      name: "Enterprise & D2C Studio",
      address: "Cyber City, DLF Phase 2, Gurugram, Haryana 122002",
      focus: "Headless E-commerce, ONDC Protocols, Programmatic SEO & Performance Ads",
      tag: "Enterprise Hub",
    },
    {
      city: "Wyoming & Seattle",
      name: "Ethixweb USA LLC",
      address: "Registered in Sheridan, WY & Serving Kent, WA",
      focus: "North American Technology Operations & Global Security Architecture",
      tag: "US Entity",
    },
  ];

  const whatWeStandFor = [
    {
      icon: Target,
      title: "Revenue Obsessed",
      desc: "We measure success in booked jobs, qualified leads, and measurable revenue &mdash; not vanity impressions, page views, or design awards.",
    },
    {
      icon: Users,
      title: "Senior Team Only",
      desc: "You talk directly to the people doing the work. No account managers passing messages. No juniors learning on your budget. No layers, no jargon.",
    },
    {
      icon: Zap,
      title: "Move Fast, Ship Clean",
      desc: "Lean process, weekly iteration. We launch in weeks and optimize forever. Clean TypeScript, sub-second queries, and 90+ PageSpeed SLA.",
    },
    {
      icon: ShieldCheck,
      title: "Straight Talk & Full Transparency",
      desc: "From the first call to launch day, you always know what is happening, why, and what is next. No black boxes, no surprise invoices.",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Ethixweb Inception",
      desc: "Founded in the US to eliminate big agency theater and provide senior-led web development and digital operations for growing businesses.",
    },
    {
      year: "2022",
      title: "Ethixweb USA LLC Incorporated",
      desc: "Registered in Wyoming, establishing our US headquarters with operations serving Seattle, Kent, WA, and clients across North America.",
    },
    {
      year: "2024",
      title: "The India Expansion",
      desc: "Identified the gap in India where high-growth startups were stuck with sluggish legacy IT agencies. Established our Bengaluru and Mumbai studios.",
    },
    {
      year: "2026",
      title: "High-Velocity India Scale",
      desc: "Delivered 40+ systems across Bengaluru, Mumbai, and Delhi-NCR with ₹450Cr+ GMV handled. Integrated Meta Cloud WhatsApp AI agents and ONDC commerce rails.",
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E30613]/12 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E30613]/40 bg-[#160E12] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FF2B38]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Since 2020 &middot; Senior-Led Team</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Built For Businesses Tired Of <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E30613] via-[#FF2B38] to-[#FF9933]">
              Big Agency Theater.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We started Ethixweb because we were tired of watching good businesses get mediocre results from agencies that overpromise and underdeliver.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3 text-xs text-gray-400">
            <span className="px-3 py-1.5 rounded-full bg-[#121520] border border-white/10">
              100% Senior Led Delivery
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#121520] border border-white/10">
              2-4 Weeks Launch Time
            </span>
            <span className="px-3 py-1.5 rounded-full bg-[#121520] border border-white/10">
              US &amp; India Dual Operations
            </span>
          </div>
        </div>
      </section>

      {/* Our Story Narrative */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5 text-sm text-gray-300 leading-relaxed">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E30613]">
                Our Story
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-snug">
                You work directly with the people building your project.
              </h2>

              <p>
                We&apos;re a tight-knit team of developers, designers, and strategists, each senior in their craft. When you work with Ethixweb, you work directly with the engineers creating your software.
              </p>

              <p>
                No account managers passing messages. No juniors learning on your budget. No endless discovery phases that result in wireframes and zero working code.
              </p>

              <div className="p-4 rounded-2xl bg-[#0F121B] border border-white/5 space-y-2">
                <p className="text-xs font-bold text-white uppercase tracking-wider text-[#FF9933]">
                  The US-India Bridge:
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Through <strong>Ethixweb USA LLC</strong> (Wyoming, United States) and our dedicated technology studios in <strong>Bengaluru, Mumbai, and Delhi-NCR</strong>, we deliver enterprise-grade software with local responsiveness, GST billing, and real-time IST collaboration.
                </p>
              </div>
            </div>

            {/* Mission & Vision Card */}
            <div className="lg:col-span-6 space-y-4">
              <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
                <div>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
                    Our Mission
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-2">
                    Turn marketing &amp; tech spend into measurable revenue.
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Every project we take on is judged the exact same way: did it move the needle on bookings, qualified leads, and revenue? We build websites and AI systems that earn their place in your budget.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <span className="text-xs font-mono text-[#FF9933] font-bold uppercase tracking-widest">
                    Our Vision
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-2">
                    The senior team founders call first.
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    We&apos;re building Ethixweb into the go-to engineering and growth partner for businesses &mdash; known for senior craftsmanship, straight talk, and results you can point to.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="py-20 bg-[#06080D] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#E30613]">
              Operating Values
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-1">
              What We Stand For.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatWeStandFor.map((w, idx) => {
              const Icon = w.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-[#E30613]/40 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#E30613]/15 border border-[#E30613]/30 flex items-center justify-center text-[#E30613] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{w.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{w.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Physical Studios & Labs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF9933]">
              Global Presence
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-1">
              Our Physical Studios &amp; Entity.
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Connected across the US and India through one unified technology operations layer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {hubs.map((hub, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#FF9933]">{hub.tag}</span>
                  <Building2 className="w-4 h-4 text-[#E30613]" />
                </div>
                <h3 className="text-base font-bold text-white">{hub.city}</h3>
                <p className="text-xs text-gray-300 font-medium">{hub.name}</p>
                <p className="text-[11px] text-gray-400 leading-relaxed">{hub.address}</p>
                <div className="pt-2 border-t border-white/10 text-[10px] text-emerald-400 font-mono">
                  {hub.focus}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline */}
      <section className="py-20 bg-[#06080D] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Milestones
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              The Journey of Ethixweb.
            </h2>
          </div>

          <div className="space-y-6">
            {milestones.map((m, i) => (
              <div
                key={i}
                className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-[#E30613]/40 transition-colors"
              >
                <div className="px-4 py-2 rounded-xl bg-[#E30613]/20 border border-[#E30613]/40 text-[#E30613] font-black text-lg font-mono shrink-0">
                  {m.year}
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-white">{m.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-xs font-bold text-white"
            >
              <span>Work With Ethixweb</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
