import React from 'react';

export const MPesaLogo: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <img src="/logos/mpesa.svg" alt="M-Pesa" className={className} />
);

export const CMALogo: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="#003DA5" stroke="#FFD700" strokeWidth="2"/>
    <text x="50" y="60" fontSize="32" fontWeight="bold" fill="white" textAnchor="middle" dominantBaseline="middle">
      CMA
    </text>
  </svg>
);
