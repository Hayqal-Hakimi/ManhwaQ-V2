import React from 'react';
import { Link } from 'react-router-dom';

/**
 * AuthLayout — halaman login/signup tanpa sidebar.
 */
export const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#455859] font-sans flex flex-col">
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Link to="/" className="block text-center mb-8">
            <h1 className="font-black text-3xl tracking-tighter text-[#455859]">ManhwaQ</h1>
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#455859]/60 mt-1">
              Community Edition
            </p>
          </Link>

          <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] overflow-hidden">
            <div className="p-6 border-b-2 border-black bg-[#455859]/5">
              <h2 className="text-2xl font-black text-[#455859]">{title}</h2>
              {subtitle && (
                <p className="text-sm text-[#455859]/60 mt-1 font-medium">{subtitle}</p>
              )}
            </div>
            <div className="p-6">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
