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

export interface NewsArticleTranslation {
  date: string;
  category: string;
  categoryArabic: string;
  headline: string;
  bodyParagraphs: string[];
  issuedBy: string;
}

export interface TerritoryTranslation {
  name: string;
  arabicName: string;
  badge: string;
  type: string;
  area: string;
  governorOrAdmin: string;
  capitalOrHub: string;
  description: string;
}

export interface LeaderTranslation {
  name: string;
  arabicName: string;
  title: string;
  subTitle: string;
  born: string;
  origin: string;
  association: string;
  bio: string;
}

export const TRANSLATIONS: Record<LanguageCode, Record<string, any>> = {
  en: {
    // Navigation Tabs
    tab_home: "Overview & Capital",
    tab_regions: "Territories & Maps",
    tab_government: "Royal Court & Shura",
    tab_history: "History & Lineage",
    tab_culture: "Culture & Military",
    tab_relations: "Foreign Relations",
    tab_documents: "News & Decrees",

    // Header & Portal
    site_title: "THE KASIMID SULTANATE",
    site_subtitle: "Official Sovereign Government Portal • Central New Jersey",
    citizen_portal: "Citizen Portal",
    portal_sublabel: "Royal Diwan",
    motto_text: "There is only one way, and that is the way of God",
    motto_sublabel: "National Motto of the Sultanate",

    // Hero & Proclamations
    sovereign_proclamation: "Sovereign Proclamation",
    welcome_title: "Welcome to the Sovereign Gateway",
    welcome_desc:
      "The Kasimid Sultanate is a sovereign micronation in Central New Jersey. Anchored by traditional Islamic governance structures, the Sultanate combines historic legal heritage with modern civic administration, fostering a sustainable home economy and cultural enrichment for its citizens.",
    creed_title: "The Sovereign's Creed",
    creed_text: "By the grace of God, the attainment of every dream is possible.",
    sultan_title: "Sultan Yusuf I",
    sultan_sub: "Sultan of the Kasimids",
    established_date: "Established: July 25, 2025",
    capital_name: "Capital: Ismailabad",

    // Indicators Grid
    indicators_title: "National Indicators & Fast Facts",
    stat_capital_label: "Imperial Capital",
    stat_capital_val: "Ismailabad (إسماعيل آباد)",
    stat_capital_sub: "Administrative center and royal seat",

    stat_pop_label: "Citizen Population",
    stat_pop_val: "104 Citizens",
    stat_pop_sub: "88.46% Asian | 80.77% Islam",

    stat_area_label: "Total Sovereign Area",
    stat_area_val: "0.078 sq km (0.03 sq mi)",
    stat_area_sub: "Consisting of Ghabaan & Jama’ah",

    stat_overseas_label: "Overseas Territories",
    stat_overseas_val: "1 Territory (Al Maqsoodi)",
    stat_overseas_sub: "4.87 acres (212,189 sq ft) located in Gadap Town, Karachi",

    stat_curr_label: "National Currency",
    stat_curr_val: "Kasimi Dinar (QD)",
    stat_curr_sub: "Pegged fixed rate: 1 QD = 2 EUR",

    stat_hdi_label: "Human Dev. Index (HDI)",
    stat_hdi_val: "0.955",
    stat_hdi_sub: "Category: Very High human development",

    // National Anthem Component (Stanza Translations)
    anthem_header: "National Anthem of the Kasimid Sultanate (\"Long Live My Country\")",
    anthem_badge: "National Anthem • النشيد الوطني",
    anthem_stanza1_trans:
      "Long live my country, in glory and certainty / Sultanate of grandeur, a secure fortress / Our green banner among all nations / To truth and justice we pledge our allegiance",
    anthem_stanza2_trans:
      "From the forests of Ghabaan a light has shone / In the virtuous assembly unity is forged / We build our homeland with firm resolve / And Yusuf is our leader and guiding pole",
    anthem_stanza3_trans:
      "Our souls are sacrificed for this sacred soil / And beyond the seas majesty reverberates / May God preserve the Sultan and the homeland / We shall remain proud throughout all time",

    // Bicameral Majlis
    majlis_header: "The Bicameral Majlis (Parliament)",
    majlis_sub: "Codified under July 24, 2025 Constitution",
    shura_title: "The Majlis al-Shura (Consultative Council)",
    shura_sub: "Upper Chamber • Appointed Council",
    shura_presided: "Presided over by Chairman Habibullah Mikail Al-Asad",
    shura_desc:
      "Led by Chairman Habibullah Mikail Al-Asad, this appointed council serves as the primary advisory body to the Sultan. It focuses on Islamic jurisprudence, constitutional review, and long-term state policy, ensuring all royal decrees align with the foundational values of the Sultanate.",

    assembly_title: "The People's Assembly",
    assembly_sub: "Lower Chamber • Representative Body",
    assembly_rep: "Representing the 104 Registered Citizens",
    assembly_desc:
      "A representative body designed to voice the interests of the 104 registered citizens. It focuses on localized community affairs, cultural preservation, and grassroots initiatives, drafting civil proposals to be reviewed by the Grand Vizier and the Shura.",

    // Selectors
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

    // Header & Portal
    site_title: "سلطنة القاسمية",
    site_subtitle: "البوابة الحكومية السيادية الرسمية • وسط نيو جيرسي",
    citizen_portal: "بوابة المواطن",
    portal_sublabel: "ديوان خاص",
    motto_text: "لا يوجد إلا طريق واحد، وهو طريق الله",
    motto_sublabel: "الشعار الوطني للسلطنة",

    // Hero & Proclamations
    sovereign_proclamation: "إعلان سيادي",
    welcome_title: "مرحبًا بكم في البوابة السيادية",
    welcome_desc:
      "السلطنة القاسمية دولة ميكرونية سيادية تقع في وسط ولاية نيو جيرسي. ترتكز على هياكل الحكم الإسلامي التقليدي، وتجمع بين التراث القانوني التاريخي والإدارة المدنية الحديثة.",
    creed_title: "العقيدة السيادية",
    creed_text: "بفضل باري تعالى، الحصول على كل حلم ممكن.",
    sultan_title: "السلطان يوسف الأول",
    sultan_sub: "سلطان القاسميين",
    established_date: "التأسيس: ٢٥ يوليو ٢٠٢٥",
    capital_name: "العاصمة: إسماعيل آباد",

    // Indicators Grid
    indicators_title: "المؤشرات الوطنية والحقائق الرئيسية",
    stat_capital_label: "العاصمة الإمبراطورية",
    stat_capital_val: "إسماعيل آباد",
    stat_capital_sub: "المركز الإداري والمقر الملكي",

    stat_pop_label: "عدد المواطنين",
    stat_pop_val: "١٠٤ مواطنين",
    stat_pop_sub: "٨٨٫٤٦٪ آسيويون | ٨٠٫٧٧٪ مسلمون",

    stat_area_label: "إجمالي المساحة السيادية",
    stat_area_val: "٠٫٠٧٨ كم² (٠٫٠٣ ميل²)",
    stat_area_sub: "تتكون من الغابات والجماعة",

    stat_overseas_label: "أقاليم ما وراء البحار",
    stat_overseas_val: "إقليم واحد (المقصودي)",
    stat_overseas_sub: "٤٫٨٧ فدان في جاداب تاون، كراتشي",

    stat_curr_label: "العملة الوطنية",
    stat_curr_val: "الدينار القاسمي (QD)",
    stat_curr_sub: "سعر صرف ثابت: ١ دينار = ٢ يورو",

    stat_hdi_label: "مؤشر التنمية البشرية",
    stat_hdi_val: "٠٫٩٥٥",
    stat_hdi_sub: "الفئة: تنمية بشرية مرتفعة جداً",

    // National Anthem Component (Arabic Mode hides translations)
    anthem_header: "النشيد الوطني للسلطنة القاسمية (عاشت بلادي)",
    anthem_badge: "النشيد الوطني الرسمي",
    anthem_stanza1_trans: "",
    anthem_stanza2_trans: "",
    anthem_stanza3_trans: "",

    // Bicameral Majlis
    majlis_header: "المجلس التشريعي ثنائي التمثيل (البرلمان)",
    majlis_sub: "مصادق عليه بموجب دستور ٢٤ يوليو ٢٠٢٥",
    shura_title: "مجلس الشورى (المجلس الاستشاري)",
    shura_sub: "الغرفة العليا • مجلس معيّن",
    shura_presided: "برئاسة حبيب الله ميكائيل الأسد",
    shura_desc:
      "يقود هذا المجلس المعين حبيب الله ميكائيل الأسد، ويعتبر الهيئة الاستشارية الرئيسية للسلطان. يركز على الفقه الإسلامي والمراجعة الدستورية والسياسة العامة للدولة.",

    assembly_title: "مجلس الشعب",
    assembly_sub: "الغرفة السفلى • هيئة تمثيلية",
    assembly_rep: "يمثل ١٠٤ مواطنين مسجلين",
    assembly_desc:
      "هيئة تمثيلية تهدف إلى التعبير عن مصالح المواطنين الـ ١٠٤ المسجلين. تركز على الشؤون المجتمعية المحلية، والصيانة الثقافية، والمبادرات الشعبية.",

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

    // Header & Portal
    site_title: "سلطنت قاسمية",
    site_subtitle: "پورتال رسمی حکومت مستقل • نیوجرسی مرکزی",
    citizen_portal: "پورتال شهروندی",
    portal_sublabel: "دیوان خاص",
    motto_text: "تنها یک راه وجود دارد و آن راه خداست",
    motto_sublabel: "شعار ملی سلطنت",

    // Hero & Proclamations
    sovereign_proclamation: "اعلامیه مستقل",
    welcome_title: "به درگاه سلطنتی خوش آمدید",
    welcome_desc:
      "سلطنت قاسمية یک دولت ریزکشور مستقل در نیوجرسی مرکزی است. این سلطنت بر پایه ساختارهای حکومت اسلامی سنت‌گرا و ترکیب میراث قانونی تاریخی با مدیریت مدنی مدرن بنا شده است.",
    creed_title: "عقیده سلطنتی",
    creed_text: "به لطف خداوند متعال، دست‌یابی به هر رویایی ممکن است.",
    sultan_title: "سلطان یوسف اول",
    sultan_sub: "سلطان قاسمینیان",
    established_date: "تاسیس: ۲۵ ژوئیه ۲۰۲۵",
    capital_name: "پایتخت: اسماعیل‌آباد",

    // Indicators Grid
    indicators_title: "شاخص‌های ملی و حقایق کلیدی",
    stat_capital_label: "پایتخت امپراتوری",
    stat_capital_val: "اسماعیل‌آباد (إسماعيل آباد)",
    stat_capital_sub: "مرکز اداری و مقر سلطنتی",

    stat_pop_label: "جمعیت شهروندان",
    stat_pop_val: "۱۰۴ شهروند",
    stat_pop_sub: "۸۸٫۴۶٪ آسیایی | ۸۰٫۷۷٪ مسلمان",

    stat_area_label: "مساحت کل مستقل",
    stat_area_val: "۰٫۰۷۸ کیلومتر مربع (۰٫۰۳ میل مربع)",
    stat_area_sub: "شامل غابات و جماعه",

    stat_overseas_label: "قلمروهای فرامرزی",
    stat_overseas_val: "۱ قلمرو (المقصودی)",
    stat_overseas_sub: "۴٫۸۷ آکر در گداپ تاون، کراچی",

    stat_curr_label: "ارز ملی",
    stat_curr_val: "دینار قاسمی (QD)",
    stat_curr_sub: "نرخ ثابت: ۱ دینار = ۲ یورو",

    stat_hdi_label: "شاخص توسعه انسانی (HDI)",
    stat_hdi_val: "۰٫۹۵۵",
    stat_hdi_sub: "دسته: توسعه انسانی بسیار بالا",

    // National Anthem Component (Farsi Translation)
    anthem_header: "سرود ملی سلطنت قاسمية («زنده باد کشور من»)",
    anthem_badge: "سرود ملی • النشيد الوطني",
    anthem_stanza1_trans:
      "زنده باد کشور من، با عزت و یقین / سلطنت شکوه، دژی استوار / پرچم سبز ما در میان جهانیان / ما به حق و عدالت وفاداریم",
    anthem_stanza2_trans:
      "از جنگل‌های غابات نوری درخشید / در انجمن نیکوکاری وحدت شکل گرفت / ما میهن خود را با اراده‌ای استوار می‌سازیم / و یوسف رهبر و قطب راهنمای ماست",
    anthem_stanza3_trans:
      "جان‌های ما فدای این خاک پاک / و در آن سوی دریاها شکوه و عزت جاری است / خداوند سلطان و میهن را حفظ فرمايد / ما در طول زمان سرافراز خواهیم ماند",

    // Bicameral Majlis
    majlis_header: "مجلس دو مجلسی (پارلمان)",
    majlis_sub: "مدون شده طبق قانون اساسی ۲۴ ژوئیه ۲۰۲۵",
    shura_title: "مجلس الشوری (مجلس انتصابی)",
    shura_sub: "مجلس سنا • شورای انتصابی",
    shura_presided: "به ریاست حبیب‌الله میکائیل الأسد",
    shura_desc:
      "این شورای انتصابی به ریاست حبیب‌الله میکائیل الأسد، به عنوان نهاد اصلی مشورتی سلطان عمل می‌کند. تمرکز آن بر فقه اسلامی، بازنگری قانون اساسی و سیاست‌های کلان است.",

    assembly_title: "مجلس نمایندگان مردم",
    assembly_sub: "مجلس عوام • نهاد نمایندگی",
    assembly_rep: "نماینده ۱۰۴ شهروند ثبت‌شده",
    assembly_desc:
      "نهادی نمایندگی که برای انعکاس خواسته ۱۰۴ شهروند ثبت‌شده طراحی شده است. تمرکز آن بر امور جامعه، حفظ فرهنگ و طرح‌های مردمی است.",

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

    // Header & Portal
    site_title: "سلطنتِ القاسميه",
    site_subtitle: "سرکاری خودمختار حکومتی پورٹل • سینٹرل نیو جرسی",
    citizen_portal: "سٹیزن پورٹل",
    portal_sublabel: "دیوانِ خاص",
    motto_text: "صرف ایک ہی راستہ ہے، اور وہ اللہ کا راستہ ہے",
    motto_sublabel: "سلطنت کا قومی نعرہ",

    // Hero & Proclamations
    sovereign_proclamation: "خودمختار اعلان",
    welcome_title: "شاہی پورٹل میں خوش آمدید",
    welcome_desc:
      "سلطنتِ القاسمیہ سینٹرل نیو جرسی میں واقع ایک خودمختار مائیکرو نیشن ہے۔ یہ روایتی اسلامی حکمرانی کے ڈھانچے پر مبنی ہے، جو تاریخی قانونی ورثے کو جدید شہری انتظام کے ساتھ جوڑتی ہے۔",
    creed_title: "حکمران کا عقیدہ",
    creed_text: "بفضلِ باری تعالیٰ، حصولِ ہر خواب ممکن",
    sultan_title: "سلطان یوسف اول",
    sultan_sub: "سلطانِ قاسمین",
    established_date: "قیام: 25 جولائی 2025",
    capital_name: "دارالحکومت: اسماعیل آباد",

    // Indicators Grid
    indicators_title: "قومی اشارے اور بنیادی حقائق",
    stat_capital_label: "شاہی دارالحکومت",
    stat_capital_val: "اسماعیل آباد (إسماعيل آباد)",
    stat_capital_sub: "انتظامی مرکز اور شاہی نشست",

    stat_pop_label: "شہریوں کی تعداد",
    stat_pop_val: "104 رجسٹرڈ شہری",
    stat_pop_sub: "88.46% ایشیائی | 80.77% مسلم",

    stat_area_label: "کل خودمختار رقبہ",
    stat_area_val: "0.078 مربع کلومیٹر (0.03 مربع میل)",
    stat_area_sub: "غبان اور جماعت پر مشتمل",

    stat_overseas_label: "سمندر پار علاقے",
    stat_overseas_val: "1 علاقہ (المقصودی)",
    stat_overseas_sub: "4.87 ایکڑ (212,189 مربع فٹ) گڈاپ ٹاؤن، کراچی",

    stat_curr_label: "قومی کرنسی",
    stat_curr_val: "قاسمی دینار (QD)",
    stat_curr_sub: "مقررہ شرح: 1 دینار = 2 یورو",

    stat_hdi_label: "انسانی ترقی کا اشاریہ (HDI)",
    stat_hdi_val: "0.955",
    stat_hdi_sub: "زمرہ: انتہائی اعلیٰ انسانی ترقی",

    // National Anthem Component (Urdu Translation)
    anthem_header: "سلطنتِ القاسمیہ کا قومی ترانہ (\"جیوے میرا وطن\")",
    anthem_badge: "قومی ترانہ • النشيد الوطني",
    anthem_stanza1_trans:
      "جیوے میرا وطن، عزت اور یقین کے ساتھ / عظمت کی سلطنت، ایک محفوظ قلعہ / تمام دنیا میں ہمارا سبز پرچم / ہم حق اور انصاف کے پابند ہیں",
    anthem_stanza2_trans:
      "غبان کے جنگلات سے ایک نور چمکا / خیر و برکت کی مجلس میں اتحاد قائم ہوا / ہم مضبوط عزم کے ساتھ اپنے وطن کی تعمیر کرتے ہیں / اور یوسف ہمارے امام اور رہنما ہیں",
    anthem_stanza3_trans:
      "ہماری جانیں اس مقدس مٹی پر قربان ہیں / اور سمندر پار تک عزت و وقار پھیلا ہوا ہے / اللہ سلطان اور وطن کو محفوظ رکھے / ہم ہر دور میں باوقار رہیں گے",

    // Bicameral Majlis
    majlis_header: "دو ایوانی مجلس (پارلیمنٹ)",
    majlis_sub: "24 جولائی 2025 کے آئین کے تحت منظور شدہ",
    shura_title: "مجلس الشوریٰ (مملکتی کونسل)",
    shura_sub: "ایوانِ بالا • نامزد کونسل",
    shura_presided: "چیئرمین حبیب اللہ میکائیل الاسد کی زیرِ صدارت",
    shura_desc:
      "چیئرمین حبیب اللہ میکائیل الاسد کی قیادت میں یہ نامزد کونسل سلطان کے بنیادی مشارتی ادارے کے طور پر کام کرتی ہے۔ اس کی توجہ اسلامی فقہ، آئینی جائزہ اور طویل مدتی پالیسی پر مرکوز ہے۔",

    assembly_title: "عوامی اسمبلی (ایوانِ زیریں)",
    assembly_sub: "ایوانِ زیریں • نمائندہ ادارہ",
    assembly_rep: "104 رجسٹرڈ شہریوں کی نمائندگی",
    assembly_desc:
      "ایک نمائندہ ادارہ جو 104 رجسٹرڈ شہریوں کے مفادات کی ترجمانی کرتا ہے۔ یہ مقامی برادری کے امور، ثقافتی تحفظ اور عوامی تجاویز کی تدوین پر توجہ مرکوز کرتا ہے۔",

    select_language: "زبان منتخب کریں",
  },
};

