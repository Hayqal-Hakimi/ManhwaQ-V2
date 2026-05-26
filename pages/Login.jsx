import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const from = location.state?.from || '/';

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearError();
    setFormError('');
    setSubmitting(true);

    const result = await login({ email, password });
    setSubmitting(false);

    if (result.ok) {
      navigate(from, { replace: true });
      return;
    }

    setFormError(result.message || error || 'Login gagal.');
  };

  return (
    <AuthLayout
      title="Login"
      subtitle="Masuk ke akaun ManhwaQ anda"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {(formError || error) && (
          <div className="p-3 bg-red-50 border-2 border-black text-sm font-bold text-[#ba1a1a]">
            {formError || error}
          </div>
        )}

        <div>
          <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-[#455859]/50">
            Email / Username
          </label>
          <input
            id="email"
            type="text"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full bg-white border-2 border-black px-4 py-2 text-sm focus:outline-none shadow-[2px_2px_0px_0px_#000] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_0px_#000] transition-all"
            placeholder="admin"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-[10px] uppercase tracking-widest font-bold text-[#455859]/50">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full bg-white border-2 border-black px-4 py-2 text-sm focus:outline-none shadow-[2px_2px_0px_0px_#000] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_0px_#000] transition-all"
            placeholder="Minimum 8 characters"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-[#455859] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all uppercase tracking-wider disabled:opacity-60"
        >
          {submitting ? 'Logging in...' : 'Login'}
        </button>

        <button
          type="button"
          disabled
          className="w-full py-3 bg-white text-[#455859]/50 font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] uppercase tracking-wider text-xs flex items-center justify-center space-x-2 cursor-not-allowed"
        >
          <span className="material-icons text-sm">login</span>
          <span>Google — Coming Soon</span>
        </button>

        <p className="text-center text-sm text-[#455859]/60 font-medium pt-2">
          Belum ada akaun?{' '}
          <Link to="/signup" className="font-bold text-[#455859] underline">
            Daftar
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Login;
