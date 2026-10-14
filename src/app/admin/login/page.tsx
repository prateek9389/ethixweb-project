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
  ArrowLeft,
  Eye,
  EyeOff,
  ShieldCheck
} from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const cleanEmail = email.trim();

      // 1. Authenticate with Client Firebase Auth SDK directly
      let firebaseIdToken: string | undefined = undefined;
      if (isFirebaseConfigured() && auth) {
        try {
          const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
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
          email: cleanEmail,
          password,
          firebaseIdToken,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Invalid admin credentials. Access denied.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Invalid admin credentials. Access denied.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 relative bg-[#07080B] text-white selection:bg-[#E30613] selection:text-white overflow-x-hidden">
      {/* Background Ambience & Lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-gradient-to-tr from-[#E30613]/15 via-[#FF9933]/10 to-transparent rounded-full blur-[120px] sm:blur-[180px]" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#E30613]/5 rounded-full blur-[100px]" />
      </div>

      {/* Top Header Bar */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between z-10 text-xs py-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all py-1.5 px-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span className="font-medium">Back to Ethixweb</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Firebase Active</span>
          </span>
        </div>
      </header>

      {/* Main Login Card */}
      <main className="w-full max-w-md mx-auto my-auto py-4 relative z-10">
        <div className="bg-[#0B0E17]/90 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/80 rounded-3xl p-6 sm:p-8 space-y-6">
          
          {/* Simple, Sleek Admin Logo */}
          <div className="flex flex-col items-center text-center space-y-3">
            <Link
              href="/"
              className="group inline-flex flex-col items-center gap-2 transition-transform hover:scale-[1.02]"
              aria-label="Ethixweb Home"
            >
              {/* Clean Official Ethixweb Logo with subtle glow frame */}
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#E30613]/25 to-[#FF9933]/20 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="relative px-4 py-2.5 rounded-2xl bg-[#08090D] border border-white/10 shadow-inner flex items-center justify-center">
                  <img
                    src="/ethixweb-logo.webp"
                    alt="Ethixweb"
                    width={170}
                    height={26}
                    className="h-6 sm:h-7 w-auto object-contain brightness-110 drop-shadow"
                  />
                </div>
              </div>

              {/* Minimal Admin Badge */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#E30613]/10 border border-[#E30613]/30 text-[10px] font-black uppercase tracking-widest text-[#FF2B38]">
                <ShieldCheck className="w-3 h-3 text-[#E30613]" />
                ADMIN PORTAL
              </span>
            </Link>

            <p className="text-xs text-gray-400 max-w-xs">
              Direct access for Technical Directors to review &amp; manage client inquiries
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/50 flex items-start gap-2.5 text-xs text-red-200 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <p className="leading-snug">{errorMessage}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ethixweb.com"
                  className="w-full h-11 sm:h-12 rounded-xl bg-[#080A10] border border-white/10 pl-10 pr-3.5 text-base sm:text-sm text-white placeholder-gray-500 focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/25 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-11 sm:h-12 rounded-xl bg-[#080A10] border border-white/10 pl-10 pr-11 text-base sm:text-sm text-white placeholder-gray-500 focus:border-[#E30613] focus:ring-2 focus:ring-[#E30613]/25 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-1.5 cursor-pointer rounded-lg hover:bg-white/5 transition-colors"
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
              className="w-full h-12 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#E30613] to-[#B5000A] hover:from-[#F01422] hover:to-[#C7000B] active:scale-[0.99] transition-all shadow-lg shadow-[#E30613]/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="pt-2 border-t border-white/5 text-center">
            <p className="text-[11px] text-gray-400">
              Authenticated via Secure Cookie &amp; Firebase Auth
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Footer Note */}
      <footer className="w-full max-w-md mx-auto text-center z-10 py-2">
        <p className="text-[11px] text-gray-400 flex items-center justify-center gap-2">
          <span>🔒 256-bit SSL</span>
          <span>&middot;</span>
          <span>Zero-Trust Gate</span>
          <span>&middot;</span>
          <span>Ethixweb India</span>
        </p>
      </footer>
    </div>
  );
}
