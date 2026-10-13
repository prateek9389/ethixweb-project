"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";
import { auth, isFirebaseConfigured } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  Loader2, 
  KeyRound,
  Flame
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
      // 1. If Firebase Auth is configured on client, try Firebase Auth first
      let firebaseIdToken: string | undefined = undefined;
      if (isFirebaseConfigured() && auth) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          firebaseIdToken = await userCredential.user.getIdToken();
        } catch (firebaseErr: unknown) {
          console.warn("Client Firebase Auth attempt note:", firebaseErr);
          // If Firebase Auth throws because user is not yet created in console, continue to server auth
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
        throw new Error(data.error || "Authentication failed. Please verify your credentials.");
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
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden bg-[#07080B]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E30613]/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <BrandLogo size="lg" className="justify-center" />
          <h1 className="text-xl sm:text-2xl font-black text-white pt-2">
            Lead Management Portal
          </h1>
          <p className="text-xs text-gray-400">
            Secure admin access powered by Firebase &amp; Ethixweb India
          </p>
        </div>

        {/* Demo Credentials Quick-Autofill Box (For Reviewers) */}
        <div className="p-4 rounded-2xl bg-[#121622] border border-[#FF9933]/30 text-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#FF9933] flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" />
              Demo Credentials (Assessment Review)
            </span>
            <span className="text-[10px] bg-[#FF9933]/15 text-[#FF9933] px-2 py-0.5 rounded font-mono">
              1-Click
            </span>
          </div>

          <p className="text-[11px] text-gray-300">
            Click below to instantly fill the credentials required by the assessment brief:
          </p>

          <button
            type="button"
            onClick={handleAutofillDemo}
            className="w-full py-2 px-3 rounded-xl bg-[#1A1F30] hover:bg-[#222940] border border-white/10 text-white text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer"
          >
            <span className="font-mono text-[11px] text-gray-300">admin@ethixweb.com &middot; EthixAdmin2026!</span>
            <span className="text-[11px] text-[#FF9933] font-bold">Auto-Fill &rarr;</span>
          </button>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleLogin}
          className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl space-y-5"
        >
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-500/50 flex items-start gap-2.5 text-xs text-red-200">
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
                <span>Authenticating with Firebase...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Sign In To Admin Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          <span>Integrated with Firebase Authentication &amp; Firestore</span>
        </div>
      </div>
    </div>
  );
}
