import Link from "next/link";
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Bot, 
  Cpu, 
  Globe2, 
  ShoppingBag, 
  BarChart3, 
  Headphones, 
  ExternalLink, 
  Star, 
  PhoneCall, 
  Calendar, 
  IndianRupee,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Award
} from "lucide-react";
import LeadForm from "@/components/LeadForm";
import CostCalculator from "@/components/CostCalculator";

export const metadata = {
  title: "Ethixweb India | AI Automation, Next.js Web Apps & Digital Operations",
  description: "Redefining digital engineering for Indian businesses. We build AI WhatsApp agents, high-velocity Next.js web applications, ONDC commerce, and full-funnel digital operations with US-standard precision.",
};

export default function HomePage() {
  const stats = [
    { value: "₹450Cr+", label: "Client Revenue Handled", sub: "across Indian commerce & fintech" },
    { value: "1.1s", label: "Mobile LCP Load Time", sub: "benchmarked on Jio & Airtel networks" },
    { value: "99.98%", label: "Cloud Uptime SLA", sub: "hosted in AWS ap-south-1 Mumbai" },
    { value: "40+", label: "Indian Tech Pods Scaled", sub: "Bengaluru, Mumbai & Delhi-NCR" },
  ];

  const services = [
    {
      icon: Bot,
      title: "AI Agents & WhatsApp Cloud Ops",
      desc: "Custom WhatsApp chatbots & AI voice agents fluent in English and Hinglish that qualify leads, answer FAQs, and book meetings 24/7.",
      tag: "Meta Cloud API",
      metrics: "+310% Lead Conversion",
      href: "/services#ai-agents",
    },
    {
      icon: Cpu,
      title: "High-Velocity Next.js Web Apps",
      desc: "Custom portals, internal dashboards, and B2B SaaS applications engineered with TypeScript, Tailwind, and sub-second database queries.",
      tag: "React 19 / Next.js",
      metrics: "90+ PageSpeed Guaranteed",
      href: "/services#web-apps",
    },
    {
      icon: ShoppingBag,
      title: "D2C Commerce & ONDC Integration",
      desc: "Headless e-commerce stores with instant 1-click Razorpay UPI checkout, automated shipping sync via Shiprocket, and ONDC buyer network hooks.",
      tag: "E-Commerce",
      metrics: "38% Lower Cart Drop-offs",
      href: "/services#d2c-commerce",
    },
    {
      icon: BarChart3,
      title: "Full-Funnel SEO & Paid Growth Ads",
      desc: "Data-backed Google Ads & Meta campaigns integrated with CRM analytics to acquire high-intent B2B and consumer leads at predictable CAC.",
      tag: "Growth Engine",
      metrics: "4.8x Average ROAS",
      href: "/services#seo-growth",
    },
    {
      icon: ShieldCheck,
      title: "Cloud Infrastructure & DevOps",
      desc: "Battle-tested cloud architecture on AWS Mumbai & Cloudflare with automated CI/CD pipelines, Docker containers, and bank-grade encryption.",
      tag: "AWS ap-south-1",
      metrics: "Zero Downtime Deploys",
      href: "/services#cloud-ops",
    },
    {
      icon: Headphones,
      title: "24/7 Tech Operations & Dedicated Pods",
      desc: "Your senior technology team on retainer. Instant bug fixes, feature sprints, uptime monitoring, and proactive security audits under 30-min SLA.",
      tag: "Turnkey Retainer",
      metrics: "Dedicated Tech Lead",
      href: "/services#tech-pods",
    },
  ];

  const caseStudies = [
    {
      client: "FinSetu Solutions",
      city: "Mumbai, Maharashtra",
      category: "Fintech & NBFC Portal",
      title: "Scaling Digital Loan Underwriting from 2,000 to 85,000 Monthly Borrowers",
      desc: "Engineered a high-concurrency Next.js portal with Aadhaar e-KYC, DigiLocker verification, and instant UPI mandate setup. Reduced borrower drop-off from 48% to 14%.",
      impact: [
        { label: "Application Speed", value: "4.2x Faster" },
        { label: "Monthly Borrowers", value: "85,000+" },
        { label: "Uptime Rating", value: "99.99%" },
      ],
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Razorpay Subscriptions", "AWS Mumbai"],
    },
    {
      client: "Vayu Mobility",
      city: "Bengaluru, Karnataka",
      category: "EV Logistics & Fleet Management",
      title: "Real-Time Fleet Dispatch Dashboard Handling 45,000+ Daily EV Deliveries",
      desc: "Replaced slow legacy software with a high-performance operational web app. Connected telemetry data from 3,200 electric two-wheelers across 6 Indian metro cities.",
      impact: [
        { label: "Dispatch Latency", value: "< 250ms" },
        { label: "Fleet Utilization", value: "+28%" },
        { label: "Daily Trips", value: "45,000+" },
      ],
      tech: ["React", "Node.js", "Redis", "WebSockets", "Mapbox India"],
    },
    {
      client: "Sutra Living",
      city: "Delhi-NCR / Mumbai",
      category: "D2C Premium Lifestyle",
      title: "Sub-Second Headless Storefront Delivering 42% Higher UPI Conversions",
      desc: "Migrated a bloated CMS store to a headless architecture optimized for Indian mobile users on 4G networks. Implemented Razorpay Magic Checkout and automated WhatsApp shipping updates.",
      impact: [
        { label: "Mobile Page Load", value: "0.8s" },
        { label: "UPI Checkout Conversion", value: "+42%" },
        { label: "Cart Abandonment", value: "-31%" },
      ],
      tech: ["Next.js", "Tailwind CSS", "Shopify Headless", "WhatsApp API", "Razorpay"],
    },
  ];

  const comparisonPoints = [
    {
      feature: "Engineering Talent Level",
      traditionalAgency: "Junior trainees & outsourced freelancers",
      inHouseHiring: "Lengthy 60-day hiring cycle in Bengaluru",
      ethixweb: "Direct senior engineers & AI specialists with 5+ yrs experience",
    },
    {
      feature: "Mobile Performance (LCP)",
      traditionalAgency: "3.5s - 6.0s (Bloated templates, heavy plugins)",
      inHouseHiring: "Variable based on internal developer skill",
      ethixweb: "Guaranteed 90+ PageSpeed & sub-1.2s mobile loading",
    },
    {
      feature: "India-Specific Integrations",
      traditionalAgency: "Basic Stripe / PayPal (often lacks UPI depth)",
      inHouseHiring: "Requires custom engineering from scratch",
      ethixweb: "Native WhatsApp Cloud API, Razorpay, Cashfree & ONDC pipelines",
    },
    {
      feature: "SLA & Response Time",
      traditionalAgency: "24-48 hours via support tickets",
      inHouseHiring: "Limited to office hours; prone to turnover",
      ethixweb: "< 30 mins incident response with direct Slack/WhatsApp channel",
    },
    {
      feature: "Billing & Compliance",
      traditionalAgency: "Opaque hourly billings with hidden scope creep",
      inHouseHiring: "Fixed payroll + 20% benefits, hardware & tax liability",
      ethixweb: "Transparent sprint milestones with GST-compliant tax invoicing",
    },
  ];

  const testimonials = [
    {
      quote: "Ethixweb built our customer onboarding portal and WhatsApp AI agent in under 3 weeks. Our customer verification drop-off dropped by more than 35% within the first month. They understand Indian tech nuances like UPI and WhatsApp better than anyone.",
      author: "Aditya Deshmukh",
      title: "Co-Founder & VP Product",
      company: "FinBridge Solutions (Bengaluru)",
      location: "Bengaluru",
      rating: 5,
    },
    {
      quote: "Most agencies in Mumbai either gave us cookie-cutter WordPress themes or promised the moon with 6-month timelines. Ethixweb gave us a dedicated Next.js engineering pod that shipped production code every Friday. Our PageSpeed went from 41 to 96.",
      author: "Pooja Singhania",
      title: "Director of Digital Strategy",
      company: "Kavach Enterprises",
      location: "Mumbai",
      rating: 5,
    },
    {
      quote: "Ethixweb has proven themselves again and again. Our website is easy to follow, loads blisteringly fast, and handles our peak festive sale traffic without a hiccup. The folks at Ethixweb are deeply professional and always on top of communication.",
      author: "Ryan Taylor",
      title: "Verified Global Client",
      company: "Taylor Industrial Operations",
      location: "Global Partner",
      rating: 5,
    },
  ];

  return (
    <div className="relative pt-24 sm:pt-28 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pb-24">
        {/* Ambient Glows */}
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E30613]/12 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-[#FF9933]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Super Header Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E30613]/40 bg-[#160E12] px-4 py-1.5 shadow-lg shadow-[#E30613]/10">
              <span className="flex h-2 w-2 rounded-full bg-[#E30613] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Engineered for India &middot; Built for Global Scale
              </span>
              <span className="text-xs text-gray-400">|</span>
              <span className="text-xs font-semibold text-[#FF9933]">Bengaluru &middot; Mumbai &middot; Delhi-NCR</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
              High-Velocity <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E30613] via-[#FF2B38] to-[#FF9933]">AI &amp; Web Systems</span> For Indian Enterprises.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We replace bloated agencies with dedicated, senior engineering pods. From WhatsApp AI agents and Next.js platforms to sub-second UPI checkout funnels &mdash; we run the tech so you can run the business.
            </p>

            {/* Hero CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-white transition-all shadow-xl shadow-[#E30613]/30"
              >
                <Calendar className="w-4 h-4" />
                <span>Start Project Discovery (IST)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://wa.me/919871234567?text=Hi%20Ethixweb%20India%20team!%20I%20would%20like%20to%20discuss%20our%20tech%20requirements."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-6 py-4 text-sm font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Instant WhatsApp Consult</span>
              </a>
            </div>

            {/* Trust Metrics Pill */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E30613]" />
                <span>PageSpeed 90+ SLA Guaranteed</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Full GST Invoicing &amp; Mutual NDA</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF9933]" />
                <span>Zero Lock-in Engineering Pods</span>
              </span>
            </div>
          </div>

          {/* Key Impact Stats Bar */}
          <div className="mt-14 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 sm:p-6 rounded-3xl glass-panel border border-white/10 shadow-2xl">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-2xl bg-[#090C12]/70 border border-white/5 text-center relative overflow-hidden group hover:border-[#E30613]/40 transition-colors"
              >
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#E30613] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm font-bold text-gray-200 mt-1">
                  {stat.label}
                </p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-[#06070A] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E30613] bg-[#E30613]/10 px-3 py-1 rounded-full border border-[#E30613]/20 mb-3">
                <Zap className="w-3.5 h-3.5" /> Full-Stack India Capabilities
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Engineering Solutions Built For <span className="text-[#E30613]">India&apos;s Scale</span>.
              </h2>
              <p className="text-sm sm:text-base text-gray-400 mt-3 leading-relaxed">
                From high-speed Next.js portals and AI WhatsApp bots to vernacular SEO &amp; ONDC rails, every capability is tuned for Indian consumer behavior and cloud performance.
              </p>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#FF9933] hover:text-white transition-colors group"
            >
              <span>Explore all 22 detailed capabilities</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <div
                  key={i}
                  className="glass-panel card-glow-hover rounded-2xl p-7 flex flex-col justify-between border border-white/10 group relative"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[#E30613]/15 border border-[#E30613]/30 flex items-center justify-center text-[#E30613] group-hover:bg-[#E30613] group-hover:text-white transition-all duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-[#161A26] border border-white/10 text-gray-400">
                        {svc.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#E30613] transition-colors">
                      {svc.title}
                    </h3>

                    <p className="text-xs text-gray-400 leading-relaxed mb-6">
                      {svc.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {svc.metrics}
                    </span>
                    <Link
                      href={svc.href}
                      className="text-xs text-gray-400 hover:text-white flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4-Stage Agile Delivery Process */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF9933] bg-[#FF9933]/10 px-3 py-1 rounded-full border border-[#FF9933]/20 mb-3">
              <Layers className="w-3.5 h-3.5" /> The Ethixweb Protocol
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              How We Ship Production Systems In Sprints.
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-3">
              No endless discovery meetings or bureaucratic red tape. We operate on a crisp 4-stage engineering sprint model with weekly working demos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Blueprint & Architecture",
                duration: "Days 1 - 3",
                desc: "We analyze user flows, database models, API integrations (Razorpay, WhatsApp, CRM), and draft the technical specification.",
              },
              {
                step: "02",
                title: "Rapid Prototype Sprint",
                duration: "Days 4 - 10",
                desc: "Interactive UI/UX in Figma and Next.js sandbox. You test and click through the real interface on mobile before we build the backend.",
              },
              {
                step: "03",
                title: "Full-Stack Engineering",
                duration: "Days 11 - 24",
                desc: "Clean TypeScript code, API endpoints, database schemas with row-level security, anti-spam protections, and automated unit tests.",
              },
              {
                step: "04",
                title: "Launch & 24/7 Operations",
                duration: "Continuous",
                desc: "Zero-downtime deployment on AWS Mumbai, PageSpeed 90+ audit, analytics instrumentation, and ongoing monitoring pod.",
              },
            ].map((p, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-white/10 relative hover:border-[#E30613]/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-black text-[#E30613] font-mono">
                    {p.step}
                  </span>
                  <span className="text-[10px] font-semibold text-[#FF9933] bg-[#FF9933]/10 border border-[#FF9933]/25 px-2 py-0.5 rounded-full">
                    {p.duration}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Indian Work / Case Studies */}
      <section className="py-20 bg-[#07090E] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-3">
                <Award className="w-3.5 h-3.5" /> Proven Track Record
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
                Featured Work &amp; Case Studies.
              </h2>
              <p className="text-sm sm:text-base text-gray-400 mt-2">
                Real software and digital engines delivered for fast-growing Indian founders and enterprises.
              </p>
            </div>
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold text-white"
            >
              <span>Build Your Product With Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-8">
            {caseStudies.map((cs, idx) => (
              <div
                key={idx}
                className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 hover:border-[#E30613]/40 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2.5 text-xs">
                    <span className="font-bold text-[#E30613]">{cs.client}</span>
                    <span className="text-gray-500">&bull;</span>
                    <span className="text-gray-400">{cs.city}</span>
                    <span className="text-gray-500">&bull;</span>
                    <span className="px-2 py-0.5 rounded bg-white/5 text-gray-300 font-mono text-[10px]">
                      {cs.category}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                    {cs.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {cs.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {cs.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-[#131622] border border-white/10 text-[11px] font-mono text-gray-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#0A0D14] p-5 sm:p-6 rounded-2xl border border-white/5 space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Verified Outcomes:
                  </p>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {cs.impact.map((imp, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#111520] border border-white/5">
                        <p className="text-base sm:text-lg font-black text-emerald-400">
                          {imp.value}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">{imp.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 text-center">
                    <Link
                      href="/contact"
                      className="text-xs text-[#FF9933] hover:underline inline-flex items-center gap-1 font-semibold"
                    >
                      <span>Request architecture walkthrough</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Ethixweb vs Traditional Indian IT */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E30613] bg-[#E30613]/10 px-3 py-1 rounded-full border border-[#E30613]/20 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> Why Ethixweb India
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              The Difference Is In The Code.
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-3">
              Traditional Indian IT agencies push junior resources on body-shopping models. We provide a compact, elite engineering squad with proven modern stacks.
            </p>
          </div>

          <div className="overflow-x-auto glass-panel rounded-3xl border border-white/10 p-2 sm:p-6">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-gray-400">
                  <th className="py-4 px-4 font-semibold">Evaluation Criteria</th>
                  <th className="py-4 px-4 font-semibold text-gray-500">Traditional Agency</th>
                  <th className="py-4 px-4 font-semibold text-gray-500">In-House Local Team</th>
                  <th className="py-4 px-4 font-bold text-white bg-[#E30613]/15 rounded-t-xl border-t border-x border-[#E30613]/40">
                    Ethixweb Dedicated Pod
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonPoints.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02]">
                    <td className="py-4 px-4 font-semibold text-white">{row.feature}</td>
                    <td className="py-4 px-4 text-gray-400">{row.traditionalAgency}</td>
                    <td className="py-4 px-4 text-gray-400">{row.inHouseHiring}</td>
                    <td className="py-4 px-4 text-emerald-300 font-semibold bg-[#E30613]/10 border-x border-[#E30613]/30">
                      {row.ethixweb}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Embedded Interactive ROI & Cost Calculator */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <CostCalculator />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#06080D] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF9933] bg-[#FF9933]/10 px-3 py-1 rounded-full border border-[#FF9933]/20 mb-3">
              <Star className="w-3.5 h-3.5" /> Founder &amp; Client Feedback
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              Trusted By Leaders Across India &amp; Worldwide.
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Read how we help founders launch faster, optimize conversions, and eliminate operational bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="glass-panel p-7 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-[#E30613]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 italic leading-relaxed mb-6">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm font-bold text-white">{t.author}</p>
                  <p className="text-xs text-gray-400">{t.title}</p>
                  <p className="text-[11px] text-[#E30613] font-semibold mt-0.5">{t.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Generation & Inquiry Form Section */}
      <section className="py-20 relative" id="inquiry-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left pitch */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E30613]/40 bg-[#160E12] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF2B38]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kickstart Your Project</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                Ready To Scale Your Digital Engine In India?
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Whether you need an AI WhatsApp booking assistant, a full Next.js rebuild, or a high-converting D2C commerce experience &mdash; submit your brief. Our India Technical Director will review and reply with an architecture outline in under 4 hours.
              </p>

              <div className="space-y-3 text-xs text-gray-300 pt-2">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Direct senior engineer review &mdash; no sales representatives</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E30613]" />
                  <span>Fixed-scope or dedicated monthly pod pricing in INR (₹)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF9933]" />
                  <span>Immediate mutual NDA and IP ownership upon payment</span>
                </div>
              </div>

              <div className="pt-4 p-5 rounded-2xl bg-[#0F121C] border border-white/5 space-y-2">
                <p className="text-xs font-bold text-white flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  Prefer direct conversation?
                </p>
                <p className="text-xs text-gray-400">
                  Call our Bengaluru technical desk at <strong className="text-white">+91 80 4718 9000</strong> or message on WhatsApp for immediate triage.
                </p>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <LeadForm source="Home Page - Hero/Footer CTA" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
