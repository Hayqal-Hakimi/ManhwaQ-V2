import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Shell from './Shell';
import { EmptyState } from '../components/common/EmptyState';
import { getCurrentUser } from '../services/users';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const { user: authUser, isAdmin, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const response = await getCurrentUser();
      setProfile(response.data);
      setLoading(false);
    };
    load();
  }, []);

  const displayUser = profile || authUser;

  return (
    <Shell>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex justify-between items-end pb-4 border-b-2 border-black/10">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-[#455859]">Profile</h2>
            <p className="text-sm text-[#455859]/60 mt-1 font-medium">Akaun anda</p>
          </div>
          <Link
            to="/settings"
            className="px-4 py-2 bg-white text-[#455859] text-xs font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] uppercase tracking-wider"
          >
            Settings
          </Link>
        </div>

        {loading && <div className="text-sm font-bold text-[#455859]/60">Loading profile...</div>}

        {!loading && !displayUser && (
          <EmptyState icon="person" title="Profile tidak dijumpai" description="Sila login semula." />
        )}

        {!loading && displayUser && (
          <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] p-8 space-y-6">
            <div className="flex flex-wrap items-start gap-6">
              <div className="w-20 h-20 bg-[#e5d5c5] border-2 border-black flex items-center justify-center font-black text-[#8b5e3c] text-2xl">
                {(displayUser.username || 'U').slice(0, 2).toUpperCase()}
              </div>
              <div className="flex-grow space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-2xl font-black text-[#455859]">{displayUser.username}</h3>
                  <span className="px-2 py-1 bg-[#455859] text-white text-[10px] font-bold border border-black uppercase tracking-wider">
                    {displayUser.role || 'user'}
                  </span>
                  {isAdmin && (
                    <span className="px-2 py-1 bg-[#8b5e3c] text-white text-[10px] font-bold border border-black uppercase tracking-wider">
                      Admin
                    </span>
                  )}
                  {displayUser.is_premium && (
                    <span className="px-2 py-1 bg-[#fed2ac] text-[#78583a] text-[10px] font-bold border border-black uppercase tracking-wider">
                      Premium
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#455859]/70 font-medium">{displayUser.email}</p>
                {displayUser.created_at && (
                  <p className="text-[10px] uppercase tracking-widest font-bold text-[#455859]/40">
                    Member since {displayUser.created_at}
                  </p>
                )}
              </div>
            </div>

            {isAuthenticated && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t-2 border-dashed border-black/20">
                <Link
                  to="/library"
                  className="p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] text-center font-bold text-[#455859] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all text-sm uppercase tracking-wider"
                >
                  My Library
                </Link>
                <Link
                  to="/polls"
                  className="p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] text-center font-bold text-[#455859] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all text-sm uppercase tracking-wider"
                >
                  Polls
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin/manhwa"
                    className="p-4 bg-[#8b5e3c] text-white border-2 border-black shadow-[4px_4px_0px_0px_#000] text-center font-bold hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#000] transition-all text-sm uppercase tracking-wider"
                  >
                    Admin Panel
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Shell>
  );
};

export default Profile;