// Full News & Decrees Articles Translation Database
export const NEWS_TRANSLATIONS: Record<LanguageCode, NewsArticleTranslation[]> = {
  en: [
    {
      date: "13 July 2026",
      category: "Royal Decree",
      categoryArabic: "وسام علي شهالي",
      headline: "Sultanate Establishes The Order of Ali Shihali; Awards Grand Collar to Imruland President",
      bodyParagraphs: [
        "By royal decree of Sultan Yusuf I, the Kasimid Sultanate has officially established its first state order of merit, The Order of Ali Shihali (وسام علي شهالي). Named in honor of the incumbent Vizier, Ali Al Masry (Ali Shihali), the Order is designed to recognize exceptional diplomatic, political, and civil service to the Sultanate and the broader intermicronational community.",
        "The Order features three grades: Grand Collar, Commander, and Member. The inaugural induction took place upon the Order's establishment, with the Sultan bestowing the highest grade, the Grand Collar, upon Showib Ahmmed, President of the Democratic People's Republic of Imruland and former Chairman of the Organization of Islamic Micronations (OIM).",
      ],
      issuedBy: "Issued by Order of Sultan Yusuf I",
    },
    {
      date: "01 July 2026",
      category: "OIM Leadership",
      categoryArabic: "رئاسة منظمة الميكرونations الإسلامية",
      headline: "Sultan Yusuf I Assumes Chairmanship of the OIM Following Election Victory",
      bodyParagraphs: [
        "On 1 July 2026, Sultan Yusuf I officially assumed the office of Chairman of the Organization of Islamic Micronations (OIM), succeeding outgoing Chairman Showib Ahmmed.",
        "The transition of leadership follows a decisive late June election in which the Sultan defeated his opponent, Amir Abbas Arya'i of Arsalania, to secure the seat. Upon taking office, Sultan Yusuf I immediately appointed Al-Mu'tazz billah of the State of Rovia to serve as Vice-Chair.",
      ],
      issuedBy: "Issued by the Royal Diwan",
    },
    {
      date: "25 July 2025",
      category: "Constitutional Proclamation",
      categoryArabic: "إعلان رسمي",
      headline: "Proclamation of the Kasimid Sultanate & Ratification of the Imperial Constitution",
      bodyParagraphs: [
        "Sultan Yusuf I formally proclaimed the establishment of the sovereign Kasimid Sultanate, replacing previous caliphal structures with a codified constitutional monarchy and establishing the bicameral Majlis.",
      ],
      issuedBy: "Ratified by the Sovereign Crown",
    },
  ],
  ar: [
    {
      date: "١٣ يوليو ٢٠٢٦",
      category: "مرسوم سلطاني",
      categoryArabic: "وسام علي شهالي",
      headline: "السلطنة تؤسس وسام علي شهالي؛ وتمنح الوشاح الأكبر لرئيس إمرولاند",
      bodyParagraphs: [
        "بموجب مرسوم سلطاني أصدره السلطان يوسف الأول، أسست السلطنة القاسمية رسمياً أول وسام استحقاق وطني، 'وسام علي شهالي'. سُمي الوسام تكريماً للوزير الحالي علي المصري (علي شهالي)، ويهدف لتكريم الخدمات الدبلوماسية والمدنية الاستثنائية.",
        "يتكون الوسام من ثلاث درجات: الوشاح الأكبر، القائد، والزميل. وجرى التكريم الافتتاحي بمنح الوشاح الأكبر لشعيب أحمد، رئيس جمهورية إمرولاند الشعبية الديمقراطية ورئيس OIM السابق.",
      ],
      issuedBy: "بأمر من السلطان يوسف الأول",
    },
    {
      date: "٠١ يوليو ٢٠٢٦",
      category: "رئاسة المنظمة",
      categoryArabic: "رئاسة منظمة الميكرونations الإسلامية",
      headline: "السلطان يوسف الأول يتولى رئاسة منظمة الدول الميكرونية الإسلامية بعد فوزه في الانتخابات",
      bodyParagraphs: [
        "في ١ يوليو ٢٠٢٦، تولى السلطان يوسف الأول رسمياً منصب رئيس منظمة الدول الميكرونية الإسلامية (OIM) خلفاً للرئيس المنتهية ولايته شعيب أحمد.",
        "ويأتي هذا الانتقال عقب فوز السلطان في انتخابات أواخر يونيو ضد أمير أرسالانياً عباس أريائي. وقام السلطان فور توليه المنصب بتعيين المعتز بالله من دولة روڤيا نائباً لرئيس المنظمة.",
      ],
      issuedBy: "صادر عن الديوان الملكي",
    },
    {
      date: "٢٥ يوليو ٢٠٢٥",
      category: "إعلان دستوري",
      categoryArabic: "إعلان رسمي",
      headline: "إعلان تأسيس السلطنة القاسمية والمصادقة على الدستور الإمبراطوري",
      bodyParagraphs: [
        "أعلن السلطان يوسف الأول رسمياً تأسيس السلطنة القاسمية ذات السيادة، مستبدلاً الهياكل السابقة بملك دائم ودستور مدون ومجلس تشريعي ثنائي.",
      ],
      issuedBy: "مصادق عليه من التاج السيادي",
    },
  ],
  fa: [
    {
      date: "۲۳ تیر ۱۴۰۵",
      category: "فرمان سلطنتی",
      categoryArabic: "وسام علي شهالي",
      headline: "سلطنت نشان عالی علی شهالی را تاسیس کرد؛ اعطای یقه بزرگ به رئیس‌جمهور امرولند",
      bodyParagraphs: [
        "با فرمان سلطنتی سلطان یوسف اول، سلطنت قاسمية به طور رسمی اولین نشان افتخار دولتی خود، 'نشان علی شهالی' را تاسیس کرد. این نشان به افتخار وزیر فعلی، علی المصري (علی شهالی) نام‌گذاری شده است.",
        "این نشان دارای سه درجه است: یقه بزرگ، فرمانده و عضو. در اولین مراسم اعطا، سلطان بالاترین درجه یعنی یقه بزرگ را به شعیب احمد، رئیس‌جمهور امرولند اعطا کرد.",
      ],
      issuedBy: "صادر شده به فرمان سلطان یوسف اول",
    },
    {
      date: "۱۱ تیر ۱۴۰۵",
      category: "ریاست OIM",
      categoryArabic: "رئاسة منظمة الميكرونations الإسلامية",
      headline: "سلطان یوسف اول پس از پیروزی در انتخابات، ریاست OIM را بر عهده گرفت",
      bodyParagraphs: [
        "در ۱۱ تیر ۱۴۰۵، سلطان یوسف اول به طور رسمی ریاست سازمان ریزکشورهای اسلامی (OIM) را عهده‌دار شد.",
        "این انتقال پس از پیروزی قاطع در انتخابات اواخر ژوئن صورت گرفت. سلطان بلافاصله المعتز بالله از دولت روویا را به عنوان نایب رئیس منصوب کرد.",
      ],
      issuedBy: "صادر شده از دیوان خاص",
    },
    {
      date: "۳ مرداد ۱۴۰۴",
      category: "بیانیه قانونی",
      categoryArabic: "إعلان رسمي",
      headline: "اعلام تاسیس سلطنت قاسمية و تصویب قانون اساسی امپراتوری",
      bodyParagraphs: [
        "سلطان یوسف اول به طور رسمی تاسیس سلطنت قاسمية را اعلام نمود و ساختارهای قبلی را با حکومت مشروطه مدون جایگزین ساخت.",
      ],
      issuedBy: "تایید شده توسط تاج سلطنتی",
    },
  ],
  ur: [
    {
      date: "13 جولائی 2026",
      category: "شاہی فرمان",
      categoryArabic: "وسام علي شهالي",
      headline: "سلطنت نے وسام علی شہالی قائم کر دیا؛ امبرولینڈ کے صدر کو گرینڈ کالر سے نوازا گیا",
      bodyParagraphs: [
        "سلطان یوسف اول کے شاہی فرمان کے تحت، سلطنتِ القاسمیہ نے باضابطہ طور پر اپنا پہلا قومی اعزاز 'وسام علی شہالی' قائم کر دیا۔ یہ اعزاز موجودہ وزیر علی المصری (علی شہالی) کے نام سے منسوب ہے۔",
        "اس اعزاز کے تین درجات ہیں۔ افتتاحی تقریب میں سلطان نے سب سے اعلیٰ درجہ 'گرینڈ کالر' امبرولینڈ کے صدر شعیب احمد کو تفویض کیا۔",
      ],
      issuedBy: "بحکم سلطان یوسف اول",
    },
    {
      date: "1 جولائی 2026",
      category: "OIM قیادت",
      categoryArabic: "رئاسة منظمة الميكرونations الإسلامية",
      headline: "سلطان یوسف اول نے انتخابی کامیابی کے بعد OIM کی صدارت سنبھال لی",
      bodyParagraphs: [
        "1 جولائی 2026 کو سلطان یوسف اول نے اسلامی مائیکرو نیشنز کی تنظیم (OIM) کے چیئرمین کا عہدہ سنبھالا۔",
        "یہ منصب جون کے انتخابات میں شاندار کامیابی کے بعد حاصل ہوا۔ عہدہ سنبھالتے ہی سلطان نے ریاستِ روویا کے المعتز باللہ کو وائس چیئرمین مقرر کیا۔",
      ],
      issuedBy: "دیوانِ خاص سے جاری کردہ",
    },
    {
      date: "25 جولائی 2025",
      category: "آئینی اعلان",
      categoryArabic: "إعلان رسمي",
      headline: "سلطنتِ القاسمیہ کا قیام اور شاہی آئین کی توثیق",
      bodyParagraphs: [
        "سلطان یوسف اول نے باضابطہ طور پر خودمختار سلطنتِ القاسمیہ کے قیام کا اعلان کیا اور دو ایوانی مجلس کی بنیاد رکھی۔",
      ],
      issuedBy: "شاہی تاج سے توثیق شدہ",
    },
  ],
};

