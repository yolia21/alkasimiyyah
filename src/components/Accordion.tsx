"use client";

import React, { useState } from "react";

interface AccordionItemProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ title, subtitle, children, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border border-ivory-300 rounded-lg overflow-hidden bg-white shadow-sm transition-all duration-300 hover:border-brass-gold-300">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-ivory-50 transition-colors duration-200 focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="pr-4">
          <h4 className="font-serif text-lg font-semibold text-royal-green-950">
            {title}
          </h4>
          {subtitle && (
            <span className="text-xs text-stone-500 font-sans tracking-wide mt-1 block">
              {subtitle}
            </span>
          )}
        </div>
        
        {/* Chevron Icon with Rotation */}
        <svg
          className={`w-5 h-5 text-brass-gold-600 transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Collapsible Panel */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[1000px] border-t border-ivory-200" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="p-5 text-stone-700 font-sans text-sm leading-relaxed bg-ivory-50/30">
          {children}
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: {
    title: string;
    subtitle?: string;
    content: React.ReactNode;
  }[];
  defaultOpenIndex?: number;
}

export default function Accordion({ items, defaultOpenIndex = 0 }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {items.map((item, idx) => (
        <AccordionItem
          key={idx}
          title={item.title}
          subtitle={item.subtitle}
          isOpen={openIndex === idx}
          onToggle={() => handleToggle(idx)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
