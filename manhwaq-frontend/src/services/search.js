import { getManhwaList } from './manhwa';

/**
 * Universal search — manhwa dari API; users/posts/pages kosong sehingga feature lain siap.
 */
export const universalSearch = async ({ q = '' } = {}) => {
  const query = String(q).trim();
  if (!query) {
    return {
      manhwa: [],
      users: [],
      posts: [],
      pages: [],
      message: 'Empty query',
    };
  }

  const manhwaRes = await getManhwaList({ search: query, limit: 20 });
  const manhwa = (manhwaRes.data || []).map((item) => ({
    id: item.slug,
    title: item.title,
    tags: item.genre,
    status: item.status,
  }));

  const pages = [
    { label: 'Community Feed', url: '/' },
    { label: 'Library', url: '/library' },
    { label: 'Trending', url: '/trending' },
    { label: 'My Polls', url: '/polls' },
  ].filter((page) => page.label.toLowerCase().includes(query.toLowerCase()));

  return {
    manhwa,
    users: [],
    posts: [],
    pages,
    message: manhwaRes.message,
  };
};
