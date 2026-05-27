import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import Trending from './pages/Trending';
import Library from './pages/Library';
import MyPolls from './pages/MyPolls';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ManhwaDetail from './pages/ManhwaDetail';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminManhwa from './pages/AdminManhwa';
import { AdminRoute } from './components/auth/AdminRoute';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-root">
        <Routes>
          {/* Auth — public */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Public / guest */}
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/search" element={<Search />} />
          <Route path="/manhwa/:id" element={<ManhwaDetail />} />
          <Route path="/polls" element={<MyPolls />} />

          {/* Protected — perlu login */}
          <Route
            path="/library"
            element={
              <ProtectedRoute>
                <Library />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/manhwa"
            element={
              <AdminRoute>
                <AdminManhwa />
              </AdminRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
