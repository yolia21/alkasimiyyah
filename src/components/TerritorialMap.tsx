"use client";

import React, { useState } from "react";

export interface RegionDetail {
  id: "ghabaan" | "jamaah" | "almaqsoodi";
  name: string;
  arabicName: string;
  type: "Wilayah (Province)" | "Crown-Administered Overseas Territory";
  area: string;
  governorOrAdmin: string;
  capitalOrHub: string;
  description: string;
  terrainType: string;
  color: string;
  badge: string;
}

export default function TerritorialMap() {
  const regions: RegionDetail[] = [
    {
      id: "ghabaan",
      name: "Wilayat of Ghabaan",
      arabicName: "ولاية الغابات",
      type: "Wilayah (Province)",
      area: "0.01 sq mi (7,015 sq m)",
      governorOrAdmin: "Governor Al-Himalayi",
      capitalOrHub: "Ismailabad (Imperial Capital)",
      description:
        "The historical core and seat of the capital, Ismailabad. Characterized by dense, cultivated forest terrain, housing the Royal Diwan, treasury archives, and sovereign councils.",
      terrainType: "Cultivated Woodlands & Forest Corridor",
      color: "#4d050a", // Ottoman Red
      badge: "Historical Core & Capital Seat",
    },
    {
      id: "jamaah",
      name: "Wilayat of Jama’ah",
      arabicName: "ولاية الجماعة",
      type: "Wilayah (Province)",
      area: "0.02 sq mi (13,000 sq m)",
      governorOrAdmin: "Governor Harith al-Dehlawi",
      capitalOrHub: "Jama'ah Al-Ula",
      description:
        "The administrative extension of the mainland, serving as a hub for community gathering, civil structuring, residential quarters, and grassroots assemblies.",
      terrainType: "Suburban Residential & Assembly Grounds",
      color: "#c29b38", // Brass Gold
      badge: "Mainland Administrative Hub",
    },
    {
      id: "almaqsoodi",
      name: "Overseas Territory of Al Maqsoodi",
      arabicName: "إقليم المقصودي ما وراء البحار",
      type: "Crown-Administered Overseas Territory",
      area: "4.87 acres (212,189 sq ft)",
      governorOrAdmin: "Royal Caretakers & Crown Administration",
      capitalOrHub: "Gadap Town, Karachi (Malir Cantonment)",
      description:
        "Located internationally in Gadap Town, Karachi. A crown-administered enclave established via formal treaty on August 25, 2023, serving as the Sultanate's primary diplomatic, event-hosting, and hospitality hub for macro-national visitors.",
      terrainType: "Agricultural Estate & Macro-National Hospitality Hub",
      color: "#065f46", // Emerald Crown
      badge: "International Crown Enclave",
    },
  ];

  const [selectedRegionId, setSelectedRegionId] = useState<"ghabaan" | "jamaah" | "almaqsoodi">("ghabaan");

  const selectedRegion = regions.find((r) => r.id === selectedRegionId) || regions[0];

  return (
    <div className="bg-white rounded-2xl border border-ivory-300 p-6 md:p-8 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-ivory-200 pb-4">
        <div>
          <span className="text-[10px] font-bold text-brass-gold-700 uppercase tracking-widest block">
            Territorial Sovereignty &amp; Geography
          </span>
          <h3 className="text-2xl font-serif font-bold text-ottoman-red-950 flex items-center gap-2">
            Geographic Wilayat (Provinces &amp; Territories)
          </h3>
          <p className="text-xs text-stone-500 font-sans mt-0.5">
            Interactive map &amp; regional specifications of the Kasimid Sultanate
          </p>
        </div>

        {/* Region Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {regions.map((region) => (
            <button
              key={region.id}
              onClick={() => setSelectedRegionId(region.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-serif transition-all duration-200 flex items-center gap-1.5 border ${
                selectedRegionId === region.id
                  ? "bg-ottoman-red-900 text-brass-gold-300 border-brass-gold-500 shadow-sm"
                  : "bg-ivory-100 text-stone-700 border-ivory-300 hover:bg-brass-gold-100 hover:text-ottoman-red-900"
              }`}
            >
              <span>{region.name.replace("Wilayat of ", "").replace("Overseas Territory of ", "")}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Left Interactive SVG Map, Right Detailed Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* SVG Interactive Map Graphic (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-ottoman-red-950 to-ottoman-red-900 rounded-2xl p-5 border-2 border-brass-gold-500/40 relative overflow-hidden flex flex-col justify-between shadow-md min-h-[340px]">
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#c29b38_1.5px,transparent_1.5px)] [background-size:20px_20px]" />

          <div className="relative z-10 flex items-center justify-between text-brass-gold-300 text-xs font-serif border-b border-brass-gold-500/30 pb-2">
            <span className="uppercase tracking-wider font-bold">Imperial Cartography</span>
            <span className="font-arabic" dir="rtl">خريطة السلطنة</span>
          </div>

          {/* Interactive SVG Diagram */}
          <div className="relative z-10 my-4 flex justify-center items-center">
            <svg viewBox="0 0 400 300" className="w-full h-auto max-h-[240px] filter drop-shadow-lg">
              <defs>
                <linearGradient id="grad-ghabaan" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7f1d1d" />
                  <stop offset="100%" stopColor="#4d050a" />
                </linearGradient>
                <linearGradient id="grad-jamaah" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#92400e" />
                </linearGradient>
                <linearGradient id="grad-almaqsoodi" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#064e3b" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#c29b38" strokeWidth="0.5" strokeOpacity="0.15" />
              </pattern>
              <rect width="400" height="300" fill="url(#grid)" />

              {/* REGION 1: Ghabaan Polygon */}
              <g
                onClick={() => setSelectedRegionId("ghabaan")}
                className="cursor-pointer transition-all duration-300 hover:opacity-90 group"
              >
                <path
                  d="M 40 40 L 180 30 L 210 130 L 60 160 Z"
                  fill="url(#grad-ghabaan)"
                  stroke={selectedRegionId === "ghabaan" ? "#fef08a" : "#c29b38"}
                  strokeWidth={selectedRegionId === "ghabaan" ? "3" : "1.5"}
                />
                <circle cx="110" cy="85" r="4" fill="#fef08a" />
                <text x="110" y="105" textAnchor="middle" fill="#fef08a" fontSize="12" fontFamily="serif" fontWeight="bold">
                  Ghabaan
                </text>
                <text x="110" y="120" textAnchor="middle" fill="#fef08a" opacity="0.8" fontSize="9" fontFamily="sans-serif">
                  (Ismailabad Capital)
                </text>
              </g>

              {/* REGION 2: Jama'ah Polygon */}
              <g
                onClick={() => setSelectedRegionId("jamaah")}
                className="cursor-pointer transition-all duration-300 hover:opacity-90 group"
              >
                <path
                  d="M 220 50 L 360 70 L 340 180 L 190 150 Z"
                  fill="url(#grad-jamaah)"
                  stroke={selectedRegionId === "jamaah" ? "#fef08a" : "#c29b38"}
                  strokeWidth={selectedRegionId === "jamaah" ? "3" : "1.5"}
                />
                <circle cx="275" cy="110" r="4" fill="#fef08a" />
                <text x="275" y="130" textAnchor="middle" fill="#fef08a" fontSize="12" fontFamily="serif" fontWeight="bold">
                  Jama’ah
                </text>
                <text x="275" y="145" textAnchor="middle" fill="#fef08a" opacity="0.8" fontSize="9" fontFamily="sans-serif">
                  (Jama'ah Al-Ula)
                </text>
              </g>

              {/* REGION 3: Al Maqsoodi Inset Polygon (Overseas) */}
              <g
                onClick={() => setSelectedRegionId("almaqsoodi")}
                className="cursor-pointer transition-all duration-300 hover:opacity-90 group"
              >
                {/* Inset Box Outline */}
                <rect x="30" y="190" width="340" height="95" rx="8" fill="#064e3b" fillOpacity="0.4" stroke="#c29b38" strokeDasharray="3,3" strokeWidth="1" />
                
                <path
                  d="M 50 210 L 190 200 L 170 270 L 40 260 Z"
                  fill="url(#grad-almaqsoodi)"
                  stroke={selectedRegionId === "almaqsoodi" ? "#fef08a" : "#6ee7b7"}
                  strokeWidth={selectedRegionId === "almaqsoodi" ? "3" : "1.5"}
                />
                
                <circle cx="110" cy="235" r="4" fill="#6ee7b7" />
                <text x="110" y="250" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontFamily="serif" fontWeight="bold">
                  Al Maqsoodi Enclave
                </text>
                
                {/* Inset Text Label */}
                <text x="280" y="225" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontFamily="serif" fontWeight="bold">
                  OVERSEAS INSET
                </text>
                <text x="280" y="240" textAnchor="middle" fill="#ivory" opacity="0.8" fontSize="8" fontFamily="sans-serif">
                  Gadap Town, Karachi
                </text>
                <text x="280" y="255" textAnchor="middle" fill="#ivory" opacity="0.8" fontSize="8" fontFamily="sans-serif">
                  (4.87 Acres Crown Land)
                </text>
              </g>
            </svg>
          </div>

          <div className="relative z-10 text-[10px] text-brass-gold-400/80 font-sans text-center">
            Click any region above to view detailed provincial specifications
          </div>
        </div>

        {/* Selected Region Detailed Card (7 cols) */}
        <div className="lg:col-span-7 bg-ivory-50 rounded-2xl p-6 border border-ivory-300 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-ivory-200 pb-3">
              <div>
                <span className="text-[10px] font-bold text-brass-gold-700 uppercase tracking-widest block">
                  {selectedRegion.type}
                </span>
                <h4 className="font-serif text-2xl font-bold text-ottoman-red-950 flex flex-wrap items-center gap-2">
                  <span>{selectedRegion.name}</span>
                  <span className="font-arabic text-lg text-brass-gold-700 font-normal" dir="rtl">
                    ({selectedRegion.arabicName})
                  </span>
                </h4>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brass-gold-100 text-brass-gold-800 border border-brass-gold-300">
                {selectedRegion.badge}
              </span>
            </div>

            <p className="text-sm text-stone-700 font-sans leading-relaxed">
              {selectedRegion.description}
            </p>

            {/* Specifications Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-3.5 rounded-xl border border-ivory-200 space-y-1">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                  Total Territorial Area
                </span>
                <span className="text-sm font-mono font-bold text-ottoman-red-950">
                  {selectedRegion.area}
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-ivory-200 space-y-1">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                  Administrative Center / Seat
                </span>
                <span className="text-xs font-serif font-bold text-stone-850">
                  {selectedRegion.capitalOrHub}
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-ivory-200 space-y-1">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                  Appointed Authority
                </span>
                <span className="text-xs font-sans font-semibold text-stone-850">
                  {selectedRegion.governorOrAdmin}
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-ivory-200 space-y-1">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                  Terrain &amp; Landscape
                </span>
                <span className="text-xs font-sans text-stone-700">
                  {selectedRegion.terrainType}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-ivory-200 flex items-center justify-between text-xs text-stone-500 font-sans">
            <span>Official Sovereign Territory of the Sultanate</span>
            <span className="font-mono text-[10px]">Imperial Registry Code: KS-REG-03</span>
          </div>
        </div>

      </div>

    </div>
  );
}
