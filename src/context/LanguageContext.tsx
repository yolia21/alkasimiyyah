"use client";

import React, { createContext, useContext, useState } from "react";

export type LanguageCode = "en" | "ar" | "fa" | "ur";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  dir: "ltr" | "rtl";
  isRTL: boolean;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  dir: "ltr",
  isRTL: false,
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>("en");

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
  };

  const isRTL = language === "ar" || language === "fa" || language === "ur";
  const dir = isRTL ? "rtl" : "ltr";

  const t = (key: string): string => {
    return key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        dir,
        isRTL,
        t,
      }}
    >
      <div dir={dir}>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
