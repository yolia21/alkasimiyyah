import React from "react";

interface CrestProps {
  className?: string;
  size?: number;
}

export default function Crest({ className = "", size = 120 }: CrestProps) {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md hover:scale-105 transition-transform duration-300"
        aria-label="Official Imperial Crest of The Kasimid Sultanate"
      >
        {/* Outer Gold Border Ring */}
        <circle cx="100" cy="100" r="95" stroke="var(--color-brass-gold-500)" strokeWidth="3" />
        <circle cx="100" cy="100" r="90" stroke="var(--color-brass-gold-600)" strokeWidth="1" strokeDasharray="4 2" />

        {/* Deep Royal Green Circular Background */}
        <circle cx="100" cy="100" r="85" fill="var(--color-royal-green-900)" />

        {/* Inner Gold Star (8-point Rub el Hizb) */}
        <path
          d="M 100,25 
             L 118,60 
             L 155,60 
             L 130,88 
             L 148,123 
             L 113,113 
             L 100,145 
             L 87,113 
             L 52,123 
             L 70,88 
             L 45,60 
             L 82,60 Z"
          fill="none"
          stroke="var(--color-brass-gold-400)"
          strokeWidth="2.5"
          strokeLinejoin="miter"
        />

        {/* Overlapping Squares to form perfect 8-point Rub el Hizb */}
        <rect
          x="55"
          y="55"
          width="90"
          height="90"
          stroke="var(--color-brass-gold-500)"
          strokeWidth="2"
          transform="rotate(0 100 100)"
        />
        <rect
          x="55"
          y="55"
          width="90"
          height="90"
          stroke="var(--color-brass-gold-500)"
          strokeWidth="2"
          transform="rotate(45 100 100)"
        />

        {/* Inner Crimson/Green/Gold Shield */}
        <circle cx="100" cy="100" r="42" fill="var(--color-royal-green-950)" stroke="var(--color-brass-gold-400)" strokeWidth="2" />

        {/* Golden Crescent Moon and Star */}
        <path
          d="M 92,75 
             A 22,22 0 1,0 120,115 
             A 18,18 0 1,1 92,75 Z"
          fill="var(--color-brass-gold-300)"
        />
        
        {/* Star inside the crescent */}
        <polygon
          points="114,90 116,95 121,95 117,98 119,103 114,100 109,103 111,98 107,95 112,95"
          fill="var(--color-brass-gold-300)"
        />

        {/* Small Decorative Dots around the ring */}
        <circle cx="100" cy="18" r="2.5" fill="var(--color-brass-gold-300)" />
        <circle cx="100" cy="182" r="2.5" fill="var(--color-brass-gold-300)" />
        <circle cx="18" cy="100" r="2.5" fill="var(--color-brass-gold-300)" />
        <circle cx="182" cy="100" r="2.5" fill="var(--color-brass-gold-300)" />
      </svg>
    </div>
  );
}
