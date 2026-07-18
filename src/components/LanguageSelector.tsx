"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage, LANGUAGES, LanguageCode } from "@/context/LanguageContext";

export default function LanguageSelector() {
  const { language, setLanguage, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 bg-ottoman-red-950/80 hover:bg-ottoman-red-950 text-brass-gold-300 hover:text-brass-gold-200 border border-brass-gold-500/40 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-brass-gold-400"
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Select Language / اختر اللغة / انتخاب زبان"
      >
        <svg
          className="w-4 h-4 text-brass-gold-400 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.6 9h16.8M3.6 15h16.8"
          />
        </svg>

        <span className="font-serif tracking-wide">{currentLangObj.nativeName}</span>

        <svg
          className={`w-3.5 h-3.5 text-brass-gold-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute ${
            isRTL ? "left-0" : "right-0"
          } mt-2 w-40 rounded-xl bg-white border border-brass-gold-400/50 shadow-xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden animate-fadeIn`}
        >
          <div className="py-1 bg-ivory-50">
            <div className="px-3 py-1.5 text-[9px] uppercase font-bold tracking-widest text-stone-500 border-b border-ivory-200 font-sans">
              Language / اللغة
            </div>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                  language === lang.code
                    ? "bg-ottoman-red-900 text-brass-gold-300 font-bold"
                    : "text-stone-800 hover:bg-brass-gold-100 hover:text-ottoman-red-900"
                }`}
              >
                <span className="font-serif">{lang.nativeName}</span>
                {language === lang.code && (
                  <span className="text-brass-gold-400 text-xs font-bold">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
