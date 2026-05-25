import React from 'react';
import Shell from './Shell';

/**
 * Trending Page
 * Responsibility: Displays the hottest and most popular manhwa titles
 * ranked by community engagement, ratings, and recent activity.
 */
const Trending = () => {
  const trendingTitles = [
    { rank: 1, title: 'Solo Leveling', genre: 'Action', rating: 9.8, readers: '2.4M', change: '+3', chapters: 179, status: 'COMPLETED' },
    { rank: 2, title: 'The World After the Fall', genre: 'Fantasy', rating: 9.6, readers: '1.8M', change: '+1', chapters: 150, status: 'ONGOING' },
    { rank: 3, title: 'Return of the Frozen Player', genre: 'Action', rating: 9.5, readers: '1.2M', change: '+5', chapters: 92, status: 'ONGOING' },
    { rank: 4, title: 'Omniscient Reader\'s Viewpoint', genre: 'Fantasy', rating: 9.7, readers: '2.1M', change: '-1', chapters: 168, status: 'ONGOING' },
    { rank: 5, title: 'Tower of God', genre: 'Adventure', rating: 9.4, readers: '3.6M', change: '0', chapters: 580, status: 'ONGOING' },
    { rank: 6, title: 'The Beginning After the End', genre: 'Fantasy', rating: 9.3, readers: '1.9M', change: '+2', chapters: 195, status: 'ONGOING' },
  ];

  const getRankBadgeStyle = (rank) => {
    if (rank === 1) return 'bg-[#8b5e3c] text-white';
    if (rank === 2) return 'bg-[#455859] text-white';
    if (rank === 3) return 'bg-[#455859]/80 text-white';
    return 'bg-white text-[#455859]';
  };

  return (
    <Shell>
      <div className="space-y-8 animate-in fade-in duration-700">
        {/* Page Header */}
        <div className="flex justify-between items-end pb-4 border-b-2 border-black/10">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-[#455859]">Trending Now</h2>
            <p className="text-sm text-[#455859]/60 mt-1 font-medium">Updated hourly based on community activity</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-1.5 bg-[#455859] text-white text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000]">THIS WEEK</button>
            <button className="px-4 py-1.5 bg-white text-[#455859] text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all">ALL TIME</button>
          </div>
        </div>

        {/* Trending Grid */}
        <div className="space-y-4">
          {trendingTitles.map((item) => (
            <div
              key={item.rank}
              className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer group"
            >
              <div className="flex items-center p-0">
                {/* Rank Badge */}
                <div className={`w-16 h-full min-h-[100px] flex items-center justify-center border-r-2 border-black font-black text-2xl ${getRankBadgeStyle(item.rank)}`}>
                  #{item.rank}
                </div>

                {/* Cover Placeholder */}
                <div className="w-20 h-full min-h-[100px] bg-gray-100 border-r-2 border-black flex items-center justify-center group-hover:bg-gray-50 transition-colors">
                  <span className="material-icons text-3xl text-[#455859]/20">menu_book</span>
                </div>

                {/* Title Info */}
                <div className="flex-grow p-5">
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="text-lg font-black text-[#455859]">{item.title}</h3>
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border border-black bg-[#455859]/5">{item.genre}</span>
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border border-black ${item.status === 'COMPLETED' ? 'bg-[#8b5e3c]/10 text-[#8b5e3c]' : 'bg-[#455859]/10 text-[#455859]'}`}>{item.status}</span>
                  </div>
                  <p className="text-xs text-[#455859]/50 font-medium">{item.chapters} Chapters · {item.readers} Readers</p>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 pr-6">
                  <div className="text-center">
                    <div className="flex items-center space-x-1 text-sm font-bold text-[#455859]">
                      <span className="material-icons text-yellow-600 text-sm">star</span>
                      <span>{item.rating}</span>
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-[#455859]/40 font-bold">Rating</span>
                  </div>
                  <div className={`px-3 py-2 border-2 border-black font-black text-sm ${parseInt(item.change) > 0 ? 'bg-green-50 text-green-700' : parseInt(item.change) < 0 ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-500'}`}>
                    {parseInt(item.change) > 0 ? '▲' : parseInt(item.change) < 0 ? '▼' : '–'} {Math.abs(parseInt(item.change)) || ''}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center pt-4">
          <button className="px-10 py-3 bg-[#455859] text-white font-black border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all uppercase tracking-tight">
            Load More Rankings
          </button>
        </div>
      </div>
    </Shell>
  );
};

export default Trending;
