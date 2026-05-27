import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './assets/index-B7ec7Ahw.css';
import { AuthProvider } from './context/AuthContext';

// Initialize Dark Mode preference
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
