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

export interface HistoryEraTranslation {
  title: string;
  subtitle: string;
  content: string;
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

    // Featured Profile: Ismailabad
    profile_title: "Imperial Capital — Ismailabad (إسماعيل آباد)",
    profile_body:
      "Ismailabad serves as the administrative capital and dynastic seat of the Sultanate. Comprising a carefully cataloged territory, it stands as the heart of governmental operations, treasury archives, and the Shura chamber.",
    profile_etymology:
      "Etymology: The name represents a synthesis of cultural lineage and language. Ismail is in honor of the revered father of the current Sultan, Sidi Isma'il al-Raniri. The suffix -abad is derived from Persian, meaning 'cultivated place,' 'town,' or 'city,' symbolizing a settlement founded on prosperity and structure.",

    // National Anthem Component (Exact Prompt Subtext Translations)
    anthem_header: "National Anthem of the Kasimid Sultanate (\"Long Live My Country\")",
    anthem_badge: "National Anthem • النشيد الوطني",
    anthem_stanza1_trans:
      "Long live my country, in glory and certainty / The Sultanate of grandeur, a secure fortress / Our green banner among the worlds / To truth and justice, we pledge allegiance.",
    anthem_stanza2_trans:
      "From the forests of Ghabaan, a light has shone / In the community of goodness, unity is gathered / We build the lands with solid resolve / And Yusuf among us is a leader and a pillar.",
    anthem_stanza3_trans:
      "Our souls are a sacrifice for this soil / And beyond the seas, glory has spread / May God preserve the Sultan and the homeland / We remain proud through the passage of time.",

    // Geographical Weather Module
    weather_box_title: "Geographical Weather Profile",
    weather_profile_sub: "Regional Climate Profile (Cfa)",
    weather_annual_precip: "Annual Precip: 114 cm Accumulated",
    weather_winter_low: "Winter Low: -5°C Average Jan",
    weather_summer_high: "Summer High: 30°C Average July",
    weather_classification:
      "Climate Classification: Humid Subtropical (Cfa). The Sultanate experiences four distinct seasons with hot, humid summers and cold, snowy winters.",

    // Defense Doctrine Module
    defense_title: "Defense Doctrine",
    defense_heading: "Jaysh al-Saltanah al-Qasimiyyah (Forces of the Kasimid Sultanate)",
    defense_body:
      "The national defense force, Jaysh al-Saltanah al-Qasimiyyah, serves in a strictly ceremonial and cultural reenactment capacity. In order to maintain absolute compliance with local and federal statutes of the host nation (specifically United States federal law under the Posse Comitatus Act - 18 U.S. Code § 1385), the forces are entirely prohibited from executing domestic law enforcement actions, civil policing, or active kinetic operations. Their duties are limited to serving as honor guards for the Sultan, coordinating local cultural events, maintaining historical registries, and preparing emergency preparedness drills.",

    // Matrilineal Lineage Module
    lineage_title: "The Matrilineal Lineage (Shajarah al-Nasab)",
    lineage_sub:
      "Historical record tracing Sultan Yusuf I's lineage through his mother, Umm Ammaar, to the Prophet Muhammad",
    lineage_full_heading: "Complete Matrilineal Lineage",
    lineage_btn_expand: "View Full Matrilineal Ancestral Ledger",
    lineage_btn_collapse: "Collapse Ancestral Ledger",
    lineage_root: "Root Ancestor",
    lineage_5th_imam: "5th Imam Line",
    lineage_37th: "37th Great-Grandfather",
    lineage_sufi: "Sufi Saint",
    lineage_bihar: "Bihar Patriarch",
    lineage_incumbent: "The Incumbent Sultan",

    // Society, Culture & Economy Module
    culture_heritage_heading: "Heritage & Spices",
    culture_heritage_text1:
      "The cultural landscape combines classical Islamic values, regional South Asian/MENA heritage, and Raritan Valley maritime traditions.",
    culture_heritage_text2:
      "Sultanate community groups focus heavily on botanical fragrance craft, traditional theological debates, and the preservation of dynastic histories.",
    culture_economy_heading: "Spiritual & Home Economy",
    culture_economy_text1:
      "The economy is characterized by a modest, home-based production framework. Due to geographic limitations, citizens focus on producing high-quality artisanal crafts, digital services, and spice processing (specializing in dried dates and traditional culinary blends).",
    culture_economy_text2:
      "Treasury reserves are strictly regulated, with the Kasimi Dinar pegged firmly to the Euro (EUR) to guarantee economic integrity.",

    // Global Footer
    footer_rights:
      "The Kasimid Sultanate. All Rights Reserved 2026 © Imperial Registry of Deeds, Census, and Foreign Registry, Ismailabad.",
    footer_compliance:
      "Sovereign Constitutional Monarchy • Central New Jersey • Compliant with 18 U.S.C. § 1385",

    // Legislative & Factions Tables
    tbl_party_faction: "Party Faction",
    tbl_leader: "Leader",
    tbl_ideology: "Ideology",
    tbl_status: "Status",
    tbl_shura_seats: "Shura Seats",
    tbl_council_seats: "Cultural Council Seats",
    tbl_wilayah: "Wilayah (Province)",
    tbl_arabic_desig: "Arabic Designation",
    tbl_total_area: "Total Area",
    tbl_appointed_gov: "Appointed Governor",
    tbl_holiday_name: "Holiday Name",
    tbl_cultural_script: "Arabic / Cultural Script",
    tbl_category: "Category",
    tbl_observance: "Observance Details",

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

    // Featured Profile: Ismailabad
    profile_title: "العاصمة الإمبراطورية — إسماعيل آباد",
    profile_body:
      "تخدم إسماعيل آباد كعاصمة إدارية ومقر سلالي للسلطنة. وتتكون من إقليم مصنف بعناية، وتعتبر قلب العمليات الحكومية، وأرشيف الخزانة، وقاعة الشورى.",
    profile_etymology:
      "أصل التسمية: يمثل الاسم تركيباً بين النسب الثقافي واللغة. إسماعيل تكريماً للوالد المبجل للسلطان الحالي، سيدي إسماعيل الرانيري. واللاحقة (آباد) مشتقة من الفارسية وتعني 'المكان المعمور' أو 'البلدة' أو 'المدينة'، مما يرمز إلى مستوطنة تأسست على الازدهار والبناء.",

