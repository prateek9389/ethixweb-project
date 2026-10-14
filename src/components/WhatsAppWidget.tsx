"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { MessageSquare, X, Send, Sparkles, CheckCheck } from "lucide-react";

export default function WhatsAppWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [customText, setCustomText] = useState("");

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const quickPrompts = [
    "Need AI WhatsApp agent for our customer support",
    "Looking for high-speed Next.js web application",
    "Want to discuss Razorpay & UPI checkout flow",
    "Need custom monthly engineering pod for startup",
  ];

  const handleSend = (textToSend?: string) => {
    const message = textToSend || customText || "Hi Ethixweb India team! I'd like to talk about a project.";
    const url = `https://wa.me/919871234567?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setIsOpen(false);
    setCustomText("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Card Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl bg-[#0D1017] border border-emerald-500/30 shadow-2xl shadow-black/90 p-4 text-white animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-bold text-emerald-400 text-xs">
                  EW
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-[#0D1017] animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-bold text-white flex items-center gap-1">
                  Ethixweb India Desk
                  <Sparkles className="w-3 h-3 text-[#FF9933]" />
                </p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  Online · Avg. reply in &lt; 5 mins
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Bubble simulation */}
          <div className="py-3.5 space-y-2">
            <div className="bg-[#151924] rounded-2xl rounded-tl-sm p-3 text-xs text-gray-200 border border-white/5">
              <p className="text-gray-300">
                Namaste! Welcome to Ethixweb India. What digital or AI system are you planning to build?
              </p>
              <span className="text-[9px] text-gray-500 flex items-center justify-end gap-1 mt-1">
                9:30 AM <CheckCheck className="w-3 h-3 text-emerald-400" />
              </span>
            </div>

            {/* Quick Prompt Pills */}
            <div className="space-y-1.5 pt-1">
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                Quick Topics:
              </p>
              <div className="flex flex-col gap-1.5">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="text-left text-xs bg-[#121622] hover:bg-[#1a2030] hover:border-emerald-500/40 text-gray-300 hover:text-white p-2 rounded-xl border border-white/5 transition-all"
                  >
                    👉 {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Input field */}
          <div className="pt-2 flex items-center gap-2 border-t border-white/10">
            <input
              type="text"
              placeholder="Type your message..."
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-[#151924] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 outline-none focus:border-emerald-500/50"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-md shadow-emerald-900/50"
              title="Open WhatsApp chat"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-3 text-xs font-bold text-white shadow-xl shadow-emerald-950/60 transition-all hover:scale-105 hover:from-emerald-500 hover:to-emerald-400 focus:outline-none"
        aria-label="Chat on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-100" />
        </span>
        <MessageSquare className="w-4 h-4" />
        <span className="hidden sm:inline">WhatsApp India Desk</span>
      </button>
    </div>
  );
}
