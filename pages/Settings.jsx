import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Shell from './Shell';
import { changePassword } from '../services/users';
import { useAuth } from '../hooks/useAuth';

const Settings = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Password baru tidak sama.');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password minimum 8 aksara.');
      return;
    }

    setSubmitting(true);
    const response = await changePassword({
      current_password: currentPassword,
      new_password: newPassword,
    });
    setSubmitting(false);

    if (response.error) {
      setError(response.message || 'Gagal tukar password.');
      return;
    }

    setMessage('Password berjaya ditukar.');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Shell>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex justify-between items-end pb-4 border-b-2 border-black/10">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-[#455859]">Settings</h2>
            <p className="text-sm text-[#455859]/60 mt-1 font-medium">
              {user?.username} · {user?.email}
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="px-6 py-2.5 bg-white text-[#455859] font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all uppercase tracking-wider text-xs flex items-center space-x-2"
          >
            <span className="material-icons text-sm">logout</span>
            <span>Logout</span>
          </button>
        </div>

        {message && (
          <div className="p-3 bg-green-50 border-2 border-black text-sm font-bold text-[#2d6a4f]">{message}</div>
        )}
        {error && (
          <div className="p-3 bg-red-50 border-2 border-black text-sm font-bold text-[#ba1a1a]">{error}</div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <section className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
            <div className="p-6 border-b-2 border-black bg-[#455859]/5">
              <h3 className="text-xl font-black text-[#455859]">Tukar Password</h3>
            </div>
            <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#455859]/50">
                  Current password
                </label>
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-2 w-full bg-white border-2 border-black px-4 py-2 text-sm shadow-[2px_2px_0px_0px_#000]"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#455859]/50">
                  New password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-2 w-full bg-white border-2 border-black px-4 py-2 text-sm shadow-[2px_2px_0px_0px_#000]"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-[#455859]/50">
                  Confirm new password
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-2 w-full bg-white border-2 border-black px-4 py-2 text-sm shadow-[2px_2px_0px_0px_#000]"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[#455859] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] uppercase tracking-wider text-xs disabled:opacity-60"
              >
                {submitting ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </section>

          <section className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
            <div className="p-6 border-b-2 border-black bg-[#455859]/5">
              <h3 className="text-xl font-black text-[#455859]">Coming Soon</h3>
            </div>
            <div className="p-6 space-y-4 text-sm text-[#455859]/70 font-medium">
              <p>Privacy toggle, Google OAuth (Cognito), dan delete account — Phase 2.</p>
              <p>Cloud: settings disimpan dalam RDS, bukan local files.</p>
            </div>
          </section>
        </div>
      </div>
    </Shell>
  );
};

export default Settings;
