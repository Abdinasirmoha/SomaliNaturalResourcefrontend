import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Box, 
  Layers, 
  Briefcase, 
  FileText, 
  Users,
  Info,
  LogOut,
  X
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import logoImg from '../assets/logo.png';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Resources', href: '/resources', icon: Box },
    { name: 'Categories', href: '/categories', icon: Layers },
    { name: 'Projects', href: '/projects', icon: Briefcase },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'User Management', href: '/users', icon: Users },
  ];

  const secondaryNavigation = [
    { name: 'About', href: '/about', icon: Info },
  ];

  const sidebarContent = (
    <>
      <div className="flex h-20 shrink-0 items-center px-6 border-b border-gray-200">
        <img src={logoImg} alt="SNRMS Logo" className="h-14 w-auto object-contain" />
        <div className="ml-3">
          <h1 className="text-lg font-bold text-gray-900 leading-tight">NRM Portal</h1>
          <p className="text-xs text-gray-500 font-medium">Federal Oversight</p>
        </div>
        {/* Close button for mobile */}
        <button 
          className="ml-auto lg:hidden text-gray-400 hover:text-gray-500"
          onClick={() => setMobileOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <nav className="flex-1 space-y-1 px-3" aria-label="Sidebar">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  isActive 
                    ? 'bg-blue-400 text-white shadow-sm' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                  'group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors'
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500',
                    'mr-3 h-5 w-5 flex-shrink-0'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            );
          })}

          <div className="mt-8 pt-8 border-t border-gray-200">
            {secondaryNavigation.map((item) => {
              const isActive = location.pathname.startsWith(item.href);
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    isActive
                      ? 'bg-blue-400 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                    'group flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors'
                  )}
                >
                  <item.icon
                    className={cn(
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 h-5 w-5 flex-shrink-0'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </NavLink>
              );
            })}
          </div>
        </nav>
      </div>
      
      <div className="flex shrink-0 border-t border-gray-200 p-4">
        <button
          onClick={logout}
          className="group flex w-full items-center px-3 py-2.5 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 hover:text-red-700 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-red-500 group-hover:text-red-600" aria-hidden="true" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <div className={cn("fixed inset-0 z-40 lg:hidden", mobileOpen ? "block" : "hidden")}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setMobileOpen(false)}></div>
        <div className="fixed inset-y-0 left-0 flex w-72 flex-col bg-gray-50 shadow-xl">
          {sidebarContent}
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-gray-50">
          {sidebarContent}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