// Full Territory Maps Translation Database
export const TERRITORY_TRANSLATIONS: Record<LanguageCode, TerritoryTranslation[]> = {
  en: [
    {
      name: "Wilayat of Ghabaan",
      arabicName: "ولاية الغابات",
      badge: "Historical Core & Capital Seat",
      type: "Wilayah (Mainland Province)",
      area: "0.01 sq mi (7,015 sq m)",
      governorOrAdmin: "Governor Al-Himalayi",
      capitalOrHub: "Ismailabad (Imperial Capital)",
      description:
        "0.01 sq mi. The historical core and seat of the capital, Ismailabad. Characterized by dense, cultivated forest terrain, housing the Royal Diwan, treasury archives, and sovereign councils. Administered by Governor Al-Himalayi.",
    },
    {
      name: "Wilayat of Jama’ah",
      arabicName: "ولاية الجماعة",
      badge: "Mainland Administrative Hub",
      type: "Wilayah (Mainland Province)",
      area: "0.02 sq mi (13,000 sq m)",
      governorOrAdmin: "Governor Harith al-Dehlawi",
      capitalOrHub: "Jama'ah Al-Ula",
      description:
        "0.02 sq mi. The administrative extension of the mainland, serving as a hub for community gathering, civil structuring, residential quarters, and grassroots assemblies. Administered by Governor Harith al-Dehlawi.",
    },
    {
      name: "Overseas Territory of Al Maqsoodi",
      arabicName: "إقليم المقصودي ما وراء البحار",
      badge: "International Crown Enclave",
      type: "Crown-Administered Overseas Territory",
      area: "4.87 acres (212,189 sq ft)",
      governorOrAdmin: "Umm Omar Syed",
      capitalOrHub: "Gadap Town, Karachi (Malir Cantonment)",
      description:
        "4.87 acres. Located internationally in Gadap Town, Karachi. A crown-administered enclave serving as the Sultanate's primary diplomatic, event-hosting, and hospitality hub for macro-national visitors. Authority: Umm Omar Syed.",
    },
  ],
  ar: [
    {
      name: "ولاية الغابات (إسماعيل آباد)",
      arabicName: "ولاية الغابات",
      badge: "القلب التاريخي ومقر العاصمة",
      type: "ولاية (إقليم رئيسي)",
      area: "٠٫٠١ ميل مربع (٧,٠١٥ م²)",
      governorOrAdmin: "الحاكم الهيمالايي",
      capitalOrHub: "إسماعيل آباد (العاصمة الإمبراطورية)",
      description:
        "٠٫٠١ ميل مربع. القلب التاريخي ومقر العاصمة إسماعيل آباد. تتميز بتضاريس غابية زراعية كثيفة، وتضم الديوان الملكي وأرشيف الخزانة. تحت إدارة الحاكم الهيمالايي.",
    },
    {
      name: "ولاية الجماعة",
      arabicName: "ولاية الجماعة",
      badge: "المركز الإداري لليابسة",
      type: "ولاية (إقليم رئيسي)",
      area: "٠٫٠٢ ميل مربع (١٣,٠٠٠ م²)",
      governorOrAdmin: "الحاكم الحارث الدهلوي",
      capitalOrHub: "جماعة العلا",
      description:
        "٠٫٠٢ ميل مربع. التمدد الإداري لليابسة، وتعتبر مركزاً للتجمع المجتمعي والتنظيم المدني والأحياء السكنية. تحت إدارة الحاكم الحارث الدهلوي.",
    },
    {
      name: "إقليم المقصودي ما وراء البحار",
      arabicName: "إقليم المقصودي ما وراء البحار",
      badge: "جيب ملكي دولي",
      type: "إقليم ملكي ما وراء البحار",
      area: "٤٫٨٧ فدان (٢١٢,١٨٩ قدم²)",
      governorOrAdmin: "أم عمر سيد",
      capitalOrHub: "جاداب تاون، كراتشي (منطقة مالير)",
      description:
        "٤٫٨٧ فدان. يقع في جاداب تاون، كراتشي. جيب إداري ملكي يعتبر المركز الدبلوماسي والضيافة الرئيسي للسلطنة. السلطة: أم عمر سيد.",
    },
  ],
  fa: [
    {
      name: "ولایت غابات (اسماعیل‌آباد)",
      arabicName: "ولاية الغابات",
      badge: "هسته تاریخی و مقر پایتخت",
      type: "ولایت (استان اصلی)",
      area: "۰٫۰۱ میل مربع (۷,۰۱۵ متر مربع)",
      governorOrAdmin: "فرماندار هیمالایی",
      capitalOrHub: "اسماعیل‌آباد (پایتخت امپراتوری)",
      description:
        "۰٫۰۱ میل مربع. هسته تاریخی و مقر پایتخت، اسماعیل‌آباد. مشخص‌شده با زمین‌های جنگلی کشت‌شده. تحت مدیریت فرماندار هیمالایی.",
    },
    {
      name: "ولایت جماعه",
      arabicName: "ولاية الجماعة",
      badge: "مرکز اداری سرزمین اصلی",
      type: "ولایت (استان اصلی)",
      area: "۰٫۰۲ میل مربع (۱۳,۰۰۰ متر مربع)",
      governorOrAdmin: "فرماندار حارث دهلوی",
      capitalOrHub: "جماعه العلا",
      description:
        "۰٫۰۲ میل مربع. بخش اداری سرزمین اصلی، به عنوان مرکزی برای اجتماعات عمومی و ساختار مدنی. تحت مدیریت فرماندار حارث دهلوی.",
    },
    {
      name: "قلمرو فرامرزی المقصودی",
      arabicName: "إقليم المقصودي ما وراء البحار",
      badge: "برون‌بوم بین‌المللی تاج",
      type: "قلمرو فرامرزی تحت اداره تاج",
      area: "۴٫۸۷ آکر (۲۱۲,۱۸۹ فوت مربع)",
      governorOrAdmin: "ام عمر سید",
      capitalOrHub: "گداپ تاون، کراچی",
      description:
        "۴٫۸۷ آکر. واقع در گداپ تاون، کراچی. برون‌بوم تحت مدیریت تاج و تخت که به عنوان مرکز اصلی دیپلماتیک سلطنت عمل می‌کند. مقام مسئول: ام عمر سید.",
    },
  ],
  ur: [
    {
      name: "ولایت غبان (اسماعیل آباد)",
      arabicName: "ولاية الغابات",
      badge: "تاریخی مرکز اور دارالحکومت",
      type: "ولایت (سرزمینی صوبہ)",
      area: "0.01 مربع میل (7,015 مربع میٹر)",
      governorOrAdmin: "گورنر الہمالائی",
      capitalOrHub: "اسماعیل آباد (شاہی دارالحکومت)",
      description:
        "0.01 مربع میل۔ تاریخی مرکز اور دارالحکومت اسماعیل آباد کی نشست۔ گھنے جنگلاتی زمین پر مشتمل، شاہی دیوان اور خزانے کی دیکھ بھال۔ گورنر الہمالائی کے زیر انتظام۔",
    },
    {
      name: "ولایت جماعت",
      arabicName: "ولاية الجماعة",
      badge: "سرزمینی انتظامی مرکز",
      type: "ولایت (سرزمینی صوبہ)",
      area: "0.02 مربع میل (13,000 مربع میٹر)",
      governorOrAdmin: "گورنر حارث دہلوی",
      capitalOrHub: "جماعت العلا",
      description:
        "0.02 مربع میل۔ سرزمینی توسیع، عوامی اجتماعات اور شہری تنظیم کا مرکز۔ گورنر حارث دہلوی کے زیر انتظام۔",
    },
    {
      name: "سمندر پار علاقہ المقصودی",
      arabicName: "إقليم المقصودي ما وراء البحار",
      badge: "بین الاقوامی شاہی علاقہ",
      type: "شاہی سمندر پار علاقہ",
      area: "4.87 ایکڑ (212,189 مربع فٹ)",
      governorOrAdmin: "ام عمر سید",
      capitalOrHub: "گڈاپ ٹاؤن، کراچی",
      description:
        "4.87 ایکڑ۔ گڈاپ ٹاؤن، کراچی میں واقع۔ شاہی انتظام کے تحت علاقہ جو سلطنت کا اہم سفارتی اور مہمانی مرکز ہے۔ اتھارٹی: ام عمر سید۔",
    },
  ],
};

