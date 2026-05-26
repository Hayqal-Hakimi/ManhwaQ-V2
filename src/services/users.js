import { apiRequest, emptyItem } from './api';

export const getUserById = async (id) => apiRequest(`/users/${id}`);

export const getCurrentUser = async () => {
  const token = localStorage.getItem('manhwaq_token');
  if (!token) return emptyItem();
  
  const parts = token.split('_');
  const username = parts[3] || 'reader';
  const role = parts[4] || 'user';
  
  return { 
    data: { 
      id: 'mock-123', 
      username, 
      email: `${username}@mock.com`, 
      role,
      created_at: '2025-05-26',
      is_premium: role === 'admin'
    } 
  };
};

export const updateProfile = async () => emptyItem('API belum disambung.');

export const changePassword = async ({ current_password, new_password }) =>
  apiRequest('/users/me/password', {
    method: 'PATCH',
    body: JSON.stringify({ current_password, new_password }),
  });

export const updatePrivacy = async () => emptyItem('API belum disambung.');

export const deleteAccount = async () => emptyItem('API belum disambung.');
