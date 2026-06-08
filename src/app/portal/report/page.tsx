"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "YOUR_WEB3FORMS_KEY";

const ISSUE_TYPES = [
  "Infrastructure Concern",
  "Security Incident",
  "Administrative Complaint",
  "Provincial Boundary Matter",
  "Public Safety",
  "Cultural or Religious Matter",
  "Financial or Treasury Concern",
  "Request for Government Services",
  "Interpersonal Dispute",
  "Other",
];

const PROVINCES = ["Wilayat Ghabaan", "Wilayat Jama'ah", "Cross-Provincial", "Capital (Ismailabad)", "External / Overseas"];

export default function ReportPage() {
  const { data: session } = useSession();
  const citizen = session?.user as { name?: string; civilId?: string } | undefined;

  const [form, setForm] = useState({
    issueType: "",
    province: "",
    severity: "",
    description: "",
    desiredOutcome: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const payload = {
      access_key: WEB3FORMS_KEY,
      subject: `[Kasimid Portal] Issue Report (${form.severity}) — ${citizen?.civilId ?? "Unknown"}`,
      from_name: `${citizen?.name ?? "Citizen"} (${citizen?.civilId ?? "?"})`,
      message: `
ISSUE / INCIDENT REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━
Citizen: ${citizen?.name ?? "N/A"}
Civil ID: ${citizen?.civilId ?? "N/A"}

Issue Type: ${form.issueType}
Province: ${form.province}
Severity: ${form.severity}

Description:
${form.description}

Desired Outcome:
${form.desiredOutcome || "Not specified."}
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
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Portal
        </Link>

        <div className="space-y-2">
          <span className="text-[10px] uppercase tracking-widest font-bold text-brass-gold-500 font-sans">
            🏛️ Government &amp; Civil Services
          </span>
          <h1 className="font-serif text-3xl font-bold text-ivory-100">
            Report an Issue or Incident
          </h1>
          <p className="text-sm text-ivory-300/60 font-sans">
            This secure channel transmits your report directly to the Royal Diwan authorities.
            All reports are treated with confidentiality and reviewed within 7 business days.
          </p>
        </div>

        {status === "success" ? (
          <div className="bg-emerald-900/40 border border-emerald-600/40 rounded-2xl p-8 text-center space-y-3">
            <div className="text-4xl">✅</div>
            <h2 className="font-serif text-xl font-bold text-ivory-100">Report Received</h2>
            <p className="text-sm text-ivory-300/70 font-sans">
              Your report has been securely transmitted to the Royal Diwan. The relevant authorities
              will review your submission and respond through your registered civil correspondence.
            </p>
            <Link href="/portal" className="inline-block mt-2 text-xs text-brass-gold-400 hover:text-brass-gold-300 underline underline-offset-2 font-sans">
              Return to Dashboard
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-ottoman-red-900/50 border border-brass-gold-700/20 rounded-2xl p-7 space-y-5">

            <FormField label="Issue Category" id="issueType" required>
              <select
                id="issueType"
                value={form.issueType}
                onChange={e => setForm(f => ({ ...f, issueType: e.target.value }))}
                required
                className={inputClass}
              >
                <option value="">Select issue type…</option>
                {ISSUE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Province / Location" id="province" required>
                <select
                  id="province"
                  value={form.province}
                  onChange={e => setForm(f => ({ ...f, province: e.target.value }))}
                  required
                  className={inputClass}
                >
                  <option value="">Select province…</option>
                  {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </FormField>

              <FormField label="Severity Level" id="severity" required>
                <select
                  id="severity"
                  value={form.severity}
                  onChange={e => setForm(f => ({ ...f, severity: e.target.value }))}
                  required
                  className={inputClass}
                >
                  <option value="">Select severity…</option>
                  <option value="🟢 Low — General Concern">🟢 Low — General Concern</option>
                  <option value="🟡 Medium — Needs Attention">🟡 Medium — Needs Attention</option>
                  <option value="🔴 High — Urgent Matter">🔴 High — Urgent Matter</option>
                  <option value="⚫ Critical — Emergency">⚫ Critical — Emergency</option>
                </select>
              </FormField>
            </div>

            <FormField label="Detailed Description" id="description" required>
              <textarea
                id="description"
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={5}
                placeholder="Provide a clear, factual account of the issue or incident…"
                required
                className={`${inputClass} resize-none`}
              />
            </FormField>

            <FormField label="Desired Outcome (optional)" id="desiredOutcome">
              <textarea
                id="desiredOutcome"
                value={form.desiredOutcome}
                onChange={e => setForm(f => ({ ...f, desiredOutcome: e.target.value }))}
                rows={3}
                placeholder="What resolution or action are you requesting from the Royal Diwan?"
                className={`${inputClass} resize-none`}
              />
            </FormField>

            {status === "error" && <ErrorBanner />}

            <SubmitButton isPending={status === "submitting"} label="Submit Report" />
          </form>
        )}
      </div>
    </div>
  );
}

const inputClass =
  "w-full px-4 py-3 bg-ottoman-red-950/60 border border-brass-gold-700/30 rounded-xl text-ivory-100 placeholder-ivory-400/25 font-sans text-sm focus:outline-none focus:border-brass-gold-500 focus:ring-1 focus:ring-brass-gold-500/30 transition-all duration-200";

function FormField({ label, id, required, children }: { label: string; id: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold uppercase tracking-wider text-brass-gold-400 font-sans">
        {label}{required && <span className="text-red-400 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function ErrorBanner() {
  return (
    <div className="bg-red-900/40 border border-red-700/50 rounded-xl px-4 py-3">
      <p className="text-xs text-red-300 font-sans">Submission failed. Please try again or contact the Royal Diwan directly.</p>
    </div>
  );
}

function SubmitButton({ isPending, label }: { isPending: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={isPending}
      className="w-full py-3.5 bg-brass-gold-500 hover:bg-brass-gold-400 disabled:opacity-60 disabled:cursor-not-allowed text-ottoman-red-950 font-serif font-bold text-sm tracking-widest uppercase rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
    >
      {isPending ? (
        <>
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Submitting…
        </>
      ) : label}
    </button>
  );
}
