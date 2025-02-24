// src/components/svg/loading-spinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-full h-full">
    <style>
      {`
        .spinner {
          animation: spin 1.5s linear infinite;
          transform-origin: center;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
    <circle 
      className="spinner"
      cx="25" cy="25" r="20"
      stroke="#3776AB"
      strokeWidth="4"
      strokeDasharray="60 30"
      fill="none"
    />
    <circle cx="25" cy="25" r="3" fill="#FFD43B"/>
  </svg>
);

export default LoadingSpinner;