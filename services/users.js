import { apiRequest, emptyItem } from './api';

export const getUserById = async (id) => apiRequest(`/users/${id}`);

export const getCurrentUser = async () => {
  const token = localStorage.getItem('manhwaq_token');
  if (!token) return emptyItem();
  return apiRequest('/users/me');
};

export const updateProfile = async () => emptyItem('API belum disambung.');

export const changePassword = async ({ current_password, new_password }) =>
  apiRequest('/users/me/password', {
    method: 'PATCH',
    body: JSON.stringify({ current_password, new_password }),
  });

export const updatePrivacy = async () => emptyItem('API belum disambung.');

export const deleteAccount = async () => emptyItem('API belum disambung.');
