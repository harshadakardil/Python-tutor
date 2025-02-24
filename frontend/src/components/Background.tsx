import React from 'react';

export const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <pattern id="coding-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M10 10 L15 10 L15 15 L10 15 Z" fill="#3776AB" opacity="0.1"/>
            <path d="M30 5 Q35 10 30 15" stroke="#FFD43B" strokeWidth="1" opacity="0.1" fill="none"/>
            <circle cx="40" cy="40" r="2" fill="#2D3748" opacity="0.1"/>
            <path d="M20 35 L25 40 L20 45" stroke="#718096" strokeWidth="1" opacity="0.1" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#coding-pattern)" />
      </svg>
    </div>
  );
};