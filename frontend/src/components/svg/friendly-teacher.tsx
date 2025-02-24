// src/components/svg/friendly-teacher.tsx
import React from 'react';

const FriendlyTeacher: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" className="w-full h-full">
    <circle cx="100" cy="70" r="50" fill="#FFD3B6"/>
    <path d="M100 130 C60 130 30 160 30 200 L170 200 C170 160 140 130 100 130Z" fill="#4A90E2"/>
    <circle cx="80" cy="60" r="5" fill="#333"/>
    <circle cx="120" cy="60" r="5" fill="#333"/>
    <path d="M85 90 C95 100 105 100 115 90" fill="none" stroke="#333" strokeWidth="3"/>
  </svg>
);

export default FriendlyTeacher;