import { redirect } from "next/navigation";
import Link from "next/link";
import Flag from "@/components/Flag";
import { getSession, signOut } from "./actions";

export default async function PortalDashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/portal/login");
  }

  const firstName = session.name.split(" ")[0];

  return (
    <div className="min-h-screen bg-ottoman-red-950 relative">
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#c29b38_1.5px,transparent_1.5px)] [background-size:28px_28px]" />

      {/* Portal Header */}
      <header className="relative z-10 border-b border-brass-gold-700/30 bg-ottoman-red-900/50 backdrop-blur-sm px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Flag width={72} height={48} />
            <div>
              <p className="text-[10px] uppercase tracking-widest text-brass-gold-500 font-sans font-semibold">
                Kasimid Sultanate
              </p>
              <h1 className="font-serif text-ivory-100 text-lg font-bold leading-tight">
                Royal Diwan — Citizen Portal
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Citizen badge */}
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] text-brass-gold-500/80 uppercase tracking-wider font-sans">
                {session.role}
              </span>
              <span className="text-xs font-semibold text-ivory-200 font-sans">
                {session.civilId} · {session.name}
              </span>
            </div>

            {/* Sign-out */}
            <form action={signOut}>
              <button
                type="submit"
                className="flex items-center gap-1.5 text-xs font-semibold text-ivory-300/70 hover:text-ivory-100 border border-brass-gold-700/30 hover:border-brass-gold-600/50 px-3 py-2 rounded-lg transition-all duration-200 font-sans"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-10 space-y-10">

        {/* ─── Hero Greeting ─────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-ottoman-red-900/80 to-ottoman-red-950/80 border border-brass-gold-600/30 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-56 h-56 bg-brass-gold-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-brass-gold-500 bg-brass-gold-500/10 border border-brass-gold-600/30 px-3 py-1 rounded-full">
              Secure Session Active
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-ivory-50 leading-tight">
              Salaam Alaikum, {firstName},
            </h2>
            <p className="text-ivory-200/80 font-sans text-sm leading-relaxed max-w-2xl">
              Welcome to the Official Citizen Portal of the Kasimid Sultanate. As a verified citizen
              of the Sultanate, you have been granted access to this secure chamber of the Royal Diwan.
              Here, you may access the private services of our nation and contribute to the prosperity
              of our two provinces, <strong className="text-brass-gold-300">Ghabaan</strong> and{" "}
              <strong className="text-brass-gold-300">Jama&apos;ah</strong>.
            </p>
          </div>
        </section>

        {/* ─── Section 1: National Identity & Travel ─────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-brass-gold-700/30">
            <div className="p-2 bg-brass-gold-500/15 border border-brass-gold-600/30 rounded-lg">
              <svg className="w-5 h-5 text-brass-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
              </svg>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-ivory-100">
                🛂 National Identity &amp; Travel
              </h3>
              <p className="text-[10px] uppercase tracking-wider text-brass-gold-500/70 font-sans">
                Wilayat-i Safariyyah
              </p>
            </div>
          </div>

          <div className="bg-ottoman-red-900/40 border border-brass-gold-700/20 rounded-2xl p-6 space-y-4">
            <p className="text-ivory-200/80 font-sans text-sm leading-relaxed">
              Use this form to request travel authorization for diplomatic or personal missions
              outside the Sultanate. All travel documents are issued under the seal of the Royal Diwan
              and are subject to approval by the Office of the Grand Vizier.
            </p>
            <Link
              href="/portal/visa"
              id="portal-visa-btn"
              className="inline-flex items-center gap-2 bg-ivory-100 hover:bg-ivory-50 text-ottoman-red-950 font-semibold font-sans text-sm px-5 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Apply for a Visa / Travel Document
            </Link>
          </div>
        </section>

        {/* ─── Section 2: Government & Civil Services ─────────────── */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-brass-gold-700/30">
            <div className="p-2 bg-brass-gold-500/15 border border-brass-gold-600/30 rounded-lg">
              <svg className="w-5 h-5 text-brass-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-ivory-100">
                🏛️ Government &amp; Civil Services
              </h3>
              <p className="text-[10px] uppercase tracking-wider text-brass-gold-500/70 font-sans">
                Khadamat-i Hukumiyyah
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-ottoman-red-900/40 border border-brass-gold-700/20 rounded-2xl p-6 space-y-4">
              <div className="space-y-1">
                <h4 className="font-serif text-base font-semibold text-ivory-100">
                  Government Appointments
                </h4>
                <p className="text-ivory-200/70 font-sans text-sm leading-relaxed">
                  Apply for official positions within the Royal Diwan or provincial leadership in
                  Ghabaan and Jama&apos;ah — or even overseas diplomatic posts!
                </p>
              </div>
              <Link
                href="/portal/apply"
                id="portal-apply-btn"
                className="inline-flex items-center gap-2 bg-ivory-100 hover:bg-ivory-50 text-ottoman-red-950 font-semibold font-sans text-sm px-5 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Submit a Government Application
              </Link>
            </div>

            <div className="bg-ottoman-red-900/40 border border-brass-gold-700/20 rounded-2xl p-6 space-y-4">
              <div className="space-y-1">
                <h4 className="font-serif text-base font-semibold text-ivory-100">
                  Report an Issue or Incident
                </h4>
                <p className="text-ivory-200/70 font-sans text-sm leading-relaxed">
                  Use this secure channel to report concerns, infrastructure needs, or provincial
                  matters directly to the authorities of the Royal Diwan.
                </p>
              </div>
              <Link
                href="/portal/report"
                id="portal-report-btn"
                className="inline-flex items-center gap-2 bg-ivory-100 hover:bg-ivory-50 text-ottoman-red-950 font-semibold font-sans text-sm px-5 py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Report an Issue or Incident
              </Link>
            </div>
          </div>
        </section>

      </main>

      <footer className="relative z-10 border-t border-brass-gold-700/20 mt-16 py-6 px-6 text-center">
        <p className="text-[10px] text-ivory-300/30 font-sans tracking-wide">
          © {new Date().getFullYear()} Royal Diwan of the Kasimid Sultanate · All sessions are encrypted and logged.
        </p>
      </footer>
    </div>
  );
}
