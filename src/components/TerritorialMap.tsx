"use client";

import React from "react";

export interface RegionMapDetail {
  id: "ghabaan" | "jamaah" | "almaqsoodi";
  name: string;
  arabicName: string;
  badge: string;
  type: string;
  coordinates: string;
  area: string;
  governorOrAdmin: string;
  capitalOrHub: string;
  iframeSrc: string;
  description: string;
}

export default function TerritorialMap() {
  const regions: RegionMapDetail[] = [
    {
      id: "ghabaan",
      name: "Wilayat of Ghabaan",
      arabicName: "ولاية الغابات",
      badge: "Historical Core & Capital Seat",
      type: "Wilayah (Mainland Province)",
      coordinates: "40.380461, -74.298132",
      area: "0.01 sq mi (7,015 sq m)",
      governorOrAdmin: "Governor Al-Himalayi",
      capitalOrHub: "Ismailabad (Imperial Capital)",
      iframeSrc: "https://maps.google.com/maps?q=40.380461,-74.298132&z=17&output=embed",
      description:
        "0.01 sq mi. The historical core and seat of the capital, Ismailabad. Characterized by dense, cultivated forest terrain, housing the Royal Diwan, treasury archives, and sovereign councils. Administered by Governor Al-Himalayi.",
    },
    {
      id: "jamaah",
      name: "Wilayat of Jama’ah",
      arabicName: "ولاية الجماعة",
      badge: "Mainland Administrative Hub",
      type: "Wilayah (Mainland Province)",
      coordinates: "40.382481, -74.304363",
      area: "0.02 sq mi (13,000 sq m)",
      governorOrAdmin: "Governor Harith al-Dehlawi",
      capitalOrHub: "Jama'ah Al-Ula",
      iframeSrc: "https://maps.google.com/maps?q=40.382481,-74.304363&z=17&output=embed",
      description:
        "0.02 sq mi. The administrative extension of the mainland, serving as a hub for community gathering, civil structuring, residential quarters, and grassroots assemblies. Administered by Governor Harith al-Dehlawi.",
    },
    {
      id: "almaqsoodi",
      name: "Overseas Territory of Al Maqsoodi",
      arabicName: "إقليم المقصودي ما وراء البحار",
      badge: "International Crown Enclave",
      type: "Crown-Administered Overseas Territory",
      coordinates: "24.900514, 67.231703",
      area: "4.87 acres (212,189 sq ft)",
      governorOrAdmin: "Royal Caretakers & Crown Administration",
      capitalOrHub: "Gadap Town, Karachi (Malir Cantonment)",
      iframeSrc: "https://maps.google.com/maps?q=24.900514,67.231703&z=16&output=embed",
      description:
        "4.87 acres. Located internationally in Gadap Town, Karachi. A crown-administered enclave serving as the Sultanate's primary diplomatic, event-hosting, and hospitality hub for macro-national visitors.",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-ivory-300 p-6 md:p-8 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="border-b border-ivory-200 pb-4">
        <span className="text-[10px] font-bold text-brass-gold-700 uppercase tracking-widest block">
          Territorial Sovereignty &amp; Geography
        </span>
        <h3 className="text-2xl font-serif font-bold text-ottoman-red-950 flex flex-wrap items-center gap-2">
          <span>Geographic Wilayat (Provinces &amp; Territories)</span>
          <span className="font-arabic text-lg text-brass-gold-700 font-normal" dir="rtl">
            (أقاليم وولايات السلطنة)
          </span>
        </h3>
        <p className="text-xs text-stone-500 font-sans mt-0.5">
          Live satellite mapping and regional specifications of the Kasimid Sultanate
        </p>
      </div>

      {/* 3 Region Cards Grid with Interactive Embedded Google Maps */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {regions.map((region) => (
          <div
            key={region.id}
            className="bg-ivory-50 rounded-2xl border border-ivory-300 overflow-hidden shadow-sm hover:border-brass-gold-400 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Card Header */}
            <div className="p-5 bg-gradient-to-r from-ottoman-red-950 to-ottoman-red-900 text-ivory-100 space-y-1 relative">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold text-brass-gold-400 uppercase tracking-widest">
                  {region.type}
                </span>
                <span className="font-arabic text-xs text-brass-gold-300" dir="rtl">
                  {region.arabicName}
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-ivory-50 leading-tight">
                {region.name}
              </h4>
            </div>

            {/* Embedded Interactive Google Map */}
            <div className="p-2 bg-white border-b border-ivory-200">
              <iframe
                src={region.iframeSrc}
                width="100%"
                height="250"
                frameBorder="0"
                style={{ border: 0, borderRadius: "8px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Google Map - ${region.name}`}
              />
            </div>

            {/* Region Info Body */}
            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between font-sans">
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brass-gold-100 text-brass-gold-800 border border-brass-gold-300">
                    {region.badge}
                  </span>
                  <span className="text-[10px] font-mono text-stone-500">
                    {region.coordinates}
                  </span>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed">
                  {region.description}
                </p>
              </div>

              {/* Specs footer */}
              <div className="pt-3 border-t border-ivory-200 space-y-1.5 text-[11px] text-stone-600">
                <div className="flex justify-between">
                  <span className="font-medium">Area:</span>
                  <strong className="text-stone-850 font-mono">{region.area}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Authority:</span>
                  <strong className="text-stone-850 font-sans">{region.governorOrAdmin}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Seat / Hub:</span>
                  <strong className="text-stone-850 font-serif">{region.capitalOrHub}</strong>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
