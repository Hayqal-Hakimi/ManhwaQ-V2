import { apiRequest, emptyItem } from './api';

export const getUserById = async (id) => apiRequest(`/users/${id}`);

export const getCurrentUser = async () => {
  const token = localStorage.getItem('manhwaq_token');
  if (!token) return emptyItem();
  return apiRequest('/users/me');
};

export const updateProfile = async (payload) =>
  apiRequest('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });

export const changePassword = async ({ current_password, new_password }) =>
  apiRequest('/users/me/password', {
    method: 'PATCH',
    body: JSON.stringify({ current_password, new_password }),
  });

export const updatePrivacy = async ({ is_private }) =>
  apiRequest('/users/me/privacy', {
    method: 'PATCH',
    body: JSON.stringify({ is_private }),
  });

export const deleteAccount = async ({ password }) =>
  apiRequest('/users/me', {
    method: 'DELETE',
    body: JSON.stringify({ password }),
  });
