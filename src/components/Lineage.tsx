"use client";

import React, { useState } from "react";

interface AncestorNode {
  generationText: string;
  name: string;
  historicalNote?: string;
  isMilestone?: boolean;
}

export default function Lineage() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const keyMilestones: AncestorNode[] = [
    {
      generationText: "Root Ancestor",
      name: "Prophet Muhammad (PBUH)",
      historicalNote: "The final Messenger of Islam. Root ancestor of the family line.",
      isMilestone: true,
    },
    {
      generationText: "5th Imam Line",
      name: "Imam Muhammad al-Baqir",
      historicalNote: "2nd great-grandson of the Prophet Muhammad, 5th Imam in classical lineage.",
      isMilestone: true,
    },
    {
      generationText: "37th Great-Grandfather",
      name: "Abdullah al-Baqir",
      historicalNote: "Son of the 5th Imam; established early branches of the maternal lineage.",
      isMilestone: true,
    },
    {
      generationText: "Sufi Saint",
      name: "Sheikh Uthman Sher Sawar (1200-)",
      historicalNote: "Eminent Sufi saint and disciple of Baba Farid who migrated to India.",
      isMilestone: true,
    },
    {
      generationText: "Bihar Patriarch",
      name: "Muhammad Farid",
      historicalNote: "Eponymous founder of Faridpur, Bihar; noted scholar and administrator.",
      isMilestone: true,
    },
    {
      generationText: "19th Century",
      name: "Syed Majid Ali (1801-1885)",
      historicalNote: "Sufi scholar, patriarch, and ancestor of the modern Majidids.",
      isMilestone: true,
    },
    {
      generationText: "The Incumbent Sultan",
      name: "Yusuf Raniri (Sultan Yusuf I)",
      historicalNote: "Current Sovereign of the Kasimid Sultanate, reigning through the matrilineal line.",
      isMilestone: true,
    },
  ];

  // The 45-generation sequence
  const fullLineage: string[] = [
    "Prophet Muhammad (PBUH)",
    "Fatimah al-Zahra (married Ali bin Abi Talib)",
    "Imam Husayn ibn Ali",
    "Imam Ali Zayn al-Abidin",
    "Imam Muhammad al-Baqir (5th Imam)",
    "Abdullah al-Baqir (37th great-grandfather, son of 5th imam)",
    "Ayyub (grandson of Muhammad al-Baqir through Abdullah)",
    "Barakatullah ibn Habibullah",
    "Shahab al-Din Nur Al-Anwar",
    "Muhammad Najam al-Din",
    "Muhammad Sufi Sadiq",
    "Shahabuddin Layyah al-Masri (Egyptian Murshid)",
    "Ahmad Elahi",
    "Muhammad Mahroof",
    "Junayd",
    "Uthman al-Thani",
    "Abdul Wahhab",
    "Uthman Sher Sawar (1200-, Disciple of Baba Farid)",
    "Muhammad Yusuf Burqaposh (Traveled from Madinah to India)",
    "Muhammad Qasim",
    "Muhammad",
    "Abdul Raheem Mufti (Qazi of Delhi)",
    "Abdul Rahman",
    "Ashiq Ali",
    "Muhammad Farid (Eponym of Faridpur, Bihar)",
    "Muhammad Ibrahim",
    "Muhammad Daud",
    "Syed Muhammad Yahya",
    "Syed Najam al-Din",
    "Syed Muhammad Ali",
    "Syed Abdul Karim",
    "Syed Abdul Quddus",
    "Syed Muhammad Mohsin",
    "Syed Muhammad Yusuf",
    "Syed Muhammad Ishaaq",
    "Syed Mubarik Ali Faridpuri",
    "Syed Barakat Ali",
    "Syed Amjad Ali",
    "Syed Majid Ali (1801-1885, Ancestor of Majidids)",
    "Syed Abdul Majeed (Son of Syed Majid Ali)",
    "Syed Muhammad Kazim",
    "Shamim",
    "Bint Al Siddiq",
    "Umm Ammaar (Mother of Sultan)",
    "Yusuf Raniri (Sultan Yusuf I, Caliph from the Kasimids)"
  ];

  return (
    <div className="rounded-2xl border border-ivory-300 bg-white p-6 shadow-sm hover:border-brass-gold-400 transition-all duration-300 space-y-6">
      <div>
        <h4 className="text-xl font-serif font-bold text-ottoman-red-950 flex items-center gap-2">
          <span>The Matrilineal Lineage</span>
          <span className="font-arabic text-brass-gold-700 font-normal text-base notranslate" translate="no" dir="rtl">
            (شجرة النسب)
          </span>
        </h4>
        <p className="text-xs text-stone-500 font-sans tracking-wide mt-1">
          Historical record tracing Sultan Yusuf I&apos;s lineage through his mother, Umm Ammaar, to the Prophet Muhammad
        </p>
      </div>

      {/* Key Milestones Vertical Timeline */}
      <div className="relative border-l-2 pl-6 ml-3 border-brass-gold-400 space-y-6 py-2">
        {keyMilestones.map((node, idx) => (
          <div key={idx} className="relative">
            {/* Timeline node marker */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-ottoman-red-900 border-2 border-brass-gold-400 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
            
            <div className="space-y-1">
              <span className="inline-block px-2 py-0.5 bg-brass-gold-100 text-brass-gold-800 font-mono text-[9px] font-bold rounded uppercase tracking-wider">
                {node.generationText}
              </span>
              <h5 className="font-serif text-sm font-bold text-stone-850">
                {node.name}
              </h5>
              <p className="text-xs text-stone-600 leading-relaxed max-w-xl font-sans">
                {node.historicalNote}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Expandable full registry */}
      <div className="pt-4 border-t border-ivory-200">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-xs font-semibold bg-ivory-100 hover:bg-brass-gold-100 text-ottoman-red-900 border border-ivory-300 rounded-lg px-4 py-3 transition-colors focus:outline-none"
        >
          <span>{isExpanded ? "Collapse Ancestral Ledger" : "View Full Matrilineal Ancestral Ledger"}</span>
          <svg
            className={`w-4 h-4 text-brass-gold-600 transform transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isExpanded && (
          <div className="mt-4 p-4 bg-ivory-50 rounded-xl border border-ivory-200 animate-fadeIn space-y-2">
            <h5 className="font-serif text-xs font-bold text-ottoman-red-950 uppercase tracking-widest mb-3 border-b border-ivory-300 pb-1.5">
              Complete Matrilineal Lineage
            </h5>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-stone-700 font-mono leading-relaxed">
              {fullLineage.map((name, idx) => (
                <li key={idx} className={idx + 1 === fullLineage.length ? "text-ottoman-red-900 font-bold font-serif" : ""}>
                  <span className="text-stone-800">{name}</span>
                  {idx === 0 && <span className="text-stone-400 text-[10px] mx-1.5">(Root Ancestor)</span>}
                  {idx === 5 && <span className="text-brass-gold-700 text-[10px] mx-1.5">(37th Great-Grandfather)</span>}
                  {idx === 17 && <span className="text-brass-gold-700 text-[10px] mx-1.5">(Sufi Saint)</span>}
                  {idx === 44 && <span className="text-brass-gold-700 text-[10px] mx-1.5">(The Incumbent)</span>}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
