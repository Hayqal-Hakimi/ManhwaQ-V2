import { apiRequest } from './api';

export const register = async ({ username, email, password }) => {
  return { data: { user: { username, email, role: 'user' } }, message: 'Akaun mock berjaya didaftar.' };
};

export const login = async ({ email, password }) => {
  const username = email.split('@')[0] || 'reader';
  const role = username === 'admin' ? 'admin' : 'user';
  const mockToken = `mock_jwt_token_${username}_${role}`;
  return { data: { token: mockToken, user: { id: 'mock-123', username, email, role } }, message: 'Mock login berjaya.' };
};

export const logout = async () => {
  return { message: 'Mock logout berjaya.' };
};

export const loginWithGoogle = async () => ({
  data: null,
  message: 'Google OAuth belum disambung.',
});
