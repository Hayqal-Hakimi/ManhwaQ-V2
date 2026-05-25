import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * Header Component
 * Responsibility: Global top bar with search and account actions.
 * Uses React Router's <Link> for seamless SPA navigation.
 */
const Header = () => {
  const location = useLocation();

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Trending', to: '/trending' },
    { label: 'Library', to: '/library' },
  ];

  return (
    <header className="w-full bg-[#fcf9f8] border-b-2 border-black sticky top-0 z-40 h-16">
      <div className="max-w-7xl mx-auto h-full px-4 flex justify-between items-center">
        {/* Mobile Logo Visibility - Hidden on desktop as Sidebar handles it */}
        <Link to="/" className="md:hidden font-black text-2xl tracking-tighter text-[#455859]">
          ManhwaQ
        </Link>

        {/* Navigation Links - Desktop Only */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive = link.to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(link.to);

            return (
              <Link
                key={link.label}
                to={link.to}
                className={
                  isActive
                    ? 'font-bold border-b-2 border-[#455859] pb-1 text-[#455859]'
                    : 'font-medium text-[#455859]/70 hover:text-[#455859] transition-colors'
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Items */}
        <div className="flex items-center space-x-4">
          <div className="relative hidden sm:block">
            <input 
              type="text" 
              placeholder="Search titles..." 
              className="bg-white border-2 border-black px-4 py-1.5 pr-10 text-sm focus:outline-none shadow-[2px_2px_0px_0px_#000] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_0px_#000] transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
          
          <button className="p-1.5 hover:bg-black/5 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          
          <button className="flex items-center space-x-2 border-2 border-black bg-white p-0.5 rounded-full shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all">
            <img 
              src="assets/images/placeholders/profile.png" 
              alt="Profile" 
              className="h-7 w-7 rounded-full bg-gray-200"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;