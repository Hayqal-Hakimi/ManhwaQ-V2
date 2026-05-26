import React from 'react';
import { Link } from 'react-router-dom';

export const ManhwaCard = ({ manhwa }) => {
  const slug = manhwa.slug || manhwa.id;

  return (
    <Link
      to={`/manhwa/${slug}`}
      className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] overflow-hidden hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] transition-all block"
    >
      <div className="h-36 bg-gray-100 border-b-2 border-black flex items-center justify-center">
        <span className="material-icons text-5xl text-[#455859]/15">menu_book</span>
      </div>
      <div className="p-4 space-y-2">
        <h4 className="font-black text-[#455859] leading-tight">{manhwa.title}</h4>
        <div className="flex flex-wrap gap-1">
          {(manhwa.genre || []).map((genre) => (
            <span
              key={genre}
              className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border border-black bg-[#455859]/5 text-[#455859]"
            >
              {genre}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-1">
          <span
            className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider border border-black ${
              manhwa.status === 'completed'
                ? 'bg-[#8b5e3c]/10 text-[#8b5e3c]'
                : 'bg-[#455859]/10 text-[#455859]'
            }`}
          >
            {manhwa.status}
          </span>
          <span className="material-icons text-[#455859]/30 text-sm">chevron_right</span>
        </div>
      </div>
    </Link>
  );
};
