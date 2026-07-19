"use client";

import React, { useState, useEffect, Suspense } from "react";
import Flag from "@/components/Flag";
import StatCard from "@/components/StatCard";
import Accordion from "@/components/Accordion";
import ProfileCard from "@/components/ProfileCard";
import Lineage from "@/components/Lineage";
import TerritorialMap from "@/components/TerritorialMap";
import LanguageSelector from "@/components/LanguageSelector";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
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
type TabID = "home" | "regions" | "government" | "history" | "culture" | "relations" | "documents";

interface TabItem {
  id: TabID;
  label: string;
  arabicLabel: string;
}

function MainPortalContent() {
  const [activeTab, setActiveTab] = useState<TabID>("home");
  const { t, isRTL, language, getNewsArticles, getLeaders, getHistoryEras } = useLanguage();

  const newsArticles = getNewsArticles();
  const leaders = getLeaders();
  const historyErasData = getHistoryEras();

  // Sync tab with URL search parameter (?tab=...)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab") as TabID;
      if (
        tabParam &&
        ["home", "regions", "government", "history", "culture", "relations", "documents", "news"].includes(tabParam)
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
    { id: "home", label: t("tab_home"), arabicLabel: "نظرة عامة والعاصمة" },
    { id: "regions", label: t("tab_regions"), arabicLabel: "المناطق الإدارية" },
    { id: "government", label: t("tab_government"), arabicLabel: "البلاط الملكي والشورى" },
    { id: "history", label: t("tab_history"), arabicLabel: "التاريخ والنسب" },
    { id: "culture", label: t("tab_culture"), arabicLabel: "الثقافة والجيش" },
    { id: "relations", label: t("tab_relations"), arabicLabel: "العلاقات الخارجية" },
    { id: "documents", label: t("tab_documents"), arabicLabel: "أحدث الأخبار والمراسيم" },
  ];

  // Dynamic Accordion items using translation state
  const historyEras = historyErasData.map((era) => ({
    title: era.title,
    subtitle: era.subtitle,
    content: (
      <div className="space-y-2">
        <p>{era.content}</p>
      </div>
    ),
  }));

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
                {t("site_title")}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold font-serif tracking-widest text-ivory-100">
                {t("site_title")}
              </h1>
              <p className="text-xs uppercase tracking-widest text-brass-gold-300 font-sans font-medium">
                {t("site_subtitle")}
              </p>
            </div>
          </div>

          {/* Right side: Motto + Language Selector + Portal button */}
          <div className="flex flex-col items-center md:items-end gap-4">

            {/* Top Bar Utilities: Language Selector & Citizen Portal */}
            <div className="flex items-center gap-3">
              <LanguageSelector />

              {/* Citizen Portal Entry Button */}
              <a
                href="/portal/login"
                id="citizen-portal-header-btn"
                className="inline-flex items-center gap-2 bg-brass-gold-500 hover:bg-brass-gold-400 text-ottoman-red-950 font-serif font-bold text-xs md:text-sm px-4 py-2 rounded-xl border-2 border-brass-gold-400 shadow-lg hover:shadow-brass-gold-500/30 transition-all duration-200 tracking-wide"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                {t("citizen_portal")}
                <span className="font-arabic text-[11px] font-normal opacity-80" dir="rtl">
                  ({t("portal_sublabel")})
                </span>
              </a>
            </div>

            {/* National Motto Panel */}
            <div className="border border-brass-gold-500/40 bg-ottoman-red-950/60 rounded-xl p-4 max-w-sm text-center md:text-right shadow-inner">
              <span className="block font-arabic text-brass-gold-300 text-lg mb-1 leading-normal" dir="rtl">
                &quot;{t("motto_text")}&quot;
              </span>
              <p className="text-xs italic text-ivory-200 font-serif">
                &quot;{t("motto_text")}&quot;
              </p>
              <div className="mt-2 text-[9px] uppercase tracking-wider text-brass-gold-400/80 font-semibold font-sans">
                {t("motto_sublabel")}
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Navigation Tabs Bar */}
      <nav className="bg-white border-b border-ivory-300 sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto flex items-center justify-between">
          <div className="flex space-x-1 md:space-x-3 py-2 shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => changeTab(tab.id)}
                className={`px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex flex-col items-center justify-center min-w-[110px] md:min-w-[125px] border focus:outline-none shrink-0 ${
                  activeTab === tab.id
                    ? "bg-ottoman-red-900 text-brass-gold-300 border-brass-gold-500 shadow-sm font-semibold"
                    : "bg-white text-stone-600 border-transparent hover:bg-ivory-50 hover:text-ottoman-red-800"
                }`}
              >
                <span className="font-sans text-xs tracking-wide whitespace-nowrap">{tab.label}</span>
                {language === "en" && (
                  <span className="font-arabic text-[10px] mt-0.5 opacity-80" dir="rtl">
                    {tab.arabicLabel}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Sticky nav portal link */}
          <a
            href="/portal/login"
            id="citizen-portal-nav-btn"
            className="hidden lg:inline-flex shrink-0 items-center gap-1.5 ml-4 text-xs font-semibold text-ottoman-red-900 hover:text-ottoman-red-700 bg-brass-gold-100 hover:bg-brass-gold-200 border border-brass-gold-400 px-3 py-2 rounded-lg transition-all duration-200 font-sans"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
            {t("citizen_portal")}
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
                    {t("sovereign_proclamation")}
                  </span>
                  <h2 className="text-3xl font-serif font-bold text-ivory-50 leading-tight">
                    {t("welcome_title")}
                  </h2>
                  <p className="text-sm text-ivory-200 leading-relaxed font-sans">
                    {t("welcome_desc")}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3">
                    <span className="inline-flex items-center text-xs text-brass-gold-300 bg-ottoman-red-900/60 px-3 py-1.5 rounded-lg border border-brass-gold-600/20">
                      {t("established_date")}
                    </span>
                    <span className="inline-flex items-center text-xs text-brass-gold-300 bg-ottoman-red-900/60 px-3 py-1.5 rounded-lg border border-brass-gold-600/20">
                      {t("capital_name")}
                    </span>
                  </div>
                </div>
              </section>

              {/* Royal Creed Callout */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-brass-gold-500 bg-gradient-to-br from-ottoman-red-950 to-ottoman-red-900 p-6 text-center shadow-md">
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#c29b38_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="relative z-10 space-y-3">
                  <span className="text-[10px] font-bold text-brass-gold-400 uppercase tracking-widest block">
                    {t("creed_title")} • العقيدة السيادية
                  </span>
                  <p className="font-arabic text-brass-gold-300 text-2xl md:text-3xl leading-relaxed py-1" dir="rtl">
                    ”بفضلِ باری تعالیٰ، حصولِ ہر خواب ممکن“
                  </p>
                  <blockquote className="text-sm italic text-ivory-200 font-serif max-w-xl mx-auto">
                    &quot;{t("creed_text")}&quot;
                  </blockquote>
                  <div className="pt-2 border-t border-brass-gold-600/30 max-w-xs mx-auto">
                    <h5 className="font-serif text-xs font-bold text-brass-gold-400">
                      {t("sultan_title")}
                    </h5>
                    <p className="text-[9px] uppercase tracking-wider text-stone-400 font-semibold font-sans mt-0.5">
                      {t("sultan_sub")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <section className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-ottoman-red-900 border-b border-ivory-300 pb-2">
                  {t("indicators_title")}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <StatCard
                    label={t("stat_capital_label")}
                    value={t("stat_capital_val")}
                    subtitle={t("stat_capital_sub")}
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    }
                  />
                  <StatCard
                    label={t("stat_pop_label")}
                    value={t("stat_pop_val")}
                    subtitle={t("stat_pop_sub")}
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    }
                  />
                  <StatCard
                    label={t("stat_area_label")}
                    value={t("stat_area_val")}
                    subtitle={t("stat_area_sub")}
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    }
                  />
                  <StatCard
                    label={t("stat_overseas_label")}
                    value={t("stat_overseas_val")}
                    subtitle={t("stat_overseas_sub")}
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V7.435M12 21a9 9 0 100-18 9 9 0 000 18z" />
                      </svg>
                    }
                  />
                  <StatCard
                    label={t("stat_curr_label")}
                    value={t("stat_curr_val")}
                    subtitle={t("stat_curr_sub")}
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    }
                  />
                  <StatCard
                    label={t("stat_hdi_label")}
                    value={t("stat_hdi_val")}
                    subtitle={t("stat_hdi_sub")}
                    icon={
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    }
                  />
                  <LocalTimeWidget />
                </div>
              </section>

              {/* Dynamic Multilingual Capital City Profile Card */}
              <section className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-sm space-y-4">
                <div className="border-b border-ivory-200 pb-3">
                  <span className="text-[10px] font-bold text-brass-gold-700 uppercase tracking-widest">Featured Profile</span>
                  <h3 className="text-2xl font-serif font-bold text-ottoman-red-950">
                    {t("profile_title")}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                  <div className="space-y-3 text-stone-700 text-sm leading-relaxed font-sans">
                    <p>{t("profile_body")}</p>
                    <p>{t("profile_etymology")}</p>
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

              {/* Relocated Official Documents Registry */}
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

          {/* TAB 2: STANDALONE TAB: ADMINISTRATIVE REGIONS */}
          {activeTab === "regions" && (
            <div className="space-y-8 animate-fadeIn">
              <TerritorialMap />
            </div>
          )}

          {/* TAB 3: LEADERSHIP BIOGRAPHIES */}
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

              {/* Dynamic Multilingual Profile Cards Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                {leaders.map((leader, idx) => (
                  <ProfileCard
                    key={idx}
                    name={leader.name}
                    arabicName={leader.arabicName}
                    title={leader.title}
                    subTitle={leader.subTitle}
                    born={leader.born}
                    origin={leader.origin}
                    association={leader.association}
                    initials={leader.name.substring(0, 2).toUpperCase()}
                    bio={leader.bio}
                  />
                ))}
              </div>

              {/* The Bicameral Majlis (Parliament) Block */}
              <section className="bg-white p-6 md:p-8 rounded-2xl border border-ivory-300 shadow-sm space-y-6">
                <div className="border-b border-ivory-200 pb-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-brass-gold-700 uppercase tracking-widest block">
                      Legislative Structure • المجلس التشريعي
                    </span>
                    <h3 className="text-2xl font-serif font-bold text-ottoman-red-950">
                      {t("majlis_header")}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-semibold px-3 py-1 bg-ivory-100 text-stone-700 border border-ivory-300 rounded-full">
                    {t("majlis_sub")}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Upper Chamber: The Majlis al-Shura */}
                  <div className="bg-gradient-to-br from-ottoman-red-950 to-ottoman-red-900 text-ivory-100 rounded-2xl p-6 border-2 border-brass-gold-500/50 shadow-md space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brass-gold-500/5 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="flex items-center justify-between border-b border-brass-gold-500/30 pb-3">
                      <span className="text-[10px] font-bold text-brass-gold-400 uppercase tracking-widest">
                        {t("shura_sub")}
                      </span>
                      <span className="text-xs font-serif font-semibold text-brass-gold-300">
                        Upper Chamber
                      </span>
                    </div>

                    <h4 className="font-serif text-xl font-bold text-ivory-50">
                      {t("shura_title")}
                    </h4>

                    <p className="text-xs text-brass-gold-300 font-semibold font-serif">
                      {t("shura_presided")}
                    </p>

                    <p className="text-xs text-ivory-200/90 font-sans leading-relaxed pt-1">
                      {t("shura_desc")}
                    </p>
                  </div>

                  {/* Lower Chamber: The People's Assembly */}
                  <div className="bg-ivory-50 rounded-2xl p-6 border border-ivory-300 shadow-sm space-y-3">
                    <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
                      <span className="text-[10px] font-bold text-brass-gold-700 uppercase tracking-widest">
                        {t("assembly_sub")}
                      </span>
                      <span className="text-xs font-serif font-semibold text-stone-600">
                        Lower Chamber
                      </span>
                    </div>

                    <h4 className="font-serif text-xl font-bold text-ottoman-red-950">
                      {t("assembly_title")}
                    </h4>

                    <p className="text-xs text-stone-500 font-semibold font-sans">
                      {t("assembly_rep")}
                    </p>

                    <p className="text-xs text-stone-700 font-sans leading-relaxed pt-1">
                      {t("assembly_desc")}
                    </p>
                  </div>
                </div>
              </section>

              {/* Factions Section */}
              <section className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-ottoman-red-900 border-b border-ivory-300 pb-2">
                  {t("tbl_party_faction")} &amp; Factions Registry
                </h3>
                <PoliticalPartiesTable />
              </section>

            </div>
          )}

          {/* TAB 4: HISTORY & LINEAGE */}
          {activeTab === "history" && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Ancestry Lineage Component */}
              <section>
                <Lineage />
              </section>

              {/* Multilingual History Timeline */}
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
                  {t("weather_box_title")}
                </h3>
                <WeatherBox />
              </section>

            </div>
          )}

          {/* TAB 5: CULTURE & MILITARY */}
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
                      {t("culture_heritage_heading")}
                    </h4>
                    <p>{t("culture_heritage_text1")}</p>
                    <p>{t("culture_heritage_text2")}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-serif text-lg font-semibold text-ottoman-red-900">
                      {t("culture_economy_heading")}
                    </h4>
                    <p>{t("culture_economy_text1")}</p>
                    <p>{t("culture_economy_text2")}</p>
                  </div>
                </div>

                {/* Multilingual National Anthem Component Block */}
                <div className="mt-6 border-2 border-brass-gold-500/50 bg-gradient-to-br from-ottoman-red-950 to-ottoman-red-900 rounded-2xl p-6 md:p-8 text-center text-ivory-100 shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#c29b38_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
                  
                  <div className="relative z-10 space-y-6">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-brass-gold-400 bg-brass-gold-500/10 border border-brass-gold-500/30 px-3 py-1 rounded-full">
                        {t("anthem_badge")}
                      </span>
                      <h4 className="font-arabic text-2xl md:text-3xl text-brass-gold-300 font-bold mt-3" dir="rtl">
                        النشيد الوطني للسلطنة القاسمية (عاشت بلادي)
                      </h4>
                      <p className="text-xs font-serif text-ivory-200/80 tracking-wide mt-1">
                        {t("anthem_header")}
                      </p>
                    </div>

                    {/* Verses Container (Arabic Text Always Displayed + Dynamic Stanza Subtext Translation Below) */}
                    <div className="max-w-xl mx-auto py-4 px-6 bg-ottoman-red-900/60 border border-brass-gold-500/30 rounded-xl space-y-6 text-ivory-50" dir="rtl">
                      
                      {/* Stanza 1 */}
                      <div className="space-y-2 border-b border-brass-gold-600/30 pb-4">
                        <p className="font-arabic text-xl md:text-2xl leading-loose text-brass-gold-100">
                          عاشَت بلادي، بِعزٍّ ويَقين<br />
                          سلطنةُ المجدِ، حِصنٌ أَمين<br />
                          رايَتُنا الخضراءُ في العالَمين<br />
                          بالحقِ والعدلِ نَحنُ نَدين
                        </p>
                        {language !== "ar" && (
                          <p className={`text-xs italic text-brass-gold-300/90 pt-1 leading-relaxed ${language === "ur" ? "font-urdu text-sm" : "font-serif"}`} dir={isRTL ? "rtl" : "ltr"}>
                            {t("anthem_stanza1_trans")}
                          </p>
                        )}
                      </div>

                      {/* Stanza 2 */}
                      <div className="space-y-2 border-b border-brass-gold-600/30 pb-4">
                        <p className="font-arabic text-xl md:text-2xl leading-loose text-brass-gold-100">
                          مِن غاباتِ غبانَ نورٌ سَطَع<br />
                          في جَماعَةِ الخَيرِ شَملٌ جُمِع<br />
                          نَبني الديارَ بعَزمٍ صُلب<br />
                          ويُوسُفُ فينا إمامٌ وَقُطب
                        </p>
                        {language !== "ar" && (
                          <p className={`text-xs italic text-brass-gold-300/90 pt-1 leading-relaxed ${language === "ur" ? "font-urdu text-sm" : "font-serif"}`} dir={isRTL ? "rtl" : "ltr"}>
                            {t("anthem_stanza2_trans")}
                          </p>
                        )}
                      </div>

                      {/* Stanza 3 */}
                      <div className="space-y-2">
                        <p className="font-arabic text-xl md:text-2xl leading-loose text-brass-gold-100">
                          أرواحُنا فِداءٌ لِهذا الثَّرى<br />
                          وما وَراءَ البِحارِ عِزٌّ سَرى<br />
                          حَفِظَ اللهُ السُّلطانَ والوَطَن<br />
                          نَبقى أُباةً عَلى مَرِّ الزَّمَن
                        </p>
                        {language !== "ar" && (
                          <p className={`text-xs italic text-brass-gold-300/90 pt-1 leading-relaxed ${language === "ur" ? "font-urdu text-sm" : "font-serif"}`} dir={isRTL ? "rtl" : "ltr"}>
                            {t("anthem_stanza3_trans")}
                          </p>
                        )}
                      </div>

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
                  <span className="text-[10px] font-bold text-brass-gold-700 uppercase tracking-widest">{t("defense_title")}</span>
                  <h3 className="text-xl font-serif font-bold text-ottoman-red-950">
                    {t("defense_heading")}
                  </h3>
                </div>
                <div className="space-y-3 text-stone-700 text-sm leading-relaxed font-sans">
                  <p>{t("defense_body")}</p>
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

          {/* TAB 6: FOREIGN RELATIONS */}
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
                      EXECUTIVE CHAIR / LEADERSHIP ROLE
                    </span>
                    <h4 className="font-serif font-bold text-lg text-ottoman-red-950 mb-2">
                      OIM
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      Organization of Islamic Micronations. Following the late June election victory of Sultan Yusuf I, the Kasimid Sultanate holds the Chairmanship of the OIM for the 2026 term. The Sultanate directs executive operations, fosters inter-state treaties, and guides diplomatic unity across the Islamic micronational community alongside Vice-Chair Al-Mu&apos;tazz billah of Rovia.
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

          {/* TAB 7: NEWS & DECREES */}
          {activeTab === "documents" && (
            <div className="space-y-8 animate-fadeIn">

              {/* Section Header */}
              <div className="text-center space-y-2 pb-4 border-b border-ivory-300">
                <span className="text-[10px] font-bold text-brass-gold-700 uppercase tracking-widest block">
                  الجريدة الرسمية والمراسيم السلطانية
                </span>
                <h2 className="text-3xl font-serif font-bold text-ottoman-red-950">
                  {t("tab_documents")}
                </h2>
                <p className="text-sm text-stone-500 font-sans max-w-lg mx-auto">
                  Official gazette, royal decrees, state honors, and diplomatic proclamations issued by the Royal Diwan.
                </p>
              </div>

              {/* Dynamic Multilingual News Feed Stack */}
              <div className="space-y-6">
                {newsArticles.map((article, idx) => (
                  <article
                    key={idx}
                    className={`rounded-2xl p-6 md:p-8 shadow-sm space-y-5 transition-all duration-200 ${
                      idx === 0
                        ? "bg-gradient-to-br from-ottoman-red-950 via-ottoman-red-900 to-ottoman-red-950 text-ivory-100 border-2 border-brass-gold-500 shadow-xl relative overflow-hidden"
                        : "bg-white border border-ivory-300 hover:border-brass-gold-400"
                    }`}
                  >
                    {/* Metadata Row */}
                    <div
                      className={`flex flex-wrap items-center justify-between gap-3 border-b pb-4 ${
                        idx === 0 ? "border-brass-gold-500/30" : "border-ivory-200"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 font-serif font-bold text-xs rounded-full uppercase tracking-wider shadow-sm ${
                            idx === 0
                              ? "bg-brass-gold-500 text-ottoman-red-950"
                              : "bg-ottoman-red-900 text-brass-gold-300"
                          }`}
                        >
                          {article.category}
                        </span>
                        <span
                          className={`font-arabic text-xs px-2.5 py-0.5 rounded-full border ${
                            idx === 0
                              ? "text-brass-gold-300 bg-brass-gold-500/10 border-brass-gold-500/20"
                              : "text-ottoman-red-800 bg-ivory-100 border-ivory-300"
                          }`}
                          dir="rtl"
                        >
                          {article.categoryArabic}
                        </span>
                      </div>
                      <time
                        className={`text-xs font-mono font-medium flex items-center gap-1.5 ${
                          idx === 0 ? "text-brass-gold-300" : "text-stone-500"
                        }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {article.date}
                      </time>
                    </div>

                    {/* Headline */}
                    <div>
                      <h3
                        className={`font-serif text-2xl md:text-3xl font-bold leading-tight ${
                          idx === 0 ? "text-ivory-50" : "text-ottoman-red-950"
                        }`}
                      >
                        {article.headline}
                      </h3>
                    </div>

                    {/* Article Content Body */}
                    <div
                      className={`space-y-4 text-sm font-sans leading-relaxed border-t pt-4 ${
                        idx === 0
                          ? "text-ivory-200/90 border-brass-gold-500/20"
                          : "text-stone-700 border-ivory-200"
                      }`}
                    >
                      {article.bodyParagraphs.map((para, pIdx) => (
                        <p key={pIdx}>{para}</p>
                      ))}
                    </div>

                    {/* Official Seal / Signature Badge */}
                    <div
                      className={`pt-4 border-t flex items-center justify-between text-xs font-serif ${
                        idx === 0
                          ? "border-brass-gold-500/30 text-brass-gold-400"
                          : "border-ivory-200 text-stone-500"
                      }`}
                    >
                      <span>{article.issuedBy}</span>
                      <span className="font-arabic text-sm" dir="rtl">
                        الديوان الملكي
                      </span>
                    </div>
                  </article>
                ))}
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
            {t("footer_rights")}
          </p>
          
          <div className="flex justify-center space-x-4 text-brass-gold-400 font-serif text-[10px] tracking-wide pt-2 border-t border-ottoman-red-900/60 max-w-md mx-auto">
            <span>{t("footer_compliance")}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <MainPortalContent />
    </LanguageProvider>
  );
}
