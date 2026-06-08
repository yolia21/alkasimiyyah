"use client";

import { useState } from "react";
import Link from "next/link";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "YOUR_WEB3FORMS_KEY";
const POSITIONS = ["Provincial Governor — Wilayat Ghabaan","Provincial Governor — Wilayat Jama'ah","Deputy Vizier (Naib al-Wazir)","Minister of Finance & Treasury","Minister of Culture & Heritage","Minister of Foreign Affairs","Minister of Education","Chief Justice (Qadi al-Qudat)","Royal Archivist","Overseas Cultural Attaché","Shura Council Representative","Other / Propose a Role"];

export default function ApplyPage() {
  const [form, setForm] = useState({ civilId: "", fullName: "", position: "", qualifications: "", motivation: "", availability: "" });
  const [status, setStatus] = useState<"idle"|"submitting"|"success"|"error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); setStatus("submitting");
    const payload = { access_key: WEB3FORMS_KEY, subject: `[Kasimid Portal] Government Application — ${form.civilId}`, from_name: `${form.fullName} (${form.civilId})`, message: `GOVERNMENT POSITION APPLICATION\n━━━━━━━━━━━━━━━━━━━━━━━━━━\nCitizen: ${form.fullName}\nCivil ID: ${form.civilId}\n\nPosition: ${form.position}\nAvailability: ${form.availability}\n\nQualifications:\n${form.qualifications}\n\nMotivation:\n${form.motivation}` };
    try { const res = await fetch("https://api.web3forms.com/submit", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload) }); setStatus(res.ok ? "success" : "error"); } catch { setStatus("error"); }
  }

  return (
    <div className="min-h-screen bg-ottoman-red-950 relative">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#c29b38_1.5px,transparent_1.5px)] [background-size:28px_28px]" />
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12 space-y-8">
        <Link href="/portal" className="inline-flex items-center gap-2 text-xs text-brass-gold-500/70 hover:text-brass-gold-400 font-sans transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>Back to Portal
        </Link>
        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-widest font-bold text-brass-gold-500 font-sans">🏛️ Government &amp; Civil Services</span>
          <h1 className="font-serif text-3xl font-bold text-ivory-100">Government Position Application</h1>
          <p className="text-sm text-ivory-300/60 font-sans">Apply for an official role within the Royal Diwan, provincial administration, or overseas diplomatic service.</p>
        </div>
        {status === "success" ? (
          <div className="bg-emerald-900/40 border border-emerald-600/40 rounded-2xl p-8 text-center space-y-3">
            <div className="text-4xl">✅</div>
            <h2 className="font-serif text-xl font-bold text-ivory-100">Application Received</h2>
            <p className="text-sm text-ivory-300/70 font-sans">Your application has been transmitted to the Grand Vizier&apos;s office for review.</p>
            <Link href="/portal" className="inline-block mt-2 text-xs text-brass-gold-400 hover:text-brass-gold-300 underline underline-offset-2 font-sans">Return to Dashboard</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-ottoman-red-900/50 border border-brass-gold-700/20 rounded-2xl p-7 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Full Name" id="fullName" required><input id="fullName" type="text" value={form.fullName} onChange={e=>setForm(f=>({...f,fullName:e.target.value}))} placeholder="As on Civil Registry" required className={inputClass}/></FormField>
              <FormField label="Civil ID Number" id="civilId" required><input id="civilId" type="text" value={form.civilId} onChange={e=>setForm(f=>({...f,civilId:e.target.value}))} placeholder="e.g. KS-001" required className={inputClass}/></FormField>
            </div>
            <FormField label="Position Applied For" id="position" required>
              <select id="position" value={form.position} onChange={e=>setForm(f=>({...f,position:e.target.value}))} required className={inputClass}><option value="">Select a position…</option>{POSITIONS.map(p=><option key={p}>{p}</option>)}</select>
            </FormField>
            <FormField label="Availability" id="availability" required>
              <select id="availability" value={form.availability} onChange={e=>setForm(f=>({...f,availability:e.target.value}))} required className={inputClass}><option value="">Select availability…</option><option>Immediately Available</option><option>Within 2 Weeks</option><option>Within 1 Month</option><option>Flexible</option></select>
            </FormField>
            <FormField label="Qualifications & Relevant Experience" id="qualifications" required><textarea id="qualifications" value={form.qualifications} onChange={e=>setForm(f=>({...f,qualifications:e.target.value}))} rows={4} placeholder="Describe your relevant skills, education, and prior roles…" required className={`${inputClass} resize-none`}/></FormField>
            <FormField label="Statement of Motivation" id="motivation" required><textarea id="motivation" value={form.motivation} onChange={e=>setForm(f=>({...f,motivation:e.target.value}))} rows={4} placeholder="Why do you wish to serve the Kasimid Sultanate in this capacity?" required className={`${inputClass} resize-none`}/></FormField>
            {status === "error" && <ErrorBanner />}
            <SubmitButton isPending={status==="submitting"} label="Submit Application"/>
          </form>
        )}
      </div>
    </div>
  );
}

const inputClass = "w-full px-4 py-3 bg-ottoman-red-950/60 border border-brass-gold-700/30 rounded-xl text-ivory-100 placeholder-ivory-400/25 font-sans text-sm focus:outline-none focus:border-brass-gold-500 focus:ring-1 focus:ring-brass-gold-500/30 transition-all duration-200";
function FormField({label,id,required,children}:{label:string;id:string;required?:boolean;children:React.ReactNode}){return <div className="space-y-1.5"><label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-brass-gold-400 font-sans">{label}{required&&<span className="text-red-400 ml-1">*</span>}</label>{children}</div>;}
function ErrorBanner(){return <div className="bg-red-900/40 border border-red-700/50 rounded-xl px-4 py-3"><p className="text-xs text-red-300 font-sans">Submission failed. Please try again.</p></div>;}
function SubmitButton({isPending,label}:{isPending:boolean;label:string}){return <button type="submit" disabled={isPending} className="w-full py-3.5 bg-brass-gold-500 hover:bg-brass-gold-400 disabled:opacity-60 disabled:cursor-not-allowed text-ottoman-red-950 font-serif font-bold text-sm tracking-widest uppercase rounded-xl transition-all duration-200 flex items-center justify-center gap-2">{isPending?<><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Submitting…</>:label}</button>;}
