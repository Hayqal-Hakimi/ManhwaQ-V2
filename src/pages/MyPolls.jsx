import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Shell from './Shell';
import { EmptyState } from '../components/common/EmptyState';
import { PollCard } from '../components/common/PollCard';
import { getPolls } from '../services/polls';
import { useAuth } from '../hooks/useAuth';

const MyPolls = () => {
  const { isAuthenticated } = useAuth();
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const response = await getPolls();
      setPolls(response.data || []);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <Shell>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="flex justify-between items-end pb-4 border-b-2 border-black/10">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-[#455859]">My Polls</h2>
            <p className="text-sm text-[#455859]/60 mt-1 font-medium">GET /polls → data: []</p>
          </div>
          {isAuthenticated && (
            <button
              type="button"
              disabled
              className="px-6 py-2.5 bg-[#8b5e3c]/50 text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] uppercase tracking-wider text-xs cursor-not-allowed"
            >
              Create Poll (Admin API)
            </button>
          )}
        </div>

        {loading && <div className="text-sm font-bold text-[#455859]/60">Loading polls...</div>}

        {!loading && polls.length === 0 && (
          <EmptyState
            icon="how_to_vote"
            title="Tiada poll aktif"
            description={
              isAuthenticated
                ? 'Poll system belum disambung ke API. Admin boleh create poll kemudian.'
                : 'Login untuk vote dalam community polls.'
            }
            action={
              !isAuthenticated ? (
                <Link
                  to="/login"
                  className="inline-block px-6 py-2.5 bg-[#455859] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all uppercase tracking-wider text-xs"
                >
                  Login to Vote
                </Link>
              ) : (
                <Link
                  to="/trending"
                  className="inline-block px-6 py-2.5 bg-[#455859] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all uppercase tracking-wider text-xs"
                >
                  Browse Manhwa
                </Link>
              )
            }
          />
        )}

        {!loading && polls.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {polls.map((poll) => (
              <PollCard key={poll.id} poll={poll} />
            ))}
          </div>
        )}
      </div>
    </Shell>
  );
};

export default MyPolls;
