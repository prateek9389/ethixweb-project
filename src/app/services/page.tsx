import Link from "next/link";
import { 
  Bot, 
  Cpu, 
  ShoppingBag, 
  BarChart3, 
  ShieldCheck, 
  Headphones, 
  Check, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  IndianRupee,
  Layers,
  HelpCircle,
  Database,
  Globe,
  Clock,
  PhoneCall
} from "lucide-react";
import LeadForm from "@/components/LeadForm";

export const metadata = {
  title: "Engineering Services & Capabilities | Ethixweb India",
  description: "Explore Ethixweb's 6 core engineering capabilities built for India: AI WhatsApp agents, Next.js web apps, D2C headless commerce, ONDC, paid growth ads, and 24/7 dedicated tech pods.",
};

export default function ServicesPage() {
  const serviceCategories = [
    {
      id: "ai-agents",
      icon: Bot,
      title: "AI Receptionists & WhatsApp Cloud Automation",
      badge: "Highest Demand in India",
      tagline: "Qualify leads, book consultations, and answer inquiries 24/7 on WhatsApp & web.",
      description: "Indian buyers live on WhatsApp. We design and integrate conversational AI agents powered by the Meta Cloud API that speak English, Hindi, and regional vernaculars. Our bots integrate directly into HubSpot, Zoho, LeadSquared, and custom databases.",
      deliverables: [
        "Custom Meta WhatsApp Cloud API setup & green tick verification support",
        "Multilingual & Hinglish natural language understanding (NLU)",
        "Automated calendar booking & Google/Outlook sync",
        "Instant lead qualification scoring & CRM routing",
        "Fallback routing to live human support agents",
        "Detailed conversion analytics & chat transcripts",
      ],
      tech: ["WhatsApp Cloud API", "OpenAI / Claude", "Node.js", "Zoho CRM", "HubSpot", "Redis"],
      pricing: "From ₹1.8L one-time setup + ₹35,000/mo management",
    },
    {
      id: "web-apps",
      icon: Cpu,
      title: "High-Velocity Next.js Web Applications & Portals",
      badge: "Enterprise Grade",
      tagline: "Custom web software, customer portals, and internal dashboards engineered for daily operations.",
      description: "We build modern, reactive web applications that feel like native software. Built on Next.js 15, TypeScript, and server components, our portals guarantee sub-second rendering, tight role-based access control, and bank-level data encryption.",
      deliverables: [
        "Full-stack architecture in Next.js (App Router), TypeScript & Tailwind CSS",
        "Interactive analytics dashboards with real-time charting",
        "Role-Based Access Control (RBAC) & OAuth2/SSO integrations",
        "API integration with payment gateways (Razorpay/Cashfree) & e-KYC",
        "Comprehensive automated testing (Jest, Playwright) & CI/CD pipeline",
        "Production deployment on AWS Mumbai or Vercel Edge",
      ],
      tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "PostgreSQL", "Supabase", "Docker", "AWS"],
      pricing: "From ₹4.5L to ₹18L depending on pod scope",
    },
    {
      id: "d2c-commerce",
      icon: ShoppingBag,
      title: "D2C Commerce & ONDC Integration",
      badge: "High Conversion",
      tagline: "Lightning-fast headless storefronts with 1-click Razorpay UPI checkout.",
      description: "Slow mobile storefronts bleed Indian customers. We engineer headless e-commerce stores with sub-second page loads on 4G networks, 1-click Razorpay Magic Checkout, automated Pin-code serviceability checks, and ONDC buyer network integration.",
      deliverables: [
        "Headless Next.js storefront integrated with Shopify or custom backends",
        "Sub-1.2s mobile loading speed on Jio/Airtel networks",
        "Razorpay, Cashfree & PhonePe UPI intent checkout integration",
        "Real-time logistics tracking via Shiprocket, Delhivery, or Bluedart APIs",
        "ONDC Buyer/Seller protocol integration for national discoverability",
        "Automated abandoned cart WhatsApp recovery triggers",
      ],
      tech: ["Shopify Headless", "Next.js", "Razorpay Magic", "Shiprocket API", "ONDC Protocol"],
      pricing: "From ₹3.2L for headless storefront build",
    },
    {
      id: "seo-growth",
      icon: BarChart3,
      title: "Full-Funnel SEO & High-ROI Paid Ads",
      badge: "Demand Generation",
      tagline: "Attract high-intent Indian customers with programmatic SEO & precision paid ads.",
      description: "Traffic means nothing without revenue. We build technical SEO foundations that rank on Google India search results, paired with high-conversion Google Search & Meta ad funnels engineered around customer acquisition cost (CAC) and ROAS.",
      deliverables: [
        "Technical SEO audit, schema markup, and Core Web Vitals optimization",
        "Programmatic landing pages targeting high-intent tier-1 & tier-2 keywords",
        "Google Search, Performance Max & Meta ad campaign management",
        "Full-funnel conversion tracking with Google Tag Manager & Meta CAPI",
        "A/B testing of ad creatives, hooks, and landing page conversion paths",
        "Bi-weekly executive ROI reporting with transparent revenue attribution",
      ],
      tech: ["Google Ads", "Meta Business Suite", "SEMrush", "Google Tag Manager", "GA4", "PostHog"],
      pricing: "From ₹45,000/mo retainer + ad spend",
    },
    {
      id: "cloud-ops",
      icon: ShieldCheck,
      title: "Cloud Infrastructure & Security DevOps",
      badge: "Zero Downtime",
      tagline: "Resilient serverless and containerized cloud setups hosted in AWS Mumbai.",
      description: "We architect, monitor, and harden cloud infrastructure for scale. Deploy on AWS Mumbai (ap-south-1) for minimal network latency across India, backed by automated GitHub Actions CI/CD, database backups, and SOC-2 compliance practices.",
      deliverables: [
        "Cloud architecture design on AWS Mumbai or Google Cloud India",
        "Automated GitHub Actions CI/CD pipelines with preview environments",
        "Database clustering, automatic read-replicas, and point-in-time recovery",
        "DDoS protection, Web Application Firewall (WAF), and SSL certificate management",
        "Automated vulnerability scanning and security header compliance",
        "24/7 uptime monitoring with PagerDuty alerts",
      ],
      tech: ["AWS ap-south-1", "Docker", "GitHub Actions", "Cloudflare WAF", "PostgreSQL", "Redis"],
      pricing: "From ₹60,000/mo retainer",
    },
    {
      id: "tech-pods",
      icon: Headphones,
      title: "Dedicated Engineering Pods (CTO-as-a-Service)",
      badge: "Turnkey Retainer",
      tagline: "Your dedicated senior engineering team on a flexible monthly subscription.",
      description: "Avoid the 60-day recruitment headache and 3-month notice periods in Bengaluru. We provide pre-vetted senior pods comprising a Tech Lead, Full-Stack Engineers, AI Specialist, and QA. Zero recruiting fees, zero equity dilution.",
      deliverables: [
        "Dedicated full-stack engineering pod aligned with your IST working hours",
        "Direct communication on your Slack, Discord, or WhatsApp channels",
        "Weekly production release cycle with sprint demos every Friday",
        "Proactive code reviews, refactoring, and technical debt reduction",
        "Guaranteed 30-minute critical incident response SLA",
        "Flexible scaling: ramp pod size up or down with 30 days notice",
      ],
      tech: ["React / Next.js", "Node.js / Python", "AWS / Supabase", "Full Tech Stack"],
      pricing: "From ₹1.4L/mo per senior engineer equivalent",
    },
  ];

  const faqs = [
    {
      q: "Why should an Indian startup or enterprise choose Ethixweb over a local development agency?",
      a: "Traditional agencies in India often assign junior developers with high turnover, resulting in bloated codebases and poor mobile performance. Ethixweb pairs Silicon Valley software engineering practices (clean TypeScript, sub-second speeds, automated testing) with deep local expertise in Indian payment gateways, WhatsApp automation, and AWS Mumbai hosting.",
    },
    {
      q: "Can you integrate our existing CRM like Zoho, LeadSquared, or HubSpot?",
      a: "Yes. All our AI WhatsApp agents and web applications come with bidirectional CRM connectors. Leads captured via WhatsApp or website forms are instantly validated, enriched, and pushed into your CRM with zero manual data entry.",
    },
    {
      q: "Do you provide GST-compliant invoices and formal service agreements?",
      a: "Absolutely. We are registered to do business in India and provide complete GST tax invoices with input tax credit (ITC) eligibility. All projects include an NDA, clear milestone definitions, and 100% intellectual property transfer upon final delivery.",
    },
    {
      q: "How fast can an engineering pod kickoff a new project?",
      a: "For scoped projects, our technical blueprint is completed within 48 to 72 hours, and sprint execution begins immediately. For dedicated pods, we can onboard and start shipping code within 5 business days.",
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#E30613]/15 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E30613]/40 bg-[#160E12] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FF2B38]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full Service Engineering Catalog</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Digital Capabilities Built For <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E30613] via-[#FF2B38] to-[#FF9933]">
              India&apos;s Fastest-Growing Businesses
            </span>.
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            From single MVP sprints to dedicated multi-engineer pods &mdash; we provide the exact technical muscle needed to build, scale, and maintain high-concurrency systems.
          </p>

          <div className="pt-3 flex flex-wrap justify-center gap-3 text-xs text-gray-400">
            <span className="bg-[#121520] border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Sub-Second Latency on Jio/Airtel</span>
            </span>
            <span className="bg-[#121520] border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
              <span>Transparent INR Pricing &amp; GST Invoices</span>
            </span>
            <span className="bg-[#121520] border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>Dedicated IST Timezone Support</span>
            </span>
          </div>
        </div>
      </section>

      {/* Services Grid with Deep Dives */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {serviceCategories.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                id={svc.id}
                className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 hover:border-[#E30613]/40 transition-all relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Overview */}
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#E30613]/20 border border-[#E30613]/40 flex items-center justify-center text-[#E30613]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-[#FF9933] bg-[#FF9933]/10 border border-[#FF9933]/25 px-2.5 py-0.5 rounded-full mb-0.5">
                          {svc.badge}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                          {svc.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-gray-200">
                      {svc.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {svc.description}
                    </p>

                    {/* Deliverables checklist */}
                    <div className="pt-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                        Key Deliverables Included:
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300">
                        {svc.deliverables.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Badges */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {svc.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded bg-[#0A0D15] border border-white/5 text-[11px] font-mono text-gray-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Pricing & Quick Action */}
                  <div className="lg:col-span-5 bg-[#0A0C13] rounded-2xl border border-white/5 p-6 space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Investment Guidance (INR):
                      </p>
                      <p className="text-lg sm:text-xl font-bold text-emerald-400 mt-1">
                        {svc.pricing}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Fixed price or monthly sprints. GST input tax credit applicable.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#121622] border border-white/5 space-y-2 text-xs text-gray-300">
                      <p className="font-semibold text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#E30613]" />
                        Ethixweb Quality Guarantee
                      </p>
                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        Includes architecture review, code audit, full IP assignment, and 30-day post-launch warranty support.
                      </p>
                    </div>

                    <div className="space-y-2.5 pt-1">
                      <Link
                        href={`/contact?service=${encodeURIComponent(svc.title)}`}
                        className="btn-primary w-full py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
                      >
                        <span>Request Custom Blueprint</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <a
                        href={`https://wa.me/919871234567?text=Hi%20Ethixweb%20India%20team,%20I'd%20like%20to%20inquire%20about%20${encodeURIComponent(svc.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Quick WhatsApp Inquiry</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Enterprise FAQs */}
      <section className="py-20 bg-[#07090F] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF9933] bg-[#FF9933]/10 px-3 py-1 rounded-full border border-[#FF9933]/20 mb-3">
              <HelpCircle className="w-3.5 h-3.5" /> Frequent Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Everything You Need To Know.
            </h2>
            <p className="text-sm text-gray-400 mt-2">
              Common questions from Indian founders, CTOs, and marketing leaders.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="glass-panel p-6 rounded-2xl border border-white/10 space-y-2.5"
              >
                <h3 className="text-base font-bold text-white flex items-start gap-2.5">
                  <span className="text-[#E30613] font-mono">Q.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Start Your Service Engagement
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Tell us your requirements and receive a comprehensive technical proposal.
            </p>
          </div>
          <LeadForm source="Services Page Inquiry" />
        </div>
      </section>
    </div>
  );
}
