import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <span className="font-semibold text-gray-900">Somalia NRM System</span>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-900 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-gray-900 transition-colors">Contact Support</a>
        </div>
        <div className="mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} Federal Government of Somalia.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
