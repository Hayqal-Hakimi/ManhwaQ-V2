import { apiRequest } from './api';

export const register = async ({ username, email, password }) => {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  });
};

export const login = async ({ email, password }) => {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

export const logout = async () => {
  return apiRequest('/auth/logout', {
    method: 'POST',
  });
};

export const loginWithGoogle = async () => ({
  data: null,
  message: 'Google OAuth belum disambung.',
});