    // National Anthem Component (Arabic Mode hides subtext)
    anthem_header: "النشيد الوطني للسلطنة القاسمية (عاشت بلادي)",
    anthem_badge: "النشيد الوطني الرسمي",
    anthem_stanza1_trans: "",
    anthem_stanza2_trans: "",
    anthem_stanza3_trans: "",

    // Geographical Weather Module
    weather_box_title: "الملف الجغرافي للطقس",
    weather_profile_sub: "ملف المناخ الإقليمي (Cfa)",
    weather_annual_precip: "الهطول السنوي: ١١٤ سم متراكم",
    weather_winter_low: "شتاء منخفض: -٥° مئوية متوسط يناير",
    weather_summer_high: "صيف مرتفع: ٣٠° مئوية متوسط يوليو",
    weather_classification:
      "تصنيف المناخ: شبه استوائي رطب (Cfa). تشهد السلطنة أربعة فصول متميزة مع صيف حار ورطب وشتاء بارد ومثلج.",

    // Defense Doctrine Module
    defense_title: "عقيدة الدفاع",
    defense_heading: "جيش السلطنة القاسمية",
    defense_body:
      "تعمل قوات الدفاع الوطني، جيش السلطنة القاسمية، في إطار مراسمي وإعادة تمثيل ثقافي بحت. ومن أجل الحفاظ على الامتثال المطلق للقوانين المحلية والفيدرالية للدولة المضيفة (تحديداً القانون الفيدرالي للولايات المتحدة بموجب قانون بوسي كوميتاتوس - المادة ١٨ من قانون الولايات المتحدة رقم ١٣٨٥)، يُحظر تماماً على القوات تنفيذ إجراءات إنفاذ القانون المحلي، أو الشرطة المدنية، أو العمليات الحركية النشطة. وتقتصر واجباتهم على العمل كحرس شرف للسلطان، وتنسيق الفعاليات الثقافية المحلية، وتطوير السجلات التاريخية، وإعداد تدريبات الجاهزية لحالات الطوارئ.",

    // Matrilineal Lineage Module
    lineage_title: "النسب الأمومي (شجرة النسب)",
    lineage_sub: "سجل تاريخي يتتبع نسب السلطان يوسف الأول من خلال والدته أم عمار إلى النبي محمد",
    lineage_full_heading: "النسب الأمومي الكامل",
    lineage_btn_expand: "عرض السجل الأمومي الكامل للأجداد",
    lineage_btn_collapse: "إغلاق السجل الأمومي",
    lineage_root: "السلف الأصيل",
    lineage_5th_imam: "خط الإمام الخامس",
    lineage_37th: "الجد الأكبر السابع والثلاثون",
    lineage_sufi: "الشيخ الصوفي",
    lineage_bihar: "بطريرك بيهار",
    lineage_incumbent: "السلطان الحالي",

    // Society, Culture & Economy Module
    culture_heritage_heading: "التراث والتوابل",
    culture_heritage_text1:
      "يجمع المشهد الثقافي بين القيم الإسلامية الكلاسيكية، والتراث الإقليمي لجنوب آسيا والشرق الأوسط وشمال أفريقيا، وتقاليد وادي راريتان البحرية.",
    culture_heritage_text2:
      "تركز المجموعات المجتمعية في السلطنة بشكل مكثف على حرفة العطور النباتية، والمناظرات اللاهوتية التقليدية، والحفاظ على التاريخ السلالي.",
    culture_economy_heading: "الاقتصاد الروحي والمنزلي",
    culture_economy_text1:
      "يتميز الاقتصاد بإطار إنتاج منزلي متواضع. وبسبب القيود الجغرافية، يركز المواطنون على إنتاج الحرف اليدوية عالية الجودة، والخدمات الرقمية، ومعالجة التوابل (المتخصصة في التمور المجففة والخلطات الطهوية التقليدية).",
    culture_economy_text2:
      "تخضع احتياطيات الخزانة لتنظيم صارم، حيث يتم ربط الدينار القاسمي بحزم باليورو (EUR) لضمان النزاهة الاقتصادية.",

    // Global Footer
    footer_rights:
      "السلطنة القاسمية. جميع الحقوق محفوظة ٢٠٢٦ © السجل الإمبراطوري للعقود، التعداد، والسجل الخارجي، إسماعيل آباد.",
    footer_compliance:
      "ملكية دستورية سيادية • وسط نيوجيرسي • متوافق مع المادة ١٨ من قانون الولايات المتحدة رقم ١٣٨٥",

    // Legislative & Factions Tables
    tbl_party_faction: "الفصيل الحزبي",
    tbl_leader: "القائد",
    tbl_ideology: "الأيديولوجيا",
    tbl_status: "الحالة",
    tbl_shura_seats: "مقاعد الشورى",
    tbl_council_seats: "مقاعد المجلس الثقافي",
    tbl_wilayah: "الولاية",
    tbl_arabic_desig: "التسمية العربية",
    tbl_total_area: "المساحة الإجمالية",
    tbl_appointed_gov: "الحاكم المعين",
    tbl_holiday_name: "اسم المناسبة",
    tbl_cultural_script: "التسمية الثقافية",
    tbl_category: "الفئة",
    tbl_observance: "تفاصيل الاحتفال",

    // Bicameral Majlis
    majlis_header: "الهيكل التشريعي البرلماني",
    majlis_sub: "مصادق عليه بموجب دستور ٢٤ يوليو ٢٠٢٥",
    shura_title: "مجلس الشورى (المجلس الاستشاري)",
    shura_sub: "الشركاء العليا • مجلس معين",
    shura_presided: "برئاسة حبيب الله ميكائيل الأسد",
    shura_desc:
      "يقود هذا المجلس المعين حبيب الله ميكائيل الأسد، ويعتبر الهيئة الاستشارية الرئيسية للسلطان. يركز على الفقه الإسلامي والمراجعة الدستورية والسياسة العامة للدولة.",

    assembly_title: "مجلس الشعب",
    assembly_sub: "الشركاء السفلى • هيئة تمثيلية",
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

