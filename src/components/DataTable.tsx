"use client";

import React from "react";

// --- POLITICAL PARTIES TABLE ---

export interface PartyData {
  name: string;
  leader: string;
  ideology: string;
  status: "Official Ruling" | "Outlawed / Rebellious";
  shuraSeats: number;
  councilSeats: number;
}

export function PoliticalPartiesTable() {
  const parties: PartyData[] = [
    {
      name: "Al-Hizb al-Islami",
      leader: "Ali Shihali",
      ideology: "State Islamism",
      status: "Official Ruling",
      shuraSeats: 5,
      councilSeats: 6,
    },
    {
      name: "Al-Hizb al-Federali",
      leader: "Sardar Sahib Singh",
      ideology: "Federalism",
      status: "Outlawed / Rebellious",
      shuraSeats: 0,
      councilSeats: 0,
    },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-ivory-300 shadow-sm bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-ottoman-red-900 border-b border-brass-gold-500 text-brass-gold-100 font-serif text-sm">
            <th className="p-4 font-semibold">Party Faction</th>
            <th className="p-4 font-semibold">Leader</th>
            <th className="p-4 font-semibold">Ideology</th>
            <th className="p-4 font-semibold">Status</th>
            <th className="p-4 font-semibold text-center">Shura Seats</th>
            <th className="p-4 font-semibold text-center">Cultural Council Seats</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ivory-200 text-stone-700 text-sm">
          {parties.map((party, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-ivory-50"
              } hover:bg-brass-gold-50/50 transition-colors duration-150`}
            >
              <td className="p-4 font-semibold text-ottoman-red-950 font-serif">
                {party.name}
              </td>
              <td className="p-4">{party.leader}</td>
              <td className="p-4 italic">{party.ideology}</td>
              <td className="p-4">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    party.status === "Official Ruling"
                      ? "bg-ottoman-red-100 text-ottoman-red-800 border border-ottoman-red-200"
                      : "bg-red-50 text-red-700 border border-red-200 animate-pulse"
                  }`}
                >
                  {party.status}
                </span>
              </td>
              <td className="p-4 text-center font-mono font-medium">{party.shuraSeats}</td>
              <td className="p-4 text-center font-mono font-medium">{party.councilSeats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- PROVINCES TABLE ---

export interface ProvinceData {
  name: string;
  arabicName: string;
  area: string;
  governor: string;
}

export function ProvincesTable() {
  const provinces: ProvinceData[] = [
    {
      name: "Ghabaan Province",
      arabicName: "ولاية الغابات",
      area: "0.01 sq mi",
      governor: "Al-Himalayi",
    },
    {
      name: "Jama’ah Province",
      arabicName: "ولاية الجماعة",
      area: "0.02 sq mi",
      governor: "Harith al-Dehlawi",
    },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-ivory-300 shadow-sm bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-ottoman-red-900 border-b border-brass-gold-500 text-brass-gold-100 font-serif text-sm">
            <th className="p-4 font-semibold">Wilayah (Province)</th>
            <th className="p-4 font-semibold">Arabic Designation</th>
            <th className="p-4 font-semibold">Total Area</th>
            <th className="p-4 font-semibold">Appointed Governor</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ivory-200 text-stone-700 text-sm">
          {provinces.map((prov, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-ivory-50"
              } hover:bg-brass-gold-50/50 transition-colors duration-150`}
            >
              <td className="p-4 font-semibold text-ottoman-red-950 font-serif">
                {prov.name}
              </td>
              <td className="p-4 font-arabic text-ottoman-red-800 text-base notranslate" translate="no" dir="rtl">
                {prov.arabicName}
              </td>
              <td className="p-4 font-mono">{prov.area}</td>
              <td className="p-4 font-medium text-stone-800">{prov.governor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- HOLIDAYS TABLE ---

export interface HolidayData {
  name: string;
  arabicName: string;
  type: string;
  description: string;
}

export function HolidaysTable() {
  const holidays: HolidayData[] = [
    {
      name: "Islamic New Year",
      arabicName: "رأس السنة الهجرية",
      type: "Religious",
      description: "Commemoration of the migration (Hijrah) of Prophet Muhammad (PBUH) from Mecca to Medina.",
    },
    {
      name: "Eid al-Fitr",
      arabicName: "عيد الفطر",
      type: "Religious",
      description: "Festival of breaking the fast, celebrating the completion of Ramadan.",
    },
    {
      name: "Eid al-Adha",
      arabicName: "عيد الأضحى",
      type: "Religious",
      description: "Festival of sacrifice, marking the culmination of the annual Hajj pilgrimage.",
    },
    {
      name: "Festival of Fragrance",
      arabicName: "مهرجان العطور",
      type: "Cultural",
      description: "Celebration of natural botanical oils, attars, and clean scents, reflecting cultural purity.",
    },
    {
      name: "Date Harvest Festival",
      arabicName: "مهرجان حصاد التمور",
      type: "Economic/Agricultural",
      description: "Harvest festival celebrating agricultural blessing, trade, and economic sustainability.",
    },
    {
      name: "Day of Heritage",
      arabicName: "يوم التراث",
      type: "National",
      description: "Annual commemoration of the founding history, customs, and sovereignty of the Sultanate.",
    },
  ];

  return (
    <div className="overflow-x-auto rounded-lg border border-ivory-300 shadow-sm bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-ottoman-red-900 border-b border-brass-gold-500 text-brass-gold-100 font-serif text-sm">
            <th className="p-4 font-semibold">Holiday Name</th>
            <th className="p-4 font-semibold">Arabic / Cultural Script</th>
            <th className="p-4 font-semibold">Category</th>
            <th className="p-4 font-semibold">Observance Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ivory-200 text-stone-700 text-sm">
          {holidays.map((h, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-ivory-50"
              } hover:bg-brass-gold-50/50 transition-colors duration-150`}
            >
              <td className="p-4 font-semibold text-ottoman-red-950 font-serif">
                {h.name}
              </td>
              <td className="p-4 font-arabic text-ottoman-red-800 text-base notranslate" translate="no" dir="rtl">
                {h.arabicName}
              </td>
              <td className="p-4">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                    h.type === "Religious"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : h.type === "National"
                      ? "bg-amber-50 text-amber-800 border border-amber-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  {h.type}
                </span>
              </td>
              <td className="p-4 text-stone-600 max-w-xs md:max-w-md">{h.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
