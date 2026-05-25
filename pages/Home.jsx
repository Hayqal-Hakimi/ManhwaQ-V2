import React from 'react';
import Shell from './Shell';

/**
 * Home Page (Community Feed)
 * Responsibility: Displays the main community updates, polls, and new chapters.
 * Integrated with the standardized Shell, Header, and Sidebar components.
 */
const Home = () => {
  return (
    <Shell>
      <div className="space-y-8 animate-in fade-in duration-700">
        {/* Page Header */}
        <div className="flex justify-between items-end pb-4 border-b-2 border-black/10">
          <h2 className="text-4xl font-black tracking-tight text-[#455859]">Community Feed</h2>
          <div className="flex space-x-2">
            <button className="px-4 py-1.5 bg-[#455859] text-white text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000]">HOT NOW</button>
            <button className="px-4 py-1.5 bg-white text-[#455859] text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_#000] transition-all">LATEST</button>
          </div>
        </div>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Poll Card */}
          <div className="lg:col-span-2 bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden group">
            <div className="aspect-video bg-gray-100 flex items-center justify-center border-b-2 border-black relative">
              <span className="material-icons text-6xl text-[#455859]/20 group-hover:scale-110 transition-transform duration-500">ballot</span>
              <div className="absolute top-4 left-4 flex space-x-2">
                <span className="px-2 py-1 bg-[#455859] text-white text-[10px] font-bold border border-black uppercase tracking-wider">Action</span>
                <span className="px-2 py-1 bg-[#8b5e3c] text-white text-[10px] font-bold border border-black uppercase tracking-wider">Solo Leveling</span>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-[#455859]">Weekly Poll: Who is the strongest Monarch?</h3>
              
              <div className="space-y-3">
                <div className="relative h-12 border-2 border-black bg-white overflow-hidden">
                  <div className="absolute inset-0 bg-[#455859]/10 w-[65%] border-r-2 border-black flex items-center px-4">
                    <span className="font-bold text-sm">Shadow Monarch (65%)</span>
                  </div>
                </div>
                <div className="relative h-12 border-2 border-black bg-white overflow-hidden">
                  <div className="absolute inset-0 bg-white w-[35%] border-r-2 border-black flex items-center px-4">
                    <span className="font-bold text-sm text-[#455859]/60">Antares (35%)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-dashed border-black/20 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-[#455859] font-bold">
                    <span className="material-icons text-sm">thumb_up</span>
                    <span>1.2k</span>
                  </button>
                  <button className="flex items-center space-x-1 text-[#455859]/60 font-bold">
                    <span className="material-icons text-sm">forum</span>
                    <span>284</span>
                  </button>
                </div>
                <button className="px-6 py-2 bg-[#455859] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all">
                  Vote Now
                </button>
              </div>
            </div>
          </div>

          {/* Discussion Thread Card */}
          <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] flex flex-col">
            <div className="p-6 border-b-2 border-black bg-[#455859]/5">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-[#e5d5c5] border-2 border-black flex items-center justify-center font-bold text-[#8b5e3c]">JD</div>
                <div>
                  <div className="text-sm font-bold text-[#455859]">JinDae_Official</div>
                  <div className="text-[10px] font-bold uppercase text-[#455859]/40 tracking-wider text-xs">2 HOURS AGO</div>
                </div>
              </div>
              <h4 className="font-black text-lg leading-tight text-[#455859]">The World After the Fall Chapter 150 Discussion Thread</h4>
            </div>
            <div className="p-6 flex-grow flex flex-col space-y-4">
              <p className="text-sm leading-relaxed text-[#455859]/80 italic">
                "That last panel was absolutely insane. The art direction for Jaehwan's newest technique is peak. Anyone else worried about the Tower Master's intervention?"
              </p>
              
              {/* Top Comment Highlight */}
              <div className="p-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] relative mt-4">
                <span className="absolute -top-3 left-3 px-2 py-0.5 bg-[#455859] text-white text-[9px] font-bold border border-black uppercase tracking-tighter">Top Comment</span>
                <p className="text-xs font-bold leading-relaxed text-[#455859]">
                  "The Tower Master is definitely setting a trap. Look at the shadows in page 12."
                </p>
              </div>
            </div>
            <div className="p-4 mt-auto border-t-2 border-dashed border-black/20 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center space-x-3 text-[#455859]">
                <span className="material-icons text-sm">thumb_up</span>
                <span className="text-xs font-bold">842</span>
                <span className="material-icons text-sm ml-2">forum</span>
                <span className="text-xs font-bold">156 comments</span>
              </div>
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-none border border-black bg-[#455859] text-[8px] text-white flex items-center justify-center font-bold">A</div>
                <div className="w-6 h-6 rounded-none border border-black bg-[#8b5e3c] text-[8px] text-white flex items-center justify-center font-bold">B</div>
                <div className="w-6 h-6 rounded-none border border-black bg-white text-[8px] text-[#455859] flex items-center justify-center font-bold font-mono">+12</div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal New Chapter Section */}
        <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] flex flex-col md:flex-row overflow-hidden">
          <div className="md:w-1/3 bg-gray-100 flex items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-black p-8 group">
            <span className="material-icons text-7xl text-[#455859]/20 group-hover:rotate-12 transition-transform duration-500">menu_book</span>
          </div>
          <div className="p-8 md:w-2/3 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-black text-[#455859]">Return of the Frozen Player</h3>
                <span className="px-3 py-1 bg-[#8b5e3c] text-white text-[10px] font-bold border-2 border-black uppercase tracking-widest">New Chapter</span>
              </div>
              <p className="text-[#455859]/70 leading-relaxed max-w-2xl">
                Junho's journey continues as he faces the Winter Queen's third general. The pacing is picking up and the world-building is expanding significantly in this arc. What are your theories on the next awakening?
              </p>
            </div>
            
            <div className="pt-6 border-t-2 border-dashed border-black/20 flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-[#455859] hover:text-black transition-colors">
                  <span className="material-icons text-lg">add_circle_outline</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Add to Library</span>
                </button>
                <button className="flex items-center space-x-2 text-[#455859] hover:text-black transition-colors">
                  <span className="material-icons text-lg">share</span>
                  <span className="text-xs font-bold uppercase tracking-wider">Share</span>
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <div className="px-3 py-2 border-2 border-black flex items-center space-x-2 bg-white font-bold text-sm">
                  <span className="material-icons text-sm text-yellow-600">star</span>
                  <span>9.8</span>
                </div>
                <button className="px-8 py-3 bg-[#455859] text-white font-black border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all uppercase tracking-tighter">
                  Read Ch. 92
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#455859] text-white border-2 border-black shadow-[4px_4px_0px_0px_#000] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-30">
          <span className="material-icons text-3xl">add</span>
        </button>
      </div>
    </Shell>
  );
};

export default Home;