"use client";

import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function LanguageSelector() {
  const [isTranslated, setIsTranslated] = useState(false);

  useEffect(() => {
    // Check if a translation cookie exists
    const checkTranslated = () => {
      if (document.cookie.includes("googtrans=/en/") && !document.cookie.includes("googtrans=/en/en")) {
        setIsTranslated(true);
      } else {
        setIsTranslated(false);
      }
    };

    checkTranslated();
    const interval = setInterval(checkTranslated, 1000);

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "ar,fa,ur,en",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }

    return () => clearInterval(interval);
  }, []);

  const resetToEnglish = () => {
    // Clear Google Translate cookies
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname + ";";
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2" title="Select Language / اختر اللغة">
      <div id="google_translate_element" />

      {/* English Reset Escape Hatch Button */}
      <button
        onClick={resetToEnglish}
        type="button"
        className="inline-flex items-center gap-1 bg-ottoman-red-950/80 hover:bg-ottoman-red-950 text-brass-gold-300 hover:text-brass-gold-200 border border-brass-gold-500/40 px-2.5 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-brass-gold-400 font-serif"
        title="Reset language back to English"
      >
        <svg className="w-3.5 h-3.5 text-brass-gold-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Reset English
      </button>
    </div>
  );
}
