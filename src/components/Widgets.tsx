"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

// --- IMPERIAL TIME WIDGET ---

export function LocalTimeWidget() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      // New Jersey/Eastern Time
      const optionsTime: Intl.DateTimeFormatOptions = {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };

      const optionsDate: Intl.DateTimeFormatOptions = {
        timeZone: "America/New_York",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      const formatterTime = new Intl.DateTimeFormat("en-US", optionsTime);
      const formatterDate = new Intl.DateTimeFormat("en-US", optionsDate);

      const now = new Date();
      setTime(formatterTime.format(now));
      setDate(formatterDate.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border border-ivory-300 bg-white p-5 shadow-sm hover:border-brass-gold-400 transition-all duration-300">
      <div className="flex items-center space-x-3 mb-3 text-stone-500">
        <svg
          className="w-5 h-5 text-brass-gold-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-xs font-semibold uppercase tracking-wider">
          Ismailabad Standard Time (EST/EDT)
        </span>
      </div>
      <div>
        <p className="text-3xl font-mono font-bold text-ottoman-red-950 tracking-tight">
          {time || "Loading..."}
        </p>
        <p className="text-xs text-stone-600 font-sans mt-1">
          {date || "Imperial Calendar"}
        </p>
      </div>
    </div>
  );
}

// --- DYNAMIC CURRENCY CONVERTER ---

