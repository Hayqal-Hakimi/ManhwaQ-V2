import React, { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Shell from './Shell';
import { EmptyState } from '../components/common/EmptyState';
import { universalSearch } from '../services/search';

const Search = () => {
  const location = useLocation();
  const [results, setResults] = useState({ manhwa: [], users: [], posts: [], pages: [] });
  const [searchLoading, setSearchLoading] = useState(false);

  const query = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return String(params.get('q') || '').trim();
  }, [location.search]);

  useEffect(() => {
    const load = async () => {
      if (!query) {
        setResults({ manhwa: [], users: [], posts: [], pages: [] });
        return;
      }
      setSearchLoading(true);
      const response = await universalSearch({ q: query });
      setResults({
        manhwa: response.manhwa || [],
        users: response.users || [],
        posts: response.posts || [],
        pages: response.pages || [],
      });
      setSearchLoading(false);
    };
    load();
  }, [query]);

  const total =
    results.manhwa.length +
    results.users.length +
    results.posts.length +
    results.pages.length;

  const renderSection = (title, icon, items, renderItem) => (
    <section className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
      <div className="p-6 border-b-2 border-black bg-[#455859]/5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="material-icons text-[#455859]">{icon}</span>
          <h3 className="text-xl font-black text-[#455859]">{title}</h3>
        </div>
        <span className="px-2 py-0.5 bg-[#455859] text-white text-[10px] font-bold border border-black">
          {items.length}
        </span>
      </div>
      <div className="p-6 space-y-3">
        {items.length === 0 ? (
          <div className="text-sm text-[#455859]/60 font-medium">[]</div>
        ) : (
          items.map(renderItem)
        )}
      </div>
    </section>
  );

  return (
    <Shell>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex justify-between items-end pb-4 border-b-2 border-black/10">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-[#455859]">Search</h2>
            <p className="text-sm text-[#455859]/60 mt-1 font-medium">
              {query ? `“${query}” — GET /search` : 'Taip dalam header search bar'}
            </p>
          </div>
        </div>

        {!query && (
          <EmptyState
            icon="search"
            title="Universal Search"
            description="Cari manhwa, users, posts. API return semua kategori sebagai []."
          />
        )}

        {query && searchLoading && (
          <div className="text-sm font-bold text-[#455859]/60">Searching...</div>
        )}

        {query && !searchLoading && total === 0 && (
          <EmptyState
            icon="search_off"
            title="No results []"
            description={`GET /search?q=${query} — semua kategori kosong sehingga backend siap.`}
          />
        )}

        {query && !searchLoading && total > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderSection('Manhwa', 'menu_book', results.manhwa, (m) => (
              <Link
                key={m.id}
                to={`/manhwa/${m.id}`}
                className="block p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] font-bold text-[#455859]"
              >
                {m.title}
              </Link>
            ))}
            {renderSection('Users', 'person', results.users, (u) => (
              <div key={u.id} className="p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] font-bold text-[#455859]">
                {u.username}
              </div>
            ))}
            {renderSection('Posts', 'forum', results.posts, (p) => (
              <div key={p.id} className="p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] text-[#455859]">
                {p.content}
              </div>
            ))}
            {renderSection('Pages', 'map', results.pages, (p) => (
              <Link
                key={p.url}
                to={p.url}
                className="block p-4 border-2 border-black shadow-[4px_4px_0px_0px_#000] font-bold text-[#455859]"
              >
                {p.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </Shell>
  );
};

export default Search;
