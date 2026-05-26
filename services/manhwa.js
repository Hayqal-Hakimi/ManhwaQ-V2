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

export const getManhwaList = async (params = {}) =>
  apiRequest(`/manhwa${toQuery(params)}`);

export const getManhwaById = async (idOrSlug) => apiRequest(`/manhwa/${idOrSlug}`);

export const getRecentChapters = async (limit = 8) =>
  apiRequest(`/manhwa/chapters/recent${toQuery({ limit })}`);

export const createManhwa = async (payload) =>
  apiRequest('/manhwa', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const updateManhwa = async (idOrSlug, payload) =>
  apiRequest(`/manhwa/${idOrSlug}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });

export const addChapter = async (idOrSlug, payload) =>
  apiRequest(`/manhwa/${idOrSlug}/chapters`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const getManhwaReviews = async () => ({
  data: [],
  message: 'Reviews — coming soon',
});

export const submitReview = async () => ({
  data: null,
  message: 'Reviews — coming soon',
});
