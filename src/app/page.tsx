"use client";

import React, { useState, useEffect, Suspense } from "react";
import Flag from "@/components/Flag";
import StatCard from "@/components/StatCard";
import Accordion from "@/components/Accordion";
import ProfileCard from "@/components/ProfileCard";
import Lineage from "@/components/Lineage";
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
type TabID = "home" | "government" | "history" | "culture" | "relations" | "documents";

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
        ["home", "government", "history", "culture", "relations", "documents", "news"].includes(tabParam)
      ) {
        setActiveTab(tabParam === ("news" as TabID) ? "documents" : tabParam);
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
    { id: "home", label: "Overview & Capital", arabicLabel: "نظرة عامة والعاصمة" },
    { id: "government", label: "Royal Court & Shura", arabicLabel: "البلاط الملكي والشورى" },
    { id: "history", label: "History & Lineage", arabicLabel: "التاريخ والنسب" },
    { id: "culture", label: "Culture & Military", arabicLabel: "الثقافة والجيش" },
    { id: "relations", label: "Foreign Relations", arabicLabel: "العلاقات الخارجية" },
    { id: "documents", label: "News & Decrees", arabicLabel: "أحدث الأخبار والمراسيم" },
  ];

  // Detailed Historical Eras Accordion
  const historyEras = [
    {
      title: "Prehistoric Record: Lenape Inhabitants",
      subtitle: "Indigenous Stewardship & Raritan Corridor",
      content: (
        <div className="space-y-2">
          <p>
            Long before modern administrative boundaries were established, the physical territory along the Raritan River and the Trans Old Bridge Road corridor was sustained by the ancestral habitation of the <strong>Unami band</strong> of the <strong>Lenape Nation</strong>.
          </p>
          <p>
            The Unami stewards maintained seasonal paths and agricultural grounds along the river waterways, establishing the human ecological foundation of Central New Jersey.
          </p>
        </div>
      ),
    },
    {
      title: "Colonial Period & Crown Grants (1664–1737)",
      subtitle: "English Sovereign Control & Brownville Settlement",
      content: (
        <div className="space-y-2">
          <p>
            English sovereign control over the territory was formalized in <strong>1664</strong>, culminating in the erection of Middlesex County boundaries in <strong>1683</strong>.
          </p>
          <p>
            In <strong>1737</strong>, a landmark 1,000-acre Crown land grant was issued to John and Susannah Brown, formally establishing the historical sector of <strong>&quot;Brownville&quot;</strong> (Browntown / Trans Old Bridge Road sector).
          </p>
        </div>
      ),
    },
    {
      title: "Revolutionary War & 19th Century (1778–1975)",
      subtitle: "Road to Monmouth & Township Incorporation",
      content: (
        <div className="space-y-2">
          <p>
            During the American Revolutionary War, the corridor served as a strategic crossroads for troop movements leading toward the pivotal <strong>Battle of Monmouth (1778)</strong>.
          </p>
          <p>
            The surrounding municipal region was incorporated as <strong>Madison Township in 1869</strong>, and subsequently renamed <strong>Old Bridge Township in 1975</strong>.
          </p>
        </div>
      ),
    },
    {
      title: "Late 20th Century Demographic Shift (1999–2001)",
      subtitle: "The Y2K Migration & Royal Lineage Settlement",
      content: (
        <div className="space-y-2">
          <p>
            At the turn of the 21st century, a major migration wave of South Asian and Middle Eastern technology professionals arrived in Central New Jersey to perform crucial infrastructure adjustments resolving the Y2K computer bug.
          </p>
          <p>
            This movement brought the ancestral lineages of the royal family to the region between <strong>1999 and 2001</strong>, establishing the vibrant cultural, academic, and economic network of the modern citizenry.
          </p>
        </div>
      ),
    },
    {
      title: "Early Independence Movements (1999–2021)",
      subtitle: "Waliustan & The Hashemia Proclamation",
      content: (
        <div className="space-y-2">
          <p>
            Micronational governance began in <strong>1999</strong> with the founding of the <em>Islamic Republic of Waliustan</em> by ten Pakistani immigrants.
          </p>
          <p>
            On <strong>August 31, 2021</strong>, the <em>Kingdom of Hashemia</em> was proclaimed, establishing Qadirabad with an initial population of 80 residents. A royal election on September 1, 2021, formally chose the Hashemite dynastic framework.
          </p>
        </div>
      ),
    },
    {
      title: "The Hashemian Era & Conflicts (2021–2023)",
      subtitle: "Civil Strife, Expansion, and Territorial Annexations",
      content: (
        <div className="space-y-3">
          <p>
            This era saw intense political activity and rapid territorial expansion, marked by pivotal events:
          </p>
          <div className="pl-4 border-l-2 border-brass-gold-400 py-1 space-y-2 text-xs bg-white rounded p-3">
            <p>
              <strong>• Hashemian Civil War (Oct 10, 2021):</strong> Neutralized the West Qadirabad progressive federalist faction to restore administrative authority.
            </p>
            <p>
              <strong>• Hashemian National Project (Jan 8, 2022):</strong> Annexed Khaled City and Badayun utilizing tactical bicycle mobility.
            </p>
            <p>
              <strong>• Decker Rebellion Suppression (Jan 23, 2022):</strong> Neutralized internal dissident uprisings to maintain state security.
            </p>
            <p>
              <strong>• Annexation of Tartary (Oct 22, 2022):</strong> Formally annexed the Republic of Tartary and its capital, Tarillamun.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "The VECTO Era & Cyber Warfare (2023–2024)",
      subtitle: "International Alliances & The USR Crusade",
      content: (
        <div className="space-y-3">
          <p>
            On <strong>July 5, 2023</strong>, the state joined UMN and VECTO, rebranding to the <em>Hashemite Kingdom of Raritania</em> on July 15. The state suffered the &quot;Dark Age&quot; server destruction in August 2023, followed immediately by digital platform reconstruction and the founding of UNAM on August 6, 2023.
          </p>
          <p>
            On <strong>November 22, 2023</strong>, the realm mounted a successful defense against the USR &quot;Grand Crusade,&quot; which led to the complete structural collapse of the USR on February 4, 2024.
          </p>
        </div>
      ),
    },
    {
      title: "The Raritan Caliphate (2024–2025)",
      subtitle: "Caliphal Governance & Dynastic Abdication",
      content: (
        <div className="space-y-2">
          <p>
            On <strong>December 30, 2024</strong>, the state proclaimed the <em>Raritan Caliphate</em>, shifting state machinery toward classical caliphal governance principles and marking the formal abdication of traditional royal titles by the Majidid family.
          </p>
        </div>
      ),
    },
    {
      title: "Establishment of the Kasimid Sultanate (2025–Present)",
      subtitle: "Constitutional Order & Reign of Sultan Yusuf I",
      content: (
        <div className="space-y-2">
          <p>
            Following the unilateral dissolution of caliphal structures due to administrative over-expansion, the modern <strong>Constitution of the Kasimid Sultanate</strong> was ratified on <strong>July 24, 2025</strong>.
          </p>
          <p>
            The constitution established a bicameral Majlis with political advisor <em>Jasbirji XV</em> appointed as inaugural Minister of Culture. On <strong>May 11, 2026</strong>, the Grand Vizier role transitioned from Mikail Jidar to <em>Ali Al Masry</em>.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 flex flex-col">
      {/* Top Banner / Navigation Header */}
      <header className="relative bg-ottoman-red-900 text-white border-b-4 border-brass-gold-500 shadow-lg py-8 px-4 md:px-8 overflow-hidden">
        {/* Subtle Geometric Background pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#c29b38_1.5px,transparent_1.5px)] [background-size:24px_24px]" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          
          {/* Logo & Calligraphy Title */}
          <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
            <Flag width={180} height={120} />
            <div className="space-y-1">
              <span className="block font-arabic text-brass-gold-400 text-3xl md:text-4xl leading-relaxed tracking-wide animate-pulse" dir="rtl">
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

          {/* Right side: Motto + Portal button */}
          <div className="flex flex-col items-center md:items-end gap-4">

            {/* National Motto Panel */}
            <div className="border border-brass-gold-500/40 bg-ottoman-red-950/60 rounded-xl p-4 max-w-sm text-center md:text-right shadow-inner">
              <span className="block font-arabic text-brass-gold-300 text-lg mb-1 leading-normal" dir="rtl">
                &quot;لا يوجد إلا طريق واحد، وهو طريق الله&quot;
              </span>
              <p className="text-xs italic text-ivory-200 font-serif">
                &quot;There is only one way, and that is the way of God&quot;
              </p>
              <div className="mt-2 text-[9px] uppercase tracking-wider text-brass-gold-400/80 font-semibold font-sans">
                National Motto of the Sultanate
              </div>
            </div>

            {/* Citizen Portal Entry Button */}
            <a
              href="/portal/login"
              id="citizen-portal-header-btn"
              className="inline-flex items-center gap-2 bg-brass-gold-500 hover:bg-brass-gold-400 text-ottoman-red-950 font-serif font-bold text-sm px-5 py-2.5 rounded-xl border-2 border-brass-gold-400 shadow-lg hover:shadow-brass-gold-500/30 transition-all duration-200 tracking-wide"
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
              Citizen Portal
              <span className="font-arabic text-[11px] font-normal opacity-80" dir="rtl">دیوانِ خاص</span>
            </a>

          </div>
        </div>
      </header>

      {/* Navigation Tabs Bar */}
      <nav className="bg-white border-b border-ivory-300 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto flex items-center justify-between">
          <div className="flex space-x-1 md:space-x-4 py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => changeTab(tab.id)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex flex-col items-center justify-center min-w-[120px] border focus:outline-none ${
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

          {/* Sticky nav portal link */}
          <a
            href="/portal/login"
            id="citizen-portal-nav-btn"
            className="hidden md:inline-flex shrink-0 items-center gap-1.5 ml-4 text-xs font-semibold text-ottoman-red-900 hover:text-ottoman-red-700 bg-brass-gold-100 hover:bg-brass-gold-200 border border-brass-gold-400 px-3 py-2 rounded-lg transition-all duration-200 font-sans"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
            Citizen Portal
          </a>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 md:px-8 py-8">
        
        <Suspense fallback={<div className="text-center py-10 font-sans text-stone-600">Loading Section...</div>}>
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "home" && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Hero Banner */}
              <section className="bg-gradient-to-br from-ottoman-red-950 to-ottoman-red-900 text-white rounded-2xl p-6 md:p-8 shadow-md border border-brass-gold-600/40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brass-gold-500/5 rounded-full blur-3xl pointer-events-none" />
                
                <div className="max-w-2xl space-y-4 relative z-10">
                  <span className="inline-block px-3 py-1 bg-brass-gold-600 text-ottoman-red-950 text-[10px] uppercase font-bold tracking-widest rounded-full">
                    Sovereign Proclamation
                  </span>
                  <h2 className="text-3xl font-serif font-bold text-ivory-50 leading-tight">
                    Welcome to the Sovereign Gateway
                  </h2>
                  <p className="text-sm text-ivory-200 leading-relaxed font-sans">
                    The Kasimid Sultanate is a sovereign micronation in Central New Jersey. Anchored by traditional Islamic governance structures, the Sultanate combines historic legal heritage with modern civic administration, fostering a sustainable home economy and cultural enrichment for its citizens.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <span className="inline-flex items-center text-xs text-brass-gold-300 bg-ottoman-red-900/60 px-3 py-1.5 rounded-lg border border-brass-gold-600/20">
                      Established: July 25, 2025
                    </span>
                    <span className="inline-flex items-center text-xs text-brass-gold-300 bg-ottoman-red-900/60 px-3 py-1.5 rounded-lg border border-brass-gold-600/20">
                      Capital: Ismailabad
                    </span>
                  </div>
                </div>
              </section>

              {/* Royal Creed Callout */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-brass-gold-500 bg-gradient-to-br from-ottoman-red-950 to-ottoman-red-900 p-6 text-center shadow-md">
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#c29b38_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10 space-y-3">
                  <span className="text-[10px] font-bold text-brass-gold-400 uppercase tracking-widest block">
                    The Sovereign&apos;s Creed • العقيدة السيادية
                  </span>
                  <p className="font-arabic text-brass-gold-300 text-2xl md:text-3xl leading-relaxed py-1" dir="rtl">
                    ”بفضلِ باری تعالیٰ، حصولِ ہر خواب ممکن“
                  </p>
                  <blockquote className="text-sm italic text-ivory-200 font-serif max-w-xl mx-auto">
                    &quot;By the grace of God, the attainment of every dream is possible.&quot;
                  </blockquote>
                  <div className="pt-2 border-t border-brass-gold-600/30 max-w-xs mx-auto">
                    <h5 className="font-serif text-xs font-bold text-brass-gold-400">
                      Sultan Yusuf I
                    </h5>
                    <p className="text-[9px] uppercase tracking-wider text-stone-400 font-semibold font-sans mt-0.5">
                      Sultan of the Kasimids
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <section className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-ottoman-red-900 border-b border-ivory-300 pb-2">
                  National Indicators &amp; Fast Facts
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <StatCard
                    label="Imperial Capital"
                    value="Ismailabad (إسماعيل آباد)"
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
                    subtitle="88.46% Asian | 80.77% Islam"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    }
                  />
                  <StatCard
                    label="Total Sovereign Area"
                    value="0.078 sq km (0.03 sq mi)"
                    subtitle="Consisting of Ghabaan & Jama’ah"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    }
                  />
                  <StatCard
                    label="Overseas Territories"
                    value="1 Territory (Al Maqsoodi)"
                    subtitle="4.87 acres (212,189 sq ft) located in Gadap Town, Karachi"
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V7.435M12 21a9 9 0 100-18 9 9 0 000 18z" />
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

              {/* Capital City Profile Card */}
              <section className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-sm space-y-4">
                <div className="border-b border-ivory-200 pb-3">
                  <span className="text-[10px] font-bold text-brass-gold-700 uppercase tracking-widest">Featured Profile</span>
                  <h3 className="text-2xl font-serif font-bold text-ottoman-red-950">
                    Ismailabad (إسماعيل آباد) — Imperial Capital
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  <div className="space-y-3 text-stone-700 text-sm leading-relaxed">
                    <p>
                      <strong>Ismailabad</strong> serves as the administrative capital and dynastic seat of the Sultanate. Comprising a carefully cataloged territory, it stands as the heart of governmental operations, treasury archives, and the Shura chamber.
                    </p>
                    <p>
                      <strong>Etymology:</strong> The name represents a synthesis of cultural lineage and language. <em>Ismail</em> is in honor of the revered father of the current Sultan, Sidi Isma’il al-Raniri. The suffix <em>-abad</em> is derived from Persian, meaning &quot;cultivated place,&quot; &quot;town,&quot; or &quot;city,&quot; symbolizing a settlement founded on prosperity and structure.
                    </p>
                  </div>
                  
                  {/* Photograph of Capital */}
                  <div className="space-y-2 text-center group">
                    <div className="overflow-hidden rounded-xl border border-brass-gold-300 shadow-sm bg-ivory-50 p-1">
                      <img
                        src="/5.png"
                        alt="Photograph of Ismailabad, Wilayat-e Ghabaan, Sultanat-i Kasimi"
                        className="w-full h-40 object-cover rounded-lg hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="block text-[10px] italic text-stone-500 font-sans leading-tight">
                      Ismailabad, Wilayat-e Ghabaan, Sultanat-i Kasimi
                    </span>
                  </div>
                  
                  {/* Stats Box inside Profile */}
                  <div className="bg-ivory-50 rounded-xl border border-ivory-200 p-4 space-y-2">
                    <h5 className="font-serif text-xs font-bold text-ottoman-red-950 uppercase tracking-wider border-b border-ivory-200 pb-1.5">
                      Capital Specifications
                    </h5>
                    <div className="space-y-1.5 text-xs text-stone-600 font-sans">
                      <div className="flex justify-between">
                        <span>Demonym:</span>
                        <strong className="text-stone-850">Ismailabadi</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Area:</span>
                        <strong className="text-stone-850">7,015 sq meters</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Seat of:</span>
                        <strong className="text-stone-850">The Royal Diwan</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Demographics Overview section */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-2xl border border-ivory-300 shadow-sm">
                
                {/* Ethnic Demographics */}
                <div className="space-y-4">
                  <h4 className="text-lg font-serif font-bold text-ottoman-red-950 border-b border-ivory-200 pb-2">
                    Ethnic Registry (2026)
                  </h4>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>Asian</span>
                        <span className="font-mono">88.46%</span>
                      </div>
                      <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-ottoman-red-800 h-full rounded-full" style={{ width: "88.46%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>White</span>
                        <span className="font-mono">4.81%</span>
                      </div>
                      <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-brass-gold-500 h-full rounded-full" style={{ width: "4.81%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>Latino</span>
                        <span className="font-mono">2.88%</span>
                      </div>
                      <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-ottoman-red-600 h-full rounded-full" style={{ width: "2.88%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>MENA</span>
                        <span className="font-mono">2.88%</span>
                      </div>
                      <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-brass-gold-400 h-full rounded-full" style={{ width: "2.88%" }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Religious Demographics */}
                <div className="space-y-4">
                  <h4 className="text-lg font-serif font-bold text-ottoman-red-950 border-b border-ivory-200 pb-2">
                    Religious Registry (2026)
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>Islam</span>
                        <span className="font-mono">80.77%</span>
                      </div>
                      <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-ottoman-red-900 h-full rounded-full" style={{ width: "80.77%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>Christianity</span>
                        <span className="font-mono">10.58%</span>
                      </div>
                      <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-brass-gold-500 h-full rounded-full" style={{ width: "10.58%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>Hinduism</span>
                        <span className="font-mono">7.69%</span>
                      </div>
                      <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-ottoman-red-600 h-full rounded-full" style={{ width: "7.69%" }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                        <span>Sikhism</span>
                        <span className="font-mono">0.96%</span>
                      </div>
                      <div className="w-full bg-ivory-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-brass-gold-400 h-full rounded-full" style={{ width: "0.96%" }} />
                      </div>
                    </div>
                  </div>
                </div>

              </section>

              {/* Currency Converter */}
              <section className="max-w-xl mx-auto">
                <CurrencyConverter />
              </section>

              {/* Relocated Official Documents Registry (Constitution & Census Report Download Cards) */}
              <section className="space-y-4">
                <div className="flex justify-between items-end border-b border-ivory-300 pb-2">
                  <h3 className="text-xl font-serif font-bold text-ottoman-red-900">
                    Official State Archives &amp; Constitutional Documents
                  </h3>
                  <span className="text-xs text-stone-500 font-sans font-medium">
                    Sovereign Legal Charters
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Constitution Card */}
                  <div className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-sm space-y-4 hover:border-brass-gold-400 transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-brass-gold-500 opacity-80" />
                    
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-brass-gold-700 uppercase tracking-widest block">Supreme Law</span>
                        <h4 className="font-serif text-lg font-bold text-stone-850">
                          The Imperial Constitution
                        </h4>
                        <p className="text-xs text-stone-600 font-sans">
                          Codified constitution establishing the structure of the Sultanate, vizierate, legislative assemblies, and citizen charters.
                        </p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-ivory-100 text-ottoman-red-800 shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3 pt-2">
                      <a
                        href="/Full-Constitution-of-the-Kasimid-Sultanate.docx-2.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-xs font-semibold bg-ottoman-red-900 hover:bg-ottoman-red-800 text-white py-2 rounded-lg transition-colors border border-transparent shadow-sm"
                      >
                        View Constitution (PDF)
                      </a>
                      <a
                        href="/Full-Constitution-of-the-Kasimid-Sultanate.docx-2.pdf"
                        download
                        className="text-center text-xs font-semibold bg-ivory-100 hover:bg-brass-gold-100 text-stone-700 px-3 py-2 rounded-lg transition-colors border border-ivory-300 flex items-center justify-center"
                        title="Download PDF"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Census Report Card */}
                  <div className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-sm space-y-4 hover:border-brass-gold-400 transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-brass-gold-500 opacity-80" />
                    
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-brass-gold-700 uppercase tracking-widest block">Demographic Record</span>
                        <h4 className="font-serif text-lg font-bold text-stone-850">
                          2026 Kasimid Census Report
                        </h4>
                        <p className="text-xs text-stone-600 font-sans">
                          Detailed survey of national statistics covering the 104 registered citizens, documenting ethnic origins and religious backgrounds.
                        </p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-ivory-100 text-ottoman-red-800 shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3 pt-2">
                      <a
                        href="/2026-kasimid-sultanate-census-report-1.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center text-xs font-semibold bg-ottoman-red-900 hover:bg-ottoman-red-800 text-white py-2 rounded-lg transition-colors border border-transparent shadow-sm"
                      >
                        View Census Report (PDF)
                      </a>
                      <a
                        href="/2026-kasimid-sultanate-census-report-1.pdf"
                        download
                        className="text-center text-xs font-semibold bg-ivory-100 hover:bg-brass-gold-100 text-stone-700 px-3 py-2 rounded-lg transition-colors border border-ivory-300 flex items-center justify-center"
                        title="Download PDF"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </section>

            </div>
          )}

          {/* TAB 2: LEADERSHIP BIOGRAPHIES */}
          {activeTab === "government" && (
            <div className="space-y-8 animate-fadeIn">
              
              <div>
                <h3 className="text-2xl font-serif font-bold text-ottoman-red-950">
                  Leadership of the Sultanate
                </h3>
                <p className="text-xs text-stone-500 font-sans tracking-wide mt-1">
                  Profiles of the Monarch, Vizierate, and Shura Council Leadership
                </p>
              </div>

              {/* 3-Column Profile Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                
                {/* The Sultan */}
                <ProfileCard
                  name="King Yusuf bin Isma’il al-Raniri I"
                  arabicName="يوسف بن إسماعيل الرانيري الأول"
                  title="Sultan of the Kasimid Sultanate"
                  subTitle="House of Majidid"
                  born="21 January 2008"
                  origin="House of Majidid"
                  association="Dynastic Crown"
                  initials="Y I"
                  bio="Sultan Yusuf I began his sovereign reign as the King and Caliph of Raritania from 2014 until 2025. Following constitutional negotiations and the desire to build a more stable, legacy-oriented state, he formally dissolved the Caliphate and established the constitutional monarchy of the Kasimid Sultanate on 25 July 2025, honoring his ancestor Kasim al-Raniri."
                />

                {/* Grand Vizier */}
                <ProfileCard
                  name="Ali Al Masry"
                  arabicName="علي المصري"
                  title="Grand Vizier & Prime Minister"
                  subTitle="Leader of Al-Hizb al-Islami"
                  born="9 February 2009"
                  origin="Alexandria, Egypt"
                  association="Al-Hizb al-Islami ruling party"
                  initials="AM"
                  bio="Ali Al Masry was born in Alexandria, Egypt, and is a key figure in the Ayal Ali clan. Serving as Grand Vizier, he leads the ruling party of the Sultanate. Outside of statecraft, he is noted for his linguistic achievements, serving as the creator of the Umaedic language, and holds administrative control over internal affairs."
                />

                {/* Chairman of the Shura */}
                <ProfileCard
                  name="Habibullah Mikail Al-Asad"
                  arabicName="حبيب الله ميكائيل الأسد"
                  title="Chairman of the consultative Shura"
                  subTitle="Incumbent since 28 Dec 2024"
                  born="11 September 2008"
                  origin="Brooklyn, NY"
                  association="Consultative Assembly"
                  initials="HA"
                  bio="Habibullah Mikail Al-Asad was born in Brooklyn, NY. He took office as Chairman of the Shura Council on 28 December 2024. He presides over legislative advising and coordinates council assemblies, serving as a vital bridge between the citizenry and the Grand Vizier's administration."
                />

              </div>

              {/* Factions Section */}
              <section className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-ottoman-red-900 border-b border-ivory-300 pb-2">
                  Consultative Assembly &amp; Factions Registry
                </h3>
                <PoliticalPartiesTable />
              </section>

            </div>
          )}

          {/* TAB 3: HISTORY & LINEAGE */}
          {activeTab === "history" && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Ancestry Lineage Component */}
              <section>
                <Lineage />
              </section>

              {/* History Timeline */}
              <section className="space-y-4">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-ottoman-red-950">
                    Historical Eras of the Territory
                  </h3>
                  <p className="text-xs text-stone-500 font-sans tracking-wide mt-1">
                    Timeline from Raritan Lenape ancestry to the modern Kasimid dynasty
                  </p>
                </div>

                <Accordion items={historyEras} defaultOpenIndex={historyEras.length - 1} />
              </section>

              {/* Wilayat (Provinces) */}
              <section className="space-y-4">
                <div className="flex justify-between items-end border-b border-ivory-300 pb-2">
                  <h3 className="text-xl font-serif font-bold text-ottoman-red-900">
                    Wilayat (Provinces of the Sultanate)
                  </h3>
                  <span className="text-xs text-stone-500 font-sans font-medium">
                    Provincial Governors &amp; Boundaries
                  </span>
                </div>

                <ProvincesTable />
              </section>

              {/* Dedicated Overseas Territories Subsection */}
              <section className="space-y-4">
                <div className="flex justify-between items-end border-b border-ivory-300 pb-2">
                  <h3 className="text-xl font-serif font-bold text-ottoman-red-900">
                    Overseas Territories • أقاليم ما وراء البحار
                  </h3>
                  <span className="text-xs text-stone-500 font-sans font-medium">
                    Crown-Administered Lands
                  </span>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-sm space-y-4 hover:border-brass-gold-400 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-ivory-200 pb-3">
                    <div>
                      <span className="text-[10px] font-bold text-brass-gold-700 uppercase tracking-widest block">Crown Territory</span>
                      <h4 className="font-serif text-xl font-bold text-ottoman-red-950 flex flex-wrap items-center gap-2">
                        <span>Overseas Territory of Al Maqsoodi</span>
                        <span className="font-arabic text-base text-brass-gold-700 font-normal" dir="rtl">
                          (إقليم المقصودي ما وراء البحار)
                        </span>
                      </h4>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-ottoman-red-100 text-ottoman-red-900 border border-ottoman-red-200 self-start md:self-auto">
                      Crown-Administered Hub
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-sans text-stone-700">
                    <div className="space-y-3">
                      <div>
                        <strong className="text-ottoman-red-950 font-serif block text-xs uppercase tracking-wider mb-1">Geographic Location</strong>
                        <p className="text-stone-600">
                          Memon Goth Road, Gadap Town, Karachi (Malir Cantonment region).
                        </p>
                      </div>
                      <div>
                        <strong className="text-ottoman-red-950 font-serif block text-xs uppercase tracking-wider mb-1">Administrative Status</strong>
                        <p className="text-stone-600">
                          Crown-Administered Territory managed by local caretakers under the Sultanate. Serves as a primary tourism, hospitality, and event-hosting hub for macro-national visitors.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 bg-ivory-50 p-4 rounded-xl border border-ivory-200">
                      <strong className="text-ottoman-red-950 font-serif block text-xs uppercase tracking-wider mb-1">Lineage Connection &amp; Treaty</strong>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Named in honor of <strong>Syed Maqsood Azam (1934–2024)</strong>, member of the Majidid dynasty and great-grandson of Mir Majid Ali. The property is held via a formal treaty finalized on <strong>August 25, 2023, at 3:00 PM PKT</strong> between Sultan Yusuf I and the owner, <strong>Umm Omar</strong> (first cousin of the Sultan&apos;s maternal grandmother).
                      </p>
                      <div className="pt-2 border-t border-ivory-200 flex justify-between text-[11px] font-mono text-stone-500">
                        <span>Extent: 4.87 acres</span>
                        <span>(212,189 sq ft)</span>
                      </div>
                    </div>
                  </div>
                </div>
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

          {/* TAB 4: CULTURE & MILITARY */}
          {activeTab === "culture" && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Society & Economy */}
              <section className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-sm space-y-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-ottoman-red-950">
                    Society, Culture &amp; Economy
                  </h3>
                  <p className="text-xs text-stone-500 font-sans tracking-wide mt-1">
                    Customs, Traditional Livelihoods, and Economic Foundations
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-stone-700 text-sm leading-relaxed">
                  <div className="space-y-3">
                    <h4 className="font-serif text-lg font-semibold text-ottoman-red-900">
                      Heritage &amp; Spices
                    </h4>
                    <p>
                      The cultural landscape combines classical Islamic values, regional South Asian/MENA heritage, and Raritan Valley maritime traditions.
                    </p>
                    <p>
                      Sultanate community groups focus heavily on botanical fragrance craft, traditional theological debates, and the preservation of dynastic histories.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-serif text-lg font-semibold text-ottoman-red-900">
                      Spiritual &amp; Home Economy
                    </h4>
                    <p>
                      The economy is characterized by a modest, home-based production framework. Due to geographic limitations, citizens focus on producing high-quality artisanal crafts, digital services, and spice processing (specializing in dried dates and traditional culinary blends).
                    </p>
                    <p>
                      Treasury reserves are strictly regulated, with the Kasimi Dinar pegged firmly to the Euro (EUR) to guarantee economic integrity.
                    </p>
                  </div>
                </div>

                {/* National Anthem Component Block */}
                <div className="mt-6 border-2 border-brass-gold-500/50 bg-gradient-to-br from-ottoman-red-950 to-ottoman-red-900 rounded-2xl p-6 md:p-8 text-center text-ivory-100 shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#c29b38_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
                  
                  <div className="relative z-10 space-y-6">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-brass-gold-400 bg-brass-gold-500/10 border border-brass-gold-500/30 px-3 py-1 rounded-full">
                        National Anthem • النشيد الوطني
                      </span>
                      <h4 className="font-arabic text-2xl md:text-3xl text-brass-gold-300 font-bold mt-3" dir="rtl">
                        النشيد الوطني للسلطنة القاسمية (عاشت بلادي)
                      </h4>
                      <p className="text-xs font-serif text-ivory-200/80 tracking-wide mt-1">
                        National Anthem of the Kasimid Sultanate (&quot;Long Live My Country&quot;)
                      </p>
                    </div>

                    <div className="max-w-xl mx-auto py-4 px-6 bg-ottoman-red-900/60 border border-brass-gold-500/30 rounded-xl space-y-4 font-arabic text-lg md:text-xl text-ivory-50 leading-loose" dir="rtl">
                      <p className="border-b border-brass-gold-600/30 pb-3">
                        عاشَت بلادي، بِعزٍّ ويَقين<br />
                        سلطنةُ المجدِ، حِصنٌ أَمين<br />
                        رايَتُنا الخضراءُ في العالَمين<br />
                        بالحقِ والعدلِ نَحنُ نَدين
                      </p>
                      <p className="border-b border-brass-gold-600/30 pb-3">
                        مِن غاباتِ غبانَ نورٌ سَطَع<br />
                        في جَماعَةِ الخَيرِ شَملٌ جُمِع<br />
                        نَبني الديارَ بعَزمٍ صُلب<br />
                        ويُوسُفُ فينا إمامٌ وَقُطب
                      </p>
                      <p>
                        أرواحُنا فِداءٌ لِهذا الثَّرى<br />
                        وما وَراءَ البِحارِ عِزٌّ سَرى<br />
                        حَفِظَ اللهُ السُّلطانَ والوَطَن<br />
                        نَبقى أُباةً عَلى مَرِّ الزَّمَن
                      </p>
                    </div>

                    {/* Styled HTML5 Audio Player */}
                    <div className="pt-2 max-w-md mx-auto flex flex-col items-center gap-2">
                      <audio controls className="w-full h-10 rounded-lg accent-brass-gold-500">
                        <source src="/national-anthem.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                      <span className="text-[10px] text-brass-gold-400/80 font-sans uppercase tracking-wider">
                        Official Ceremonial Rendition
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Jaysh al-Saltanah (Military) */}
              <section className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-sm space-y-4">
                <div className="border-b border-ivory-200 pb-3">
                  <span className="text-[10px] font-bold text-brass-gold-700 uppercase tracking-widest">Defense Doctrine</span>
                  <h3 className="text-xl font-serif font-bold text-ottoman-red-950">
                    Jaysh al-Saltanah al-Qasimiyyah (Forces of the Kasimid Sultanate)
                  </h3>
                </div>
                <div className="space-y-3 text-stone-700 text-sm leading-relaxed">
                  <p>
                    The national defense force, <strong>Jaysh al-Saltanah al-Qasimiyyah</strong>, serves in a strictly ceremonial and cultural reenactment capacity. 
                  </p>
                  <p>
                    In order to maintain absolute compliance with local and federal statutes of the host nation (specifically United States federal law under the <strong>Posse Comitatus Act - 18 U.S. Code § 1385</strong>), the forces are entirely prohibited from executing domestic law enforcement actions, civil policing, or active kinetic operations. 
                  </p>
                  <p>
                    Their duties are limited to serving as honor guards for the Sultan, coordinating local cultural events, maintaining historical registries, and preparing emergency preparedness drills.
                  </p>
                </div>
              </section>

              {/* National Holidays Calendar */}
              <section className="space-y-4">
                <div className="flex justify-between items-end border-b border-ivory-300 pb-2">
                  <h3 className="text-xl font-serif font-bold text-ottoman-red-900">
                    Official Calendar &amp; National Holidays
                  </h3>
                  <span className="text-xs text-stone-500 font-sans font-medium">
                    Religious &amp; Cultural Observances
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
                  Diplomatic Doctrine &amp; Stance
                </h3>
                <p className="text-stone-700 text-sm leading-relaxed">
                  The Kasimid Sultanate maintains a strict <strong>neutral foreign policy</strong>. The Sultanate does not take part in military blocks, regional disputes, or kinetic alliances. It actively advocates for peace, human rights, and the recognition of oppressed populations across global forums, seeking friendly bilateral cultural exchanges and academic trade partnerships.
                </p>
              </section>

              {/* Alliances & Memberships */}
              <section className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-ottoman-red-900 border-b border-ivory-300 pb-2">
                  International Memberships &amp; Alliances
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
                      <span><strong>State of Israel</strong> — Unrecognized and diplomatic ties prohibited.</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-red-500 font-bold">•</span>
                      <span><strong>People&apos;s Republic of China (PRC)</strong> — Unrecognized in protest of regional rights concerns.</span>
                    </li>
                  </ul>
                </div>

              </section>

            </div>
          )}

          {/* TAB 6: NEW RENAMED TAB: NEWS & DECREES */}
          {activeTab === "documents" && (
            <div className="space-y-8 animate-fadeIn">

              {/* Section Header */}
              <div className="text-center space-y-2 pb-4 border-b border-ivory-300">
                <span className="text-[10px] font-bold text-brass-gold-700 uppercase tracking-widest block">
                  الجريدة الرسمية والمراسيم السلطانية
                </span>
                <h2 className="text-3xl font-serif font-bold text-ottoman-red-950">
                  News &amp; Royal Decrees
                </h2>
                <p className="text-sm text-stone-500 font-sans max-w-lg mx-auto">
                  Official gazette, royal decrees, state honors, and diplomatic proclamations issued by the Royal Diwan.
                </p>
              </div>

              {/* News Feed Stack (Sorted Newest First) */}
              <div className="space-y-6">

                {/* News Article 1: 13 July 2026 (Featured Royal Decree Card) */}
                <article className="relative bg-gradient-to-br from-ottoman-red-950 via-ottoman-red-900 to-ottoman-red-950 text-ivory-100 rounded-2xl border-2 border-brass-gold-500 shadow-xl overflow-hidden p-6 md:p-8 space-y-5">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brass-gold-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 relative z-10 border-b border-brass-gold-500/30 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-brass-gold-500 text-ottoman-red-950 font-serif font-bold text-xs rounded-full uppercase tracking-wider shadow-sm">
                        Royal Decree
                      </span>
                      <span className="font-arabic text-brass-gold-300 text-xs px-2.5 py-0.5 rounded-full bg-brass-gold-500/10 border border-brass-gold-500/20" dir="rtl">
                        وسام علي شهالي
                      </span>
                    </div>
                    <time className="text-xs font-mono font-medium text-brass-gold-300 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      13 July 2026
                    </time>
                  </div>

                  {/* Headline */}
                  <div className="space-y-2 relative z-10">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-ivory-50 leading-tight">
                      Sultanate Establishes The Order of Ali Shihali; Awards Grand Collar to Imruland President
                    </h3>
                  </div>

                  {/* Article Content Body */}
                  <div className="space-y-4 text-ivory-200/90 text-sm font-sans leading-relaxed relative z-10 border-t border-brass-gold-500/20 pt-4">
                    <p>
                      By royal decree of Sultan Yusuf I, the Kasimid Sultanate has officially established its first state order of merit, <strong className="text-brass-gold-300 font-serif">The Order of Ali Shihali</strong> (<span className="font-arabic text-brass-gold-200" dir="rtl">وسام علي شهالي</span>). Named in honor of the incumbent Vizier, Ali Al Masry (Ali Shihali), the Order is designed to recognize exceptional diplomatic, political, and civil service to the Sultanate and the broader intermicronational community.
                    </p>
                    <p>
                      The Order features three grades: Grand Collar, Commander, and Member. The inaugural induction took place upon the Order&apos;s establishment, with the Sultan bestowing the highest grade, the <strong className="text-brass-gold-300 font-serif">Grand Collar</strong>, upon <strong className="text-brass-gold-200">Showib Ahmmed</strong>, President of the Democratic People&apos;s Republic of Imruland and former Chairman of the Organization of Islamic Micronations (OIM). The honor was granted in recognition of President Ahmmed&apos;s dedicated diplomatic service, intermicronational cooperation, and steadfast support of Kasimid sovereignty.
                    </p>
                  </div>

                  {/* Official Seal / Signature Badge */}
                  <div className="pt-4 border-t border-brass-gold-500/30 flex items-center justify-between text-xs font-serif text-brass-gold-400 relative z-10">
                    <span>Issued by Order of Sultan Yusuf I</span>
                    <span className="font-arabic text-sm" dir="rtl">الديوان الملكي</span>
                  </div>
                </article>

                {/* News Article 2: 01 July 2026 (OIM Chairmanship Card) */}
                <article className="bg-white rounded-2xl border border-ivory-300 p-6 md:p-8 shadow-sm space-y-5 hover:border-brass-gold-400 transition-all duration-200">
                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ivory-200 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-ottoman-red-900 text-brass-gold-300 font-serif font-bold text-xs rounded-full uppercase tracking-wider shadow-sm">
                        OIM Leadership
                      </span>
                      <span className="font-arabic text-ottoman-red-800 text-xs px-2.5 py-0.5 rounded-full bg-ivory-100 border border-ivory-300" dir="rtl">
                        رئاسة منظمة الميكرونations الإسلامية
                      </span>
                    </div>
                    <time className="text-xs font-mono font-medium text-stone-500 flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-brass-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      01 July 2026
                    </time>
                  </div>

                  {/* Headline */}
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl font-bold text-ottoman-red-950 leading-snug">
                      Sultan Yusuf I Assumes Chairmanship of the OIM Following Election Victory
                    </h3>
                  </div>

                  {/* Body Text */}
                  <div className="space-y-3 text-stone-700 text-sm font-sans leading-relaxed border-t border-ivory-200 pt-4">
                    <p>
                      On 1 July 2026, Sultan Yusuf I officially assumed the office of Chairman of the Organization of Islamic Micronations (OIM), succeeding outgoing Chairman Showib Ahmmed.
                    </p>
                    <p>
                      The transition of leadership follows a decisive late June election in which the Sultan defeated his opponent, Amir Abbas Arya&apos;i of Arsalania, to secure the seat. Upon taking office, Sultan Yusuf I immediately moved to form his administration, officially appointing Al-Mu&apos;tazz billah of the State of Rovia to serve as Vice-Chair of the organization. The Sultanate looks forward to leading the OIM in fostering greater diplomatic and economic cooperation across the Islamic micronational community.
                    </p>
                  </div>
                </article>

                {/* News Article 3: 25 July 2025 (Constitutional Proclamation) */}
                <article className="bg-white rounded-2xl border border-ivory-300 p-6 md:p-7 shadow-sm space-y-4 hover:border-brass-gold-400 transition-all duration-200">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ivory-200 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-ottoman-red-100 text-ottoman-red-900 font-serif font-semibold text-xs rounded-full uppercase tracking-wider border border-ottoman-red-200">
                        Constitutional Proclamation
                      </span>
                      <span className="font-arabic text-stone-600 text-xs" dir="rtl">إعلان رسمي</span>
                    </div>
                    <time className="text-xs font-mono font-medium text-stone-500">25 July 2025</time>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-ottoman-red-950">
                    Proclamation of the Kasimid Sultanate &amp; Ratification of the Imperial Constitution
                  </h3>

                  <p className="text-xs md:text-sm text-stone-700 font-sans leading-relaxed">
                    Sultan Yusuf I formally proclaimed the establishment of the sovereign Kasimid Sultanate, replacing previous caliphal structures with a codified constitutional monarchy and establishing the bicameral Majlis.
                  </p>
                </article>

              </div>

              {/* Seal Note */}
              <div className="text-center pt-4">
                <p className="text-xs text-stone-400 font-sans italic">
                  All announcements are official records published by the Royal Diwan of the Kasimid Sultanate.
                </p>
              </div>

            </div>
          )}

        </Suspense>
      </main>

      {/* Official State Footer */}
      <footer className="bg-ottoman-red-950 text-white border-t-2 border-brass-gold-500 py-8 px-4 mt-12 text-center text-xs font-sans space-y-3 relative">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#c29b38_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
        
        <div className="max-w-6xl mx-auto space-y-4 relative z-10">
          <div className="flex justify-center mb-2">
            <Flag width={90} height={60} />
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