    // Featured Profile: Ismailabad
    profile_title: "پایتخت امپراتوری — اسماعیل‌آباد",
    profile_body:
      "اسماعیل‌آباد به عنوان پایتخت اداری و مقر دودمانی سلطنت عمل میکند. این منطقه که شامل قلمرویی با دقت ثبتشده است، به عنوان قلب فعالیتهای دولتی، آرشیو خزانهداری و تالار شورا شناخته میشود.",
    profile_etymology:
      "وجه تسمیه: این نام نشاندهنده ترکیبی از تبار فرهنگی و زبان است. اسماعیل به احترام پدر بزرگوار سلطان فعلی، سیدی اسماعیل الرانیری نامگذاری شده است. پسوند (آباد) از زبان فارسی گرفته شده و به معنای 'مکان آباد'، 'شهرک' یا 'شهر' است که نمادی از سکونتگاهی پایهریزیشده بر شکوفایی و ساختار است.",

    // National Anthem Component (Exact Prompt Farsi Subtext Translation)
    anthem_header: "سرود ملی سلطنت قاسمية («زنده باد میهنم»)",
    anthem_badge: "سرود ملی • النشيد الوطني",
    anthem_stanza1_trans:
      "زنده باد میهنم، با عزت و یقین / سلطنت شکوه، دژی استوار / پرچم سبز ما در میان جهانیان / ما به حق و عدالت وفاداریم.",
    anthem_stanza2_trans:
      "از جنگلهای غبان، نوری درخشید / در جماعت خیر، اتحاد برقرار شد / ما با ارادهای پولادین دیار خود را میسازیم / و یوسف در میان ما رهبر و محور است.",
    anthem_stanza3_trans:
      "جانهای ما فدای این خاک باد / و فراتر از دریاها، عزت روان گشت / خداوند سلطان و میهن را حفظ کناد / ما در گذر زمان سرافراز میمانیم.",

    // Geographical Weather Module
    weather_box_title: "پروفایل جغرافیایی آب و هوا",
    weather_profile_sub: "اقلیم منطقهای (Cfa)",
    weather_annual_precip: "بارندگی سالانه: ۱۱۴ سانتیمتر متراکم",
    weather_winter_low: "حداقل دما در زمستان: -۵ درجه سانتیگراد میانگین ژانویه",
    weather_summer_high: "حداکثر دما در تابستان: ۳۰ درجه سانتیگراد میانگین جولای",
    weather_classification:
      "طبقه بندی اقلیمی: نیمهگرمسیری مرطوب (Cfa). سلطنت چهار فصل متمایز را با تابستانهای گرم و مرطوب و زمستانهای سرد و برفی تجربه میکند.",

    // Defense Doctrine Module
    defense_title: "دکترین دفاعی",
    defense_heading: "جیش السلطنه القاسمیه (نیروهای سلطنت قاسمی)",
    defense_body:
      "نیروی دفاع ملی، جیش السلطنه القاسمیه، صرفاً در یک ظرفیت تشریفاتی و بازسازی فرهنگی خدمت میکند. به منظور حفظ انطباق کامل با قوانین محلی و فدرال کشور میزبان (به ویژه قانون فدرال ایالات متحده تحت قانون Posse Comitatus - ۱۸ قانون ایالات متحده § ۱۳۸۵)، نیروها کاملاً از اجرای اقدامات اجرای قانون داخلی، پلیس غیرنظامی یا عملیات جنبشی فعال منع شدهاند. وظایف آنها محدود به خدمت به عنوان گارد افتخار سلطان، هماهنگی رویدادهای فرهنگی محلی، نگهداری دفاتر ثبت تاریخی و آمادهسازی مانورهای آمادگی اضطراری است.",

    // Matrilineal Lineage Module
    lineage_title: "شجره نامه مادری (شجرة النسب)",
    lineage_sub: "سابقه تاریخی ردپای نسب سلطان یوسف اول از طریق مادرش، ام عمار، به پیامبر اسلام",
    lineage_full_heading: "نسب مادری کامل",
    lineage_btn_expand: "مشاهده دفترچه کامل تبار مادری",
    lineage_btn_collapse: "بستن دفترچه تبار",
    lineage_root: "جد ریشهای",
    lineage_5th_imam: "خط امام پنجم",
    lineage_37th: "سی و هفتمین جد بزرگ",
    lineage_sufi: "عارف صوفی",
    lineage_bihar: "بزرگ خاندان بهار",
    lineage_incumbent: "شاغل فعلی",

    // Society, Culture & Economy Module
    culture_heritage_heading: "میراث و ادویه‌جات",
    culture_heritage_text1:
      "چشم‌انداز فرهنگی ارزش‌های کلاسیک اسلامی، میراث منطقه‌ای جنوب آسیا/خاورمیانه و سنت‌های دریایی دره راریتان را ترکیب می‌کند.",
    culture_heritage_text2:
      "گروه‌های جامعه سلطنت بر حرفه عطر‌های گیاهی، مناظرات الهیاتی سنتی و حفظ تاریخ‌های دودمانی تمرکز دارند.",
    culture_economy_heading: "اقتصاد معنوی و خانگی",
    culture_economy_text1:
      "اقتصاد با یک چارچوب تولید خانگی مشخص می‌شود. با توجه به محدودیت‌های جغرافیایی، شهروندان بر تولید صنایع دستی با کیفیت، خدمات دیجیتال و پردازش ادویه‌جات تمرکز دارند.",
    culture_economy_text2:
      "ذخایر خزانه کاملاً تنظیم شده و دینار قاسمی به یورو (EUR) متصل است تا یکپارچگی اقتصادی تضمین شود.",

    // Global Footer
    footer_rights:
      "سلطنت قاسمی. تمامی حقوق محفوظ است ۲۰۲۶ © دفتر ثبت اسناد امپراتوری، سرشماری و ثبت خارجی، اسماعیل‌آباد.",
    footer_compliance:
      "پادشاهی مشروطه مستقل • نیوجرسی مرکزی • منطبق با قانون ۱۸ ایالات متحده § ۱۳۸۵",

