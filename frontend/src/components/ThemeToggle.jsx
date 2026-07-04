import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-300 focus:outline-none shadow-inner ${
        isDarkMode ? 'bg-[#222222]' : 'bg-[#e5e7eb]'
      }`}
      aria-label="Toggle Dark Mode"
    >
      <span
        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out flex items-center justify-center ${
          isDarkMode ? 'translate-x-1' : 'translate-x-9'
        }`}
      >
        {isDarkMode ? (
          <Moon className="w-3.5 h-3.5 text-blue-600" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-amber-500" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
