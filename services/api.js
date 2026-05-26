/**
 * Base API client
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const emptyList = (message = 'Tiada data lagi.') => ({
  data: [],
  message,
  total: 0,
  page: 1,
});

export const emptyItem = (message = 'Tiada data.') => ({
  data: null,
  message,
});

export const emptySearch = (message = 'Tiada hasil.') => ({
  manhwa: [],
  users: [],
  posts: [],
  pages: [],
  message,
});

export const apiRequest = async (path, options = {}) => {
  const token = localStorage.getItem('manhwaq_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    return {
      data: null,
      error: body.error || 'REQUEST_FAILED',
      message: body.message || 'Request failed',
    };
  }

  return body;
};
