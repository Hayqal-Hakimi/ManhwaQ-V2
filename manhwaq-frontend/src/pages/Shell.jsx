import React from 'react';
import Header from '../components/layout/header';
import Sidebar from '../components/layout/sidebar';

import MobileNav from '../components/layout/MobileNav';

/**
 * Shell Component
 * Responsibility: The high-level layout wrapper that includes the Header and Sidebar.
 * Provides a consistent main content area for all pages.
 */
const Shell = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#fcf9f8] text-[#455859] font-sans selection:bg-[#455859] selection:text-[#fcf9f8]">
      {/* Primary Desktop Navigation */}
      <Sidebar />

      {/* Main Layout Area */}
      <div className="md:ml-64 flex flex-col min-h-screen relative pb-16 md:pb-0">
        {/* Global Top Bar */}
        <Header />

        {/* Page Content */}
        <main className="flex-grow p-6 w-full max-w-7xl mx-auto">
          {children}
        </main>

        {/* Mobile Navigation (Bottom Bar) */}
        <MobileNav />
      </div>

      {/* Global Inked Overlay Effect (Optional) */}
      <div className="fixed inset-0 pointer-events-none border-[12px] border-black/5 opacity-20 md:border-[24px]"></div>
    </div>
  );
};

export default Shell;