import React from "react";

interface FlagProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function Flag({ className = "", width = 150, height = 100 }: FlagProps) {
  return (
    <div className={`inline-block select-none overflow-hidden rounded shadow-md hover:scale-105 transition-transform duration-300 ${className}`}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 300 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Official Flag of The Kasimid Sultanate (Qasimiyyah Flag)"
      >
        {/* Dark Crimson Field background */}
        <rect width="300" height="200" fill="#7e191d" />

        {/* Top Horizontal White Stripe */}
        <rect y="22" width="300" height="10" fill="white" />

        {/* Bottom Horizontal White Stripe */}
        <rect y="168" width="300" height="10" fill="white" />

        {/* Crescent Moon Mask setup to create crescent cutout */}
        <mask id="flag-crescent-mask">
          <rect width="300" height="200" fill="white" />
          {/* Subtracted circle offset to the right */}
          <circle cx="151" cy="100" r="30" fill="black" />
        </mask>

        {/* Outer Crescent Circle */}
        <circle cx="137" cy="100" r="37" fill="white" mask="url(#flag-crescent-mask)" />

        {/* 5-Pointed White Star */}
        <polygon
          points="192,85 196,96 207,96 198,103 201,114 192,107 183,114 186,103 177,96 188,96"
          fill="white"
        />
      </svg>
    </div>
  );
}
