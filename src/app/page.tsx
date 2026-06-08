"use client";

import React, { useState, useEffect, Suspense } from "react";
import Crest from "@/components/Crest";
import StatCard from "@/components/StatCard";
import Accordion from "@/components/Accordion";
import {
  PoliticalPartiesTable,
  ProvincesTable,
  HolidaysTable,
} from "@/components/DataTable";
import {
  LocalTimeWidget,
  CurrencyConverter,
  WeatherBox,
} from "@/components/Widgets";

// Main Portal Tabs
type TabID = "home" | "government" | "history" | "culture" | "relations";

interface TabItem {
  id: TabID;
  label: string;
  arabicLabel: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabID>("home");

  // Sync tab with URL search parameter (?tab=...)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as TabID;
      if (
        tabParam &&
        ["home", "government", "history", "culture", "relations"].includes(tabParam)
      ) {
        setActiveTab(tabParam);
      }
    }
  }, []);

  const changeTab = (tab: TabID) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tab);
      window.history.pushState({}, "", url.toString());
    }
  };

  const tabs: TabItem[] = [
    { id: "home", label: "Overview", arabicLabel: "نظرة عامة" },
    { id: "government", label: "Government", arabicLabel: "الحكومة" },
    { id: "history", label: "History & Geography", arabicLabel: "التاريخ والجغرافيا" },
    { id: "culture", label: "Culture & Holidays", arabicLabel: "الثقافة والتقويم" },
    { id: "relations", label: "Foreign Relations", arabicLabel: "العلاقات الخارجية" },
  ];

  // History timeline accordion content
  const historyItems = [
    {
      title: "1. Raritan Lenape Inhabitants (Pre-1999)",
      subtitle: "Indigenous Heritage & Ancestral Guardianship",
      content: (
        <div>
          <p className="mb-2">
            Prior to modern settlement, the territory of the Raritan Valley in Central New Jersey was under the ancestral stewardship of the <strong>Raritan</strong> and <strong>Navesink</strong> bands of the <strong>Lenape Nation</strong>.
          </p>
          <p>
            The Sultanate honors this heritage, acknowledging the historical paths, rivers, and woodlands that form the geographic bedrock of the modern nation.
          </p>
        </div>
      ),
    },
    {
      title: "2. Y2K Immigration Wave (1999-2001)",
      subtitle: "Establishment of Modern Residency & Growth",
      content: (
        <div>
          <p className="mb-2">
            Between the years 1999 and 2001, a wave of immigration occurred in Central New Jersey. Families and professionals established residency in the area, laying down the early community foundations.
          </p>
          <p>
            This period was characterized by rapid suburban development and cultural diversification, establishing the demographic framework that would later form the citizenry.
          </p>
        </div>
      ),
    },
    {
      title: "3. Raritan Caliphate Period (2001-2025)",
      subtitle: "Early Autonomous Assembly & Civil Codes",
      content: (
        <div>
          <p className="mb-2">
            Following the initial immigration wave, local civil assembly structures developed. This gave rise to the <strong>Raritan Caliphate</strong>, an early sovereign project aimed at organizing community representation and traditional values.
          </p>
          <p>
            For over two decades, the Caliphate maintained cultural ties, managed localized affairs, and drafted early civil codes for its residents.
          </p>
        </div>
      ),
    },
    {
      title: "4. Dissolution & Proclamation of the Kasimid Sultanate (24-25 July 2025)",
      subtitle: "Formal Transition to Sovereign Constitutional Monarchy",
      content: (
        <div>
          <p className="mb-2">
            On <strong>24-25 July 2025</strong>, following a series of constitutional reforms and diplomatic restructuring, the Raritan Caliphate was formally dissolved.
          </p>
          <p>
            In its place, the sovereign constitutional monarchy of <strong>The Kasimid Sultanate</strong> (سلطنتِ القاسميه) was officially proclaimed, establishing the Crown under Sultan Yusuf I and organizing modern ministries.
          </p>
        </div>
      ),
    },
  ];

  // Judicial/Military accordion content
  const govAccordionItems = [
    {
      title: "Judiciary: The Qadi Court System",
      subtitle: "Sharia-based Community Dispute Resolution",
      content: (
        <div>
          <p className="mb-2">
            The judicial branch of The Kasimid Sultanate is governed by the traditional <strong>Qadi System</strong>. Heavily influenced by classic Islamic jurisprudence (Sharia) adapted for a modern municipal setting, it operates as a consensus-focused arbitration board.
          </p>
          <p>
            The Qadi handles civil matters, community contracts, and familial mediation, ensuring all resolutions prioritize community harmony, equity, and restorative justice.
          </p>
        </div>
      ),
    },
    {
      title: "Defense: Jaysh al-Saltanah al-Qasimiyyah",
      subtitle: "Imperial Protection Force & Legal Compliance",
      content: (
        <div>
          <p className="mb-2">
            The national defense is ceremonially represented by the <strong>Jaysh al-Saltanah al-Qasimiyyah</strong> (Forces of the Kasimid Sultanate).
          </p>
          <p className="mb-2">
            In compliance with United States federal law, specifically the <strong>Posse Comitatus Act (18 U.S.C. § 1385)</strong>, the defense force operates exclusively in a ceremonial, civic, and cultural capacity. 
          </p>
          <p>
            It is prohibited from engaging in domestic law enforcement or kinetic military actions, focusing instead on state ceremonies, environmental conservation patrols, and emergency preparedness.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Banner / Navigation Header */}
      <header className="relative bg-ottoman-red-950 text-white border-b-4 border-brass-gold-500 shadow-lg py-8 px-4 md:px-8 overflow-hidden">
        {/* Subtle Geometric Background pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#c29b38_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          {/* Logo & Calligraphy Title */}
          <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
            <Crest size={130} />
            <div className="space-y-1">
              <span className="block font-arabic text-brass-gold-400 text-3xl md:text-4xl leading-relaxed tracking-wide" dir="rtl">
                سلطنتِ القاسميه
              </span>
              <h1 className="text-2xl md:text-3xl font-bold font-serif tracking-widest text-ivory-100">
                THE KASIMID SULTANATE
              </h1>
              <p className="text-xs uppercase tracking-widest text-brass-gold-300 font-sans font-medium">
                Official Sovereign Government Portal • Central New Jersey
              </p>
            </div>
          </div>

          {/* National Motto Panel */}
          <div className="border border-brass-gold-500/40 bg-ottoman-red-900/60 rounded-xl p-4 max-w-sm text-center md:text-right shadow-inner">
            <span className="block font-arabic text-brass-gold-300 text-lg mb-1 leading-normal" dir="rtl">
              "لا يوجد إلا طريق واحد، وهو طريق الله"
            </span>
            <p className="text-xs italic text-ivory-200 font-serif">
              "There is only one way, and that is the way of God"
            </p>
            <div className="mt-2 text-[9px] uppercase tracking-wider text-brass-gold-400/80 font-semibold font-sans">
              National Motto of the Sultanate
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs Bar */}
      <nav className="bg-white border-b border-ivory-300 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto flex justify-center">
          <div className="flex space-x-1 md:space-x-4 py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => changeTab(tab.id)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex flex-col items-center justify-center min-w-[100px] border focus:outline-none ${
                  activeTab === tab.id
                    ? "bg-ottoman-red-900 text-brass-gold-300 border-brass-gold-500 shadow-sm font-semibold"
                    : "bg-white text-stone-600 border-transparent hover:bg-ivory-50 hover:text-ottoman-red-800"
                }`}
              >
                <span className="font-sans text-xs tracking-wide">{tab.label}</span>
                <span className="font-arabic text-[10px] mt-0.5 opacity-80" dir="rtl">
                  {tab.arabicLabel}
                </span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-8 py-8">
        
        {/* Render Tab Contents */}
        <Suspense fallback={<div className="text-center py-10 font-sans text-stone-600">Loading Section...</div>}>
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "home" && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Hero / State Seal Intro */}
              <section className="bg-gradient-to-br from-ottoman-red-950 to-ottoman-red-900 text-white rounded-2xl p-6 md:p-8 shadow-md border border-brass-gold-600/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brass-gold-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="max-w-2xl space-y-4 relative z-10">
                  <span className="inline-block px-3 py-1 bg-brass-gold-600 text-ottoman-red-950 text-[10px] uppercase font-bold tracking-widest rounded-full">
                    Imperial Announcement
                  </span>
                  <h2 className="text-3xl font-serif font-bold text-ivory-50 leading-tight">
                    Welcome to the Sovereign Gateway
                  </h2>
                  <p className="text-sm text-ivory-200 leading-relaxed font-sans">
                    The Kasimid Sultanate is a sovereign constitutional micronation established in Central New Jersey. Anchored by traditional Islamic governance structures, the Sultanate combines historic legal heritage with modern civic administration, fostering a sustainable home economy and cultural enrichment for its citizens.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <span className="inline-flex items-center text-xs text-brass-gold-300 bg-ottoman-red-900/60 px-3 py-1.5 rounded-lg border border-brass-gold-600/20">
                      Established: July 2025
                    </span>
                    <span className="inline-flex items-center text-xs text-brass-gold-300 bg-ottoman-red-900/60 px-3 py-1.5 rounded-lg border border-brass-gold-600/20">
                      Capital City: Ismailabad
                    </span>
                  </div>
                </div>
              </section>

              {/* Quick Stats Grid */}
              <section className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-ottoman-red-900 border-b border-ivory-300 pb-2">
                  National Indicators & Fast Facts
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <StatCard
                    label="Imperial Capital"
                    value="Ismailabad"
                    subtitle="Administrative center and royal seat"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    }
                  />
                  <StatCard
                    label="Citizen Population"
                    value="104 Citizens"
                    subtitle="Demographic registry as of 2026"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    }
                  />
                  <StatCard
                    label="Total Sovereign Area"
                    value="0.078 sq km"
                    subtitle="Equivalent to 0.03 square miles"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    }
                  />
                  <StatCard
                    label="National Currency"
                    value="Kasimi Dinar (QD)"
                    subtitle="Pegged fixed rate: 1 QD = 2 EUR"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                  />
                  <StatCard
                    label="Human Dev. Index (HDI)"
                    value="0.955"
                    subtitle="Category: Very High human development"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    }
                  />
                  <LocalTimeWidget />
                </div>
              </section>

              {/* Demographics Overview section */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-2xl border border-ivory-300 shadow-sm">
                
                {/* Ethnic Demographics */}
                <div className="space-y-4">
                  <h4 className="text-lg font-serif font-bold text-ottoman-red-950 border-b border-ivory-200 pb-2">
                    Ethnic Demographics (2026)
                  </h4>
                  <p className="text-xs text-stone-500 font-sans mb-4">
                    Visual registry of recognized ethnicities among the registered 104 citizens.
                  </p>
                  
                  <div className="space-y-3">
                    {/* Asian: 88.46% */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>Asian</span>
                        <span className="font-mono">88.46%</span>
                      </div>
                      <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-ottoman-red-800 h-full rounded-full transition-all duration-1000" style={{ width: "88.46%" }} />
                      </div>
                    </div>

                    {/* White: 4.81% */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>White</span>
                        <span className="font-mono">4.81%</span>
                      </div>
                      <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-brass-gold-500 h-full rounded-full transition-all duration-1000" style={{ width: "4.81%" }} />
                      </div>
                    </div>

                    {/* Latino: 2.88% */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>Latino</span>
                        <span className="font-mono">2.88%</span>
                      </div>
                      <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-ottoman-red-600 h-full rounded-full transition-all duration-1000" style={{ width: "2.88%" }} />
                      </div>
                    </div>

                    {/* MENA: 2.88% */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>Middle Eastern & North African (MENA)</span>
                        <span className="font-mono">2.88%</span>
                      </div>
                      <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-brass-gold-400 h-full rounded-full transition-all duration-1000" style={{ width: "2.88%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Religious Demographics */}
                <div className="space-y-4">
                  <h4 className="text-lg font-serif font-bold text-ottoman-red-950 border-b border-ivory-200 pb-2">
                    Religious Registry (2026)
                  </h4>
                  <p className="text-xs text-stone-500 font-sans mb-4">
                    Registered religious affiliations within the sovereign boundaries of the Sultanate.
                  </p>

                  <div className="space-y-3">
                    {/* Islam: 80.77% */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>Islam</span>
                        <span className="font-mono">80.77%</span>
                      </div>
                      <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-ottoman-red-900 h-full rounded-full transition-all duration-1000" style={{ width: "80.77%" }} />
                      </div>
                    </div>

                    {/* Christianity: 10.58% */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>Christianity</span>
                        <span className="font-mono">10.58%</span>
                      </div>
                      <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-brass-gold-500 h-full rounded-full transition-all duration-1000" style={{ width: "10.58%" }} />
                      </div>
                    </div>

                    {/* Hinduism: 7.69% */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>Hinduism</span>
                        <span className="font-mono">7.69%</span>
                      </div>
                      <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-ottoman-red-600 h-full rounded-full transition-all duration-1000" style={{ width: "7.69%" }} />
                      </div>
                    </div>

                    {/* Sikhism: 0.96% */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>Sikhism</span>
                        <span className="font-mono">0.96%</span>
                      </div>
                      <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-brass-gold-400 h-full rounded-full transition-all duration-1000" style={{ width: "0.96%" }} />
                      </div>
                    </div>
                  </div>
                </div>

              </section>

              {/* Currency Converter Widget */}
              <section className="max-w-xl mx-auto">
                <CurrencyConverter />
              </section>

            </div>
          )}

          {/* TAB 2: GOVERNMENT & POLITICS */}
          {activeTab === "government" && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* The Crown & Executive Administration */}
              <section className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-sm space-y-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-ottoman-red-950">
                    The Crown & Executive Organs
                  </h3>
                  <p className="text-xs text-stone-500 font-sans tracking-wide mt-1">
                    Administrative Structure of the Hereditary Semi-Feudal Monarchy
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Sultan card */}
                  <div className="relative rounded-xl border border-brass-gold-300 bg-ivory-50/50 p-5 text-center group hover:border-brass-gold-500 transition-colors">
                    <div className="absolute top-3 right-3 text-brass-gold-600 font-serif text-xs uppercase tracking-widest font-bold">
                      Sovereign
                    </div>
                    <div className="w-16 h-16 bg-ottoman-red-900 text-brass-gold-300 rounded-full flex items-center justify-center mx-auto text-xl font-serif font-bold mb-4 shadow border border-brass-gold-400">
                      Y I
                    </div>
                    <h4 className="font-serif text-lg font-bold text-ottoman-red-950">
                      Sultan Yusuf I
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 uppercase font-semibold tracking-wider">
                      Head of State & Dynastic Crown
                    </p>
                    <p className="text-[10px] text-stone-500 mt-3 border-t border-ivory-200 pt-3">
                      Holds supreme decree power and heads the stratocratic executive council.
                    </p>
                  </div>

                  {/* Vizier card */}
                  <div className="relative rounded-xl border border-ivory-300 bg-white p-5 text-center hover:border-brass-gold-400 transition-colors">
                    <div className="absolute top-3 right-3 text-stone-400 font-sans text-[10px] uppercase tracking-wider font-semibold">
                      Grand Vizier
                    </div>
                    <div className="w-16 h-16 bg-ottoman-red-800 text-ivory-100 rounded-full flex items-center justify-center mx-auto text-xl font-serif font-bold mb-4 shadow">
                      AM
                    </div>
                    <h4 className="font-serif text-lg font-bold text-stone-850">
                      Ali Al Masry
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 uppercase font-semibold tracking-wider">
                      Vizier of administration
                    </p>
                    <p className="text-[10px] text-stone-500 mt-3 border-t border-ivory-200 pt-3">
                      Supervises internal affairs, treasury accounts, and civil implementation.
                    </p>
                  </div>

                  {/* Shura Chairman card */}
                  <div className="relative rounded-xl border border-ivory-300 bg-white p-5 text-center hover:border-brass-gold-400 transition-colors">
                    <div className="absolute top-3 right-3 text-stone-400 font-sans text-[10px] uppercase tracking-wider font-semibold">
                      Shura Council
                    </div>
                    <div className="w-16 h-16 bg-ottoman-red-800 text-ivory-100 rounded-full flex items-center justify-center mx-auto text-xl font-serif font-bold mb-4 shadow">
                      HA
                    </div>
                    <h4 className="font-serif text-lg font-bold text-stone-850">
                      Habib Al-Asad
                    </h4>
                    <p className="text-xs text-stone-600 mt-1 uppercase font-semibold tracking-wider">
                      Shura Chairman
                    </p>
                    <p className="text-[10px] text-stone-500 mt-3 border-t border-ivory-200 pt-3">
                      Presides over legislative deliberations and community council seats.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-ottoman-red-50 rounded-xl border border-ottoman-red-200/50 text-stone-700 text-sm leading-relaxed">
                  <span className="font-bold text-ottoman-red-900 block mb-1">Administrative Form:</span>
                  The Kasimid Sultanate is organized as a <strong>Semi-feudal stratocratic hereditary monarchy</strong>. Legislative advisory power is held by the consultative Shura Council, with executive actions coordinated through the Grand Vizier under direct decree of the Sultan.
                </div>
              </section>

              {/* Political Factions & Parties */}
              <section className="space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-ivory-300 pb-2">
                  <h3 className="text-xl font-serif font-bold text-ottoman-red-900">
                    Factions & Political Parties Registry
                  </h3>
                  <span className="text-xs text-stone-500 font-sans font-medium mt-1 md:mt-0">
                    Authorized and Prohibited Factions
                  </span>
                </div>
                
                <PoliticalPartiesTable />
              </section>

              {/* Judicial & Military Accordions */}
              <section className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-ottoman-red-900 border-b border-ivory-300 pb-2">
                  Judicial Power & Imperial Defense
                </h3>

                <Accordion items={govAccordionItems} defaultOpenIndex={0} />
              </section>

            </div>
          )}

          {/* TAB 3: HISTORY & GEOGRAPHY */}
          {activeTab === "history" && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* History Timeline */}
              <section className="space-y-4">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-ottoman-red-950">
                    National History & Timeline
                  </h3>
                  <p className="text-xs text-stone-500 font-sans tracking-wide mt-1">
                    Chronology of sovereignty from Raritan bands to the modern Kasimid Monarchy
                  </p>
                </div>

                <Accordion items={historyItems} defaultOpenIndex={3} />
              </section>

              {/* Wilayat (Provinces) */}
              <section className="space-y-4">
                <div className="flex justify-between items-end border-b border-ivory-300 pb-2">
                  <h3 className="text-xl font-serif font-bold text-ottoman-red-900">
                    Wilayat (Provinces of the Sultanate)
                  </h3>
                  <span className="text-xs text-stone-500 font-sans font-medium">
                    Provincial Governors & Boundaries
                  </span>
                </div>

                <ProvincesTable />
              </section>

              {/* Climate Data / Weather Box */}
              <section className="max-w-xl mx-auto space-y-4">
                <h3 className="text-xl font-serif font-bold text-ottoman-red-900 text-center">
                  Geographical Weather Profile
                </h3>
                <WeatherBox />
              </section>

            </div>
          )}

          {/* TAB 4: CULTURE & SOCIETY */}
          {activeTab === "culture" && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Culture Overview */}
              <section className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-sm space-y-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-ottoman-red-950">
                    Society, Culture & Sustainable Economy
                  </h3>
                  <p className="text-xs text-stone-500 font-sans tracking-wide mt-1">
                    Livelihoods, Customs, and Traditional Commemorations
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-stone-700 text-sm leading-relaxed">
                  <div className="space-y-3">
                    <h4 className="font-serif text-lg font-semibold text-ottoman-red-900">
                      Heritage & Traditions
                    </h4>
                    <p>
                      The cultural fabric of the Sultanate represents a unique integration of Islamic traditions, classical governance motifs, and Raritan Valley maritime trade heritage. 
                    </p>
                    <p>
                      High value is placed on local hospitality, theological inquiry, and architectural aesthetics, which draw inspiration from historical Islamic empires while operating in a modern North American geographic context.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-serif text-lg font-semibold text-ottoman-red-900">
                      Economic Framework
                    </h4>
                    <p>
                      Sultanate economic policy focuses heavily on sustainability and household independence. Due to territorial constraints, the domestic market is characterized by a modest, home-based economy.
                    </p>
                    <p>
                      This includes the crafting of artisanal items, digital trade networks, and minor agricultural activities such as spice processing. Treasury funds are backed through direct reserves pegged to the Euro (EUR) under the Kasimi Dinar.
                    </p>
                  </div>
                </div>
              </section>

              {/* National Holidays Calendar */}
              <section className="space-y-4">
                <div className="flex justify-between items-end border-b border-ivory-300 pb-2">
                  <h3 className="text-xl font-serif font-bold text-ottoman-red-900">
                    Official Calendar & National Holidays
                  </h3>
                  <span className="text-xs text-stone-500 font-sans font-medium">
                    Religious & Cultural Observances
                  </span>
                </div>

                <HolidaysTable />
              </section>

            </div>
          )}

          {/* TAB 5: FOREIGN RELATIONS */}
          {activeTab === "relations" && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Stance & Framework */}
              <section className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-sm space-y-4">
                <h3 className="text-2xl font-serif font-bold text-ottoman-red-950">
                  Diplomatic Doctrine & Stance
                </h3>
                <p className="text-stone-700 text-sm leading-relaxed">
                  The Kasimid Sultanate maintains a strict <strong>neutral foreign policy</strong>. The Sultanate does not take part in military blocks, regional disputes, or kinetic alliances. It actively advocates for peace, human rights, and the recognition of oppressed populations across global forums, seeking friendly bilateral cultural exchanges and academic trade partnerships.
                </p>
              </section>

              {/* Alliances & Memberships */}
              <section className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-ottoman-red-900 border-b border-ivory-300 pb-2">
                  International Memberships & Alliances
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* UNAM */}
                  <div className="bg-white p-5 rounded-xl border border-ivory-300 hover:border-brass-gold-400 transition-colors shadow-sm">
                    <span className="text-[10px] font-bold text-brass-gold-700 uppercase tracking-widest block mb-1">
                      Co-Founder
                    </span>
                    <h4 className="font-serif font-bold text-lg text-ottoman-red-950 mb-2">
                      UNAM
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      United Nations of Allied Micronations. The Sultanate holds a founding seat, championing diplomatic integrity and micronational sovereignty criteria.
                    </p>
                  </div>

                  {/* OIM */}
                  <div className="bg-white p-5 rounded-xl border border-ivory-300 hover:border-brass-gold-400 transition-colors shadow-sm">
                    <span className="text-[10px] font-bold text-brass-gold-700 uppercase tracking-widest block mb-1">
                      Chief Justice Role
                    </span>
                    <h4 className="font-serif font-bold text-lg text-ottoman-red-950 mb-2">
                      OIM
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Organization of Islamic Micronations. The Sultanate serves a leading judicial function, coordinating legal reviews and inter-state treaties.
                    </p>
                  </div>

                  {/* UMO */}
                  <div className="bg-white p-5 rounded-xl border border-ivory-300 hover:border-brass-gold-400 transition-colors shadow-sm">
                    <span className="text-[10px] font-bold text-brass-gold-700 uppercase tracking-widest block mb-1">
                      Active Member
                    </span>
                    <h4 className="font-serif font-bold text-lg text-ottoman-red-950 mb-2">
                      UMO
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Union of Micronational Organizations. Member since late 2025, assisting with regional trade standards and coordinate environmental programs.
                    </p>
                  </div>
                </div>
              </section>

              {/* Recognition Lists */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Unilateral Recognition */}
                <div className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-sm space-y-4">
                  <h4 className="text-lg font-serif font-bold text-ottoman-red-950 border-b border-ivory-200 pb-2 flex items-center justify-between">
                    <span>Unilateral Recognition Extended</span>
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
                  </h4>
                  <p className="text-xs text-stone-500">
                    Sovereign states and territories formally recognized by decree of the Sultanate:
                  </p>
                  <ul className="space-y-2.5 text-sm text-stone-700 font-sans">
                    <li className="flex items-center space-x-2">
                      <span className="text-brass-gold-600 font-bold">•</span>
                      <span><strong>United Nations (UN)</strong> — Recognized as the supreme international administrative forum.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-brass-gold-600 font-bold">•</span>
                      <span><strong>Palestine</strong> — Full sovereign recognition extended under historical borders.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-brass-gold-600 font-bold">•</span>
                      <span><strong>East Turkestan</strong> — Recognized as a sovereign cultural territory.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-brass-gold-600 font-bold">•</span>
                      <span><strong>Taiwan (ROC)</strong> — Recognized under criteria of self-determination.</span>
                    </li>
                  </ul>
                </div>

                {/* Refused Recognition */}
                <div className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-sm space-y-4">
                  <h4 className="text-lg font-serif font-bold text-stone-850 border-b border-ivory-200 pb-2 flex items-center justify-between">
                    <span>Recognition Explicitly Refused</span>
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                  </h4>
                  <p className="text-xs text-stone-500">
                    Entities with which diplomatic ties are officially prohibited by the Crown:
                  </p>
                  <ul className="space-y-2.5 text-sm text-stone-700 font-sans">
                    <li className="flex items-center space-x-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>State of Israel</strong> — Diplomatic engagement explicitly prohibited and unrecognized.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>People's Republic of China (PRC)</strong> — Diplomatic relations refused in protest of human rights concerns.</span>
                    </li>
                  </ul>
                </div>

              </section>

            </div>
          )}

        </Suspense>
      </main>

      {/* Official State Footer */}
      <footer className="bg-ottoman-red-950 text-white border-t-2 border-brass-gold-500 py-8 px-4 mt-12 text-center text-xs font-sans space-y-3 relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#c29b38_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
        
        <div className="max-w-6xl mx-auto space-y-4 relative z-10">
          <div className="flex justify-center mb-2">
            <Crest size={60} />
          </div>
          
          <p className="text-brass-gold-300 uppercase tracking-widest font-semibold">
            دیوانِ خاص سلطنتِ القاسميه
          </p>
          
          <p className="text-ivory-200/80">
            © {new Date().getFullYear()} The Kasimid Sultanate. All Rights Reserved. 
            <br />
            Imperial Registry of Deeds, Census, and Foreign Registry, Ismailabad.
          </p>
          
          <div className="flex justify-center space-x-4 text-brass-gold-400 font-serif text-[10px] tracking-wide pt-2 border-t border-ottoman-red-900/60 max-w-md mx-auto">
            <span>Sovereign Constitutional Monarchy</span>
            <span>•</span>
            <span>Central New Jersey</span>
            <span>•</span>
            <span>Compliant with 18 U.S.C. § 1385</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