    // Legislative & Factions Tables
    tbl_party_faction: "جناح حزبی",
    tbl_leader: "رهبر",
    tbl_ideology: "ایدئولوژی",
    tbl_status: "وضعیت",
    tbl_shura_seats: "کرسیهای شورا",
    tbl_council_seats: "کرسیهای شورای فرهنگی",
    tbl_wilayah: "ولایت",
    tbl_arabic_desig: "عنوان عربی",
    tbl_total_area: "مساحت کل",
    tbl_appointed_gov: "فرماندار منصوب",
    tbl_holiday_name: "نام مناسبت",
    tbl_cultural_script: "عنوان فرهنگی",
    tbl_category: "دسته‌بندی",
    tbl_observance: "جزئیات مراسم",

    // Bicameral Majlis
    majlis_header: "ساختار قانونگذاری",
    majlis_sub: "مدون شده طبق قانون اساسی ۲۴ ژوئیه ۲۰۲۵",
    shura_title: "مجلس الشوری (شورای انتصابی)",
    shura_sub: "مجلس سنا • شورای انتصابی",
    shura_presided: "به ریاست حبیب‌الله میکائیل الأسد",
    shura_desc:
      "این شورای انتصابی به ریاست حبیب‌الله میکائیل الأسد، به عنوان نهاد اصلی مشورتی سلطان عمل می‌کند. تمرکز آن بر فقه اسلامی، بازنگری قانون اساسی و سیاست‌های کلان است.",

    assembly_title: "مجمع نمایندگان مردم",
    assembly_sub: "مجلس عوام • مجمع نمایندگان",
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

    // Featured Profile: Ismailabad
    profile_title: "شاہی دارالحکومت — اسماعیل آباد",
    profile_body:
      "اسماعیل آباد سلطنت کے انتظامی دارالحکومت اور شاہی تخت گاہ کے طور پر کام کرتا ہے۔ ایک احتیاط سے ترتیب دیے گئے علاقے پر مشتمل، یہ حکومتی کارروائیوں، خزانے کے آرکائیوز اور شوریٰ چیمبر کا مرکز ہے۔",
    profile_etymology:
      "وجہ تسمیہ: یہ نام ثقافتی شجرہ نسب اور زبان کے ملاپ کو ظاہر کرتا ہے۔ اسماعیل موجودہ سلطان کے محترم والد، سیدی اسماعیل الرانیری کے اعزاز میں ہے۔ لاحقہ (آباد) فارسی سے ماخوذ ہے، جس کا مطلب 'آباد جگہ'، 'قصبہ' یا 'شہر' ہے، جو خوشحالی اور بہترین نظم و ضبط پر قائم بستی کی علامت ہے۔",

    // National Anthem Component (Exact Prompt Urdu Subtext Translation with Noto Nastaliq Font)
    anthem_header: "سلطنتِ القاسمیہ کا قومی ترانہ (\"میرا وطن سلامت رہے\")",
    anthem_badge: "قومی ترانہ • النشيد الوطني",
    anthem_stanza1_trans:
      "میرا وطن سلامت رہے، عزت اور یقین کے ساتھ / عظمت کی سلطنت، ایک محفوظ قلعہ / دنیاؤں میں ہمارا سبز پرچم / حق اور انصاف کے ہم وفادار ہیں۔",
    anthem_stanza2_trans:
      "غبان کے جِنگلات سے ایک نور چمکا / بھلائی کی جماعت میں اتحاد جمع ہوا / ہم مضبوط عزم کے ساتھ وطن تعمیر کرتے ہیں / اور یوسف ہمارے درمیان ایک رہنما اور ستون ہیں۔",
    anthem_stanza3_trans:
      "ہماری جانیں اس مٹی پر قربان ہیں / اور سمندروں پار بھی عزت و عظمت پھیلی ہے / اللہ سلطان اور وطن کی حفاظت فرمائے / ہم وقت کے گزرنے کے ساتھ بھی سر بلند رہیں گے۔",

    // Geographical Weather Module
    weather_box_title: "جغرافیائی موسم کا پروفائل",
    weather_profile_sub: "علاقائی آب و ہوا کا پروفائل (CFA)",
    weather_annual_precip: "سالانہ بارش: 114 سینٹی میٹر جمع شدہ",
    weather_winter_low: "سردیوں کا کم از کم درجہ حرارت: -5°C اوسط جنوری",
    weather_summer_high: "گرمیوں کا زیادہ سے زیادہ درجہ حرارت: 30°C اوسط جولائی",
    weather_classification:
      "آب و ہوا کی درجہ بندی: مرطوب ذیلی گرمسیری (Cfa)۔ سلطنت چار الگ الگ موسموں کا تجربہ کرتی ہے جس میں گرم، مرطوب گرمیاں اور سرد، برفانی سردیاں شامل ہیں۔",

    // Defense Doctrine Module
    defense_title: "دفاعی نظریہ",
    defense_heading: "جیش السلطنت القاسمیہ (قاسمی سلطنت کی افواج)",
    defense_body:
      "قومی دفاعی فورس، جیش السلطنت القاسمیہ، خالصتاً رسمی اور ثقافتی تعمیر نو کی صلاحیت میں خدمات انجام دیتی ہے۔ میزبان ملک کے مقامی اور وفدرل قوانین (خاص طور پر پوسی کومٹیٹس ایکٹ - 18 یو ایس کوڈ § 1385 کے تحت ریاستہائے متحدہ کے وفاقی قانون) کے ساتھ مکمل تعمیل برقرار رکھنے کے لیے، افواج کو داخلی قانون نافذ کرنے والے اقدامات، سول پولیسنگ، یا فعال حرکیاتی کارروائیوں سے مکمل طور پر منع کیا گیا ہے۔ ان کے فرائض سلطان کے لیے اعزازی گارڈ کے طور پر خدمات انجام دینے، مقامی ثقافتی تقریبات کو مربوط کرنے، تاریخی رجسٹروں کو برقرار رکھنے اور ہنگامی تیاریوں کی مشقوں تک محدود ہیں۔",

