"use client";

import { useState } from "react";
import Link from "next/link";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "YOUR_WEB3FORMS_KEY";

export default function VisaPage() {
  const [form, setForm] = useState({
    civilId: "",
    fullName: "",
    destination: "",
    travelPurpose: "",
    departureDate: "",
    returnDate: "",
    additionalInfo: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `[Kasimid Portal] Visa/Travel Request — ${form.civilId || "Citizen"}`,
      from_name: `${form.fullName} (${form.civilId})`,
      message: `
TRAVEL AUTHORIZATION REQUEST
━━━━━━━━━━━━━━━━━━━━━━━━━━
Citizen: ${form.fullName}
Civil ID: ${form.civilId}

Destination: ${form.destination}
Purpose: ${form.travelPurpose}
Departure: ${form.departureDate}
Return: ${form.returnDate}

Additional Notes:
${form.additionalInfo || "None provided."}
      `.trim(),
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-ottoman-red-950 relative">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#c29b38_1.5px,transparent_1.5px)] [background-size:28px_28px]" />
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 space-y-8">
        <Link href="/portal" className="inline-flex items-center gap-2 text-xs text-brass-gold-500/70 hover:text-brass-gold-400 font-sans transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Back to Portal
        </Link>
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-widest font-bold text-brass-gold-500 font-sans">🛂 National Identity &amp; Travel</span>
          <h1 className="font-serif text-3xl font-bold text-ivory-100">Visa &amp; Travel Authorization Request</h1>
          <p className="text-sm text-ivory-300/60 font-sans">Complete this form to submit a formal travel authorization request to the Royal Diwan.</p>
        </div>

        {status === "success" ? (
          <div className="bg-emerald-900/40 border border-emerald-600/40 rounded-2xl p-8 text-center space-y-3">
            <div className="text-4xl">✅</div>
            <h2 className="font-serif text-xl font-bold text-ivory-100">Request Submitted</h2>
            <p className="text-sm text-ivory-300/70 font-sans">Your travel authorization request has been transmitted to the Royal Diwan.</p>
            <Link href="/portal" className="inline-block mt-2 text-xs text-brass-gold-400 hover:text-brass-gold-300 underline underline-offset-2 font-sans">Return to Dashboard</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-ottoman-red-900/50 border border-brass-gold-700/20 rounded-2xl p-7 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Full Name" id="fullName" required>
                <input id="fullName" type="text" value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} placeholder="As on Civil Registry" required className={inputClass} />
              </FormField>
              <FormField label="Civil ID Number" id="civilId" required>
                <input id="civilId" type="text" value={form.civilId} onChange={e => setForm(f => ({ ...f, civilId: e.target.value }))} placeholder="e.g. KS-001" required className={inputClass} />
              </FormField>
            </div>
            <FormField label="Destination Country / Territory" id="destination" required>
              <input id="destination" type="text" value={form.destination} onChange={e => setForm(f => ({ ...f, destination: e.target.value }))} placeholder="e.g. United States of America" required className={inputClass} />
            </FormField>
            <FormField label="Purpose of Travel" id="travelPurpose" required>
              <select id="travelPurpose" value={form.travelPurpose} onChange={e => setForm(f => ({ ...f, travelPurpose: e.target.value }))} required className={inputClass}>
                <option value="">Select purpose…</option>
                <option>Diplomatic Mission</option><option>Personal Travel</option><option>Academic / Educational</option><option>Trade &amp; Commerce</option><option>Medical</option><option>Other</option>
              </select>
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Departure Date" id="departureDate" required>
                <input id="departureDate" type="date" value={form.departureDate} onChange={e => setForm(f => ({ ...f, departureDate: e.target.value }))} required className={inputClass} />
              </FormField>
              <FormField label="Return Date" id="returnDate" required>
                <input id="returnDate" type="date" value={form.returnDate} onChange={e => setForm(f => ({ ...f, returnDate: e.target.value }))} required className={inputClass} />
              </FormField>
            </div>
            <FormField label="Additional Notes (optional)" id="additionalInfo">
              <textarea id="additionalInfo" value={form.additionalInfo} onChange={e => setForm(f => ({ ...f, additionalInfo: e.target.value }))} rows={4} placeholder="Any additional context…" className={`${inputClass} resize-none`} />
            </FormField>
            {status === "error" && <ErrorBanner />}
            <SubmitButton isPending={status === "submitting"} label="Submit Travel Request" />
          </form>
        )}
      </div>
    </div>
  );
}

const inputClass = "w-full px-4 py-3 bg-ottoman-red-950/60 border border-brass-gold-700/30 rounded-xl text-ivory-100 placeholder-ivory-400/25 font-sans text-sm focus:outline-none focus:border-brass-gold-500 focus:ring-1 focus:ring-brass-gold-500/30 transition-all duration-200";
function FormField({ label, id, required, children }: { label: string; id: string; required?: boolean; children: React.ReactNode }) {
  return <div className="space-y-1.5"><label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-brass-gold-400 font-sans">{label}{required && <span className="text-red-400 ml-1">*</span>}</label>{children}</div>;
}
function ErrorBanner() { return <div className="bg-red-900/40 border border-red-700/50 rounded-xl px-4 py-3"><p className="text-xs text-red-300 font-sans">Submission failed. Please try again.</p></div>; }
function SubmitButton({ isPending, label }: { isPending: boolean; label: string }) {
  return <button type="submit" disabled={isPending} className="w-full py-3.5 bg-brass-gold-500 hover:bg-brass-gold-400 disabled:opacity-60 disabled:cursor-not-allowed text-ottoman-red-950 font-serif font-bold text-sm tracking-widest uppercase rounded-xl transition-all duration-200 flex items-center justify-center gap-2">{isPending ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Transmitting…</> : label}</button>;
}
