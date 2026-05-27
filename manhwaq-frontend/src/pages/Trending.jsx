import React, { useEffect, useState } from 'react';
import Shell from './Shell';
import { ManhwaCard } from '../components/common/ManhwaCard';
import { EmptyState } from '../components/common/EmptyState';
import { GridSkeleton } from '../components/common/Skeleton';
import { getManhwaList } from '../services/manhwa';

const GENRES = ['action', 'fantasy', 'sports', 'revenge', 'meta', 'drama'];

const Trending = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [genreFilter, setGenreFilter] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const params = { limit: 50 };
      if (statusFilter) params.status = statusFilter;
      if (genreFilter) params.genre = genreFilter;
      const response = await getManhwaList(params);
      setItems(response.data || []);
      setLoading(false);
    };
    load();
  }, [statusFilter, genreFilter]);

  return (
    <Shell>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-wrap justify-between items-end gap-4 pb-4 border-b-2 border-black/10">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-[#455859]">Browse Manhwa</h2>
            <p className="text-sm text-[#455859]/60 mt-1 font-medium">
              Filter by status & genre — trending AWS/DynamoDB kemudian
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setStatusFilter('')}
              className={`px-4 py-1.5 text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] uppercase tracking-wider ${
                statusFilter === '' ? 'bg-[#455859] text-white' : 'bg-white text-[#455859]'
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('ongoing')}
              className={`px-4 py-1.5 text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] uppercase tracking-wider ${
                statusFilter === 'ongoing' ? 'bg-[#455859] text-white' : 'bg-white text-[#455859]'
              }`}
            >
              Ongoing
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('completed')}
              className={`px-4 py-1.5 text-xs font-bold border-2 border-black shadow-[2px_2px_0px_#000] uppercase tracking-wider ${
                statusFilter === 'completed' ? 'bg-[#455859] text-white' : 'bg-white text-[#455859]'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setGenreFilter('')}
            className={`px-3 py-1 text-[10px] font-bold border-2 border-black uppercase tracking-wider ${
              genreFilter === '' ? 'bg-[#8b5e3c] text-white' : 'bg-white text-[#455859]'
            }`}
          >
            All genres
          </button>
          {GENRES.map((genre) => (
            <button
              key={genre}
              type="button"
              onClick={() => setGenreFilter(genre)}
              className={`px-3 py-1 text-[10px] font-bold border-2 border-black uppercase tracking-wider ${
                genreFilter === genre ? 'bg-[#8b5e3c] text-white' : 'bg-white text-[#455859]'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {loading && <GridSkeleton count={8} />}

        {!loading && items.length === 0 && (
          <EmptyState icon="menu_book" title="Tiada manhwa" description="Cuba filter lain." />
        )}

        {!loading && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <ManhwaCard key={item.id} manhwa={item} />
            ))}
          </div>
        )}
      </div>
    </Shell>
  );
};

export default Trending;