    // Matrilineal Lineage Module
    lineage_title: "مادری شجرہ نسب (شجرہ النسب)",
    lineage_sub: "شاہی تاریخ جو سلطان یوسف اول کے مادری شجرہ نسب کو ان کی والدہ ام عمار کے ذریعے نبی کریم تک پہنچاتی ہے",
    lineage_full_heading: "مکمل مادری شجرہ نسب",
    lineage_btn_expand: "مکمل مادری شجرہ نسب کا رجسٹر دیکھیں",
    lineage_btn_collapse: "شجرہ نسب کا رجسٹر بند کریں",
    lineage_root: "بنیادی بزرگ",
    lineage_5th_imam: "پانچویں امام کی نسل",
    lineage_37th: "37 ویں پردادا",
    lineage_sufi: "صوفی بزرگ",
    lineage_bihar: "بہار کے بزرگ",
    lineage_incumbent: "موجودہ سربراہ",

    // Society, Culture & Economy Module
    culture_heritage_heading: "ورثہ اور مصالحہ جات",
    culture_heritage_text1:
      "ثقافتی منظر نامہ کلاسیکی اسلامی اقدار، علاقائی جنوبی ایشیائی/مشرق وسطیٰ کے ورثے اور راریتان وادی کی بحری روایات کو جوڑتا ہے۔",
    culture_heritage_text2:
      "سلطنت کے کمیونٹی گروپس قدرتی خوشبوؤں کے فن، روایتی علمی مناظروں اور شاہی تاریخ کے تحفظ پر توجہ مرکوز کرتے ہیں۔",
    culture_economy_heading: "روحانی اور گھریلو معیشت",
    culture_economy_text1:
      "معیشت کی خصوصیت گھریلو پیداواری فریم ورک ہے۔ جغرافیائی حدود کی وجہ سے، شہری اعلیٰ معیار کے ہاتھ کے کام، ڈیجیٹل خدمات اور مصالحہ جات کی پروسیسنگ پر توجہ دیتے ہیں۔",
    culture_economy_text2:
      "خزانے کے ذخائر کو سختی سے منظم کیا جاتا ہے، جس میں قاسمی دینار کو معاشی سالمیت کی ضمانت کے لیے یورو (EUR) سے مربوط کیا گیا ہے۔",

    // Global Footer
    footer_rights:
      "سلطنت القاسمیہ۔ جملہ حقوق محفوظ ہیں 2026 © شاہی رجسٹری آف ڈیڈز، مردم شماری، اور فارن رجسٹری، اسماعیل آباد۔",
    footer_compliance:
      "خودمختار آئینی بادشاہت • سینٹرل نیو جرسی • تعمیل بمطابق 18 یو ایس کوڈ § 1385",

    // Legislative & Factions Tables
    tbl_party_faction: "جماعتی دھڑا",
    tbl_leader: "قائد",
    tbl_ideology: "نظریہ",
    tbl_status: "حیثیت",
    tbl_shura_seats: "شوریٰ کی نشستیں",
    tbl_council_seats: "ثقافتی کونسل کی نشستیں",
    tbl_wilayah: "ولایت (صوبہ)",
    tbl_arabic_desig: "عربی نام",
    tbl_total_area: "کل رقبہ",
    tbl_appointed_gov: "نامزد گورنر",
    tbl_holiday_name: "تہوار کا نام",
    tbl_cultural_script: "عربی / ثقافتی نام",
    tbl_category: "زمرہ",
    tbl_observance: "تفصیلات",

    // Bicameral Majlis
    majlis_header: "قانون سازی کا ڈھانچہ",
    majlis_sub: "24 جولائی 2025 کے آئین کے تحت منظور شدہ",
    shura_title: "مجلس الشوریٰ (ایوان بالا)",
    shura_sub: "ایوان بالا • نامزد کونسل",
    shura_presided: "چیئرمین حبیب اللہ میکائیل الاسد کی زیرِ صدارت",
    shura_desc:
      "چیئرمین حبیب اللہ میکائیل الاسد کی قیادت میں یہ نامزد کونسل سلطان کے بنیادی مشارتی ادارے کے طور پر کام کرتی ہے۔ اس کی توجہ اسلامی فقہ، آئینی جائزہ اور طویل مدتی پالیسی پر مرکوز ہے۔",

    assembly_title: "ایوان زیریں • نمائندہ ادارہ",
    assembly_sub: "ایوان زیریں • نمائندہ ادارہ",
    assembly_rep: "104 رجسٹرڈ شہریوں کی نمائندگی",
    assembly_desc:
      "ایک نمائندہ ادارہ جو 104 رجسٹرڈ شہریوں کے مفادات کی ترجمانی کرتا ہے۔ یہ مقامی برادری کے امور، ثقافتی تحفظ اور عوامی تجاویز کی تدوین پر توجہ مرکوز کرتا ہے۔",

    select_language: "زبان منتخب کریں",
  },
};

// Full News Articles Database
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

