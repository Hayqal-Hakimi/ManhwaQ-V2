import React, { useEffect, useState } from 'react';
import Shell from './Shell';
import { EmptyState } from '../components/common/EmptyState';
import { addChapter, createManhwa, getManhwaList } from '../services/manhwa';

const AdminManhwa = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [manhwaForm, setManhwaForm] = useState({
    title: '',
    synopsis: '',
    genre: '',
    status: 'ongoing',
  });

  const [chapterForm, setChapterForm] = useState({
    manhwaSlug: '',
    chapter_number: '',
    title: '',
    source_url: '',
    source_name: '',
  });

  const loadList = async () => {
    setLoading(true);
    const response = await getManhwaList({ limit: 50 });
    setList(response.data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadList();
  }, []);

  const handleCreateManhwa = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    const response = await createManhwa({
      title: manhwaForm.title,
      synopsis: manhwaForm.synopsis,
      genre: manhwaForm.genre.split(',').map((g) => g.trim()).filter(Boolean),
      status: manhwaForm.status,
    });

    if (!response.data) {
      setError(response.message || 'Gagal cipta manhwa');
      return;
    }

    setMessage(`Manhwa "${response.data.title}" dicipta.`);
    setManhwaForm({ title: '', synopsis: '', genre: '', status: 'ongoing' });
    await loadList();
  };

  const handleAddChapter = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');

    const response = await addChapter(chapterForm.manhwaSlug, {
      chapter_number: Number(chapterForm.chapter_number),
      title: chapterForm.title,
      source_url: chapterForm.source_url,
      source_name: chapterForm.source_name || undefined,
    });

    if (!response.data) {
      setError(response.message || 'Gagal tambah chapter');
      return;
    }

    setMessage(`Chapter ${chapterForm.chapter_number} ditambah.`);
    setChapterForm({
      manhwaSlug: chapterForm.manhwaSlug,
      chapter_number: '',
      title: '',
      source_url: '',
      source_name: '',
    });
  };

  return (
    <Shell>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="pb-4 border-b-2 border-black/10">
          <h2 className="text-4xl font-black tracking-tight text-[#455859]">Admin — Manhwa</h2>
          <p className="text-sm text-[#455859]/60 mt-1 font-medium">
            Tambah manhwa & chapter link (admin sahaja). Cover: placeholder — URL S3 kemudian.
          </p>
        </div>

        {message && (
          <div className="p-3 bg-green-50 border-2 border-black text-sm font-bold text-[#2d6a4f]">
            {message}
          </div>
        )}
        {error && (
          <div className="p-3 bg-red-50 border-2 border-black text-sm font-bold text-[#ba1a1a]">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form
            onSubmit={handleCreateManhwa}
            className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] p-6 space-y-4"
          >
            <h3 className="text-xl font-black text-[#455859]">Tambah Manhwa</h3>
            <input
              required
              placeholder="Title"
              value={manhwaForm.title}
              onChange={(e) => setManhwaForm({ ...manhwaForm, title: e.target.value })}
              className="w-full bg-white border-2 border-black px-4 py-2 text-sm shadow-[2px_2px_0px_0px_#000]"
            />
            <textarea
              placeholder="Synopsis"
              rows={4}
              value={manhwaForm.synopsis}
              onChange={(e) => setManhwaForm({ ...manhwaForm, synopsis: e.target.value })}
              className="w-full bg-white border-2 border-black px-4 py-2 text-sm shadow-[2px_2px_0px_0px_#000]"
            />
            <input
              required
              placeholder="Genre (comma separated) e.g. action, fantasy"
              value={manhwaForm.genre}
              onChange={(e) => setManhwaForm({ ...manhwaForm, genre: e.target.value })}
              className="w-full bg-white border-2 border-black px-4 py-2 text-sm shadow-[2px_2px_0px_0px_#000]"
            />
            <select
              value={manhwaForm.status}
              onChange={(e) => setManhwaForm({ ...manhwaForm, status: e.target.value })}
              className="w-full bg-white border-2 border-black px-4 py-2 text-sm shadow-[2px_2px_0px_0px_#000]"
            >
              <option value="ongoing">ongoing</option>
              <option value="completed">completed</option>
              <option value="hiatus">hiatus</option>
            </select>
            <button
              type="submit"
              className="w-full py-3 bg-[#8b5e3c] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all uppercase tracking-wider text-xs"
            >
              Create Manhwa
            </button>
          </form>

          <form
            onSubmit={handleAddChapter}
            className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] p-6 space-y-4"
          >
            <h3 className="text-xl font-black text-[#455859]">Tambah Chapter Link</h3>
            <select
              required
              value={chapterForm.manhwaSlug}
              onChange={(e) => setChapterForm({ ...chapterForm, manhwaSlug: e.target.value })}
              className="w-full bg-white border-2 border-black px-4 py-2 text-sm shadow-[2px_2px_0px_0px_#000]"
            >
              <option value="">Pilih manhwa</option>
              {list.map((item) => (
                <option key={item.id} value={item.slug}>
                  {item.title}
                </option>
              ))}
            </select>
            <input
              required
              type="number"
              step="0.1"
              placeholder="Chapter number"
              value={chapterForm.chapter_number}
              onChange={(e) => setChapterForm({ ...chapterForm, chapter_number: e.target.value })}
              className="w-full bg-white border-2 border-black px-4 py-2 text-sm shadow-[2px_2px_0px_0px_#000]"
            />
            <input
              placeholder="Chapter title (optional)"
              value={chapterForm.title}
              onChange={(e) => setChapterForm({ ...chapterForm, title: e.target.value })}
              className="w-full bg-white border-2 border-black px-4 py-2 text-sm shadow-[2px_2px_0px_0px_#000]"
            />
            <input
              required
              type="url"
              placeholder="Source URL (MangaDex, Webtoon, etc.)"
              value={chapterForm.source_url}
              onChange={(e) => setChapterForm({ ...chapterForm, source_url: e.target.value })}
              className="w-full bg-white border-2 border-black px-4 py-2 text-sm shadow-[2px_2px_0px_0px_#000]"
            />
            <input
              placeholder="Source name (optional)"
              value={chapterForm.source_name}
              onChange={(e) => setChapterForm({ ...chapterForm, source_name: e.target.value })}
              className="w-full bg-white border-2 border-black px-4 py-2 text-sm shadow-[2px_2px_0px_0px_#000]"
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#455859] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all uppercase tracking-wider text-xs"
            >
              Add Chapter
            </button>
          </form>
        </div>

        <section className="space-y-4">
          <h3 className="text-xl font-black text-[#455859]">Senarai Manhwa ({list.length})</h3>
          {loading && <div className="text-sm font-bold text-[#455859]/60">Loading...</div>}
          {!loading && list.length === 0 && (
            <EmptyState icon="menu_book" title="Tiada manhwa" description="Tambah manhwa pertama di atas." />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {list.map((item) => (
              <div key={item.id} className="p-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000]">
                <div className="font-black text-[#455859]">{item.title}</div>
                <div className="text-xs text-[#455859]/60 mt-1 font-mono">/{item.slug}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Shell>
  );
};

export default AdminManhwa;
