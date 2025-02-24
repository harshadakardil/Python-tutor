import React from 'react';

const Logo: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 80" className="w-full h-full">
    <circle cx="40" cy="40" r="35" fill="#3776AB"/>
    <path 
      d="M25 40 Q40 20 55 40 T85 40" 
      stroke="#FFD43B" 
      strokeWidth="8" 
      fill="none" 
      strokeLinecap="round"
    />
    <text x="95" y="45" 
          fontFamily="Arial, sans-serif" 
          fontSize="28" 
          fontWeight="bold" 
          fill="#2D3748">
      Python Tutor
    </text>
    <text x="95" y="65" 
          fontFamily="monospace" 
          fontSize="14" 
          fill="#718096">
      {'code.learn()'}
    </text>
  </svg>
);

export default Logo;