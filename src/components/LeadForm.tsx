"use client";

import { useState, useEffect } from "react";
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  PhoneCall, 
  Building2, 
  Mail, 
  User, 
  Clock, 
  IndianRupee,
  Layers,
  MapPin
} from "lucide-react";

interface LeadFormProps {
  source?: string;
  defaultService?: string;
  className?: string;
}

export default function LeadForm({ 
  source = "Website - Inquiry Form", 
  defaultService = "AI & WhatsApp (Receptionist / CSR)", 
  className = "" 
}: LeadFormProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [serviceCategory, setServiceCategory] = useState(defaultService);
  const [budgetRangeINR, setBudgetRangeINR] = useState("₹5L - ₹15L");
  const [timeline, setTimeline] = useState("1 Month");
  const [city, setCity] = useState("Bengaluru");
  const [projectDetails, setProjectDetails] = useState("");
  
  // Anti-spam honeypot & render time
  const [honeypot, setHoneypot] = useState("");
  const [renderTime, setRenderTime] = useState(0);

  // Submission UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedLeadId, setSubmittedLeadId] = useState<string | null>(null);

  useEffect(() => {
    setRenderTime(Date.now());
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const s = params.get("service");
        const ind = params.get("industry");
        if (s) {
          const matched = serviceOptions.find(opt => opt.toLowerCase().includes(s.toLowerCase()));
          if (matched) setServiceCategory(matched);
        }
        if (ind) {
          setProjectDetails(prev => prev || `Inquiry regarding high-growth tech solutions for the ${ind} industry.`);
        }
        if (window.location.hash === "#inquiry-form" || window.location.hash === "#contact-form" || window.location.hash === "#inquiry-section") {
          setTimeout(() => {
            const el = document.getElementById("inquiry-form") || document.getElementById("contact-form");
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }, 150);
        }
      } catch {
        // Fallback gracefully
      }
    }
  }, []);

  useEffect(() => {
    if (defaultService) {
      setServiceCategory(defaultService);
    }
  }, [defaultService]);

  // 22 Capabilities grouped from ethixweb.com
  const serviceOptions = [
    "AI & WhatsApp (Receptionist / CSR)",
    "Website (Redesign / Headless / Next.js)",
    "Growth (SEO & Google / Meta Ads)",
    "Data & Live Executive Dashboards",
    "CRM Integration (Zoho / HubSpot / LeadSquared)",
    "Accessibility & WCAG Compliance",
    "24/7 Dedicated Support & Engineering Pod",
  ];

  const budgetOptions = [
    { label: "₹2L - ₹5L", desc: "Starter / MVP" },
    { label: "₹5L - ₹15L", desc: "Growth Phase" },
    { label: "₹15L - ₹30L", desc: "Scale & Enterprise" },
    { label: "₹30L+", desc: "Custom Platform Pod" },
  ];

  const timelineOptions = [
    "< 2 Weeks (Urgent)",
    "1 Month",
    "2-3 Months",
    "Flexible / Exploring",
  ];

  const cityOptions = [
    "Bengaluru",
    "Mumbai",
    "Delhi-NCR",
    "Hyderabad",
    "Pune",
    "Chennai",
    "Ahmedabad",
    "Kolkata",
    "Other Indian City / Global",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const payload = {
        fullName,
        email,
        phone,
        companyName,
        serviceCategory,
        budgetRangeINR,
        timeline,
        city,
        projectDetails,
        company_website_url: honeypot, // Honeypot field
        formRenderTime: renderTime,
        source,
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit inquiry. Please try again.");
      }

      setSubmittedLeadId(data.data?.leadId || "SUBMITTED");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again or contact us directly.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFullName("");
    setEmail("");
    setPhone("");
    setCompanyName("");
    setProjectDetails("");
    setSubmittedLeadId(null);
    setErrorMessage(null);
    setRenderTime(Date.now());
  };

  if (submittedLeadId) {
    return (
      <div className={`glass-panel p-8 md:p-10 rounded-2xl border border-emerald-500/30 text-center relative overflow-hidden ${className}`}>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-[#E30613] to-[#FF9933]" />
        
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Inquiry Successfully Logged
        </span>

        <h3 className="text-2xl font-bold text-white mb-2">
          Dhanyavaad, {fullName.split(" ")[0] || "Partner"}!
        </h3>

        <p className="text-sm text-gray-300 max-w-md mx-auto mb-4">
          Your project blueprint request has been saved to our engineering queue with Reference ID:
        </p>

        <div className="inline-block px-4 py-2 bg-[#090B10] border border-white/10 rounded-xl text-xs font-mono text-gray-300 mb-6">
          <span className="text-gray-500">REF:</span> <strong className="text-white">{submittedLeadId}</strong>
        </div>

        <div className="bg-[#101420] border border-white/5 rounded-xl p-4 text-xs text-left max-w-md mx-auto space-y-2 mb-6 text-gray-300">
          <p className="flex items-center justify-between">
            <span className="text-gray-400">Selected Capability:</span>
            <strong className="text-white">{serviceCategory}</strong>
          </p>
          <p className="flex items-center justify-between">
            <span className="text-gray-400">Target Budget:</span>
            <strong className="text-emerald-400">{budgetRangeINR}</strong>
          </p>
          <p className="flex items-center justify-between">
            <span className="text-gray-400">Est. Response Time:</span>
            <strong className="text-[#FF9933]">Under 4 Business Hours (IST)</strong>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-2.5 text-xs font-semibold text-white hover:bg-white/20 transition-all"
          >
            Submit another brief
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="inquiry-form"
      onSubmit={handleSubmit}
      className={`glass-panel p-6 sm:p-8 md:p-10 rounded-2xl relative shadow-2xl shadow-black/80 ${className}`}
    >
      {/* Top accent badge */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#FF9933] bg-[#FF9933]/10 px-2.5 py-0.5 rounded-full border border-[#FF9933]/20">
            <Sparkles className="w-3 h-3" />
            Project Scope &amp; Discovery
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Build With Ethixweb
          </h3>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-[11px] text-gray-400">Response SLA</p>
          <p className="text-xs font-semibold text-emerald-400">&lt; 4 Hours (IST)</p>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-500/50 flex items-start gap-3 text-red-200 text-xs animate-shake">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Honeypot trap: hidden from humans, catches bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website_url">Company Website Url (Leave Empty)</label>
        <input
          id="company_website_url"
          name="company_website_url"
          type="text"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="space-y-5">
        {/* Row 1: Name & Business Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-gray-400" />
              <span>Full Name *</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Aditya Verma"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl bg-[#0B0D13] border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-gray-400" />
              <span>Work Email *</span>
            </label>
            <input
              type="email"
              required
              placeholder="e.g. aditya@company.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl bg-[#0B0D13] border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613] outline-none transition-all"
            />
          </div>
        </div>

        {/* Row 2: Phone & Company */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-gray-400" />
              <span>Phone Number *</span>
            </label>
            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl bg-[#0B0D13] border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-gray-400" />
              <span>Company / Startup Name</span>
            </label>
            <input
              type="text"
              placeholder="e.g. FinSpur Technologies"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full rounded-xl bg-[#0B0D13] border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613] outline-none transition-all"
            />
          </div>
        </div>

        {/* Row 3: Service Selection & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-gray-400" />
              <span>Core Capability Needed *</span>
            </label>
            <select
              value={serviceCategory}
              onChange={(e) => setServiceCategory(e.target.value)}
              className="w-full rounded-xl bg-[#0B0D13] border border-white/10 px-3.5 py-2.5 text-sm text-white focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613] outline-none transition-all cursor-pointer"
            >
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-[#121520] text-white">
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gray-400" />
              <span>Location / City</span>
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full rounded-xl bg-[#0B0D13] border border-white/10 px-3.5 py-2.5 text-sm text-white focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613] outline-none transition-all cursor-pointer"
            >
              {cityOptions.map((c) => (
                <option key={c} value={c} className="bg-[#121520] text-white">
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Budget Selector in INR */}
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-2 flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
            <span>Target Investment Bracket (INR)</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {budgetOptions.map((b) => {
              const isSelected = budgetRangeINR === b.label;
              return (
                <button
                  type="button"
                  key={b.label}
                  onClick={() => setBudgetRangeINR(b.label)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? "border-[#E30613] bg-[#E30613]/15 text-white ring-1 ring-[#E30613]"
                      : "border-white/10 bg-[#0B0D13] text-gray-300 hover:border-white/20 hover:bg-[#121520]"
                  }`}
                >
                  <div className="text-xs font-bold">{b.label}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{b.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Timeline */}
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1.5 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            <span>Launch Timeline</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {timelineOptions.map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setTimeline(t)}
                className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                  timeline === t
                    ? "border-[#FF9933] bg-[#FF9933]/15 text-[#FF9933]"
                    : "border-white/10 bg-[#0B0D13] text-gray-400 hover:border-white/20"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Project Details */}
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1.5">
            Brief Project Scope &amp; Goals *
          </label>
          <textarea
            required
            rows={3}
            placeholder="Tell us what you're building, key challenges, current bottlenecks, or integrations (e.g. WhatsApp, Razorpay, Zoho, CRM)..."
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
            className="w-full rounded-xl bg-[#0B0D13] border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613] outline-none transition-all resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full py-3.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Encrypting &amp; Routing to Senior Engineering Desk...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Project Brief (Get Technical Proposal)</span>
              </>
            )}
          </button>
          
          <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400 px-1">
            <span>🔒 Protected by honeypot &amp; IP rate-limit</span>
            <span>Non-disclosure guaranteed (Mutual NDA)</span>
          </div>
        </div>
      </div>
    </form>
  );
}
