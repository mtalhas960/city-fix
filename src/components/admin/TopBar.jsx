import React from 'react';
import { RiMenuLine} from '@remixicon/react';

const TopBar = ({ onMobileMenuClick }) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            type="button" 
            className="md:hidden text-darkGray mr-4" 
            onClick={onMobileMenuClick}
          >
            <RiMenuLine className="h-6 w-6" />
          </button>
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
