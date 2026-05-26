import React from 'react';
import { Link } from 'react-router-dom';
import Shell from './Shell';

const NotFound = () => {
  return (
    <Shell>
      <div className="space-y-6 animate-in fade-in duration-700">
        <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="text-3xl font-black text-[#455859]">404</div>
              <div className="text-xl font-black text-[#455859] mt-1">Page not found</div>
              <div className="text-sm text-[#455859]/60 font-medium mt-2">
                The route you requested doesn’t exist in this build.
              </div>
            </div>
            <Link
              to="/"
              className="px-6 py-2.5 bg-[#455859] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all uppercase tracking-wider text-xs"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </Shell>
  );
};

export default NotFound;

