import { apiRequest } from './api';

const toQuery = (params = {}) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, value);
    }
  });
  const query = searchParams.toString();
  return query ? `?${query}` : '';
};

export const getLibrary = async (params = {}) =>
  apiRequest(`/library${toQuery(params)}`);

export const addToLibrary = async ({ manhwa_id, status = 'reading' }) =>
  apiRequest('/library', {
    method: 'POST',
    body: JSON.stringify({ manhwa_id, status }),
  });

export const updateLibraryProgress = async (manhwaId, payload) =>
  apiRequest(`/library/${manhwaId}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });

export const removeFromLibrary = async (manhwaId) =>
  apiRequest(`/library/${manhwaId}`, { method: 'DELETE' });
