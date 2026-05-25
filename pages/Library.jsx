import React from 'react';
import Shell from './Shell';

/**
 * Library Page
 * Responsibility: Displays the user's personal manhwa collection
 * with reading progress, bookmarks, and organized shelves.
 */
const Library = () => {
  const shelves = [
    {
      name: 'Currently Reading',
      icon: 'auto_stories',
      items: [
        { title: 'Solo Leveling', chapter: 'Ch. 142 / 179', progress: 79, cover: 'menu_book' },
        { title: 'The World After the Fall', chapter: 'Ch. 98 / 150', progress: 65, cover: 'menu_book' },
        { title: 'Return of the Frozen Player', chapter: 'Ch. 45 / 92', progress: 49, cover: 'menu_book' },
      ],
    },
    {
      name: 'Plan to Read',
      icon: 'bookmark_border',
      items: [
        { title: 'Omniscient Reader\'s Viewpoint', chapter: 'Not started', progress: 0, cover: 'menu_book' },
        { title: 'Nano Machine', chapter: 'Not started', progress: 0, cover: 'menu_book' },
      ],
    },
  ];

  const stats = [
    { label: 'Total Titles', value: '24', icon: 'library_books' },
    { label: 'Chapters Read', value: '1,847', icon: 'chrome_reader_mode' },
    { label: 'Hours Spent', value: '312', icon: 'schedule' },
    { label: 'Completed', value: '11', icon: 'task_alt' },
  ];

  return (
    <Shell>
      <div className="space-y-8 animate-in fade-in duration-700">
        {/* Page Header */}
        <div className="flex justify-between items-end pb-4 border-b-2 border-black/10">
          <div>
            <h2 className="text-4xl font-black tracking-tight text-[#455859]">My Library</h2>
            <p className="text-sm text-[#455859]/60 mt-1 font-medium">Your personal reading collection</p>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-1.5 bg-white text-[#455859] text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all flex items-center space-x-1">
              <span className="material-icons text-sm">sort</span>
              <span>SORT</span>
            </button>
            <button className="px-4 py-1.5 bg-white text-[#455859] text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all flex items-center space-x-1">
              <span className="material-icons text-sm">filter_list</span>
              <span>FILTER</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] p-5 text-center">
              <span className="material-icons text-2xl text-[#455859]/30 mb-2 block">{stat.icon}</span>
              <div className="text-3xl font-black text-[#455859]">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-[#455859]/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Shelves */}
        {shelves.map((shelf) => (
          <div key={shelf.name} className="space-y-4">
            {/* Shelf Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="material-icons text-[#455859]">{shelf.icon}</span>
                <h3 className="text-xl font-black text-[#455859]">{shelf.name}</h3>
                <span className="px-2 py-0.5 bg-[#455859] text-white text-[10px] font-bold border border-black">{shelf.items.length}</span>
              </div>
              <button className="text-xs font-bold text-[#455859]/60 hover:text-[#455859] uppercase tracking-wider transition-colors">View All →</button>
            </div>

            {/* Shelf Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shelf.items.map((item) => (
                <div key={item.title} className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer group">
                  {/* Cover Area */}
                  <div className="h-32 bg-gray-100 border-b-2 border-black flex items-center justify-center group-hover:bg-gray-50 transition-colors relative">
                    <span className="material-icons text-5xl text-[#455859]/15 group-hover:scale-110 transition-transform duration-500">{item.cover}</span>
                    {item.progress > 0 && (
                      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/10">
                        <div className="h-full bg-[#455859] transition-all" style={{ width: `${item.progress}%` }} />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-[#455859] truncate">{item.title}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#455859]/50 font-medium">{item.chapter}</span>
                      {item.progress > 0 && (
                        <span className="text-xs font-black text-[#455859]">{item.progress}%</span>
                      )}
                    </div>
                    <button className="w-full py-2 mt-1 bg-[#455859] text-white text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] active:shadow-none transition-all uppercase tracking-wider">
                      {item.progress > 0 ? 'Continue Reading' : 'Start Reading'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Shell>
  );
};

export default Library;
