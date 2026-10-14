"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  Loader2, 
  KeyRound,
  ArrowLeft,
  Flame,
  Eye,
  EyeOff,
  CheckCircle2
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [autofilled, setAutofilled] = useState(false);

  const handleAutofillDemo = () => {
    setEmail("admin@ethixweb.com");
    setPassword("EthixAdmin2026!");
    setErrorMessage(null);
    setAutofilled(true);
    setTimeout(() => setAutofilled(false), 2500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // 1. Try Client Firebase Auth if available
      let firebaseIdToken: string | undefined = undefined;
      if (isFirebaseConfigured() && auth) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          firebaseIdToken = await userCredential.user.getIdToken();
        } catch (firebaseErr: unknown) {
          console.warn("Client Firebase Auth note:", firebaseErr);
        }
      }

      // 2. Authenticate through API route to establish secure HTTP-only session cookie
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firebaseIdToken,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Authentication failed. Please verify credentials.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Login failed. Please check credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden bg-[#07080B] text-white">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-[#E30613]/10 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none" />

      {/* Top Header Navigation */}
      <div className="w-full max-w-[420px] mb-5 flex items-center justify-between z-10 text-xs">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors py-1.5 px-2 -ml-2 rounded-lg hover:bg-white/5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to site</span>
        </Link>

        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Firebase Online</span>
        </span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-[420px] relative z-10">
        <div className="bg-[#0D0F16]/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80 rounded-3xl p-6 sm:p-8 space-y-6">
          
          {/* Simple, Minimalist Admin Logo */}
          <div className="flex flex-col items-center text-center space-y-2.5">
            <Link href="/" className="group flex items-center gap-2.5 transition-transform hover:scale-105">
              {/* Minimal Red Hexagon/Cube Mark */}
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E30613] to-[#99000A] flex items-center justify-center font-black text-xl text-white shadow-lg shadow-[#E30613]/30 ring-1 ring-white/20">
                E
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-black tracking-tight text-white uppercase">
                  ETHIX<span className="text-[#E30613]">WEB</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
                  ADMIN
                </span>
              </div>
            </Link>
            <p className="text-xs text-gray-400">
              Sign in to manage leads &amp; client inquiries
            </p>
          </div>

          {/* 1-Click Demo Reviewer Credentials */}
          <div className="p-3.5 rounded-2xl bg-[#141724] border border-[#FF9933]/30 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#FF9933] flex items-center gap-1.5 text-[11px]">
                <KeyRound className="w-3.5 h-3.5" />
                Demo Credentials
              </span>
              <button
                type="button"
                onClick={handleAutofillDemo}
                className="px-2.5 py-1 rounded-lg bg-[#FF9933]/20 hover:bg-[#FF9933]/30 text-[#FF9933] font-bold text-[10px] transition-colors cursor-pointer flex items-center gap-1"
              >
                {autofilled ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Filled!</span>
                  </>
                ) : (
                  <span>Auto Fill</span>
                )}
              </button>
            </div>
            <div className="text-[11px] font-mono text-gray-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-2">
              <span className="truncate">admin@ethixweb.com</span>
              <span className="text-gray-400">EthixAdmin2026!</span>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/50 flex items-start gap-2.5 text-xs text-red-200 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ethixweb.com"
                  className="w-full rounded-xl bg-[#080A10] border border-white/10 pl-10 pr-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl bg-[#080A10] border border-white/10 pl-10 pr-10 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/20 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-0.5 cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer shadow-lg shadow-[#E30613]/25 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="pt-2 border-t border-white/5 text-center">
            <p className="text-[11px] text-gray-400">
              Authenticated via HTTP-only cookie &amp; Firebase Auth
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
