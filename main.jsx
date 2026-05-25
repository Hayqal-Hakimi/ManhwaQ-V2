import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css';

/**
 * Application Entry Point
 * Mounts the root App component into the DOM.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
