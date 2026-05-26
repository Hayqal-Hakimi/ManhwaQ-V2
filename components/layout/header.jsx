import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Trending', to: '/trending' },
    { label: 'Library', to: '/library' },
    { label: 'Polls', to: '/polls' },
  ];

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = String(formData.get('q') || '').trim();
    if (!query) return;
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="w-full bg-[#fcf9f8] border-b-2 border-black sticky top-0 z-40 h-16">
      <div className="max-w-7xl mx-auto h-full px-4 flex justify-between items-center">
        <Link to="/" className="md:hidden font-black text-2xl tracking-tighter text-[#455859]">
          ManhwaQ
        </Link>

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

        <div className="flex items-center space-x-3">
          <form onSubmit={handleSearchSubmit} className="relative hidden sm:block">
            <input
              name="q"
              type="text"
              placeholder="Search manhwa, users, posts..."
              className="bg-white border-2 border-black px-4 py-1.5 pr-10 text-sm focus:outline-none shadow-[2px_2px_0px_0px_#000] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_0px_#000] transition-all w-64"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-black/5 transition-colors"
              aria-label="Search"
            >
              <span className="material-icons text-[18px] text-[#455859]/80">search</span>
            </button>
          </form>

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="hidden sm:flex items-center space-x-2 px-3 py-1.5 border-2 border-black bg-white shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all"
              >
                <span className="material-icons text-sm">person</span>
                <span className="text-xs font-bold uppercase tracking-wider truncate max-w-[100px]">
                  {user?.username || 'Profile'}
                </span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-1.5 bg-white text-[#455859] text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all uppercase tracking-wider"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-1.5 bg-white text-[#455859] text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all uppercase tracking-wider"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1.5 bg-[#455859] text-white text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all uppercase tracking-wider"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
