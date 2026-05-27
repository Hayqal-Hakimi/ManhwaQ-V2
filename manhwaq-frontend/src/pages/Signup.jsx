import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/layout/AuthLayout';
import { useAuth } from '../hooks/useAuth';

const Signup = () => {
  const navigate = useNavigate();
  const { register, clearError } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    clearError();
    setFormError('');
    setFormSuccess('');

    if (password !== confirmPassword) {
      setFormError('Password tidak sama.');
      return;
    }

    if (password.length < 8) {
      setFormError('Password minimum 8 aksara.');
      return;
    }

    setSubmitting(true);
    const result = await register({ username, email, password });
    setSubmitting(false);

    if (result.ok) {
      setFormSuccess(result.message || 'Akaun dicipta. Sila login.');
      setTimeout(() => navigate('/login'), 1500);
      return;
    }

    setFormError(result.message || 'Daftar gagal — API belum disambung.');
  };

  return (
    <AuthLayout
      title="Daftar Akaun"
      subtitle="Cipta akaun untuk library, poll, dan komuniti"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {formError && (
          <div className="p-3 bg-red-50 border-2 border-black text-sm font-bold text-[#ba1a1a]">
            {formError}
          </div>
        )}
        {formSuccess && (
          <div className="p-3 bg-green-50 border-2 border-black text-sm font-bold text-[#2d6a4f]">
            {formSuccess}
          </div>
        )}

        <div>
          <label htmlFor="username" className="text-[10px] uppercase tracking-widest font-bold text-[#455859]/50">
            Username
          </label>
          <input
            id="username"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-2 w-full bg-white border-2 border-black px-4 py-2 text-sm focus:outline-none shadow-[2px_2px_0px_0px_#000] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_0px_#000] transition-all"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-[10px] uppercase tracking-widest font-bold text-[#455859]/50">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full bg-white border-2 border-black px-4 py-2 text-sm focus:outline-none shadow-[2px_2px_0px_0px_#000] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_0px_#000] transition-all"
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
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="text-[10px] uppercase tracking-widest font-bold text-[#455859]/50">
            Sahkan Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-2 w-full bg-white border-2 border-black px-4 py-2 text-sm focus:outline-none shadow-[2px_2px_0px_0px_#000] focus:translate-x-[1px] focus:translate-y-[1px] focus:shadow-[1px_1px_0px_0px_#000] transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-[#8b5e3c] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all uppercase tracking-wider disabled:opacity-60"
        >
          {submitting ? 'Creating...' : 'Daftar'}
        </button>

        <p className="text-center text-sm text-[#455859]/60 font-medium pt-2">
          Sudah ada akaun?{' '}
          <Link to="/login" className="font-bold text-[#455859] underline">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default Signup;
