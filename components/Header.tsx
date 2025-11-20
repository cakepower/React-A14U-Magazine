
import React, { useState } from 'react';
import { SearchIcon } from './icons/SearchIcon';
import { MenuIcon } from './icons/MenuIcon';

const Logo: React.FC = () => (
  <div className="text-white text-center font-gmarket">
    <h1 className="inline-block text-3xl font-bold tracking-widest border-2 border-white px-2 py-1">A14U</h1>
    <p className="text-xs tracking-tighter mt-1">Aesthetic Intelligence make us to think beyond human</p>
  </div>
);


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-20 p-8 text-white">
      <div className="container mx-auto grid grid-cols-3 items-center">
        <div /> {/* Left column for spacing */}
        <div className="flex justify-center">
          <Logo />
        </div>
        <div className="flex items-center justify-end space-x-6">
          <button aria-label="Search" className="text-white hover:text-gray-300 transition-colors">
            <SearchIcon />
          </button>
          
          <div className="relative">
            <button 
              aria-label="Menu" 
              className="text-white hover:text-gray-300 transition-colors focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <MenuIcon />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-4 w-48 bg-white rounded-md shadow-lg py-2 z-50 animate-fade-in-down">
                <a 
                  href="/" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-600 transition-colors"
                >
                  Home
                </a>
                <a 
                  href="/about" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-600 transition-colors"
                >
                  About
                </a>
                <a 
                  href="/news" 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-pink-600 transition-colors"
                >
                  News
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
