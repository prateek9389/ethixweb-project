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
  Award,
  Clock,
  Check,
  Building2,
  Wrench,
  Activity,
  Flame,
  MessageSquare
} from "lucide-react";
import LeadForm from "@/components/LeadForm";
import CostCalculator from "@/components/CostCalculator";

export const metadata = {
  title: "Ethixweb India - We run the tech. You run the business.",
  description: "AI automation, websites, web applications, CRM integrations, SEO, ads, maintenance, and digital operations &mdash; built for Indian businesses that want measurable growth, not agency theater.",
};

export default function HomePage() {
  const stats = [
    { value: "2-4 wks", label: "Typical Launch Time", sub: "Weeks, not quarters" },
    { value: "100%", label: "Senior-Led Delivery", sub: "Direct engineers, zero middle-men" },
    { value: "1.1s", label: "Mobile LCP Load Time", sub: "Benchmarked on Jio & Airtel" },
    { value: "₹450Cr+", label: "Client Revenue Processed", sub: "Across Indian D2C & Tech" },
  ];

  // The 22 Capabilities grouped across Ethixweb's 6 official pillars
  const serviceCategories = [
    {
      name: "Website",
      count: "04 Services",
      icon: Cpu,
      summary: "Modern sites and headless foundations built around how your business sells.",
      services: [
        { name: "Website Redesign", desc: "A modern site built around how your business sells." },
        { name: "Headless Architecture", desc: "Faster, more flexible foundation for future growth." },
        { name: "Landing Pages", desc: "Purpose-built pages that convert campaign traffic." },
        { name: "Maintenance & Security", desc: "Updates, monitoring, and patching after launch." },
      ],
      tag: "Next.js / Tailwind",
    },
    {
      name: "AI & WhatsApp",
      count: "04 Services",
      icon: Bot,
      summary: "Chatbots and AI receptionists that qualify and route leads around the clock.",
      services: [
        { name: "Knowledge Chatbot", desc: "Fast answers from a fixed script or FAQ library." },
        { name: "LLM Chatbot", desc: "Reasons over your real knowledge base, in your brand voice." },
        { name: "AI Receptionist / CSR", desc: "Handles inquiries on WhatsApp & web 24/7." },
        { name: "Human Handoff", desc: "A real person steps in when it actually matters." },
      ],
      tag: "Meta Cloud API",
    },
    {
      name: "Growth",
      count: "06 Services",
      icon: TrendingUp,
      summary: "SEO, Google & Meta ads, social, and email working as one coordinated engine.",
      services: [
        { name: "SEO", desc: "Technical fixes, content, and authority built over time." },
        { name: "Google Ads + LSA", desc: "Campaigns built, tracked, and optimized weekly." },
        { name: "Meta Ads", desc: "Facebook and Instagram, targeted and retargeted." },
        { name: "Social + Reels", desc: "Strategy, content calendar, and creative production." },
        { name: "Email Marketing", desc: "Campaigns, automation, and segmentation that convert." },
        { name: "CRM Integration", desc: "Leads flow straight into Zoho, HubSpot, or LeadSquared." },
      ],
      tag: "Demand Generation",
    },
    {
      name: "Data",
      count: "03 Services",
      icon: BarChart3,
      summary: "Live executive dashboards, analytics, and monthly reporting for every channel.",
      services: [
        { name: "Live Dashboard", desc: "Every channel's performance in one unified view." },
        { name: "Full-Funnel Analytics", desc: "Website, ads, and lead tracking fully connected." },
        { name: "Monthly Reporting", desc: "What happened, why, and what to do next." },
      ],
      tag: "Attribution",
    },
    {
      name: "Accessibility",
      count: "02 Services",
      icon: ShieldCheck,
      summary: "Improvements and testing reviewed against recognized international standards.",
      services: [
        { name: "Accessibility Improvements", desc: "Contrast, navigation, and structure for everyone." },
        { name: "Accessibility Testing", desc: "Reviewed against recognized WCAG accessibility standards." },
      ],
      tag: "Standards Compliance",
    },
    {
      name: "Support",
      count: "03 Services",
      icon: Headphones,
      summary: "A real senior team on technical support, content updates, and API maintenance.",
      services: [
        { name: "Technical Support", desc: "A real team reachable when something breaks." },
        { name: "AI + Content Updates", desc: "Your chatbot's knowledge kept current monthly." },
        { name: "API Maintenance", desc: "Every integration monitored and kept in sync." },
      ],
      tag: "24/7 Ops",
    },
  ];

  // The 4-Beat Operating Rhythm from Ethixweb
  const operatingRhythm = [
    {
      step: "Step 01",
      title: "Audit",
      desc: "We tear down your current site, ads, and tracking, and show you exactly where leads leak.",
      badge: "Discovery",
    },
    {
      step: "Step 02",
      title: "Plan",
      desc: "A prioritized roadmap with expected impact per item &mdash; you approve what we build, and why.",
      badge: "Architecture",
    },
    {
      step: "Step 03",
      title: "Build",
      desc: "Senior hands ship the site, campaigns, and integrations in weeks, not quarters.",
      badge: "Sprint",
    },
    {
      step: "Step 04",
      title: "Optimize",
      desc: "Weekly iteration on real data: calls, bookings, and revenue &mdash; not vanity dashboards.",
      badge: "Continuous",
    },
  ];

  // Indian Industries & Case Studies
  const industries = [
    {
      title: "Home Services & Contractors",
      sub: "You handle the jobs. We handle the tech.",
      problem: "You spend thousands per lead, but miss 30% of incoming calls while on site. We build 24/7 AI WhatsApp responders that qualify customers and lock in bookings instantly.",
      stat: "2,500+ Leads Generated",
      linkText: "Explore Contractor Solutions",
    },
    {
      title: "D2C Brands & Digital Commerce",
      sub: "Sub-second checkout built for Bharat.",
      problem: "Slow mobile storefronts on 4G cause 40%+ checkout drop-offs. We engineer headless Next.js stores with 1-click Razorpay UPI checkout, Shiprocket sync, and ONDC hooks.",
      stat: "0.8s Mobile Load &middot; +38% UPI Conversion",
      linkText: "Explore Commerce Solutions",
    },
    {
      title: "Fintech & B2B SaaS Startups",
      sub: "High-concurrency portals with bank-grade security.",
      problem: "Complex onboarding flows lose users during verification. We build custom reactive portals with Aadhaar e-KYC, DigiLocker hooks, and sub-second database transactions.",
      stat: "85,000+ Monthly Users &middot; 99.99% Uptime",
      linkText: "Explore Fintech Solutions",
    },
    {
      title: "Healthcare & Multi-Clinic Networks",
      sub: "24/7 WhatsApp consultation routing.",
      problem: "Receptionists get overwhelmed with appointment scheduling across branches. Our AI triage bot books appointments into your CRM in English and Hinglish.",
      stat: "+310% Consultation Bookings",
      linkText: "Explore Healthcare Solutions",
    },
  ];

  // Ethixweb Real Client Reviews (Verified Trustpilot & Indian Founders)
  const clientReviews = [
    {
      quote: "I decided to give Ethixweb that chance and they have proven themselves! I have been with them 2 years and within that first year my business had doubled. The second year my business had doubled again. My website is easy to follow, has everything on it I asked for, it loads fast and it's easy to maintain. The folks at Ethixweb are very professional, schedule meetings via video when I need something fixed and are on top of it.",
      author: "Ryan Taylor",
      source: "Verified Client &middot; Trustpilot",
      location: "Global Industrial Operations",
    },
    {
      quote: "Amar is very thorough and quick to make changes on our website. Over the years that has been my biggest issue with web designers. Small changes can take way too long. Thankfully that is not the case here. Good service! Very happy customer!!",
      author: "Leslie Whitehurst-Manners",
      source: "Verified Client &middot; Trustpilot",
      location: "Commercial Services",
    },
    {
      quote: "I had Ethixweb create me a website not only did they do it extremely professional, but they did it extremely fast and it came out fabulous. They communicate great. I would highly recommend this company to create your next website. They are exceptional.",
      author: "Clinton Mcculloch",
      source: "Verified Client &middot; Trustpilot",
      location: "Service Operations",
    },
    {
      quote: "Ethixweb built our customer onboarding portal and WhatsApp AI agent in under 3 weeks. Our customer verification drop-off dropped by more than 35% within the first month. They understand Indian tech nuances like UPI and WhatsApp better than anyone.",
      author: "Aditya Deshmukh",
      source: "VP Product &middot; FinBridge Solutions",
      location: "Bengaluru, Karnataka",
    },
  ];

  return (
    <div className="relative pt-24 sm:pt-28 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pb-24">
        {/* Glows */}
        <div className="hero-glow absolute inset-0 pointer-events-none" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[750px] h-[350px] bg-[#E30613]/12 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Super Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E30613]/40 bg-[#160E12] px-4 py-1.5 shadow-lg shadow-[#E30613]/10">
              <span className="flex h-2 w-2 rounded-full bg-[#E30613] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Ethixweb India Edition
              </span>
              <span className="text-xs text-gray-500">|</span>
              <span className="text-xs font-semibold text-[#FF9933]">Bengaluru &middot; Mumbai &middot; Delhi-NCR</span>
            </div>

            {/* Ethixweb Signature Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08]">
              We run the tech. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E30613] via-[#FF2B38] to-[#FF9933]">
                You run the business.
              </span>
            </h1>

            {/* Official Positioning Description */}
            <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We manage your digital operation &mdash; from AI WhatsApp booking agents and CRM integrations to Next.js web applications, SEO, ads, and 24/7 cloud support for Indian businesses.
            </p>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-bold text-white transition-all shadow-xl shadow-[#E30613]/30"
              >
                <Calendar className="w-4 h-4" />
                <span>Start a Project (IST Discovery)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href="https://wa.me/919871234567?text=Hi%20Ethixweb%20India%20team!%20I%20would%20like%20to%20discuss%20our%20tech%20operations."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-6 py-4 text-sm font-bold text-emerald-400 hover:bg-emerald-500/20 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Instant WhatsApp Consult</span>
              </a>
            </div>

            {/* Core Values Tagline */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#E30613]" />
                <span>No Account Managers &middot; Direct Senior Engineers</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Weekly Shipping Cadence &middot; 2-4 Week Launches</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FF9933]" />
                <span>Revenue Obsessed &middot; GST Invoicing</span>
              </span>
            </div>
          </div>

          {/* Key Metrics Bar */}
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

      {/* Global Operations Network Section (From Ethixweb.com) */}
      <section className="py-14 bg-[#090B10] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E30613] font-bold">
                Global Operations Network
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Seattle, Wyoming, New York, London &amp; India Stay Connected
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                One responsive digital operations layer. Whether you need late-night US support or high-velocity development during IST business hours, our senior teams bridge both worlds.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="px-3.5 py-2 rounded-xl bg-[#141824] border border-white/10 text-gray-200">
                <span className="text-gray-400">US Entity:</span> <strong>Ethixweb USA LLC (Wyoming)</strong>
              </div>
              <div className="px-3.5 py-2 rounded-xl bg-[#141824] border border-white/10 text-gray-200">
                <span className="text-gray-400">India Hubs:</span> <strong>Bengaluru &middot; Mumbai &middot; Delhi</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full 22 Services Catalog Across 6 Pillars (From Ethixweb.com) */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E30613] bg-[#E30613]/10 px-3 py-1 rounded-full border border-[#E30613]/20 mb-3">
                <Layers className="w-3.5 h-3.5" /> Full Service Catalog
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                22 Services Across 6 Categories. <br />
                <span className="text-[#E30613]">Run By One Dedicated Team.</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-400 mt-3 leading-relaxed">
                From website builds to AI WhatsApp receptionists, ad campaigns, live reporting, and 24/7 support &mdash; stop stitching together five disconnected vendors.
              </p>
            </div>

            <Link
              href="/services"
              className="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold text-white shrink-0"
            >
              <span>See Full Service Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div
                  key={i}
                  className="glass-panel card-glow-hover rounded-3xl p-7 flex flex-col justify-between border border-white/10 group relative"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-[#E30613]/15 border border-[#E30613]/30 flex items-center justify-center text-[#E30613] group-hover:bg-[#E30613] group-hover:text-white transition-all duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-[#161A26] border border-white/10 text-gray-400">
                        {cat.count}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#E30613] transition-colors">
                      {cat.name}
                    </h3>

                    <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                      {cat.summary}
                    </p>

                    <div className="space-y-2 pt-1 border-t border-white/5">
                      {cat.services.map((s, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-gray-200">{s.name}:</strong>{" "}
                            <span className="text-gray-400 text-[11px]">{s.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#FF9933]">
                      {cat.tag}
                    </span>
                    <Link
                      href="/services"
                      className="text-xs text-gray-400 hover:text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                    >
                      <span>Explore details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* The 4-Beat Operating Rhythm (From Ethixweb.com) */}
      <section className="py-20 bg-[#06070B] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF9933] bg-[#FF9933]/10 px-3 py-1 rounded-full border border-[#FF9933]/20 mb-3">
              <Activity className="w-3.5 h-3.5" /> How An Engagement Runs
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              The 4-Beat Operating Rhythm.
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-3">
              Every service plugs into the same disciplined four-step rhythm, so you always know what happens next.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {operatingRhythm.map((r, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-white/10 relative hover:border-[#E30613]/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-black text-[#E30613] font-mono">
                    {r.step}
                  </span>
                  <span className="text-[10px] font-semibold text-[#FF9933] bg-[#FF9933]/10 border border-[#FF9933]/25 px-2 py-0.5 rounded-full">
                    {r.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{r.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-3xl glass-panel border border-white/10 max-w-2xl mx-auto text-center space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Every Single Week:
            </p>
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-300">
              <div className="p-2 bg-[#090C12] rounded-xl border border-white/5">
                ✓ You know what&apos;s shipping
              </div>
              <div className="p-2 bg-[#090C12] rounded-xl border border-white/5">
                ✓ You know why it&apos;s prioritized
              </div>
              <div className="p-2 bg-[#090C12] rounded-xl border border-white/5">
                ✓ You see what it moved
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve (Adapted for Indian Ecosystem) */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-3">
                <Building2 className="w-3.5 h-3.5" /> Industry Verticals
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
                Built For Businesses Where Calls &amp; Bookings Can&apos;t Wait.
              </h2>
              <p className="text-sm sm:text-base text-gray-400 mt-2">
                Different operations, same core challenge: leads leak when responses are slow. We build systems that convert around the clock.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industries.map((ind, i) => (
              <div
                key={i}
                className="glass-panel rounded-3xl p-7 border border-white/10 hover:border-[#E30613]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{ind.title}</h3>
                  <p className="text-xs font-semibold text-[#FF9933] mb-3">{ind.sub}</p>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">{ind.problem}</p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">{ind.stat}</span>
                  <Link
                    href="/contact"
                    className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                  >
                    <span>{ind.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Embedded Interactive ROI & Cost Calculator */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <CostCalculator />
        </div>
      </section>

      {/* Real Reviews: Trustpilot Verified + Indian Founders */}
      <section className="py-20 bg-[#06080D] border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF9933] bg-[#FF9933]/10 px-3 py-1 rounded-full border border-[#FF9933]/20 mb-3">
              <Star className="w-3.5 h-3.5" /> Verified Feedback
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              Trusted By Clients Worldwide &amp; In India.
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Real feedback from clients who trusted Ethixweb to design, build, and grow their digital operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientReviews.map((rev, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-[#E30613]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-300 italic leading-relaxed mb-6">
                    &ldquo;{rev.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10">
                  <p className="text-xs font-bold text-white">{rev.author}</p>
                  <p className="text-[11px] text-gray-400">{rev.source}</p>
                  <p className="text-[10px] text-[#E30613] font-semibold mt-0.5">{rev.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Generation Form */}
      <section className="py-20 relative" id="inquiry-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left pitch */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E30613]/40 bg-[#160E12] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF2B38]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ready For A Sharper Operation?</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                Bring Us The Messy Stack, Missed Leads, Or Slow Site.
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Tired of being account #200 at a big agency? Work with a senior team that knows your business by name and ships code in weeks.
              </p>

              <div className="space-y-3 text-xs text-gray-300 pt-2">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Direct senior engineer review &mdash; no sales representatives</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#E30613]" />
                  <span>Transparent INR pricing &amp; full GST input tax credit</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#FF9933]" />
                  <span>Mutual NDA &amp; 100% intellectual property ownership</span>
                </div>
              </div>

              <div className="pt-4 p-5 rounded-2xl bg-[#0F121C] border border-white/5 space-y-2">
                <p className="text-xs font-bold text-white flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-emerald-400" />
                  Direct Technical Lines (IST):
                </p>
                <p className="text-xs text-gray-400">
                  Call our technical desk at <strong className="text-white">+91 80 4718 9000</strong> or WhatsApp us directly at <strong className="text-emerald-400">+91 98712 34567</strong>.
                </p>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <LeadForm source="Home Page - Deep Analysis CTA" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
