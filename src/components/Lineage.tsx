"use client";

import React, { useState } from "react";

interface AncestorNode {
  generation: number;
  name: string;
  historicalNote?: string;
  isMilestone?: boolean;
}

export default function Lineage() {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const keyMilestones: AncestorNode[] = [
    {
      generation: 1,
      name: "Prophet Muhammad (PBUH)",
      historicalNote: "Founder of Islam. Direct ancestor of the Majidid Dynastic line.",
      isMilestone: true,
    },
    {
      generation: 2,
      name: "Fatimah al-Zahra & Ali bin Abi Talib",
      historicalNote: "Daughter of the Prophet and the fourth Caliph of Islam.",
      isMilestone: true,
    },
    {
      generation: 5,
      name: "Imam Abdullah al-Baqir",
      historicalNote: "Renowned Islamic scholar and jurist of the early caliphate.",
      isMilestone: true,
    },
    {
      generation: 32,
      name: "Sheikh Uthman Sher Sawar",
      historicalNote: "Eminent Sufi saint and teacher who migrated across central trade paths.",
      isMilestone: true,
    },
    {
      generation: 40,
      name: "Sidi Muhammad Farid",
      historicalNote: "Patriarch of the early modern Majidid lineage, merchant, and scholar.",
      isMilestone: true,
    },
    {
      generation: 41,
      name: "Isma’il al-Raniri",
      historicalNote: "Father of the current Sovereign; key counselor of the caliphate.",
      isMilestone: true,
    },
    {
      generation: 42,
      name: "Sultan Yusuf I (King Yusuf bin Isma’il al-Raniri I)",
      historicalNote: "Incumbent Sovereign of the Kasimid Sultanate; dissolved the Raritan Caliphate to establish modern structures.",
      isMilestone: true,
    },
  ];

  // Full representation of the 42 generations for the expanded ledger
  const fullLineage: string[] = [
    "Prophet Muhammad (PBUH)",
    "Fatimah al-Zahra (married Ali bin Abi Talib)",
    "Imam Hasan al-Mujtaba",
    "Hasan al-Muthanna",
    "Imam Abdullah al-Baqir",
    "Ibrahim al-Ghamr",
    "Ismail al-Dibaj",
    "Ibrahim al-Tabataba",
    "Al-Qasim al-Rassi",
    "Al-Husayn al-Hadi",
    "Yahya al-Hadi ila'l-Haqq",
    "Ahmad al-Murtada",
    "Al-Hasan al-Nasir",
    "Ali al-Mansur",
    "Imad al-Din Yahya",
    "Musa al-Kazim",
    "Ja'far al-Sadiq",
    "Ali al-Rida",
    "Muhammad al-Taqi",
    "Ali al-Hadi",
    "Al-Hasan al-Askari",
    "Sayyid Ahmad al-Muhajir",
    "Alwi al-Ubaydullah",
    "Muhammad al-Sahib al-Mirbat",
    "Ali al-Khali Qasam",
    "Muhammad al-Faqih al-Muqaddam",
    "Alwi al-Ghayur",
    "Ali al-Azmat Khan",
    "Sayyid Jalaluddin al-Bukhari",
    "Sayyid Ahmad Kabir",
    "Sayyid Jalaluddin Surkh-Posh Bukhari",
    "Sheikh Uthman Sher Sawar",
    "Sheikh Muhammad Al-Raniri",
    "Sayyid Kasim al-Raniri",
    "Sheikh Ahmad Al-Majidi",
    "Sayyid Habibullah Al-Majidi",
    "Sayyid Ali Al-Majidi",
    "Sayyid Yusuf Al-Majidi",
    "Sidi Muhammad Farid Al-Majidi",
    "Sidi Muhammad Farid",
    "Isma’il al-Raniri",
    "Sultan Yusuf I (King Yusuf bin Isma’il al-Raniri I)"
  ];

  return (
    <div className="rounded-2xl border border-ivory-300 bg-white p-6 shadow-sm hover:border-brass-gold-400 transition-all duration-300 space-y-6">
      <div>
        <h4 className="text-xl font-serif font-bold text-royal-green-950">
          The Imperial Lineage (Shajarah al-Nasab)
        </h4>
        <p className="text-xs text-stone-500 font-sans tracking-wide mt-1">
          Historical record tracing Sultan Yusuf I's ancestry back 42 generations
        </p>
      </div>

      {/* Key Milestones Vertical Timeline */}
      <div className="relative border-l border-brass-gold-400 pl-6 space-y-6 py-2 ml-3">
        {keyMilestones.map((node) => (
          <div key={node.generation} className="relative">
            {/* Timeline node marker */}
            <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-royal-green-900 border-2 border-brass-gold-400 rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
            
            <div className="space-y-1">
              <span className="inline-block px-2 py-0.5 bg-brass-gold-100 text-brass-gold-800 font-mono text-[9px] font-bold rounded uppercase tracking-wider">
                Gen {node.generation} • Direct Descendant
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
          className="w-full flex items-center justify-between text-xs font-semibold bg-ivory-100 hover:bg-brass-gold-100 text-royal-green-900 border border-ivory-300 rounded-lg px-4 py-3 transition-colors focus:outline-none"
        >
          <span>{isExpanded ? "Collapse Ancestral ledger" : "View Full 42-Generation Ancestral Ledger"}</span>
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
            <h5 className="font-serif text-xs font-bold text-royal-green-950 uppercase tracking-widest mb-3 border-b border-ivory-300 pb-1.5">
              Complete Lineage Registry
            </h5>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-stone-700 font-mono leading-relaxed">
              {fullLineage.map((name, idx) => (
                <li key={idx} className={idx + 1 === 42 ? "text-royal-green-900 font-bold font-serif" : ""}>
                  <span className="text-stone-800">{name}</span>
                  {idx + 1 === 1 && <span className="text-stone-400 text-[10px] ml-1.5">(Prophet Muhammad)</span>}
                  {idx + 1 === 42 && <span className="text-brass-gold-700 text-[10px] ml-1.5">(The Incumbent Sultan)</span>}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}
