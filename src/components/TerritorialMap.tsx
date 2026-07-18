"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function TerritorialMap() {
  const { getTerritories, language } = useLanguage();
  const territories = getTerritories();

  // Static iframe URLs and coordinates matched to index (0: Ghabaan, 1: Jama'ah, 2: Al Maqsoodi)
  const mapConfigs = [
    {
      id: "ghabaan",
      coordinates: "40.380461, -74.298132",
      iframeSrc: "https://maps.google.com/maps?q=40.380461,-74.298132&z=17&output=embed",
    },
    {
      id: "jamaah",
      coordinates: "40.382481, -74.304363",
      iframeSrc: "https://maps.google.com/maps?q=40.382481,-74.304363&z=17&output=embed",
    },
    {
      id: "almaqsoodi",
      coordinates: "24.900514, 67.231703",
      iframeSrc: "https://maps.google.com/maps?q=24.900514,67.231703&z=16&output=embed",
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
        {territories.map((region, idx) => {
          const config = mapConfigs[idx] || mapConfigs[0];
          return (
            <div
              key={config.id}
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
                  src={config.iframeSrc}
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
                      {config.coordinates}
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
          );
        })}
      </div>

    </div>
  );
}
