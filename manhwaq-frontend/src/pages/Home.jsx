import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Shell from './Shell';
import { EmptyState } from '../components/common/EmptyState';
import { ManhwaCard } from '../components/common/ManhwaCard';
import { PollCard } from '../components/common/PollCard';
import { ListSkeleton, GridSkeleton } from '../components/common/Skeleton';
import { getPosts } from '../services/posts';
import { getPolls } from '../services/polls';
import { getManhwaList, getRecentChapters } from '../services/manhwa';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const { isAuthenticated, isAdmin, user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [polls, setPolls] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [recentChapters, setRecentChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [postsRes, pollsRes, manhwaRes, chaptersRes] = await Promise.all([
        getPosts(),
        getPolls(),
        getManhwaList({ limit: 4 }),
        getRecentChapters(6),
      ]);
      setPosts(postsRes.data || []);
      setPolls(pollsRes.data || []);
      setHighlights(manhwaRes.data || []);
      setRecentChapters(chaptersRes.data || []);
      setLoading(false);
    };
    load();
  }, []);

  const feedEmpty = !loading && posts.length === 0 && polls.length === 0;

  const guestActions = (
    <Link
      to="/login"
      className="inline-block px-6 py-2.5 bg-[#455859] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all uppercase tracking-wider text-xs"
    >
      Login untuk interact
    </Link>
  );

  const memberActions = (
    <div className="flex flex-wrap justify-center gap-3">
      <Link
        to="/trending"
        className="px-5 py-2.5 bg-[#455859] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all uppercase tracking-wider text-xs"
      >
        Browse Manhwa
      </Link>
      <Link
        to="/library"
        className="px-5 py-2.5 bg-white text-[#455859] font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all uppercase tracking-wider text-xs"
      >
        My Library
      </Link>
      <Link
        to="/polls"
        className="px-5 py-2.5 bg-white text-[#455859] font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all uppercase tracking-wider text-xs"
      >
        Polls
      </Link>
      {isAdmin && (
        <Link
          to="/admin/manhwa"
          className="px-5 py-2.5 bg-[#8b5e3c] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all uppercase tracking-wider text-xs"
        >
          Admin Panel
        </Link>
      )}
    </div>
  );

  return (
    <Shell>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex justify-between items-end pb-4 border-b-2 border-black/10">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-[#455859]">Community Feed</h2>
            <p className="text-sm text-[#455859]/60 mt-1 font-medium">
              {isAuthenticated
                ? `Welcome back, ${user?.username || 'reader'} — posts & polls coming soon`
                : 'Posts, polls, dan chapter highlights'}
            </p>
          </div>
        </div>

        {loading && (
          <div className="space-y-6">
            <ListSkeleton count={2} />
            <GridSkeleton count={4} />
          </div>
        )}

        {feedEmpty && (
          <>
            <EmptyState
              icon="forum"
              title={isAuthenticated ? 'Community feed belum aktif' : 'Feed kosong'}
              description={
                isAuthenticated
                  ? 'Posts & polls akan muncul bila feature Community siap. Sementara itu, terokai katalog manhwa di bawah.'
                  : 'Login untuk simpan library, vote poll, dan interact dengan komuniti.'
              }
              action={isAuthenticated ? memberActions : guestActions}
            />

            {highlights.length > 0 && (
              <section className="space-y-4">
                <h3 className="text-xl font-black text-[#455859]">Popular Manhwa</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {highlights.map((item) => (
                    <ManhwaCard key={item.id} manhwa={item} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        {!loading && posts.length > 0 && (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] p-6">
                <p className="text-sm text-[#455859]/80">{post.content}</p>
              </div>
            ))}
          </div>
        )}

        {!loading && polls.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {polls.map((poll) => (
              <PollCard key={poll.id} poll={poll} />
            ))}
          </div>
        )}

        {!loading && recentChapters.length > 0 && (
          <section className="space-y-4">
            <h3 className="text-xl font-black text-[#455859]">Latest Chapters (with links)</h3>
            <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] divide-y-2 divide-dashed divide-black/15">
              {recentChapters.map((ch) => (
                <div key={ch.id} className="p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <Link
                      to={`/manhwa/${ch.manhwa_slug}`}
                      className="font-black text-[#455859] hover:underline"
                    >
                      {ch.manhwa_title}
                    </Link>
                    <div className="text-xs text-[#455859]/60 font-medium mt-1">
                      Ch. {ch.chapter_number} — {ch.title}
                    </div>
                  </div>
                  <a
                    href={ch.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-[#455859] text-white text-xs font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] uppercase tracking-wider"
                  >
                    Read
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </Shell>
  );
};

export default Home;
