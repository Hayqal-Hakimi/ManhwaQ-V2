import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

export const PollCard = ({ poll }) => {
  const { isAuthenticated } = useAuth();
  
  // Try to load vote from local storage for this specific poll
  const [selectedOption, setSelectedOption] = useState(() => {
    const saved = localStorage.getItem(`poll_vote_${poll.id}`);
    return saved || null;
  });

  const totalVotes = poll.options.reduce((acc, opt) => acc + opt.votes, 0) + (selectedOption && !poll.user_vote ? 1 : 0);

  const handleVote = (optionId) => {
    if (!isAuthenticated || selectedOption) return;
    setSelectedOption(optionId);
    localStorage.setItem(`poll_vote_${poll.id}`, optionId);
  };

  return (
    <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
      <div className="p-6 border-b-2 border-black bg-[#455859]/5 flex justify-between items-start">
        <h3 className="font-black text-[#455859] text-xl leading-tight">{poll.question}</h3>
        <span className="px-2 py-1 bg-white border border-black text-[#455859] text-[10px] font-bold uppercase tracking-wider whitespace-nowrap shadow-[2px_2px_0px_0px_#000]">
          {totalVotes} Votes
        </span>
      </div>
      <div className="p-6 space-y-4">
        {poll.options.map((option) => {
          // If user voted for this option, add 1 vote
          const isSelected = selectedOption === option.id;
          const votes = option.votes + (isSelected && !poll.user_vote ? 1 : 0);
          
          // Calculate percentage based on current state
          const percent = totalVotes === 0 ? 0 : Math.round((votes / totalVotes) * 100);

          return (
            <button
              key={option.id}
              onClick={() => handleVote(option.id)}
              disabled={!isAuthenticated || selectedOption !== null}
              className="w-full relative h-12 border-2 border-black bg-white overflow-hidden group text-left hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-none"
            >
              {/* Progress bar background */}
              {selectedOption !== null && (
                <div 
                  className={`absolute inset-y-0 left-0 border-r-2 border-black transition-all duration-1000 ease-out ${isSelected ? 'bg-[#8b5e3c]/20' : 'bg-[#455859]/10'}`}
                  style={{ width: `${percent}%` }}
                />
              )}
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
                <span className="font-bold text-sm text-[#455859] flex items-center space-x-2">
                  {isSelected && <span className="material-icons text-sm text-[#8b5e3c]">check_circle</span>}
                  <span>{option.label}</span>
                </span>
                {selectedOption !== null && (
                  <span className={`font-black text-sm ${isSelected ? 'text-[#8b5e3c]' : 'text-[#455859]'}`}>
                    {percent}%
                  </span>
                )}
              </div>
            </button>
          );
        })}
        
        {!isAuthenticated && (
          <p className="text-[10px] uppercase tracking-widest font-bold text-[#ba1a1a] text-center pt-2">
            Login untuk mengundi
          </p>
        )}
      </div>
    </div>
  );
};
