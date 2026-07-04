import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for Tailwind class merging
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const DashboardCard = ({ title, value, icon: Icon, trend, trendValue, colorClass, className }) => {
  return (
    <div className={cn("bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col", className)}>
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-3 rounded-lg", colorClass || "bg-gray-50 text-gray-600")}>
          {Icon && <Icon className="w-6 h-6" />}
        </div>
        {trend && (
          <span className={cn("text-xs font-semibold px-2 py-1 rounded-full", 
            trend === 'up' ? "text-green-700 bg-green-100" : 
            trend === 'down' ? "text-red-700 bg-red-100" : 
            "text-gray-700 bg-gray-100"
          )}>
            {trendValue}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
