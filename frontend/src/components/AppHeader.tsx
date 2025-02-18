// src/components/AppHeader.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const AppHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-gray-800">
                Python Tutor
              </Link>
            </div>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-500"
              >
                Home
              </Link>
              <Link
                to="/lesson/1"
                className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-500"
              >
                Lessons
              </Link>
              <Link
                to="/config"
                className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-gray-500"
              >
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};