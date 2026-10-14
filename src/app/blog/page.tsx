import Link from "next/link";
import { Sparkles, ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";

export const metadata = {
  title: "Engineering & Growth Blog | Ethixweb India",
  description: "Insights on Next.js performance, WhatsApp AI automations, ONDC commerce, and digital engineering for fast-growing Indian businesses.",
};

export default function BlogPage() {
  const articles = [
    {
      title: "Why Indian D2C Brands Are Moving to Headless Next.js & 1-Click UPI",
      desc: "How shaving 2.5 seconds off mobile load times on Jio & Airtel networks boosted conversion rates by 42% for Indian retail founders.",
      date: "October 2026",
      readTime: "5 min read",
      category: "E-Commerce & Tech",
    },
    {
      title: "Meta WhatsApp Cloud API vs SMS: Eliminating Customer Service Lag",
      desc: "A technical breakdown of building automated Hinglish conversational booking flows integrated directly into Zoho and HubSpot.",
      date: "October 2026",
      readTime: "7 min read",
      category: "AI & Automation",
    },
    {
      title: "The Zero-Bloat Engineering Protocol: Reaching 95+ PageSpeed",
      desc: "Why traditional WordPress agency stacks fail Core Web Vitals and how modern React server components deliver instant rendering.",
      date: "September 2026",
      readTime: "6 min read",
      category: "Web Engineering",
    },
    {
      title: "Hiring in Bengaluru vs Dedicated Engineering Pods: The Real Math",
      desc: "Analyzing recruitment costs, notice periods, equity dilution, and overhead when scaling full-stack engineering teams in India.",
      date: "September 2026",
      readTime: "8 min read",
      category: "Operations & Scaling",
    },
  ];

  return (
    <div className="pt-24 sm:pt-28 pb-20">
      <section className="relative py-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#E30613]/12 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E30613]/40 bg-[#160E12] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FF2B38]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineering &amp; Growth Insights</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            The Ethixweb <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E30613] via-[#FF2B38] to-[#FF9933]">
              Engineering Dispatch.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Practical insights on full-stack architecture, AI automation, and digital operations for businesses that prioritize speed and revenue.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((art, idx) => (
              <article
                key={idx}
                className="glass-panel rounded-3xl p-7 border border-white/10 hover:border-[#E30613]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                    <span className="font-mono text-[#FF9933]">{art.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-2 hover:text-[#E30613] transition-colors">
                    {art.title}
                  </h2>

                  <p className="text-xs text-gray-300 leading-relaxed mb-6">
                    {art.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-mono text-[11px]">{art.date}</span>
                  <Link
                    href="/contact"
                    className="font-bold text-[#E30613] hover:text-white flex items-center gap-1"
                  >
                    <span>Discuss this topic</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
