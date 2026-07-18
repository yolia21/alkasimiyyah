"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type LanguageCode = "en" | "ar" | "fa" | "ur";

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
}

export const LANGUAGES: LanguageOption[] = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl" },
  { code: "fa", name: "Farsi", nativeName: "فارسی", dir: "rtl" },
  { code: "ur", name: "Urdu", nativeName: "اردو", dir: "rtl" },
];

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Navigation Tabs
    tab_home: "Overview & Capital",
    tab_regions: "Territories & Maps",
    tab_government: "Royal Court & Shura",
    tab_history: "History & Lineage",
    tab_culture: "Culture & Military",
    tab_relations: "Foreign Relations",
    tab_documents: "News & Decrees",

    // Sublabels / Arabic Calligraphy Hints
    tab_home_sub: "Overview & Capital",
    tab_regions_sub: "Territories & Maps",
    tab_government_sub: "Royal Court & Shura",
    tab_history_sub: "History & Lineage",
    tab_culture_sub: "Culture & Military",
    tab_relations_sub: "Foreign Relations",
    tab_documents_sub: "News & Decrees",

    // Header & Portal
    site_title: "THE KASIMID SULTANATE",
    site_subtitle: "Official Sovereign Government Portal • Central New Jersey",
    citizen_portal: "Citizen Portal",
    portal_sublabel: "Royal Diwan",
    motto_text: "There is only one way, and that is the way of God",
    motto_sublabel: "National Motto of the Sultanate",

    // Hero & Callout
    sovereign_proclamation: "Sovereign Proclamation",
    welcome_title: "Welcome to the Sovereign Gateway",
    creed_title: "The Sovereign's Creed",
    creed_text: "By the grace of God, the attainment of every dream is possible.",
    sultan_title: "Sultan Yusuf I",
    sultan_sub: "Sultan of the Kasimids",
    
    // Selectors & Labels
    select_language: "Select Language",
  },
  ar: {
    // Navigation Tabs
    tab_home: "نظرة عامة والعاصمة",
    tab_regions: "الأقاليم والخرائط",
    tab_government: "البلاط الملكي والشورى",
    tab_history: "التاريخ والنسب",
    tab_culture: "الثقافة والجيش",
    tab_relations: "العلاقات الخارجية",
    tab_documents: "الأخبار والمراسيم",

    tab_home_sub: "نظرة عامة والعاصمة",
    tab_regions_sub: "الأقاليم والخرائط",
    tab_government_sub: "البلاط الملكي والشورى",
    tab_history_sub: "التاريخ والنسب",
    tab_culture_sub: "الثقافة والجيش",
    tab_relations_sub: "العلاقات الخارجية",
    tab_documents_sub: "الأخبار والمراسيم",

    // Header & Portal
    site_title: "سلطنة القاسمية",
    site_subtitle: "البوابة الحكومية السيادية الرسمية • وسط نيو جيرسي",
    citizen_portal: "بوابة المواطن",
    portal_sublabel: "ديوان خاص",
    motto_text: "لا يوجد إلا طريق واحد، وهو طريق الله",
    motto_sublabel: "الشعار الوطني للسلطنة",

    // Hero & Callout
    sovereign_proclamation: "إعلان سيادي",
    welcome_title: "مرحبًا بكم في البوابة السيادية",
    creed_title: "العقيدة السيادية",
    creed_text: "بفضل باري تعالى، الحصول على كل حلم ممكن.",
    sultan_title: "السلطان يوسف الأول",
    sultan_sub: "سلطان القاسميين",

    select_language: "اختر اللغة",
  },
  fa: {
    // Navigation Tabs
    tab_home: "بررسی اجمالی و پایتخت",
    tab_regions: "قلمروها و نقشه‌ها",
    tab_government: "دربار سلطنتی و شورا",
    tab_history: "تاریخ و تبار",
    tab_culture: "فرهنگ و ارتش",
    tab_relations: "روابط خارجی",
    tab_documents: "اخبار و احکام",

    tab_home_sub: "بررسی اجمالی و پایتخت",
    tab_regions_sub: "قلمروها و نقشه‌ها",
    tab_government_sub: "دربار سلطنتی و شورا",
    tab_history_sub: "تاریخ و تبار",
    tab_culture_sub: "فرهنگ و ارتش",
    tab_relations_sub: "روابط خارجی",
    tab_documents_sub: "اخبار و احکام",

    // Header & Portal
    site_title: "سلطنت قاسمية",
    site_subtitle: "پورتال رسمی حکومت مستقل • نیوجرسی مرکزی",
    citizen_portal: "پورتال شهروندی",
    portal_sublabel: "دیوان خاص",
    motto_text: "تنها یک راه وجود دارد و آن راه خداست",
    motto_sublabel: "شعار ملی سلطنت",

    // Hero & Callout
    sovereign_proclamation: "اعلامیه مستقل",
    welcome_title: "به درگاه سلطنتی خوش آمدید",
    creed_title: "عقیده سلطنتی",
    creed_text: "به لطف خداوند متعال، دست‌یابی به هر رویایی ممکن است.",
    sultan_title: "سلطان یوسف اول",
    sultan_sub: "سلطان قاسمینیان",

    select_language: "انتخاب زبان",
  },
  ur: {
    // Navigation Tabs
    tab_home: "جائزہ اور دارالحکومت",
    tab_regions: "علاقے اور نقشے",
    tab_government: "شاہی دربار اور شوریٰ",
    tab_history: "تاریخ اور شجرہ نسب",
    tab_culture: "ثقافت اور فوج",
    tab_relations: "خارجہ تعلقات",
    tab_documents: "اخبارات اور فرامین",

    tab_home_sub: "جائزہ اور دارالحکومت",
    tab_regions_sub: "علاقے اور نقشے",
    tab_government_sub: "شاہی دربار اور شوریٰ",
    tab_history_sub: "تاریخ اور شجرہ نسب",
    tab_culture_sub: "ثقافت اور فوج",
    tab_relations_sub: "خارجہ تعلقات",
    tab_documents_sub: "اخبارات اور فرامین",

    // Header & Portal
    site_title: "سلطنتِ القاسميه",
    site_subtitle: "سرکاری خودمختار حکومتی پورٹل • سینٹرل نیو جرسی",
    citizen_portal: "سٹیزن پورٹل",
    portal_sublabel: "دیوانِ خاص",
    motto_text: "صرف ایک ہی راستہ ہے، اور وہ اللہ کا راستہ ہے",
    motto_sublabel: "سلطنت کا قومی نعرہ",

    // Hero & Callout
    sovereign_proclamation: "خودمختار اعلان",
    welcome_title: "شاہی پورٹل میں خوش آمدید",
    creed_title: "حکمران کا عقیدہ",
    creed_text: "بفضلِ باری تعالیٰ، حصولِ ہر خواب ممکن",
    sultan_title: "سلطان یوسف اول",
    sultan_sub: "سلطانِ قاسمین",

    select_language: "زبان منتخب کریں",
  },
};

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("kasimid_lang") as LanguageCode;
      if (savedLang && ["en", "ar", "fa", "ur"].includes(savedLang)) {
        setLanguageState(savedLang);
      }
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("kasimid_lang", lang);
    }
  };

  const currentLangObj = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const dir = currentLangObj.dir;
  const isRTL = dir === "rtl";

  // Sync DOM attributes for root <html> or container
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dir = dir;
      document.documentElement.lang = language;
    }
  }, [language, dir]);

  const t = (key: string): string => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    return dict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dir, isRTL, t }}>
      <div dir={dir} className={isRTL ? "font-arabic" : "font-sans"}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
