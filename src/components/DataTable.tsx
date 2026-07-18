"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

// --- POLITICAL PARTIES TABLE ---

export interface PartyData {
  name: string;
  leader: string;
  ideology: string;
  status: string;
  statusType: "Official Ruling" | "Outlawed / Rebellious";
  shuraSeats: number;
  councilSeats: number;
}

export function PoliticalPartiesTable() {
  const { t, language } = useLanguage();

  const getParties = (): PartyData[] => {
    if (language === "ar") {
      return [
        {
          name: "الحزب الإسلامي",
          leader: "علي شهالي",
          ideology: "إسلامية الدولة",
          status: "حاكم رسمي",
          statusType: "Official Ruling",
          shuraSeats: 5,
          councilSeats: 6,
        },
        {
          name: "الحزب الفيدرالي",
          leader: "سردار صاحب سينغ",
          ideology: "الفيدرالية",
          status: "محظور / متمرد",
          statusType: "Outlawed / Rebellious",
          shuraSeats: 0,
          councilSeats: 0,
        },
      ];
    }
    if (language === "fa") {
      return [
        {
          name: "حزب اسلامی",
          leader: "علی شهالی",
          ideology: "اسلام‌گرایی دولتی",
          status: "حاکم رسمی",
          statusType: "Official Ruling",
          shuraSeats: 5,
          councilSeats: 6,
        },
        {
          name: "حزب فدرالی",
          leader: "سردار صاحب سینگ",
          ideology: "فدرالیسم",
          status: "غیرقانونی / شورشی",
          statusType: "Outlawed / Rebellious",
          shuraSeats: 0,
          councilSeats: 0,
        },
      ];
    }
    if (language === "ur") {
      return [
        {
          name: "الحزب الاسلامی",
          leader: "علی شہالی",
          ideology: "ریاستی اسلام پسندی",
          status: "سرکاری حکمران",
          statusType: "Official Ruling",
          shuraSeats: 5,
          councilSeats: 6,
        },
        {
          name: "الحزب الفیدرالی",
          leader: "سردار صاحب سنگھ",
          ideology: "وفاقیت",
          status: "کالعدم / باغی",
          statusType: "Outlawed / Rebellious",
          shuraSeats: 0,
          councilSeats: 0,
        },
      ];
    }

    return [
      {
        name: "Al-Hizb al-Islami",
        leader: "Ali Shihali",
        ideology: "State Islamism",
        status: "Official Ruling",
        statusType: "Official Ruling",
        shuraSeats: 5,
        councilSeats: 6,
      },
      {
        name: "Al-Hizb al-Federali",
        leader: "Sardar Sahib Singh",
        ideology: "Federalism",
        status: "Outlawed / Rebellious",
        statusType: "Outlawed / Rebellious",
        shuraSeats: 0,
        councilSeats: 0,
      },
    ];
  };

  const parties = getParties();

  return (
    <div className="overflow-x-auto rounded-lg border border-ivory-300 shadow-sm bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-ottoman-red-900 border-b border-brass-gold-500 text-brass-gold-100 font-serif text-sm">
            <th className="p-4 font-semibold">{t("tbl_party_faction")}</th>
            <th className="p-4 font-semibold">{t("tbl_leader")}</th>
            <th className="p-4 font-semibold">{t("tbl_ideology")}</th>
            <th className="p-4 font-semibold">{t("tbl_status")}</th>
            <th className="p-4 font-semibold text-center">{t("tbl_shura_seats")}</th>
            <th className="p-4 font-semibold text-center">{t("tbl_council_seats")}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ivory-200 text-stone-700 text-sm">
          {parties.map((party, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-ivory-50"
              } hover:bg-brass-gold-50/50 transition-colors duration-150`}
            >
              <td className="p-4 font-semibold text-ottoman-red-950 font-serif">
                {party.name}
              </td>
              <td className="p-4">{party.leader}</td>
              <td className="p-4 italic">{party.ideology}</td>
              <td className="p-4">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    party.statusType === "Official Ruling"
                      ? "bg-ottoman-red-100 text-ottoman-red-800 border border-ottoman-red-200"
                      : "bg-red-50 text-red-700 border border-red-200 animate-pulse"
                  }`}
                >
                  {party.status}
                </span>
              </td>
              <td className="p-4 text-center font-mono font-medium">{party.shuraSeats}</td>
              <td className="p-4 text-center font-mono font-medium">{party.councilSeats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- PROVINCES TABLE ---

export interface ProvinceData {
  name: string;
  arabicName: string;
  area: string;
  governor: string;
}

export function ProvincesTable() {
  const { t, language } = useLanguage();

  const getProvinces = (): ProvinceData[] => {
    if (language === "ar") {
      return [
        {
          name: "ولاية الغابات",
          arabicName: "ولاية الغابات",
          area: "٠٫٠١ ميل²",
          governor: "الحاكم الهيمالايي",
        },
        {
          name: "ولاية الجماعة",
          arabicName: "ولاية الجماعة",
          area: "٠٫٠٢ ميل²",
          governor: "الحاكم الحارث الدهلوي",
        },
      ];
    }
    if (language === "fa") {
      return [
        {
          name: "ولایت غابات",
          arabicName: "ولاية الغابات",
          area: "۰٫۰۱ میل²",
          governor: "فرماندار هیمالایی",
        },
        {
          name: "ولایت جماعه",
          arabicName: "ولاية الجماعة",
          area: "۰٫۰۲ میل²",
          governor: "فرماندار حارث دهلوی",
        },
      ];
    }
    if (language === "ur") {
      return [
        {
          name: "ولایت غبان",
          arabicName: "ولاية الغابات",
          area: "0.01 مربع میل",
          governor: "گورنر الہمالائی",
        },
        {
          name: "ولایت جماعت",
          arabicName: "ولاية الجماعة",
          area: "0.02 مربع میل",
          governor: "گورنر حارث دہلوی",
        },
      ];
    }

    return [
      {
        name: "Ghabaan Province",
        arabicName: "ولاية الغابات",
        area: "0.01 sq mi",
        governor: "Al-Himalayi",
      },
      {
        name: "Jama’ah Province",
        arabicName: "ولاية الجماعة",
        area: "0.02 sq mi",
        governor: "Harith al-Dehlawi",
      },
    ];
  };

  const provinces = getProvinces();

  return (
    <div className="overflow-x-auto rounded-lg border border-ivory-300 shadow-sm bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-ottoman-red-900 border-b border-brass-gold-500 text-brass-gold-100 font-serif text-sm">
            <th className="p-4 font-semibold">{t("tbl_wilayah")}</th>
            <th className="p-4 font-semibold">{t("tbl_arabic_desig")}</th>
            <th className="p-4 font-semibold">{t("tbl_total_area")}</th>
            <th className="p-4 font-semibold">{t("tbl_appointed_gov")}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ivory-200 text-stone-700 text-sm">
          {provinces.map((prov, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-ivory-50"
              } hover:bg-brass-gold-50/50 transition-colors duration-150`}
            >
              <td className="p-4 font-semibold text-ottoman-red-950 font-serif">
                {prov.name}
              </td>
              <td className="p-4 font-arabic text-ottoman-red-800 text-base" dir="rtl">
                {prov.arabicName}
              </td>
              <td className="p-4 font-mono">{prov.area}</td>
              <td className="p-4 font-medium text-stone-800">{prov.governor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- HOLIDAYS TABLE ---

export interface HolidayData {
  name: string;
  arabicName: string;
  type: string;
  description: string;
}

export function HolidaysTable() {
  const { t, language } = useLanguage();

  const getHolidays = (): HolidayData[] => {
    if (language === "ar") {
      return [
        {
          name: "رأس السنة الهجرية",
          arabicName: "رأس السنة الهجرية",
          type: "ديني",
          description: "احياء ذكرى هجرة النبي محمد (صلى الله عليه وسلم) من مكة إلى المدينة.",
        },
        {
          name: "عيد الفطر",
          arabicName: "عيد الفطر",
          type: "ديني",
          description: "عبر الإفطار والاحتفال بإتمام شهر رمضان المبارك.",
        },
        {
          name: "عيد الأضحى",
          arabicName: "عيد الأضحى",
          type: "ديني",
          description: "عيد الأضحى المبارك، بالتزامن مع موسم الحج في مكة المكرمة.",
        },
        {
          name: "مهرجان العطور",
          arabicName: "مهرجان العطور",
          type: "ثقافي",
          description: "احتفال بالزيوت النباتية الطبيعية والعطور المقطرة.",
        },
        {
          name: "مهرجان حصاد التمور",
          arabicName: "مهرجان حصاد التمور",
          type: "زراعي",
          description: "احتفال بالحصاد والتجارة والاستدامة الاقتصادية.",
        },
        {
          name: "يوم التراث",
          arabicName: "يوم التراث",
          type: "وطني",
          description: "الذكرى السنوية لتاريخ تأسيس السلطنة وسيادتها الوطنية.",
        },
      ];
    }
    if (language === "fa") {
      return [
        {
          name: "سال نو هجری",
          arabicName: "رأس السنة الهجرية",
          type: "مذهبی",
          description: "گرامیداشت هجرت پیامبر اکرم (ص) از مکه به مدینه.",
        },
        {
          name: "عید فطر",
          arabicName: "عيد الفطر",
          type: "مذهبی",
          description: "جشن پایان روزه‌داری و اتمام ماه مبارک رمضان.",
        },
        {
          name: "عید قربان",
          arabicName: "عيد الأضحى",
          type: "مذهبی",
          description: "عید ایثار و همزمان با مراسم حج مناسک ایثار.",
        },
        {
          name: "جشنواره عطرها",
          arabicName: "مهرجان العطور",
          type: "فرهنگی",
          description: "جشنواره روغن‌های گیاهی و عطر‌های خالص سنتی.",
        },
        {
          name: "جشنواره برداشت خرما",
          arabicName: "مهرجان حصاد التمور",
          type: "کشاورزی",
          description: "جشنواره شکرگزاری محصول، تجارت و پایداری اقتصادی.",
        },
        {
          name: "روز میراث ملی",
          arabicName: "يوم التراث",
          type: "ملی",
          description: "گرامیداشت سالانه تاریخ تاسیس، آداب و حاکمیت ملی.",
        },
      ];
    }
    if (language === "ur") {
      return [
        {
          name: "اسلامی نیا سال",
          arabicName: "رأس السنة الهجرية",
          type: "مذہبی",
          description: "نبی کریم (صلی اللہ علیہ وسلم) کی مکہ سے مدینہ ہجرت کی یاد۔",
        },
        {
          name: "عید الفطر",
          arabicName: "عيد الفطر",
          type: "مذہبی",
          description: "رمضان المبارک کے روزوں کی تکمیل پر خوشی کا تہوار۔",
        },
        {
          name: "عید الاضحیٰ",
          arabicName: "عيد الأضحى",
          type: "مذہبی",
          description: "قربانی کا عظيم تہوار اور حج بیت اللہ کی تکمیل۔",
        },
        {
          name: "خوشبوؤں کا میلہ",
          arabicName: "مهرجان العطور",
          type: "ثقافتی",
          description: "قدرتی نباتاتی تیلوں، عطور اور پاکیزہ خوشبوؤں کی نمائش۔",
        },
        {
          name: "کھجور کی کٹائی کا میلہ",
          arabicName: "مهرجان حصاد التمور",
          type: "زرعی",
          description: "زرعی برکات، تجارت اور معاشی پائیداری کا جشن۔",
        },
        {
          name: "یومِ ثقافت و ورثہ",
          arabicName: "يوم التراث",
          type: "قومی",
          description: "سلطنت کے قیام، تاریخ اور قومی خودمختاری کی سالانہ یاد۔",
        },
      ];
    }

    return [
      {
        name: "Islamic New Year",
        arabicName: "رأس السنة الهجرية",
        type: "Religious",
        description: "Commemoration of the migration (Hijrah) of Prophet Muhammad (PBUH) from Mecca to Medina.",
      },
      {
        name: "Eid al-Fitr",
        arabicName: "عيد الفطر",
        type: "Religious",
        description: "Festival of breaking the fast, celebrating the completion of Ramadan.",
      },
      {
        name: "Eid al-Adha",
        arabicName: "عيد الأضحى",
        type: "Religious",
        description: "Festival of sacrifice, marking the culmination of the annual Hajj pilgrimage.",
      },
      {
        name: "Festival of Fragrance",
        arabicName: "مهرجان العطور",
        type: "Cultural",
        description: "Celebration of natural botanical oils, attars, and clean scents, reflecting cultural purity.",
      },
      {
        name: "Date Harvest Festival",
        arabicName: "مهرجان حصاد التمور",
        type: "Economic/Agricultural",
        description: "Harvest festival celebrating agricultural blessing, trade, and economic sustainability.",
      },
      {
        name: "Day of Heritage",
        arabicName: "يوم التراث",
        type: "National",
        description: "Annual commemoration of the founding history, customs, and sovereignty of the Sultanate.",
      },
    ];
  };

  const holidays = getHolidays();

  return (
    <div className="overflow-x-auto rounded-lg border border-ivory-300 shadow-sm bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-ottoman-red-900 border-b border-brass-gold-500 text-brass-gold-100 font-serif text-sm">
            <th className="p-4 font-semibold">{t("tbl_holiday_name")}</th>
            <th className="p-4 font-semibold">{t("tbl_cultural_script")}</th>
            <th className="p-4 font-semibold">{t("tbl_category")}</th>
            <th className="p-4 font-semibold">{t("tbl_observance")}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ivory-200 text-stone-700 text-sm">
          {holidays.map((h, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-white" : "bg-ivory-50"
              } hover:bg-brass-gold-50/50 transition-colors duration-150`}
            >
              <td className="p-4 font-semibold text-ottoman-red-950 font-serif">
                {h.name}
              </td>
              <td className="p-4 font-arabic text-ottoman-red-800 text-base" dir="rtl">
                {h.arabicName}
              </td>
              <td className="p-4">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                    h.type === "Religious" || h.type === "ديني" || h.type === "مذهبی" || h.type === "مذہبی"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : h.type === "National" || h.type === "وطني" || h.type === "ملی" || h.type === "قومی"
                      ? "bg-amber-50 text-amber-800 border border-amber-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  {h.type}
                </span>
              </td>
              <td className="p-4 text-stone-600 max-w-xs md:max-w-md">{h.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
