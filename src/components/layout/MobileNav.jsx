import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const MobileNav = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navItems = [
    { label: 'Home', icon: 'home', to: '/' },
    { label: 'Trending', icon: 'trending_up', to: '/trending' },
    { label: 'Search', icon: 'search', to: '/search' },
    { label: 'Profile', icon: 'person', to: isAuthenticated ? '/profile' : '/login' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#fcf9f8] border-t-2 border-black z-50 shadow-[0_-4px_0_0_rgba(0,0,0,1)]">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = item.to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.to) && item.to !== '/login';

          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${
                isActive ? 'text-[#455859]' : 'text-[#455859]/50 hover:text-[#455859]/80'
              }`}
            >
              <div className="relative">
                <span className="material-icons">{item.icon}</span>
                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#455859] rounded-full"></span>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider mt-1">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
