import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Shell from './Shell';
import { EmptyState } from '../components/common/EmptyState';
import { getLibrary, removeFromLibrary } from '../services/library';

const SHELVES = [
  { key: 'reading', label: 'Currently Reading', icon: 'auto_stories' },
  { key: 'plan_to_read', label: 'Plan to Read', icon: 'bookmark_border' },
];

const Library = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('recently_added');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const loadLibrary = useCallback(async () => {
    setLoading(true);
    const params = { sort };
    if (statusFilter) params.status = statusFilter;
    if (search.trim()) params.search = search.trim();
    const response = await getLibrary(params);
    setItems(response.data || []);
    setLoading(false);
  }, [sort, statusFilter, search]);

  useEffect(() => {
    loadLibrary();
  }, [loadLibrary]);

  const grouped = useMemo(() => {
    if (statusFilter) {
      return { [statusFilter]: items };
    }
    return SHELVES.reduce((acc, shelf) => {
      acc[shelf.key] = items.filter((item) => item.status === shelf.key);
      return acc;
    }, {});
  }, [items, statusFilter]);

  const handleRemove = async (manhwaId) => {
    await removeFromLibrary(manhwaId);
    await loadLibrary();
  };

  const renderItem = (item) => (
    <div
      key={item.id}
      className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all"
    >
      <div className="h-28 bg-gray-100 border-b-2 border-black flex items-center justify-center">
        <span className="material-icons text-5xl text-[#455859]/15">menu_book</span>
      </div>
      <div className="p-4 space-y-3">
        <Link to={`/manhwa/${item.slug}`} className="font-black text-[#455859] hover:underline block">
          {item.title}
        </Link>
        <div className="h-2 border border-black bg-white overflow-hidden">
          <div className="h-full bg-[#455859]" style={{ width: `${item.progress_percent}%` }} />
        </div>
        <div className="flex items-center justify-between text-xs font-bold text-[#455859]/60">
          <span>Ch. {item.last_chapter_read || 0}</span>
          <span>{item.progress_percent}%</span>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/manhwa/${item.slug}`}
            className="flex-grow py-2 text-center bg-[#455859] text-white text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] uppercase tracking-wider"
          >
            Continue
          </Link>
          <button
            type="button"
            onClick={() => handleRemove(item.manhwa_id)}
            className="px-3 py-2 bg-white text-[#ba1a1a] text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] uppercase"
            aria-label="Remove from library"
          >
            <span className="material-icons text-sm">delete</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Shell>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-wrap justify-between items-end gap-4 pb-4 border-b-2 border-black/10">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-[#455859]">My Library</h2>
            <p className="text-sm text-[#455859]/60 mt-1 font-medium">{items.length} titles</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              type="search"
              placeholder="Search library..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white border-2 border-black px-3 py-1.5 text-sm shadow-[2px_2px_0px_0px_#000] w-44"
            />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-white border-2 border-black px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0px_0px_#000] uppercase"
            >
              <option value="recently_added">Recent</option>
              <option value="title">A-Z</option>
              <option value="progress">Progress</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border-2 border-black px-3 py-1.5 text-xs font-bold shadow-[2px_2px_0px_0px_#000] uppercase"
            >
              <option value="">All shelves</option>
              <option value="reading">Reading</option>
              <option value="plan_to_read">Plan to read</option>
            </select>
          </div>
        </div>

        {loading && <div className="text-sm font-bold text-[#455859]/60">Loading library...</div>}

        {!loading && items.length === 0 && (
          <EmptyState
            icon="library_books"
            title="Library kosong"
            description="Tambah manhwa dari halaman detail (butang Add to Library)."
            action={
              <Link
                to="/trending"
                className="inline-block px-6 py-2.5 bg-[#8b5e3c] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] uppercase tracking-wider text-xs"
              >
                Browse Manhwa
              </Link>
            }
          />
        )}

        {!loading &&
          Object.entries(grouped).map(([shelfKey, shelfItems]) => {
            if (shelfItems.length === 0) return null;
            const shelfMeta = SHELVES.find((s) => s.key === shelfKey) || {
              label: shelfKey,
              icon: 'library_books',
            };
            return (
              <section key={shelfKey} className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="material-icons text-[#455859]">{shelfMeta.icon}</span>
                  <h3 className="text-xl font-black text-[#455859]">{shelfMeta.label}</h3>
                  <span className="px-2 py-0.5 bg-[#455859] text-white text-[10px] font-bold border border-black">
                    {shelfItems.length}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {shelfItems.map(renderItem)}
                </div>
              </section>
            );
          })}
      </div>
    </Shell>
  );
};

export default Library;
