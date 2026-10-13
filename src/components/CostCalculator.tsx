"use client";

import { useState } from "react";
import { 
  IndianRupee, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function CostCalculator() {
  const [teamSize, setTeamSize] = useState<number>(3); // 2 devs + 1 lead
  const [projectMonths, setProjectMonths] = useState<number>(6);

  // In Bengaluru/Gurugram/Mumbai:
  // Avg full-stack dev CTC: ₹18-24 LPA, Senior/Lead: ₹30-40 LPA, Benefits + Hardware + Recruitment (15%):
  // Avg monthly internal cost per engineer ~= ₹2,20,000 INR
  const inHouseMonthlyPerPerson = 220000;
  const inHouseTotal = teamSize * inHouseMonthlyPerPerson * projectMonths;

  // Ethixweb High-Velocity Pod (Full-stack engineers, AI architect, DevOps, QA, PM):
  // Flat monthly sprint rate per pod equivalent: starts around ₹1,40,000 per engineer equivalent with zero recruiting cost
  const ethixwebMonthlyPerPerson = 135000;
  const ethixwebTotal = teamSize * ethixwebMonthlyPerPerson * projectMonths;

  const totalSavings = inHouseTotal - ethixwebTotal;
  const savingsPercent = Math.round((totalSavings / inHouseTotal) * 100);

  const formatLakhs = (amount: number) => {
    const inLakhs = amount / 100000;
    return `₹${inLakhs.toFixed(1)} Lakhs`;
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-white/10 relative overflow-hidden" id="cost-calculator">
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#E30613]/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-3xl mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E30613]/15 border border-[#E30613]/30 text-[#FF2B38] text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive India ROI Model
        </span>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
          In-House Hiring vs. Ethixweb Dedicated Pod
        </h3>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed">
          See the cost and timeline advantage of partnering with our senior engineering pod compared to local tech recruiting in Bengaluru, Gurugram, or Mumbai.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Controls */}
        <div className="lg:col-span-6 space-y-6">
          {/* Slider 1: Team Size */}
          <div className="bg-[#0B0D13] p-4 rounded-2xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-300">Engineering Pod Size</span>
              <span className="text-[#FF9933] font-bold text-sm">{teamSize} Full-Stack Engineers</span>
            </div>
            <input
              type="range"
              min="1"
              max="8"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full accent-[#E30613] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>1 Engineer (MVP Pod)</span>
              <span>4 Engineers</span>
              <span>8 Engineers (Enterprise)</span>
            </div>
          </div>

          {/* Slider 2: Project Duration */}
          <div className="bg-[#0B0D13] p-4 rounded-2xl border border-white/5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-300">Project / Sprint Duration</span>
              <span className="text-[#FF9933] font-bold text-sm">{projectMonths} Months</span>
            </div>
            <input
              type="range"
              min="2"
              max="12"
              value={projectMonths}
              onChange={(e) => setProjectMonths(Number(e.target.value))}
              className="w-full accent-[#E30613] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>2 Months Sprint</span>
              <span>6 Months Product</span>
              <span>12 Months Retainer</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#121520] border border-white/5 text-gray-300">
              <p className="text-gray-400 text-[11px] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                Time to Kickoff
              </p>
              <p className="font-bold text-white mt-1">48 Hours vs 45 Days</p>
            </div>
            <div className="p-3 rounded-xl bg-[#121520] border border-white/5 text-gray-300">
              <p className="text-gray-400 text-[11px] flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Notice Period Risk
              </p>
              <p className="font-bold text-emerald-400 mt-1">0% (Zero Lock-in)</p>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-6 bg-gradient-to-b from-[#141724] to-[#0D0F17] rounded-2xl border border-[#E30613]/30 p-6 sm:p-8 relative shadow-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
              <span className="text-gray-400">Traditional In-House Hiring (Est.)</span>
              <span className="text-gray-300 font-mono line-through">{formatLakhs(inHouseTotal)}</span>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
              <span className="text-gray-300 font-medium">Ethixweb High-Velocity Pod</span>
              <span className="text-emerald-400 font-bold font-mono text-base">{formatLakhs(ethixwebTotal)}</span>
            </div>

            <div className="pt-2 pb-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Net Indian Enterprise Savings:
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-[#FF9933]">
                  {formatLakhs(totalSavings)}
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Save ~{savingsPercent}%
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Includes Senior Architects, DevOps, QA automation, SOC-2 grade code, and 90+ PageSpeed SLA.
              </p>
            </div>

            <Link
              href="/contact"
              className="btn-primary w-full py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 transition-all"
            >
              <IndianRupee className="w-3.5 h-3.5" />
              <span>Reserve Your Pod for Q1/Q2</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
