import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ placeholder = 'Search...', value, onChange, onSearch }) => {
  return (
    <div className="relative flex w-full max-w-md items-center">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#0c4a34] focus:border-[#0c4a34] sm:text-sm transition duration-150 ease-in-out"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onSearch) {
            onSearch(value);
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
