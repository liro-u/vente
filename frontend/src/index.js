import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WallpaperContextProvider } from './context/WallpaperContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WallpaperContextProvider>
      <App />
    </WallpaperContextProvider>
  </React.StrictMode>
);

