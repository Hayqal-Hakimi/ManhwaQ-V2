import React from 'react';
import Shell from './Shell';

/**
 * My Polls Page
 * Responsibility: Displays community polls the user has created or participated in.
 * Allows creation of new polls and viewing results of past votes.
 */
const MyPolls = () => {
  const activePolls = [
    {
      id: 1,
      question: 'Who is the strongest Monarch in Solo Leveling?',
      tag: 'Solo Leveling',
      totalVotes: 3284,
      timeLeft: '2 days left',
      options: [
        { label: 'Shadow Monarch (Sung Jin-Woo)', votes: 2134, percent: 65 },
        { label: 'Antares, King of Dragons', votes: 821, percent: 25 },
        { label: 'Monarch of Frost', votes: 329, percent: 10 },
      ],
    },
    {
      id: 2,
      question: 'Best manhwa arc of 2025?',
      tag: 'General',
      totalVotes: 5891,
      timeLeft: '5 days left',
      options: [
        { label: 'Monarch War — Solo Leveling', votes: 2356, percent: 40 },
        { label: 'Catastrophe — Omniscient Reader', votes: 1767, percent: 30 },
        { label: 'Hidden Floor — Tower of God', votes: 1178, percent: 20 },
        { label: 'Reawakening — Frozen Player', votes: 590, percent: 10 },
      ],
    },
  ];

  const pastPolls = [
    { question: 'Best manhwa protagonist?', totalVotes: 12480, winner: 'Sung Jin-Woo', date: 'May 12, 2025' },
    { question: 'Most underrated manhwa of 2024?', totalVotes: 8920, winner: 'Return of the Frozen Player', date: 'Apr 28, 2025' },
    { question: 'Favorite art style?', totalVotes: 6340, winner: 'Solo Leveling (Dubu)', date: 'Apr 15, 2025' },
  ];

  return (
    <Shell>
      <div className="space-y-8 animate-in fade-in duration-700">
        {/* Page Header */}
        <div className="flex justify-between items-end pb-4 border-b-2 border-black/10">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-[#455859]">My Polls</h2>
            <p className="text-sm text-[#455859]/60 mt-1 font-medium">Create, vote, and track community polls</p>
          </div>
          <button className="px-6 py-2.5 bg-[#8b5e3c] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all flex items-center space-x-2">
            <span className="material-icons text-sm">add</span>
            <span className="uppercase tracking-wider text-xs">Create Poll</span>
          </button>
        </div>

        {/* Active Polls */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="material-icons text-[#455859]">how_to_vote</span>
            <h3 className="text-xl font-black text-[#455859]">Active Polls</h3>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activePolls.map((poll) => (
              <div key={poll.id} className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
                {/* Poll Header */}
                <div className="p-6 border-b-2 border-black bg-[#455859]/5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-1 bg-[#8b5e3c] text-white text-[10px] font-bold border border-black uppercase tracking-wider">{poll.tag}</span>
                    <div className="flex items-center space-x-1 text-[#455859]/60">
                      <span className="material-icons text-sm">schedule</span>
                      <span className="text-xs font-bold">{poll.timeLeft}</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-black text-[#455859] leading-tight">{poll.question}</h4>
                </div>

                {/* Options */}
                <div className="p-6 space-y-3">
                  {poll.options.map((opt) => (
                    <div key={opt.label} className="relative">
                      <div className="h-12 border-2 border-black bg-white overflow-hidden relative">
                        <div
                          className="absolute inset-0 bg-[#455859]/10 border-r-2 border-black transition-all duration-700"
                          style={{ width: `${opt.percent}%` }}
                        />
                        <div className="absolute inset-0 flex items-center justify-between px-4">
                          <span className="font-bold text-sm text-[#455859] truncate max-w-[70%]">{opt.label}</span>
                          <span className="font-black text-sm text-[#455859]">{opt.percent}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t-2 border-dashed border-black/20 flex items-center justify-between bg-gray-50/50">
                  <div className="flex items-center space-x-1 text-[#455859]/60">
                    <span className="material-icons text-sm">people</span>
                    <span className="text-xs font-bold">{poll.totalVotes.toLocaleString()} votes</span>
                  </div>
                  <button className="px-5 py-2 bg-[#455859] text-white font-bold text-xs border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all uppercase tracking-wider">
                    Vote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Polls */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <span className="material-icons text-[#455859]/60">history</span>
            <h3 className="text-xl font-black text-[#455859]">Past Polls</h3>
          </div>

          <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000]">
            {pastPolls.map((poll, index) => (
              <div
                key={poll.question}
                className={`p-5 flex items-center justify-between hover:bg-[#455859]/5 transition-colors cursor-pointer ${index < pastPolls.length - 1 ? 'border-b-2 border-dashed border-black/15' : ''}`}
              >
                <div className="flex-grow">
                  <h4 className="font-bold text-[#455859]">{poll.question}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-[#455859]/50 font-medium">{poll.date}</span>
                    <span className="text-xs text-[#455859]/50 font-medium">{poll.totalVotes.toLocaleString()} votes</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-[9px] uppercase tracking-widest font-bold text-[#455859]/40">Winner</div>
                    <div className="text-sm font-black text-[#8b5e3c]">{poll.winner}</div>
                  </div>
                  <span className="material-icons text-[#455859]/30">chevron_right</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
};

export default MyPolls;
