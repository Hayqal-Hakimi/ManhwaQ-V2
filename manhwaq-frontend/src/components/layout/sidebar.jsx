import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const navItems = [
    { label: 'Library', icon: 'library_books', to: '/library', protected: true },
    { label: 'Community Feed', icon: 'forum', to: '/' },
    { label: 'Trending', icon: 'trending_up', to: '/trending' },
    { label: 'My Polls', icon: 'poll', to: '/polls' },
    { label: 'Search', icon: 'search', to: '/search' },
    { label: 'Profile', icon: 'person', to: '/profile', protected: true },
    { label: 'Settings', icon: 'settings', to: '/settings', protected: true },
    ...(isAdmin
      ? [{ label: 'Admin Manhwa', icon: 'admin_panel_settings', to: '/admin/manhwa', protected: true }]
      : []),
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <aside className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 border-r-2 border-black bg-[#fcf9f8] shadow-[4px_0_0_0_#000] z-50">
      <div className="p-6 border-b-2 border-black">
        <Link to="/" className="block">
          <h1 className="font-black text-2xl tracking-tighter text-[#455859]">ManhwaQ</h1>
          <p className="text-[10px] uppercase tracking-widest font-bold text-[#455859]/60">Community Edition</p>
        </Link>
      </div>

      <nav className="flex-grow p-4 space-y-2 mt-4">
        {navItems.map((item) => {
          const isActive = item.to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.to);

          return (
            <Link
              key={item.label}
              to={item.to}
              className={`flex items-center space-x-3 p-3 transition-all duration-200 ${
                isActive
                  ? 'bg-[#455859] text-[#fcf9f8] border-2 border-black shadow-[4px_4px_0px_0px_#000] font-bold'
                  : 'text-[#455859] hover:bg-black/5 font-medium'
              }`}
            >
              <span className="material-icons text-sm">{item.icon}</span>
              <span>{item.label}</span>
              {item.protected && !isAuthenticated && (
                <span className="material-icons text-xs ml-auto opacity-60">lock</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mb-4">
        <button
          type="button"
          className="w-full py-3 bg-[#8b5e3c] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all uppercase tracking-wider text-xs"
        >
          Join Premium
        </button>
      </div>

      <div className="p-4 border-t-2 border-black space-y-1">
        {isAuthenticated ? (
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 p-2 text-[#455859]/70 hover:text-[#455859] font-bold text-sm transition-colors"
          >
            <span className="material-icons text-sm">logout</span>
            <span>Logout</span>
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="flex items-center space-x-3 p-2 text-[#455859] hover:bg-black/5 font-bold text-sm transition-colors"
            >
              <span className="material-icons text-sm">login</span>
              <span>Login</span>
            </Link>
            <Link
              to="/signup"
              className="flex items-center space-x-3 p-2 text-[#455859] hover:bg-black/5 font-bold text-sm transition-colors"
            >
              <span className="material-icons text-sm">person_add</span>
              <span>Daftar</span>
            </Link>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
