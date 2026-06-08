import React from "react";

interface ProfileCardProps {
  name: string;
  arabicName: string;
  title: string;
  subTitle?: string;
  born: string;
  origin?: string;
  association?: string;
  bio: string;
  initials: string;
}

export default function ProfileCard({
  name,
  arabicName,
  title,
  subTitle,
  born,
  origin,
  association,
  bio,
  initials,
}: ProfileCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-ivory-300 bg-white p-6 shadow-sm hover:shadow-md hover:border-brass-gold-400 transition-all duration-300 flex flex-col justify-between group">
      {/* Visual top bar in brass gold */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-royal-green-800 via-brass-gold-500 to-royal-green-800" />
      
      <div>
        {/* Profile Header */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-14 h-14 bg-royal-green-900 text-brass-gold-300 rounded-full flex items-center justify-center font-serif text-lg font-bold border-2 border-brass-gold-400 shadow-sm shrink-0 group-hover:scale-105 transition-transform duration-300">
            {initials}
          </div>
          <div>
            <span className="block font-arabic text-royal-green-800 text-lg leading-tight" dir="rtl">
              {arabicName}
            </span>
            <h4 className="font-serif text-lg font-bold text-stone-850 leading-tight">
              {name}
            </h4>
            <p className="text-xs uppercase tracking-wider text-brass-gold-600 font-semibold mt-0.5">
              {title}
            </p>
            {subTitle && (
              <span className="block text-[10px] text-stone-500 font-sans tracking-wide">
                {subTitle}
              </span>
            )}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-2 text-[11px] bg-ivory-50 rounded-lg p-3 border border-ivory-200 mb-4 font-sans text-stone-600">
          <div>
            <span className="block font-bold text-stone-500 uppercase tracking-widest text-[9px]">Born</span>
            <span>{born}</span>
          </div>
          {origin && (
            <div>
              <span className="block font-bold text-stone-500 uppercase tracking-widest text-[9px]">Origin</span>
              <span>{origin}</span>
            </div>
          )}
          {association && (
            <div className="col-span-2 mt-1">
              <span className="block font-bold text-stone-500 uppercase tracking-widest text-[9px]">Association</span>
              <span>{association}</span>
            </div>
          )}
        </div>

        {/* Biography */}
        <p className="text-xs text-stone-700 leading-relaxed font-sans italic border-l-2 border-brass-gold-400 pl-3">
          "{bio}"
        </p>
      </div>

      <div className="mt-6 pt-3 border-t border-ivory-200 text-right">
        <span className="inline-block text-[10px] font-bold text-royal-green-900 bg-royal-green-50 px-2 py-1 rounded border border-royal-green-200/50 uppercase tracking-wider">
          Official Imperial Registry
        </span>
      </div>
    </div>
  );
}
