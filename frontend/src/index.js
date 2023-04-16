import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WallpaperContextProvider } from './context/WallpaperContext';
import { AuthContextProvider } from './context/AuthContext';
import { NavbarContextProvider } from './context/NavbarContext';
import { FilterContextProvider } from './context/filterContext';
import { ShoppingCartContextProvider } from './context/ShoppingCartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
  <WallpaperContextProvider>
  <NavbarContextProvider>
  <FilterContextProvider>
  <ShoppingCartContextProvider>
    <App />
  </ShoppingCartContextProvider>
  </FilterContextProvider>
  </NavbarContextProvider>
  </WallpaperContextProvider>
  </AuthContextProvider>
);

