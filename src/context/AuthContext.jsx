import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import * as authService from '../services/auth';
import { getCurrentUser } from '../services/users';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSession = useCallback(async () => {
    const token = localStorage.getItem('manhwaq_token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    const response = await getCurrentUser();
    setUser(response.data || null);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const login = async ({ email, password }) => {
    setError(null);
    const response = await authService.login({ email, password });

    if (!response.data?.token) {
      const message = response.message || 'Login gagal — API belum disambung.';
      setError(message);
      return { ok: false, message };
    }

    localStorage.setItem('manhwaq_token', response.data.token);
    setUser(response.data.user);
    return { ok: true };
  };

  const register = async ({ username, email, password }) => {
    setError(null);
    const response = await authService.register({ username, email, password });

    if (!response.data?.user) {
      const message = response.message || 'Daftar gagal — API belum disambung.';
      setError(message);
      return { ok: false, message };
    }

    return { ok: true, message: response.message };
  };

  const logout = async () => {
    await authService.logout();
    localStorage.removeItem('manhwaq_token');
    setUser(null);
    setError(null);
  };

  const value = useMemo(
    () => ({
      user,
      loading,
      error,
      isAuthenticated: Boolean(user),
      isAdmin: user?.role === 'admin',
      login,
      register,
      logout,
      clearError: () => setError(null),
    }),
    [user, loading, error]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
