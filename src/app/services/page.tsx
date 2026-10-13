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
  PhoneCall,
  Activity,
  CheckCircle2,
  TrendingUp,
  Eye,
  SlidersHorizontal
} from "lucide-react";
import LeadForm from "@/components/LeadForm";

export const metadata = {
  title: "22 Engineering Services Across 6 Categories | Ethixweb India",
  description: "Explore Ethixweb's full service catalog: Website, AI, Growth, Data, Accessibility, and Support &mdash; run by one dedicated senior team for Indian businesses.",
};

export default function ServicesPage() {
  const serviceCategories = [
    {
      id: "website",
      icon: Cpu,
      title: "Website",
      count: "04 Services",
      tagline: "A modern site and headless foundations built around how your business sells.",
      description: "We build websites that don't just look good &mdash; they are engineered to turn Indian mobile traffic into booked customers. Hand-crafted in Next.js, TypeScript, and Tailwind with guaranteed sub-1.2s LCP on Jio and Airtel 4G/5G.",
      services: [
        {
          name: "Website Redesign",
          summary: "A modern site built around how your business sells.",
          deliverables: "Positioning overhaul, conversion-first UX, mobile-first design, SEO foundations, fast Next.js build.",
        },
        {
          name: "Headless Architecture",
          summary: "Faster, more flexible foundation for future growth.",
          deliverables: "Decoupled frontend, microservices, instant page transitions, API-first CMS.",
        },
        {
          name: "Landing Pages",
          summary: "Purpose-built pages that convert campaign traffic.",
          deliverables: "Campaign-specific hooks, A/B variant testing, 1-click WhatsApp & call triggers.",
        },
        {
          name: "Maintenance & Security",
          summary: "Updates, monitoring, and patching after launch.",
          deliverables: "99.98% uptime monitoring, dependency patching, automated daily cloud backups.",
        },
      ],
      tech: ["Next.js 16", "TypeScript", "Tailwind CSS", "Vercel", "AWS ap-south-1"],
      pricing: "From ₹1.8L for landing pages to ₹6.5L+ for full enterprise redesign",
    },
    {
      id: "ai",
      icon: Bot,
      title: "AI & WhatsApp",
      count: "04 Services",
      tagline: "Chatbots and AI receptionists that qualify and route leads around the clock.",
      description: "Indian business runs on WhatsApp. We engineer conversational AI agents powered by the Meta Cloud API that speak English, Hindi, and regional vernaculars. Our agents qualify inquiries, answer complex questions, and sync bookings into your CRM.",
      services: [
        {
          name: "Knowledge Chatbot",
          summary: "Fast answers from a fixed script or FAQ library.",
          deliverables: "Deterministic decision trees, immediate responses, zero hallucination risk.",
        },
        {
          name: "LLM Chatbot",
          summary: "Reasons over your real knowledge base, in your brand voice.",
          deliverables: "RAG vector pipeline, multi-turn reasoning, custom system prompts, multilingual NLP.",
        },
        {
          name: "AI Receptionist / CSR",
          summary: "Handles inquiries and requests around the clock on WhatsApp.",
          deliverables: "24/7 lead qualification, automated booking flow, calendar invites via WhatsApp.",
        },
        {
          name: "Human Handoff",
          summary: "A real person steps in when it actually matters.",
          deliverables: "Seamless transfer to your sales or support reps with complete conversation history.",
        },
      ],
      tech: ["WhatsApp Cloud API", "OpenAI / Claude", "Pinecone", "Zoho CRM", "HubSpot", "Redis"],
      pricing: "From ₹1.5L one-time setup + ₹35,000/mo management",
    },
    {
      id: "growth",
      icon: TrendingUp,
      title: "Growth & Ads",
      count: "06 Services",
      tagline: "SEO, Google & Meta ads, social, and email working as one coordinated engine.",
      description: "Stop wasting budgets on fragmented agencies. We connect search, paid social, automated follow-ups, and CRM pipelines so every rupee spent is tracked to actual bookings and customer revenue.",
      services: [
        {
          name: "SEO",
          summary: "Technical fixes, content, and authority over time.",
          deliverables: "Core Web Vitals tuning, programmatic landing pages, local Map Pack dominance.",
        },
        {
          name: "Google Ads + LSA",
          summary: "Campaigns built, tracked, and optimized weekly.",
          deliverables: "High-intent search campaigns, negative keyword pruning, conversion API integration.",
        },
        {
          name: "Meta Ads",
          summary: "Facebook and Instagram, targeted and retargeted.",
          deliverables: "Custom audiences, creative testing, dynamic retargeting for Indian buyers.",
        },
        {
          name: "Social + Reels",
          summary: "Strategy, content calendar, and creative production.",
          deliverables: "High-converting short-form reels, founder personal branding, brand storytelling.",
        },
        {
          name: "Email Marketing",
          summary: "Campaigns, automation, and segmentation that convert.",
          deliverables: "Lifecycle welcome flows, cart abandonment triggers, promotional broadcasts.",
        },
        {
          name: "CRM Integration",
          summary: "Leads flow straight into the system you already use.",
          deliverables: "Two-way data sync with Zoho, HubSpot, LeadSquared, or custom PostgreSQL/Firebase.",
        },
      ],
      tech: ["Google Search", "Meta Ads", "Google Tag Manager", "PostHog", "Zoho CRM", "Klaviyo"],
      pricing: "From ₹45,000/mo retainer + ad spend",
    },
    {
      id: "data",
      icon: BarChart3,
      title: "Data & Analytics",
      count: "03 Services",
      tagline: "Every channel's performance in one live executive view.",
      description: "No more messy spreadsheets or conflicting metrics. We build unified executive dashboards that reveal exactly where your leads originate, what they cost, and which channels generate profitable revenue.",
      services: [
        {
          name: "Live Dashboard",
          summary: "Every channel's performance in one live view.",
          deliverables: "Real-time pipeline metrics, lead response times, conversion funnel visualization.",
        },
        {
          name: "Full-Funnel Analytics",
          summary: "Website, ads, and lead tracking fully connected.",
          deliverables: "Server-side tracking (Meta CAPI / Google Ads Enhanced Conversions), UTM hygiene.",
        },
        {
          name: "Monthly Reporting",
          summary: "What happened, why, and what to do next.",
          deliverables: "Executive video walkthrough, CAC & ROAS breakdowns, actionable next sprints.",
        },
      ],
      tech: ["Google Analytics 4", "PostHog", "Looker Studio", "Meta CAPI", "BigQuery"],
      pricing: "From ₹30,000/mo retainer",
    },
    {
      id: "accessibility",
      icon: ShieldCheck,
      title: "Accessibility",
      count: "02 Services",
      tagline: "Contrast, navigation, and structure that includes everyone.",
      description: "Make your digital products usable by every customer while safeguarding your enterprise against compliance issues. We audit, remediate, and verify against WCAG 2.1 AA standards.",
      services: [
        {
          name: "Accessibility Improvements",
          summary: "Contrast, keyboard navigation, and semantic structure.",
          deliverables: "ARIA markup, focus states, screen-reader optimizations, color contrast remediation.",
        },
        {
          name: "Accessibility Testing",
          summary: "Reviewed against recognized international standards.",
          deliverables: "Automated Axe audits, manual assistive technology testing, formal compliance report.",
        },
      ],
      tech: ["WCAG 2.1 AA", "Axe Core", "Screen Readers (NVDA/VoiceOver)", "Semantic HTML5"],
      pricing: "From ₹65,000 per audit and remediation sprint",
    },
    {
      id: "support",
      icon: Headphones,
      title: "24/7 Support & Maintenance",
      count: "03 Services",
      tagline: "A real team reachable when something breaks or needs attention.",
      description: "When servers crash or APIs update, you need senior engineers who answer immediately. We monitor uptime, resolve bugs under SLA, and keep all your third-party integrations in sync.",
      services: [
        {
          name: "Technical Support",
          summary: "A real team reachable when something breaks.",
          deliverables: "Sub-30 minute emergency response SLA, direct Slack/WhatsApp channel access.",
        },
        {
          name: "AI + Content Updates",
          summary: "Your chatbot's knowledge kept current every month.",
          deliverables: "Prompt tuning, catalog synchronization, FAQ updates, knowledge base expansions.",
        },
        {
          name: "API Maintenance",
          summary: "Every integration monitored and kept in sync.",
          deliverables: "Continuous monitoring for Razorpay, WhatsApp Cloud API, Shiprocket, and CRM webhooks.",
        },
      ],
      tech: ["PagerDuty", "GitHub Actions", "Docker", "Sentry", "AWS CloudWatch"],
      pricing: "From ₹50,000/mo ongoing retainer",
    },
  ];

  const operatingRhythm = [
    {
      step: "Step 01",
      title: "Audit",
      desc: "We tear down your current site, ads, and tracking, and show you exactly where leads leak.",
    },
    {
      step: "Step 02",
      title: "Plan",
      desc: "A prioritized roadmap with expected impact per item &mdash; you approve what we build, and why.",
    },
    {
      step: "Step 03",
      title: "Build",
      desc: "Senior hands ship the site, campaigns, and integrations in weeks, not quarters.",
    },
    {
      step: "Step 04",
      title: "Optimize",
      desc: "Weekly iteration on real data: calls, bookings, and revenue &mdash; not vanity dashboards.",
    },
  ];

  const faqs = [
    {
      q: "Can you manage our existing tools (Zoho, Razorpay, Shiprocket, ServiceTitan)?",
      a: "Yes. We don't force you to rip and replace. We connect your existing CRM, payment gateways, and logistics providers into one cohesive automated pipeline.",
    },
    {
      q: "Why do you emphasize 'No Account Managers'?",
      a: "Because account managers slow everything down and miscommunicate technical specs. At Ethixweb, you collaborate directly with the senior engineer and technical director writing your code and managing your stack.",
    },
    {
      q: "How does billing work for Indian clients?",
      a: "All projects are invoiced in INR (₹) with full GST tax invoices. We offer fixed milestone pricing for scoped builds, and transparent monthly sprint retainers for ongoing pods.",
    },
    {
      q: "How fast can you launch our project?",
      a: "Our typical launch window is 2 to 4 weeks. We ship working software and landing pages early, then continuously iterate based on real customer data.",
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      {/* Header */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E30613]/15 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E30613]/40 bg-[#160E12] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FF2B38]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Full Service Catalog</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            22 Capabilities Across 6 Categories. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E30613] via-[#FF2B38] to-[#FF9933]">
              Run By One Senior Team.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Stop stitching together five disconnected vendors. Websites, AI, ads, SEO, data, and support &mdash; handled by a senior team that actually answers the phone.
          </p>

          <div className="pt-3 flex flex-wrap justify-center gap-3 text-xs text-gray-400">
            <span className="bg-[#121520] border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>2-4 Weeks Launch Time</span>
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

      {/* 4-Beat Operating Rhythm */}
      <section className="py-12 bg-[#090C12] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF9933]">Operating Cadence</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">How An Engagement Runs</h2>
            <p className="text-xs text-gray-400 mt-1">
              Every service plugs into the same four-beat rhythm, so you always know what happens next.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {operatingRhythm.map((r, i) => (
              <div key={i} className="p-5 rounded-2xl glass-panel border border-white/5">
                <span className="text-xs font-mono text-[#E30613] font-bold">{r.step}</span>
                <h3 className="text-base font-bold text-white mt-1 mb-2">{r.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed 6 Categories & 22 Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
          {serviceCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                id={cat.id}
                className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 hover:border-[#E30613]/40 transition-all relative overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Category Overview & Sub-Services */}
                  <div className="lg:col-span-8 space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#E30613]/20 border border-[#E30613]/40 flex items-center justify-center text-[#E30613]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF9933] bg-[#FF9933]/10 border border-[#FF9933]/25 px-2 py-0.5 rounded-full">
                          {cat.count}
                        </span>
                        <h2 className="text-2xl font-bold text-white mt-0.5">
                          {cat.title}
                        </h2>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-gray-200">
                      {cat.tagline}
                    </p>

                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Sub-services breakdown */}
                    <div className="pt-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                        Included Services &amp; Scope:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {cat.services.map((sub, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-[#090C12] border border-white/5 space-y-1">
                            <p className="text-xs font-bold text-white flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{sub.name}</span>
                            </p>
                            <p className="text-[11px] text-gray-400 leading-tight">
                              {sub.summary}
                            </p>
                            <p className="text-[10px] text-gray-500 pt-0.5">
                              Deliverables: {sub.deliverables}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tech Badges */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {cat.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded bg-[#0A0D15] border border-white/5 text-[11px] font-mono text-gray-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Pricing & Call to Action */}
                  <div className="lg:col-span-4 bg-[#0A0C13] rounded-2xl border border-white/5 p-6 space-y-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Typical Investment (INR):
                      </p>
                      <p className="text-base sm:text-lg font-bold text-emerald-400 mt-1">
                        {cat.pricing}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1">
                        Fixed milestone scope or monthly sprints with full GST ITC credit.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#121622] border border-white/5 space-y-1.5 text-xs text-gray-300">
                      <p className="font-semibold text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#E30613]" />
                        Ethixweb Standard
                      </p>
                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        Senior engineers only. No trainees learning on your budget. Weekly release cadences.
                      </p>
                    </div>

                    <div className="space-y-2 pt-1">
                      <Link
                        href={`/contact?service=${encodeURIComponent(cat.title)}`}
                        className="btn-primary w-full py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2"
                      >
                        <span>Start A Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <a
                        href={`https://wa.me/919871234567?text=Hi%20Ethixweb%20India%20team,%20I'd%20like%20to%20discuss%20${encodeURIComponent(cat.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>WhatsApp Quick Consult</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-[#07090F] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF9933] bg-[#FF9933]/10 px-3 py-1 rounded-full border border-[#FF9933]/20 mb-3">
              <HelpCircle className="w-3.5 h-3.5" /> Before You Ask
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              One Team For Your Whole Growth System.
            </h2>
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

      {/* Inquiry Form */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Map Out Your System
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Tell us what growth looks like for you &mdash; we will map the system that gets you there.
            </p>
          </div>
          <LeadForm source="Services Page - Full Catalog" />
        </div>
      </section>
    </div>
  );
}