// Territory Maps Translation Database
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
        "Wilayat of Ghabaan (Ismailabad): The historical core and seat of the capital, Ismailabad. Characterized by dense, cultivated forest terrain, housing the Royal Diwan, treasury archives, and sovereign councils. Administered by Governor Al-Himalayi.",
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
        "Wilayat of Jama'ah: 0.02 sq mi. The administrative extension of the mainland, serving as a hub for community gathering, civil structuring, residential quarters, and grassroots assemblies. Administered by Governor Harith al-Dehlawi.",
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
        "Overseas Territory of Al Maqsoodi: 4.87 acres. Located internationally in Gadap Town, Karachi. A crown-administered enclave serving as the Sultanate's primary diplomatic and hospitality hub... Authority: Umm Omar Syed.",
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
        "ولاية الغابات (إسماعيل آباد): القلب التاريخي ومقر العاصمة إسماعيل آباد. تتميز بتضاريس غابية زراعية كثيفة، وتضم الديوان الملكي وأرشيف الخزانة... تحت إدارة الحاكم الهيمالايي.",
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
        "ولاية الجماعة: ٠٫٠٢ ميل مربع. التمدد الإداري لليابسة، وتعتبر مركزاً للتجمع المجتمعي والتنظيم المدني والأحياء السكنية... تحت إدارة الحاكم الحارث الدهلوي.",
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
        "إقليم المقصودي ما وراء البحار: ٤٫٨٧ فدان. يقع في جاداب تاون، كراتشي. جيب إداري ملكي يعتبر المركز الدبلوماسي والضيافة الرئيسي للسلطنة... السلطة: أم عمر سيد.",
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
        "ولایت غابات (اسماعیل‌آباد): هسته تاریخی و مقر پایتخت، اسماعیل‌آباد. مشخص‌شده با زمین‌های جنگلی کشت‌شده... تحت مدیریت فرماندار هیمالایی.",
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
        "ولایت جماعه: ۰٫۰۲ میل مربع. بخش اداری سرزمین اصلی، به عنوان مرکزی برای اجتماعات عمومی و ساختار مدنی... تحت مدیریت فرماندار حارث دهلوی.",
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
        "قلمرو فرامرزی المقصودی: ۴٫۸۷ آکر. واقع در گداپ تاون، کراچی. برون‌بوم تحت مدیریت تاج و تخت که به عنوان مرکز اصلی دیپلماتیک سلطنت عمل می‌کند... مقام مسئول: ام عمر سید.",
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
        "ولایت غبان (اسماعیل آباد): 0.01 مربع میل۔ تاریخی مرکز اور دارالحکومت کی نشست۔ گھنے جنگلاتی زمین پر مشتمل... گورنر الہمالائی کے زیر انتظام۔",
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
        "ولایت جماعت: 0.02 مربع میل۔ سرزمینی توسیع، عوامی اجتماعات اور شہری تنظیم کا مرکز... گورنر حارث دہلوی کے زیر انتظام۔",
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
        "سمندر پار علاقہ المقصودی: 4.87 ایکڑ۔ گڈاپ ٹاؤن، کراچی میں واقع۔ شاہی انتظام کے تحت علاقہ جو سلطنت کا اہم سفارتی اور مہمانی مرکز ہے... اتھارٹی: ام عمر سید۔",
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