export function CurrencyConverter() {
  const { t } = useLanguage();

  const [eurToUsd, setEurToUsd] = useState<number>(1.08); // fallback: 1 EUR = 1.08 USD
  const [isLoadingRate, setIsLoadingRate] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const [qd, setQd] = useState<string>("100");
  const [eur, setEur] = useState<string>("200");
  const [usd, setUsd] = useState<string>("216.00");

  // Fixed Peg: 1 QD = 2.00 EUR
  const QD_TO_EUR = 2.0;
  const EUR_TO_QD = 0.5;

  useEffect(() => {
    async function fetchLiveRate() {
      try {
        setIsLoadingRate(true);
        const res = await fetch("https://open.er-api.com/v6/latest/EUR");
        if (res.ok) {
          const data = await res.json();
          if (data && data.rates && data.rates.USD) {
            const liveRate = data.rates.USD;
            setEurToUsd(liveRate);
            setUsd((200 * liveRate).toFixed(2));
            setLastUpdated(
              new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            );
          }
        }
      } catch (error) {
        console.warn("Using fallback EUR to USD rate:", error);
      } finally {
        setIsLoadingRate(false);
      }
    }

    fetchLiveRate();
  }, []);

  // Conversions using live EUR to USD rate:
  // 1 QD = 2 EUR = (2 * eurToUsd) USD
  const qdToUsd = 2 * eurToUsd;
  const usdToQd = 1 / qdToUsd;

  const handleQdChange = (val: string) => {
    setQd(val);
    if (val === "" || isNaN(Number(val))) {
      setEur("");
      setUsd("");
      return;
    }
    const num = Number(val);
    setEur((num * QD_TO_EUR).toFixed(2));
    setUsd((num * qdToUsd).toFixed(2));
  };

  const handleEurChange = (val: string) => {
    setEur(val);
    if (val === "" || isNaN(Number(val))) {
      setQd("");
      setUsd("");
      return;
    }
    const num = Number(val);
    const qdVal = num * EUR_TO_QD;
    setQd(qdVal.toFixed(2));
    setUsd((num * eurToUsd).toFixed(2));
  };

  const handleUsdChange = (val: string) => {
    setUsd(val);
    if (val === "" || isNaN(Number(val))) {
      setQd("");
      setEur("");
      return;
    }
    const num = Number(val);
    const qdVal = num * usdToQd;
    setQd(qdVal.toFixed(2));
    setEur((qdVal * QD_TO_EUR).toFixed(2));
  };

  return (
    <div className="rounded-xl border border-ivory-300 bg-white p-6 shadow-sm hover:border-brass-gold-400 transition-all duration-300 space-y-4">
      
      {/* Widget Header with Live Badge */}
      <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
        <div className="flex items-center space-x-3 text-stone-500">
          <svg
            className="w-5 h-5 text-brass-gold-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-800 font-serif">
            National Currency Converter
          </span>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider font-mono">
            {isLoadingRate ? "Updating..." : "Live Market Rates"}
          </span>
        </div>
      </div>

      {/* Dynamic Rate Banner */}
      <div className="bg-gradient-to-r from-ottoman-red-950 to-ottoman-red-900 border border-brass-gold-500/50 rounded-xl p-3.5 text-center text-ivory-100 space-y-1 shadow-sm">
        <span className="block text-[10px] font-bold uppercase tracking-widest text-brass-gold-400 font-sans">
          Current Market Valuation Standard
        </span>
        <p className="text-base font-mono font-bold text-brass-gold-200">
          1 QD = €2.00 EUR = ${qdToUsd.toFixed(2)} USD
        </p>
        <p className="text-[10px] text-ivory-200/70 font-sans italic">
          {lastUpdated
            ? `Fixed Peg: 1 QD = €2.00 EUR • Live USD Rate fetched at ${lastUpdated}`
            : "Strict Peg: 1 QD = 2.00 EUR • Fetching Live Market USD Exchange Rate..."}
        </p>
      </div>

      {/* Calculator Inputs */}
      <div className="space-y-4 pt-1">
        {/* Kasimi Dinar (QD) */}
        <div>
          <label className="block text-xs font-semibold text-brass-gold-700 uppercase mb-1 font-serif">
            Kasimi Dinar (QD)
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-700 font-serif font-bold text-xs">
              QD
            </div>
            <input
              type="text"
              value={qd}
              onChange={(e) => handleQdChange(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 bg-ivory-50 border border-ivory-300 rounded-md text-stone-900 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-brass-gold-500 focus:border-brass-gold-500"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          {/* Euros (EUR) */}
          <div className="flex-1">
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">
              Euros (€)
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500 font-medium text-xs">
                €
              </div>
              <input
                type="text"
                value={eur}
                onChange={(e) => handleEurChange(e.target.value)}
                className="block w-full pl-8 pr-3 py-2 bg-white border border-ivory-300 rounded-md text-stone-800 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-brass-gold-500 focus:border-brass-gold-500"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* US Dollars (USD) */}
          <div className="flex-1">
            <label className="block text-xs font-semibold text-stone-600 uppercase mb-1">
              US Dollars ($)
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500 font-medium text-xs">
                $
              </div>
              <input
                type="text"
                value={usd}
                onChange={(e) => handleUsdChange(e.target.value)}
                className="block w-full pl-8 pr-3 py-2 bg-white border border-ivory-300 rounded-md text-stone-800 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-brass-gold-500 focus:border-brass-gold-500"
                placeholder="0.00"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-ivory-200 text-[10px] text-stone-500 text-center font-sans">
          The Kasimi Dinar is backed by state reserves and pegged to the Euro (1 QD = 2 EUR). Live USD rates updated via Open Exchange Rates API.
        </div>
      </div>
    </div>
  );
}

// --- CLIMATE & WEATHER BOX ---

export function WeatherBox() {
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const { t } = useLanguage();

  const summerHigh = isCelsius ? "30°C" : "86°F";
  const winterLow = isCelsius ? "-5°C" : "23°F";
  const precipitation = isCelsius ? "114 cm" : "44.9 in";

  return (
    <div className="rounded-xl border border-ivory-300 bg-white p-6 shadow-sm hover:border-brass-gold-400 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3 text-stone-500">
          <svg
            className="w-5 h-5 text-brass-gold-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
            />
          </svg>
          <span className="text-xs font-semibold uppercase tracking-wider">
            {t("weather_profile_sub")}
          </span>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsCelsius(!isCelsius)}
          className="text-xs font-medium bg-ivory-100 text-ottoman-red-900 border border-ivory-300 rounded px-2.5 py-1 hover:bg-brass-gold-100 hover:border-brass-gold-300 transition-all focus:outline-none"
        >
          Use {isCelsius ? "Fahrenheit" : "Celsius"}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Summer averages */}
        <div className="text-center p-3 bg-ivory-50 rounded-lg border border-ivory-200">
          <span className="block text-[10px] uppercase font-semibold text-stone-500 tracking-wider">
            {t("weather_summer_high")}
          </span>
          <span className="block text-xl font-bold font-mono text-amber-700 mt-1">
            {summerHigh}
          </span>
          <span className="block text-[10px] text-stone-500 mt-0.5">Average July</span>
        </div>

        {/* Winter averages */}
        <div className="text-center p-3 bg-ivory-50 rounded-lg border border-ivory-200">
          <span className="block text-[10px] uppercase font-semibold text-stone-500 tracking-wider">
            {t("weather_winter_low")}
          </span>
          <span className="block text-xl font-bold font-mono text-sky-800 mt-1">
            {winterLow}
          </span>
          <span className="block text-[10px] text-stone-500 mt-0.5">Average Jan</span>
        </div>

        {/* Precipitation */}
        <div className="text-center p-3 bg-ivory-50 rounded-lg border border-ivory-200">
          <span className="block text-[10px] uppercase font-semibold text-stone-500 tracking-wider">
            {t("weather_annual_precip")}
          </span>
          <span className="block text-xl font-bold font-mono text-ottoman-red-800 mt-1">
            {precipitation}
          </span>
          <span className="block text-[10px] text-stone-500 mt-0.5">Accumulated</span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-ottoman-red-950 text-brass-gold-100 text-xs rounded border border-brass-gold-600/30">
        <span className="font-semibold block mb-0.5">Climate Classification:</span>
        {t("weather_classification")}
      </div>
    </div>
  );
}
