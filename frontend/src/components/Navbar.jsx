import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, Settings, LogOut, Menu } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center lg:hidden">
            <button
              onClick={onMenuClick}
              className="text-gray-500 hover:text-gray-700 focus:outline-none p-2"
            >
              <Menu className="h-6 w-6" />
            </button>
            <span className="ml-3 font-bold text-[#0c4a34] text-lg">NRM Portal</span>
          </div>

          {/* Search bar placeholder space in desktop */}
          <div className="hidden lg:flex flex-1 items-center justify-center px-6">
             <div className="w-full max-w-lg">
                <div className="relative">
                  {/* Global search could go here */}
                </div>
             </div>
          </div>

          <div className="flex items-center space-x-4 ml-auto lg:ml-0">
            <button className="text-gray-400 hover:text-gray-500 relative">
              <span className="sr-only">View notifications</span>
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
            </button>
            
            <button className="text-gray-400 hover:text-gray-500 hidden sm:block">
              <span className="sr-only">Settings</span>
              <Settings className="h-5 w-5" />
            </button>

            <div className="flex items-center border-l border-gray-200 pl-4 ml-2">
              <div className="flex flex-col text-right mr-3 hidden sm:block">
                <span className="text-sm font-semibold text-gray-900 leading-none">{user?.fullName || 'User'}</span>
                <span className="text-xs text-gray-500 mt-1">{user?.role === 'Admin' ? 'Administrator' : 'Manager'}</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-[#0c4a34] text-white flex items-center justify-center font-bold text-sm">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <button 
                onClick={logout}
                className="ml-4 text-gray-400 hover:text-red-600 transition-colors hidden sm:block"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
