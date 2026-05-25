import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Trending from './pages/Trending';
import Library from './pages/Library';
import MyPolls from './pages/MyPolls';

/**
 * App Component
 * Responsibility: Root controller for the ManhwaQ application.
 * Uses React Router to manage navigation between all pages.
 */
const App = () => {
  return (
    <BrowserRouter>
      <div className="app-root">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/library" element={<Library />} />
          <Route path="/polls" element={<MyPolls />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
