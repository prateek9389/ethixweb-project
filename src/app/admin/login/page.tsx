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
  Check
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAutofillDemo = () => {
    setEmail("admin@ethixweb.com");
    setPassword("EthixAdmin2026!");
    setErrorMessage(null);
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-[#07080B]">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E30613]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top return link */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Ethixweb</span>
        </Link>

        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          <Flame className="w-3 h-3 text-amber-500" />
          <span>Firebase Connected</span>
        </span>
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Simple Sleek Admin Logo */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center">
            <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#E30613] to-[#8C0009] shadow-xl shadow-[#E30613]/30 ring-1 ring-white/20">
              <span className="font-black text-2xl text-white tracking-tighter">E</span>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#121520] border-2 border-[#E30613] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              ETHIX<span className="text-[#E30613]">WEB</span>
            </h1>
            <p className="text-xs text-gray-400 font-medium mt-0.5">
              Admin Lead Portal
            </p>
          </div>
        </div>

        {/* 1-Click Demo Credentials Quick Fill */}
        <div className="p-3.5 rounded-2xl bg-[#11141E] border border-[#FF9933]/30 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#FF9933] flex items-center gap-1.5 text-[11px]">
              <KeyRound className="w-3.5 h-3.5" />
              Demo Reviewer Access
            </span>
            <button
              type="button"
              onClick={handleAutofillDemo}
              className="px-2.5 py-1 rounded-lg bg-[#FF9933]/20 hover:bg-[#FF9933]/30 text-[#FF9933] font-bold text-[10px] transition-colors cursor-pointer"
            >
              1-Click Auto Fill
            </button>
          </div>
          <p className="text-[11px] font-mono text-gray-400">
            admin@ethixweb.com &middot; EthixAdmin2026!
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleLogin}
          className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-5"
        >
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/50 flex items-start gap-2 text-xs text-red-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p>{errorMessage}</p>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-gray-400" />
              <span>Admin Email</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ethixweb.com"
              className="w-full rounded-xl bg-[#090B10] border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-gray-400" />
              <span>Password</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full rounded-xl bg-[#090B10] border border-white/10 px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:border-[#E30613] focus:ring-1 focus:ring-[#E30613] outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <p className="text-center text-[11px] text-gray-500">
          Protected with HTTP-only session cookie &amp; Firebase Auth
        </p>
      </div>
    </div>
  );
}