// Historical Eras Multilingual Database
export const HISTORY_ERAS_TRANSLATIONS: Record<LanguageCode, HistoryEraTranslation[]> = {
  en: [
    {
      title: "Prehistoric Record: Lenape Inhabitants",
      subtitle: "Indigenous Stewardship & Raritan Corridor",
      content:
        "Indigenous Stewardship & Raritan Corridor. Long before the arrival of modern settlements, the geographic bounds were under the ancestral guardianship of the Lenape nation.",
    },
    {
      title: "Colonial Period & Crown Grants (1664–1737)",
      subtitle: "English Sovereign Control & Brownville Settlement",
      content:
        "English Sovereign Control & Brownville Settlement. English sovereign control over the territory was formalized in 1664, culminating in the erection of Middlesex County boundaries in 1683. In 1737, a landmark 1,000-acre Crown land grant was issued to John and Susannah Brown, formally establishing the historical sector of 'Brownville' (Browntown / Trans Old Bridge Road sector).",
    },
    {
      title: "Revolutionary War & 19th Century (1778–1975)",
      subtitle: "Road to Monmouth & Township Incorporation",
      content:
        "During the American Revolutionary War, the corridor served as a strategic crossroads leading toward the pivotal Battle of Monmouth (1778). The surrounding region was incorporated as Madison Township in 1869, and renamed Old Bridge Township in 1975.",
    },
    {
      title: "Late 20th Century Demographic Shift (1999–2001)",
      subtitle: "The Y2K Migration & Royal Lineage Settlement",
      content:
        "A major migration wave of South Asian and Middle Eastern tech professionals arrived in Central New Jersey to resolve Y2K infrastructure adjustments. This brought ancestral lineages of the royal family to the region between 1999 and 2001.",
    },
    {
      title: "Early Independence Movements (1999–2021)",
      subtitle: "Waliustan & The Hashemia Proclamation",
      content:
        "Micronational governance began in 1999 with the founding of Waliustan. On August 31, 2021, the Kingdom of Hashemia was proclaimed, establishing Qadirabad with an initial population of 80 residents.",
    },
    {
      title: "The Hashemian Era & Conflicts (2021–2023)",
      subtitle: "Civil Strife, Expansion, and Territorial Annexations",
      content:
        "Marked by pivotal events including the Hashemian Civil War (Oct 2021), Hashemian National Project (Jan 2022), Decker Rebellion Suppression, and the Annexation of Tartary (Oct 2022).",
    },
    {
      title: "The VECTO Era & Cyber Warfare (2023–2024)",
      subtitle: "International Alliances & The USR Crusade",
      content:
        "On July 5, 2023, the state joined UMN and VECTO, rebranding to Raritania on July 15. The state suffered the 'Dark Age' server destruction in August 2023, followed by digital platform reconstruction and defense against the USR Crusade.",
    },
    {
      title: "The Raritan Caliphate (2024–2025)",
      subtitle: "Caliphal Governance & Dynastic Abdication",
      content:
        "On December 30, 2024, the state proclaimed the Raritan Caliphate, shifting state machinery toward classical caliphal governance principles and marking the formal abdication of traditional royal titles by the Majidid family.",
    },
    {
      title: "Establishment of the Kasimid Sultanate (2025–Present)",
      subtitle: "Constitutional Order & Reign of Sultan Yusuf I",
      content:
        "Following constitutional negotiations, the modern Constitution of the Kasimid Sultanate was ratified on July 24, 2025. The constitution established a bicameral Majlis with Sultan Yusuf I as sovereign monarch.",
    },
  ],
  ar: [
    {
      title: "السجل التاريخي القديم: سكان اللينابي",
      subtitle: "الإشراف الأصلي وممر راريتان",
      content:
        "الإشراف الأصلي وممر راريتان. قبل وقت طويل من وصول المستوطنات الحديثة، كانت الحدود الجغرافية تحت الحماية العريقة لأمة اللينابي.",
    },
    {
      title: "الفترة الاستعمارية والمنح الملكية (١٦٦٤–١٧٣٧)",
      subtitle: "السيطرة السيادية الإنجليزية ومستوطنة براونفيل",
      content:
        "السيطرة السيادية الإنجليزية ومستوطنة براونفيل. تم إضفاء الطابع الرسمي على السيطرة السيادية الإنجليزية على المنطقة في عام ١٦٦٤، مما توج بوضع حدود مقاطعة ميدلسكس في عام ١٦٨٣. وفي عام ١٧٣٧، تم إصدار منحة أرض ملكية تاريخية بمساحة ١٠٠٠ فدان لجون وسوزانا براون، مما أدى رسمياً إلى تأسيس القطاع التاريخي لـ 'براونفيل' (قطاع براونتاون / طريق ترانس أولد بريدج).",
    },
    {
      title: "حرب الاستقلال والقرن التاسع عشر (١٧٧٨–١٩٧٥)",
      subtitle: "طريق مونموث وتأسيس البلدية",
      content:
        "خلال الحرب الثورية، خدم الممر كتقاطع استراتيجي لحركة القوات نحو معركة مونموث الحاسمة (١٧٧٨). وتأسست بلدة ماديسون في عام ١٨٦٩ وأعيد تسميتها إلى بلدة أولد بريدج في عام ١٩٧٥.",
    },
    {
      title: "التحول الديمغرافي أواخر القرن العشرين (١٩٩٩–٢٠٠١)",
      subtitle: "هجرة Y2K واستقرار السلالة الملكية",
      content:
        "وصلت موجة هجرة رئيسية من متخصصي التكنولوجيا من جنوب آسيا والشرق الأوسط إلى نيو جيرسي لإجراء تعديلات البنية التحتية لحل مشكلة Y2K، مما جلب السلالة الملكية إلى المنطقة.",
    },
    {
      title: "حركات الاستقلال المبكرة (١٩٩٩–٢٠٢١)",
      subtitle: "واليوستان وإعلان الهاشمية",
      content:
        "بدأت الحوكمة الميكرونية في عام ١٩٩٩ بتأسيس واليوستان. وفي ٣١ أغسطس ٢٠٢١، أُعلنت المملكة الهاشمية وتأسست قادر آباد مع ٨٠ مواطناً.",
    },
    {
      title: "العصر الهاشمي والنزاعات (٢٠٢١–٢٠٢٣)",
      subtitle: "النزاعات الداخلية والتوسع والتضمين الإقليمي",
      content:
        "تميز الأحداث بالحرب الأهلية الهاشمية (أكتوبر ٢٠٢١)، والمشروع الوطني (يناير ٢٠٢٢)، وقمع تمرد دكر، وتضمين تارتاري (أكتوبر ٢٠٢٢).",
    },
    {
      title: "عصر VECTO والحرب السيبرانية (٢٠٢٣–٢٠٢٤)",
      subtitle: "التحالفات الدولية والحرب الدفاعية",
      content:
        "في ٥ يوليو ٢٠٢٣، انضمت الدولة إلى UNAM و VECTO، وتغير اسمها إلى راريتانيا. وشهدت الدولة إعادة بناء المنصات الرقمية والدفاع ضد الحملات الكبرى.",
    },
    {
      title: "الخلافة الراريتانية (٢٠٢٤–٢٠٢٥)",
      subtitle: "الحوكمة الخلافية والتنازل السلالي",
      content:
        "في ٣٠ ديسمبر ٢٠٢٤، أُعلنت الخلافة الراريتانية، وتحولت أجهزة الدولة نحو مبادئ الحكم الخلافية الكلاسيكية.",
    },
    {
      title: "تأسيس السلطنة القاسمية (٢٠٢٥–الحاضر)",
      subtitle: "النظام الدستوري وحكم السلطان يوسف الأول",
      content:
        "عقب المفاوضات الدستورية، تم إقرار دستور السلطنة القاسمية في ٢٤ يوليو ٢٠٢٥، وتأسيس المجلس التشريعي ثنائي التمثيل.",
    },
  ],
  fa: [
    {
      title: "سابقه تاریخی پیش از تاریخ: ساکنان لناپه",
      subtitle: "سرپرستی بومیان و کریدور راریتان",
      content:
        "سرپرستی بومیان و کریدور راریتان. مدتها قبل از ظهور سکونتگاههای مدرن، مرزهای جغرافیایی تحت نگهبانی اجدادی قوم لناپه قرار داشت.",
    },
    {
      title: "دوره استعماری و واگذاری‌های شاهی (۱۶۶۴–۱۷۳۷)",
      subtitle: "کنترل حاکمیتی انگلیس و سکونتگاه براونویل",
      content:
        "کنترل حاکمیتی انگلیس و سکونتگاه براونویل. کنترل حاکمیتی انگلستان بر این قلمرو در سال ۱۶۶۴ رسمی شد و در سال ۱۶۸۳ به تعیین مرزهای شهرستان میدلسکس انجامید. در سال ۱۷۳۷، زمین شاهی به مساحت ۱۰۰۰ آکر به جان و سوزانا براون اعطا شد که رسماً بخش تاریخی 'براونویل' (منطقه براونتاون / جاده ترانس اولد بریج) را پایهگذاری کرد.",
    },
    {
      title: "جنگ استقلال و قرن نوزدهم (۱۷۷۸–۱۹۷۵)",
      subtitle: "مسیر مونموث و ثبت شهرداری",
      content:
        "در طول جنگ‌های انقلاب، این مسیر به عنوان چهارراه استراتژیک به نبرد مونموث (۱۷۷۸) ختم شد. این منطقه در سال ۱۸۶۹ با نام تاون‌شیپ مدیسون ثبت شد.",
    },
    {
      title: "تغییرات جمعیتی اواخر قرن بیستم (۱۹۹۹–۲۰۰۱)",
      subtitle: "مهاجرت Y2K و استقرار تبار سلطنتی",
      content:
        "موج بزرگ مهاجرت متخصصان فناوری برای حل مشکل Y2K منجر به استقرار خاندان سلطنتی در منطقه بین سال‌های ۱۹۹۹ تا ۲۰۰۱ شد.",
    },
    {
      title: "جنبش‌های استقلال اولیه (۱۹۹۹–۲۰۲۱)",
      subtitle: "والیوتستان و اعلامیه هاشمیه",
      content:
        "حکومت ریزکشوری در سال ۱۹۹۹ با تاسیس والیوتستان آغاز شد و در ۳۱ اوت ۲۰۲۱ پادشاهی هاشمیه اعلام شد.",
    },
    {
      title: "دوران هاشمی و نبردها (۲۰۲۱–۲۰۲۳)",
      subtitle: "درگیری‌های داخلی و الحاق قلمروها",
      content:
        "شامل جنگ داخلی هاشمیه (اکتبر ۲۰۲۱)، پروژه ملی (ژانویه ۲۰۲۲)، سرکوب شورش دکر و الحاق تارتاری (اکتبر ۲۰۲۲).",
    },
    {
      title: "دوران VECTO و جنگ سایبری (۲۰۲۳–۲۰۲۴)",
      subtitle: "اتحادهای بین‌المللی و بازسازی دیجیتال",
      content:
        "در ۵ ژوئیه ۲۰۲۳، به VECTO پیوست و نام به راریتانیا تغییر یافت. بازسازی پلتفرم‌های دیجیتال پس از عصر تاریک انجام شد.",
    },
    {
      title: "خلافت راریتان (۲۰۲۴–۲۰۲۵)",
      subtitle: "حکومت خلافتی و کناره‌گیری دودمانی",
      content:
        "در ۳۰ دسامبر ۲۰۲۴، خلافت راریتان اعلام شد و ساختار حکومت به اصول خلافتی کلاسیک تغییر یافت.",
    },
    {
      title: "تاسیس سلطنت قاسمية (۲۰۲۵ تا کنون)",
      subtitle: "نظام مشروطه و حکومت سلطان یوسف اول",
      content:
        "پس از مذاکرات، قانون اساسی سلطنت قاسمية در ۲۴ ژوئیه ۲۰۲۵ تصویب شد و پارلمان دو مجلسی ایجاد گردید.",
    },
  ],
  ur: [
    {
      title: "قبل از تاریخ کا ریکارڈ: لناپے باشندے",
      subtitle: "مقامی نظام اور راریتان راہداری",
      content:
        "مقامی نظام اور راریتان راہداری۔ جدید بستیوں کی آمد سے بہت پہلے، یہ جغرافیائی حدود لناپے قوم کے آبائی تحفظ میں تھیں۔",
    },
    {
      title: "استعماری دور اور شاہی زمین (1664–1737)",
      subtitle: "انگریزی خودمختار کنٹرول اور براؤن ول بستی",
      content:
        "انگریزی خودمختار کنٹرول اور براؤن ول بستی۔ اس علاقے پر انگریزی خودمختار کنٹرول کو 1664 میں باقاعدہ شکل دی گئی، جس کا اختتام 1683 میں مڈلسیکس کاؤنٹی کی حدود کے قیام پر ہوا۔ 1637 میں جان اور سوزانا براؤن کو 1000 ایکڑ پر مشتمل تاریخی شاہی زمین کی گرانٹ جاری کی گئی، جس نے باقاعدہ طور پر 'براؤن ول' (براؤن ٹاؤن / ٹرانس اولڈ برج روڈ سیکٹر) کا تاریخی علاقہ قائم کیا۔",
    },
    {
      title: "انقلابی جنگ اور 19ویں صدی (1778–1975)",
      subtitle: "مونموث کا راستہ اور میونسپلٹی کا قیام",
      content:
        "انقلابی جنگ کے دوران، یہ راہداری مونموث کی جنگ (1778) کی طرف اہم راستہ بنی۔ اس علاقے کو 1869 میں میڈیسن ٹاؤن شپ اور 1975 میں اولڈ برج ٹاؤن شپ کا نام دیا گیا۔",
    },
    {
      title: "20ویں صدی کی ڈیموگرافک تبدیلی (1999–2001)",
      subtitle: "Y2K ہجرت اور شاہی خاندان کی آمد",
      content:
        "Y2K تکنیکی مسائل کے حل کے لیے ٹیکنالوجی کے ماہرین کی ہجرت کے نتیجے میں شاہی خاندان 1999 سے 2001 کے درمیان اس علاقے میں آباد ہوا۔",
    },
    {
      title: "ابتدائی آزادی کی تحریکیں (1999–2021)",
      subtitle: "والیوسُتان اور ہاشمیہ کا قیام",
      content:
        "مائیکرو نیشن حکمرانی کا آغاز 1999 میں والیوسُتان سے ہوا۔ 31 اگست 2021 کو مملکتِ ہاشمیہ کا قیام عمل میں آیا۔",
    },
    {
      title: "ہاشمی دور اور نبرد آزمائی (2021–2023)",
      subtitle: "داخلی کشمکش اور علاقوں کا الحاق",
      content:
        "ہاشمی خانہ جنگی (اکتوبر 2021)، قومی منصوبے، ڈیکر بغاوت کا خاتمہ اور تارتاری کا الحاق (اکتوبر 2022)۔",
    },
    {
      title: "VECTO دور اور سائبر جنگ (2023–2024)",
      subtitle: "بین الاقوامی اتحاد اور دفاعی کامیابی",
      content:
        "5 جولائی 2023 کو UNAM اور VECTO کا حصہ بنا، 15 جولائی کو راریٹانیہ نام رکھا گیا۔ سائبر جنگ کا کامياب دفاع کیا گیا۔",
    },
    {
      title: "راریتان خلافت (2024–2025)",
      subtitle: "خلافت کا نظام اور روایتی القاب سے دستبرداری",
      content:
        "30 دسمبر 2024 کو راریتان خلافت کا اعلان ہوا، جس نے ریاستی نظام کو روایتی خلافت کے اصولوں پر گامزن کیا۔",
    },
    {
      title: "سلطنتِ القاسمیہ کا قیام (2025 تا حال)",
      subtitle: "آئینی نظام اور سلطان یوسف اول کا دورِ حکومت",
      content:
        "آئینی مذاکرات کے بعد 24 جولائی 2025 کو سلطنتِ القاسمیہ کا آئین منظور ہوا اور دو ایوانی مجلس کا قیام عمل میں لایا گیا۔",
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
  getHistoryEras: () => HistoryEraTranslation[];
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
  getHistoryEras: () => HISTORY_ERAS_TRANSLATIONS.en,
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

  const getHistoryEras = (): HistoryEraTranslation[] => {
    return HISTORY_ERAS_TRANSLATIONS[language] || HISTORY_ERAS_TRANSLATIONS.en;
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
        getHistoryEras,
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
