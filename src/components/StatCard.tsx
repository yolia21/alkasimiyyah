import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
}

export default function StatCard({ label, value, subtitle, icon }: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-ivory-300 bg-white p-6 shadow-sm hover:shadow-md hover:border-brass-gold-400 transition-all duration-300 group">
      {/* Decorative Golden Accent Line at top of the card */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-royal-green-700 via-brass-gold-400 to-royal-green-700 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-stone-500 block mb-1">
            {label}
          </span>
          <h3 className="text-2xl font-bold text-royal-green-900 font-serif leading-tight">
            {value}
          </h3>
          {subtitle && (
            <p className="mt-1.5 text-xs text-stone-600 font-sans">
              {subtitle}
            </p>
          )}
        </div>
        
        {icon && (
          <div className="p-2.5 rounded-lg bg-ivory-100 text-royal-green-800 group-hover:bg-royal-green-50 group-hover:text-royal-green-700 transition-colors duration-300">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