// Full Leadership Profiles Database
export const LEADER_TRANSLATIONS: Record<LanguageCode, LeaderTranslation[]> = {
  en: [
    {
      name: "King Yusuf bin Isma’il al-Raniri I",
      arabicName: "يوسف بن إسماعيل الرانيري الأول",
      title: "Sultan of the Kasimid Sultanate",
      subTitle: "House of Majidid • OIM Chairman",
      born: "21 January 2008",
      origin: "House of Majidid",
      association: "Dynastic Crown",
      bio: "Sultan Yusuf I began his sovereign reign as the King and Caliph of Raritania from 2014 until 2025. Following constitutional negotiations and the desire to build a more stable, legacy-oriented state, he formally dissolved the Caliphate and established the constitutional monarchy of the Kasimid Sultanate on 25 July 2025, honoring his ancestor Kasim al-Raniri. He also serves as Chairman of the Organization of Islamic Micronations (OIM).",
    },
    {
      name: "Ali Al Masry (Ali Shihali)",
      arabicName: "علي المصري",
      title: "Grand Vizier & Prime Minister",
      subTitle: "Leader of Al-Hizb al-Islami",
      born: "9 February 2009",
      origin: "Alexandria, Egypt",
      association: "Al-Hizb al-Islami ruling party",
      bio: "Ali Al Masry was born in Alexandria, Egypt, and is a key figure in the Ayal Ali clan. Serving as Grand Vizier, he leads the ruling party of the Sultanate. Outside of statecraft, he is noted for his linguistic achievements, serving as the creator of the Umaedic language, and holds administrative control over internal affairs.",
    },
    {
      name: "Habibullah Mikail Al-Asad",
      arabicName: "حبيب الله ميكائيل الأسد",
      title: "Chairman of the Consultative Shura",
      subTitle: "Incumbent since 28 Dec 2024",
      born: "11 September 2008",
      origin: "Brooklyn, NY",
      association: "Consultative Assembly",
      bio: "Habibullah Mikail Al-Asad was born in Brooklyn, NY. He took office as Chairman of the Shura Council on 28 December 2024. He presides over legislative advising and coordinates council assemblies, serving as a vital bridge between the citizenry and the Grand Vizier's administration.",
    },
  ],
  ar: [
    {
      name: "الملك يوسف بن إسماعيل الرانيري الأول",
      arabicName: "يوسف بن إسماعيل الرانيري الأول",
      title: "سلطان السلطنة القاسمية",
      subTitle: "بيت المجيديين • رئيس OIM",
      born: "٢١ يناير ٢٠٠٨",
      origin: "بيت المجيديين",
      association: "التاج السلالي",
      bio: "بدأ السلطان يوسف الأول حكمه السيادي كملك وخليفة لراريتانيا من عام ٢٠١٤ حتى ٢٠٢٥. وعقب المفاوضات الدستورية والرغبة في بناء دولة دائمية، أسس الملكية الدستورية للسلطنة القاسمية في ٢٥ يوليو ٢٠٢٥. كما يشغل منصب رئيس منظمة الدول الميكرونية الإسلامية (OIM).",
    },
    {
      name: "علي المصري (علي شهالي)",
      arabicName: "علي المصري",
      title: "الصدر الأعظم ورئيس الوزراء",
      subTitle: "زعيم الحزب الإسلامي",
      born: "٩ فبراير ٢٠٠٩",
      origin: "الإسكندرية، مصر",
      association: "الحزب الحاكم (الحزب الإسلامي)",
      bio: "ولد علي المصري في الإسكندرية بمصر، وهو شخصية بارزة في عشيرة عيال علي. يشغل منصب الصدر الأعظم ويقود الحزب الحاكم. وهو يتقن اللغويات ومبتكر اللغة العميدية، ويتولى الشؤون الداخلية.",
    },
    {
      name: "حبيب الله ميكائيل الأسد",
      arabicName: "حبيب الله ميكائيل الأسد",
      title: "رئيس مجلس الشورى الاستشاري",
      subTitle: "في المنصب منذ ٢٨ ديسمبر ٢٠٢٤",
      born: "١١ سبتمبر ٢٠٠٨",
      origin: "بروكلين، نيويورك",
      association: "المجلس الاستشاري",
      bio: "ولد حبيب الله ميكائيل الأسد في بروكلين، نيويورك. تولى رئاسة مجلس الشورى في ٢٨ ديسمبر ٢٠٢٤، ويتولى تقديم الاستشارات التشريعية والتنسيق بين المواطنين والإدارة.",
    },
  ],
  fa: [
    {
      name: "پادشاه یوسف بن اسماعیل الرانیری اول",
      arabicName: "يوسف بن إسماعيل الرانيري الأول",
      title: "سلطان سلطنت قاسمية",
      subTitle: "خاندان مجیدی • رئیس OIM",
      born: "۲۱ ژانویه ۲۰۰۸",
      origin: "خاندان مجیدی",
      association: "تاج و تخت سلطنتی",
      bio: "سلطان یوسف اول حکومت خود را به عنوان پادشاه و خلیفه راریتانیا از سال ۲۰۱۴ تا ۲۰۲۵ آغاز کرد. پس از مذاکرات قانونی، او در ۲۵ ژوئیه ۲۰۲۵ حکومت مشروطه سلطنت قاسمية را بنیان نهاد. وی همچنین رئیس سازمان ریزکشورهای اسلامی (OIM) است.",
    },
    {
      name: "علی المصري (علی شهالی)",
      arabicName: "علي المصري",
      title: "صدر اعظم و نخست‌وزیر",
      subTitle: "رهبر حزب اسلامی",
      born: "۹ فوریه ۲۰۰۹",
      origin: "اسکندریه، مصر",
      association: "حزب حاکم (حزب اسلامی)",
      bio: "علی المصري در اسکندریه مصر متولد شد. او به عنوان صدر اعظم، حزب حاکم سلطنت را رهبری می‌کند. او همچنین پدیدآورنده زبان عمیدی است و امور داخلی را مدیریت می‌کند.",
    },
    {
      name: "حبیب‌الله میکائیل الأسد",
      arabicName: "حبيب الله ميكائيل الأسد",
      title: "رئیس شورای مشورتی",
      subTitle: "از ۲۸ دسامبر ۲۰۲۴",
      born: "۱۱ سپتامبر ۲۰۰۸",
      origin: "بروکلین، نیویورک",
      association: "مجلس مشورتی",
      bio: "حبیب‌الله میکائیل الأسد در بروکلین متولد شد. او در ۲۸ دسامبر ۲۰۲۴ ریاست شورای مشورتی را بر عهده گرفت و بر امور قانون‌گذاری و ارتباط با مردم نظارت دارد.",
    },
  ],
  ur: [
    {
      name: "شاہ یوسف بن اسماعیل الرانیری اول",
      arabicName: "يوسف بن إسماعيل الرانيري الأول",
      title: "سلطانِ سلطنتِ القاسمیہ",
      subTitle: "خاندانِ مجیدی • OIM چیئرمین",
      born: "21 جنوری 2008",
      origin: "خاندانِ مجیدی",
      association: "شاہی تاج",
      bio: "سلطان یوسف اول نے 2014 سے 2025 تک راریٹانیہ کے بادشاہ کے طور پر حکمرانی کی۔ آئینی مذاکرات کے بعد، انہوں نے 25 جولائی 2025 کو باضابطہ طور پر سلطنتِ القاسمیہ کے آئینی نظام کا قیام کیا۔ وہ اسلامی مائیکرو نیشنز کی تنظیم (OIM) کے چیئرمین بھی ہیں۔",
    },
    {
      name: "علی المصری (علی شہالی)",
      arabicName: "علي المصري",
      title: "وزیرِ اعظم اور الصدر الاعظم",
      subTitle: "سربراہ الحزب الاسلامی",
      born: "9 فروری 2009",
      origin: "اسکندریہ، مصر",
      association: "حکمران جماعت (الحزب الاسلامی)",
      bio: "علی المصری اسکندریہ، مصر میں پیدا ہوئے۔ بطور وزیرِ اعظم، وہ سلطنت کی حکمران جماعت کی قیادت کرتے ہیں۔ وہ عمیدی زبان کے خالق ہیں اور اندرونی امور کا انتظام سنبھالتے ہیں۔",
    },
    {
      name: "حبیب اللہ میکائیل الاسد",
      arabicName: "حبيب الله ميكائيل الأسد",
      title: "چیئرمین مجلس الشوریٰ",
      subTitle: "28 دسمبر 2024 سے فائز",
      born: "11 ستمبر 2008",
      origin: "بروکلم، نیویارک",
      association: "مملکتی کونسل",
      bio: "حبیب اللہ میکائیل الاسد بروکلم، نیویارک میں پیدا ہوئے۔ انہوں نے 28 دسمبر 2024 کو شوریٰ کونسل کے چیئرمین کا عہدہ سنبھالا۔ وہ قانون سازی اور عوامی رابطہ کونسل کی صدارت کرتے ہیں۔",
    },
  ],
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  dir: "ltr" | "rtl";
  isRTL: boolean;
  t: (key: string) => string;
  getNewsArticles: () => NewsArticleTranslation[];
  getTerritories: () => TerritoryTranslation[];
  getLeaders: () => LeaderTranslation[];
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  dir: "ltr",
  isRTL: false,
  t: (key: string) => key,
  getNewsArticles: () => NEWS_TRANSLATIONS.en,
  getTerritories: () => TERRITORY_TRANSLATIONS.en,
  getLeaders: () => LEADER_TRANSLATIONS.en,
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

  const getNewsArticles = (): NewsArticleTranslation[] => {
    return NEWS_TRANSLATIONS[language] || NEWS_TRANSLATIONS.en;
  };

  const getTerritories = (): TerritoryTranslation[] => {
    return TERRITORY_TRANSLATIONS[language] || TERRITORY_TRANSLATIONS.en;
  };

  const getLeaders = (): LeaderTranslation[] => {
    return LEADER_TRANSLATIONS[language] || LEADER_TRANSLATIONS.en;
  };

  const getFontClass = () => {
    if (language === "ur") return "font-urdu";
    if (isRTL) return "font-arabic";
    return "font-sans";
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        dir,
        isRTL,
        t,
        getNewsArticles,
        getTerritories,
        getLeaders,
      }}
    >
      <div dir={dir} className={getFontClass()}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
