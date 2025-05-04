import React from 'react';
import { RiMenuLine, RiSearchLine } from '@remixicon/react';

const TopBar = ({ onMobileMenuClick }) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            type="button" 
            className="md:hidden text-darkGray mr-4" 
            onClick={onMobileMenuClick}
          >
            <RiMenuLine className="h-6 w-6" />
          </button>

          <div className="relative max-w-md w-full md:w-64 lg:w-96 hidden sm:block">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary pl-10" 
            />
            <RiSearchLine className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-medium">JD</span>
            </div>
            <span className="hidden md:inline-block font-medium">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
