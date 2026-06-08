"use client";

import React, { useState, useEffect } from "react";

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

// --- CURRENCY CONVERTER ---

export function CurrencyConverter() {
  const [qd, setQd] = useState<string>("100");
  const [eur, setEur] = useState<string>("200");
  const [usd, setUsd] = useState<string>("216");

  // Fixed conversion rates:
  // 1 QD = 2 EUR
  // 1 EUR = 1.08 USD (so 1 QD = 2.16 USD)
  const EUR_TO_QD = 0.5;
  const QD_TO_EUR = 2;
  const QD_TO_USD = 2.16;
  const USD_TO_QD = 1 / 2.16;

  const handleQdChange = (val: string) => {
    setQd(val);
    if (val === "" || isNaN(Number(val))) {
      setEur("");
      setUsd("");
      return;
    }
    const num = Number(val);
    setEur((num * QD_TO_EUR).toFixed(2));
    setUsd((num * QD_TO_USD).toFixed(2));
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
    setUsd((qdVal * QD_TO_USD).toFixed(2));
  };

  const handleUsdChange = (val: string) => {
    setUsd(val);
    if (val === "" || isNaN(Number(val))) {
      setQd("");
      setEur("");
      return;
    }
    const num = Number(val);
    const qdVal = num * USD_TO_QD;
    setQd(qdVal.toFixed(2));
    setEur((qdVal * QD_TO_EUR).toFixed(2));
  };

  return (
    <div className="rounded-xl border border-ivory-300 bg-white p-6 shadow-sm hover:border-brass-gold-400 transition-all duration-300">
      <div className="flex items-center space-x-3 mb-4 text-stone-500">
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
        <span className="text-xs font-semibold uppercase tracking-wider">
          Official Currency Calculator (Fixed Rate)
        </span>
      </div>

      <div className="space-y-4">
        {/* Kasimi Dinar (QD) */}
        <div>
          <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">
            Kasimi Dinar (QD)
          </label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500 font-serif font-bold">
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
            <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">
              Euros (€)
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500 font-medium">
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
            <label className="block text-xs font-semibold text-stone-500 uppercase mb-1">
              US Dollars ($)
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500 font-medium">
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
          Fixed Exchange Standard: 1 QD = 2.00 EUR (Pegged) | 1.00 EUR = 1.08 USD (Ref)
        </div>
      </div>
    </div>
  );
}

// --- CLIMATE & WEATHER BOX ---

export function WeatherBox() {
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  // Climate data:
  // Summer High: 30°C / 86°F
  // Winter Low: -5°C / 23°F
  // Avg Precipitation: 114 cm / 44.9 in
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
            Regional Climate Profile (Cfa)
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
            Summer High
          </span>
          <span className="block text-xl font-bold font-mono text-amber-700 mt-1">
            {summerHigh}
          </span>
          <span className="block text-[10px] text-stone-500 mt-0.5">Average July</span>
        </div>

        {/* Winter averages */}
        <div className="text-center p-3 bg-ivory-50 rounded-lg border border-ivory-200">
          <span className="block text-[10px] uppercase font-semibold text-stone-500 tracking-wider">
            Winter Low
          </span>
          <span className="block text-xl font-bold font-mono text-sky-800 mt-1">
            {winterLow}
          </span>
          <span className="block text-[10px] text-stone-500 mt-0.5">Average Jan</span>
        </div>

        {/* Precipitation */}
        <div className="text-center p-3 bg-ivory-50 rounded-lg border border-ivory-200">
          <span className="block text-[10px] uppercase font-semibold text-stone-500 tracking-wider">
            Annual Precip.
          </span>
          <span className="block text-xl font-bold font-mono text-ottoman-red-800 mt-1">
            {precipitation}
          </span>
          <span className="block text-[10px] text-stone-500 mt-0.5">Accumulated</span>
        </div>
      </div>

      <div className="mt-4 p-3 bg-ottoman-red-950 text-brass-gold-100 text-xs rounded border border-brass-gold-600/30">
        <span className="font-semibold block mb-0.5">Climate Classification:</span>
        Humid Subtropical (Cfa). The Sultanate experiences four distinct seasons with hot, humid summers and cold, snowy winters.
      </div>
    </div>
  );
}
