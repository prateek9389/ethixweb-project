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
  Heart
} from "lucide-react";

export const metadata = {
  title: "Our India Story | Ethixweb India",
  description: "Learn how Ethixweb expanded from US digital operations to create India's most agile software engineering studio in Bengaluru, Mumbai, and Delhi-NCR.",
};

export default function AboutPage() {
  const hubs = [
    {
      city: "Bengaluru",
      name: "Core Tech & AI Studio",
      address: "100ft Road, Indiranagar, Bengaluru, Karnataka 560038",
      focus: "AI Agents, Next.js Full-Stack Engineering, Database Optimization & ONDC Rails",
      color: "#E30613",
    },
    {
      city: "Mumbai",
      name: "BFSI & FinTech Hub",
      address: "One BKC, Bandra Kurla Complex, Mumbai, Maharashtra 400051",
      focus: "Payment Integrations, Subscriptions, Underwriting Portals & Compliance",
      color: "#FF9933",
    },
    {
      city: "Delhi-NCR",
      name: "Enterprise & D2C Studio",
      address: "Cyber City, DLF Phase 2, Gurugram, Haryana 122002",
      focus: "Headless Commerce, Brand Positioning, Programmatic SEO & Performance Ads",
      color: "#10B981",
    },
  ];

  const milestones = [
    {
      year: "2022",
      title: "Ethixweb Founded in the USA",
      desc: "Launched in Wyoming and Seattle to provide hands-on digital engineering, AI automation, and CRM integrations for North American businesses.",
    },
    {
      year: "2024",
      title: "The India Inception",
      desc: "Recognized the rapid inflection in India's digital economy &mdash; UPI crossing 14 Billion monthly transactions and startups struggling with sluggish traditional agencies.",
    },
    {
      year: "2025",
      title: "Bengaluru & Mumbai Studios Open",
      desc: "Established dedicated engineering pods in Indiranagar and BKC. Launched our WhatsApp Cloud AI agent framework and headless Next.js commerce stacks.",
    },
    {
      year: "2026",
      title: "National Reach & ONDC Enablement",
      desc: "Delivered over 40+ production systems with ₹450Cr+ GMV handled. Expanded to Gurugram enterprise hub with guaranteed 90+ PageSpeed SLA.",
    },
  ];

  const corePillars = [
    {
      icon: Cpu,
      title: "US Engineering Rigor &middot; Indian Velocity",
      desc: "We bring Silicon Valley clean-code discipline (strict TypeScript, unit tests, sub-second queries) at the relentless execution speed demanded by India's startup founders.",
    },
    {
      icon: Zap,
      title: "Zero Bloat, Guaranteed Performance",
      desc: "We reject bloated WordPress templates and slow page builders. Every line of code is hand-crafted in Next.js and Tailwind, ensuring 90+ PageSpeed on mobile 4G/5G.",
    },
    {
      icon: Users,
      title: "No Account Managers, Direct Engineers",
      desc: "You talk directly with the tech lead writing your software. No game of telephone, no bureaucratic middle-management, and no miscommunicated specifications.",
    },
    {
      icon: ShieldCheck,
      title: "Frugal Innovation Elevated to Enterprise Scale",
      desc: "We transform the Indian mindset of agility into disciplined system architecture. Built to withstand festive peak traffic, flash sales, and high concurrency.",
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      {/* Hero */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E30613]/12 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF9933]/30 bg-[#FF9933]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FF9933]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our India Story</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Bridging Silicon Valley Precision With <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E30613] via-[#FF2B38] to-[#FF9933]">
              India&apos;s High-Velocity Scale
            </span>.
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Why an American-born digital operations firm set up dedicated tech pods across Bengaluru, Mumbai, and Delhi-NCR to reinvent software delivery for Indian enterprises.
          </p>
        </div>
      </section>

      {/* Story Narrative Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-sm text-gray-300 leading-relaxed">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E30613] flex items-center gap-2">
                <Target className="w-4 h-4" /> The Genesis of Ethixweb India
              </span>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-snug">
                Why India Deserved A Better Digital Engineering Partner.
              </h2>

              <p>
                Ethixweb started in the United States, managing mission-critical software, AI booking agents, and revenue pipelines for high-standard North American enterprises. But as our team watched India&apos;s digital transformation unfold &mdash; from the world-leading UPI payments revolution to the explosion of D2C brands &mdash; we noticed a glaring disconnect.
              </p>

              <p>
                Indian businesses were stuck between two painful extremes:
              </p>

              <div className="space-y-3 pl-2 border-l-2 border-[#E30613]/50">
                <p className="text-xs">
                  <strong>1. Legacy IT Consultancies:</strong> Bloated body-shops billing exorbitant retainers while assigning junior trainees, delivering slow WordPress sites with 4-second load times on mobile.
                </p>
                <p className="text-xs">
                  <strong>2. Unreliable Freelancer Collectives:</strong> Cheap upfront but plagued by missed deadlines, security vulnerabilities, and zero post-launch support when servers crash.
                </p>
              </div>

              <p>
                We built <strong>Ethixweb India</strong> to bridge that gap. We offer the engineering discipline, security, and sub-second performance of a Silicon Valley lab, coupled with deep localized expertise in UPI checkout flows, WhatsApp conversational bots, and transparent INR milestone billing.
              </p>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="glass-panel p-8 rounded-3xl border border-white/10 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E30613]/10 rounded-full blur-[60px]" />
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#FF9933]" />
                  What Makes Our India Edition Unique?
                </h3>
                <ul className="space-y-3 text-xs text-gray-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Tailored for 4G/5G Indian Networks:</strong> Every site and portal is optimized to render in under 1.2 seconds even on tier-2/3 mobile data.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Native WhatsApp &amp; UPI Architecture:</strong> Seamless integration with Meta Cloud API for automated Hinglish chats and Razorpay 1-click checkout.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Local Compliance &amp; GST:</strong> Official Indian entity with GST-compliant invoicing, mutual NDA, and AWS Mumbai data residency.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Real-time IST Collaboration:</strong> Overlap with Indian business hours, instant Slack/WhatsApp updates, and Friday demo cadences.</span>
                  </li>
                </ul>
              </div>

              {/* Stats Card */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#0C0F17] border border-white/5 text-center">
                  <p className="text-2xl font-black text-white">40+ Ventured</p>
                  <p className="text-[11px] text-gray-400 mt-1">Startups &amp; SMEs in India</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#0C0F17] border border-white/5 text-center">
                  <p className="text-2xl font-black text-emerald-400">90+ Score</p>
                  <p className="text-[11px] text-gray-400 mt-1">PageSpeed Insights SLA</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values & Pillars */}
      <section className="py-20 bg-[#06080D] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E30613] bg-[#E30613]/10 px-3 py-1 rounded-full border border-[#E30613]/20 mb-3">
              <Target className="w-3.5 h-3.5" /> Our Operating Principles
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              The Principles That Guide Our Engineering.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {corePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-[#E30613]/40 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E30613]/15 border border-[#E30613]/30 flex items-center justify-center text-[#E30613] mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{pillar.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* India Tech Hubs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF9933] bg-[#FF9933]/10 px-3 py-1 rounded-full border border-[#FF9933]/20 mb-3">
              <MapPin className="w-3.5 h-3.5" /> Presence Across Bharat
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              Our Physical Hubs &amp; Laboratories.
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Deep roots in India&apos;s leading technology, financial, and industrial corridors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hubs.map((hub, idx) => (
              <div
                key={idx}
                className="glass-panel p-7 rounded-2xl border border-white/10 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-white flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-[#E30613]" />
                    {hub.city}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-300">
                    Active Hub
                  </span>
                </div>

                <p className="text-xs font-semibold text-gray-200 mb-2">{hub.name}</p>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">{hub.address}</p>

                <div className="pt-3 border-t border-white/10">
                  <p className="text-[11px] font-bold uppercase text-gray-400 mb-1">Hub Specialization:</p>
                  <p className="text-xs text-emerald-300">{hub.focus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Milestones */}
      <section className="py-20 bg-[#06080D] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-3">
              <TrendingUp className="w-3.5 h-3.5" /> Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              From North America to India&apos;s Tech Frontier.
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
              <span>Partner With Ethixweb India</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
