"use client";

import { useActionState } from "react";
import { authenticate } from "../actions";
import Flag from "@/components/Flag";

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="min-h-screen bg-ottoman-red-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Decorative dot pattern background */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#c29b38_1.5px,transparent_1.5px)] [background-size:28px_28px]" />

      {/* Decorative corner ornaments */}
      <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-brass-gold-600/40 rounded-tl-lg" />
      <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-brass-gold-600/40 rounded-tr-lg" />
      <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-brass-gold-600/40 rounded-bl-lg" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-brass-gold-600/40 rounded-br-lg" />

      <div className="w-full max-w-md relative z-10">

        {/* Header / Branding */}
        <div className="text-center mb-8 space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-ottoman-red-900/60 border-2 border-brass-gold-500/50 rounded-2xl shadow-lg">
              <Flag width={140} height={93} />
            </div>
          </div>

          <div className="space-y-1">
            <p className="font-arabic text-brass-gold-300 text-xl leading-relaxed" dir="rtl">
              دیوانِ خاص سلطنتِ القاسميه
            </p>
            <h1 className="font-serif text-2xl font-bold text-ivory-100 tracking-widest uppercase">
              Royal Diwan
            </h1>
            <p className="text-xs uppercase tracking-widest text-brass-gold-400/80 font-sans font-medium">
              Secure Citizen Portal — Access Restricted
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 max-w-[280px] mx-auto">
            <div className="flex-1 h-px bg-brass-gold-700/50" />
            <span className="text-brass-gold-600 text-xs">✦</span>
            <div className="flex-1 h-px bg-brass-gold-700/50" />
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-ottoman-red-900/70 border border-brass-gold-600/30 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
          <div className="mb-6">
            <h2 className="font-serif text-lg font-semibold text-ivory-100">
              Citizen Authentication
            </h2>
            <p className="text-xs text-ivory-300/60 font-sans mt-1">
              Enter your government-issued credentials to proceed.
            </p>
          </div>

          <form action={formAction} className="space-y-5">

            {/* Civil ID Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="civilId"
                className="block text-xs font-semibold uppercase tracking-wider text-brass-gold-400 font-sans"
              >
                Civil ID Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-brass-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2" />
                  </svg>
                </div>
                <input
                  id="civilId"
                  name="civilId"
                  type="text"
                  placeholder="e.g. KS-001"
                  required
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 bg-ottoman-red-950/60 border border-brass-gold-700/40 rounded-xl text-ivory-100 placeholder-ivory-400/30 font-sans text-sm focus:outline-none focus:border-brass-gold-500 focus:ring-1 focus:ring-brass-gold-500/30 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-brass-gold-400 font-sans"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <svg className="w-4 h-4 text-brass-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-4 py-3 bg-ottoman-red-950/60 border border-brass-gold-700/40 rounded-xl text-ivory-100 placeholder-ivory-400/30 font-sans text-sm focus:outline-none focus:border-brass-gold-500 focus:ring-1 focus:ring-brass-gold-500/30 transition-all duration-200"
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="flex items-start gap-2.5 bg-red-900/40 border border-red-700/50 rounded-xl px-4 py-3">
                <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-red-300 font-sans">{errorMessage}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              id="portal-login-btn"
              type="submit"
              disabled={isPending}
              className="w-full py-3.5 bg-brass-gold-500 hover:bg-brass-gold-400 disabled:opacity-60 disabled:cursor-not-allowed text-ottoman-red-950 font-serif font-bold text-sm tracking-widest uppercase rounded-xl transition-all duration-200 shadow-md flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verifying…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  Access Royal Diwan
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-[10px] text-ivory-300/40 font-sans mt-6 leading-relaxed">
          This portal is restricted to registered citizens of the Kasimid Sultanate.<br />
          Unauthorized access is prohibited under the Imperial Constitution.
        </p>

        {/* Back to public site */}
        <div className="text-center mt-4">
          <a
            href="/"
            className="text-xs text-brass-gold-600/70 hover:text-brass-gold-400 font-sans transition-colors duration-200 underline underline-offset-2"
          >
            ← Return to Public Portal
          </a>
        </div>
      </div>
    </div>
  );
}
