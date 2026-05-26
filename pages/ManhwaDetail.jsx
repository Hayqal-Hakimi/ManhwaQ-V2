import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Shell from './Shell';
import { EmptyState } from '../components/common/EmptyState';
import { getManhwaById } from '../services/manhwa';
import { addToLibrary, getLibrary, removeFromLibrary } from '../services/library';
import { useAuth } from '../hooks/useAuth';

const ManhwaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [manhwa, setManhwa] = useState(null);
  const [libraryEntry, setLibraryEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [libraryLoading, setLibraryLoading] = useState(false);
  const [message, setMessage] = useState('');

  const load = async () => {
    setLoading(true);
    const response = await getManhwaById(id);
    setManhwa(response.data);

    if (isAuthenticated && response.data?.id) {
      const libRes = await getLibrary();
      const found = (libRes.data || []).find((item) => item.manhwa_id === response.data.id);
      setLibraryEntry(found || null);
    } else {
      setLibraryEntry(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [id, isAuthenticated]);

  const handleAddToLibrary = async (status = 'reading') => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/manhwa/${id}` } });
      return;
    }
    setLibraryLoading(true);
    setMessage('');
    const response = await addToLibrary({ manhwa_id: manhwa.id, status });
    setLibraryLoading(false);
    if (response.data) {
      setLibraryEntry(response.data);
      setMessage('Ditambah ke library.');
    } else {
      setMessage(response.message || 'Gagal tambah ke library.');
    }
  };

  const handleRemove = async () => {
    setLibraryLoading(true);
    await removeFromLibrary(manhwa.id);
    setLibraryEntry(null);
    setMessage('Dibuang dari library.');
    setLibraryLoading(false);
  };

  const chapters = manhwa?.chapters || [];
  const chaptersWithLinks = chapters.filter((ch) => ch.source_url);

  return (
    <Shell>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-wrap justify-between items-end gap-4 pb-4 border-b-2 border-black/10">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-[#455859]">
              {manhwa?.title || 'Manhwa'}
            </h2>
            {manhwa && (
              <p className="text-sm text-[#455859]/60 mt-1 font-medium">
                {(manhwa.genre || []).join(' · ')} · {manhwa.status}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {libraryEntry ? (
              <>
                <Link
                  to="/library"
                  className="px-4 py-2 bg-[#455859] text-white text-xs font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] uppercase tracking-wider"
                >
                  In Library
                </Link>
                <button
                  type="button"
                  disabled={libraryLoading}
                  onClick={handleRemove}
                  className="px-4 py-2 bg-white text-[#ba1a1a] text-xs font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] uppercase tracking-wider"
                >
                  Remove
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  disabled={libraryLoading || !manhwa}
                  onClick={() => handleAddToLibrary('reading')}
                  className="px-4 py-2 bg-[#455859] text-white text-xs font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] uppercase tracking-wider disabled:opacity-60"
                >
                  {isAuthenticated ? 'Add to Library' : 'Login to Add'}
                </button>
                {isAuthenticated && (
                  <button
                    type="button"
                    disabled={libraryLoading}
                    onClick={() => handleAddToLibrary('plan_to_read')}
                    className="px-4 py-2 bg-white text-[#455859] text-xs font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] uppercase tracking-wider"
                  >
                    Plan to Read
                  </button>
                )}
              </>
            )}
            <Link
              to="/trending"
              className="px-4 py-1.5 bg-white text-[#455859] text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] uppercase tracking-wider"
            >
              Browse All
            </Link>
          </div>
        </div>

        {message && (
          <div className="p-3 bg-[#455859]/10 border-2 border-black text-sm font-bold text-[#455859]">
            {message}
          </div>
        )}

        {loading && <div className="text-sm font-bold text-[#455859]/60">Loading...</div>}

        {!loading && !manhwa && (
          <EmptyState
            icon="menu_book"
            title="Manhwa tidak dijumpai"
            description={`Tiada rekod untuk "${id}".`}
            action={
              <Link
                to="/trending"
                className="inline-block px-6 py-2.5 bg-[#455859] text-white font-bold border-2 border-black uppercase tracking-wider text-xs"
              >
                Browse Manhwa
              </Link>
            }
          />
        )}

        {manhwa && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section className="lg:col-span-2 bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
              <div className="h-48 bg-gray-100 border-b-2 border-black flex items-center justify-center">
                <span className="material-icons text-7xl text-[#455859]/15">menu_book</span>
              </div>
              <div className="p-6">
                <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] p-5">
                  <div className="text-[10px] uppercase tracking-widest font-bold text-[#455859]/50">Synopsis</div>
                  <p className="mt-2 text-sm leading-relaxed text-[#455859]/80 font-medium">{manhwa.synopsis}</p>
                </div>
              </div>
            </section>

            <aside className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
              <div className="p-6 border-b-2 border-black bg-[#455859]/5">
                <h3 className="text-xl font-black text-[#455859]">Chapters</h3>
                <p className="text-xs text-[#455859]/60 font-medium mt-1">
                  {chaptersWithLinks.length} dengan link · {chapters.length} total
                </p>
              </div>
              <div className="max-h-96 overflow-y-auto divide-y-2 divide-dashed divide-black/15">
                {chapters.length === 0 && (
                  <div className="p-5 text-sm text-[#455859]/60 font-medium">Tiada chapter.</div>
                )}
                {chapters.map((ch) => (
                  <div key={ch.id} className="p-4 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-[#455859]">Ch. {ch.chapter_number}</div>
                      <div className="text-xs text-[#455859]/60">{ch.title}</div>
                    </div>
                    {ch.source_url ? (
                      <a
                        href={ch.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-[#455859] text-white text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] uppercase tracking-wider whitespace-nowrap"
                      >
                        Read
                      </a>
                    ) : (
                      <span className="text-[10px] font-bold uppercase text-[#455859]/40">No link</span>
                    )}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        )}
      </div>
    </Shell>
  );
};

export default ManhwaDetail;
