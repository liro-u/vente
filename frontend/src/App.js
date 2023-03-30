import React from 'react';
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/auth/useAuthContext';

// css
import './themes/default.css';
import './css/buttons.css';

// PAGES
//auth
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
//all
import Home from './pages/Home';
//wallpapers
import Discovery from './pages/wallpapers/Discovery';
import Collections from './pages/wallpapers/Collections';
import PublishWallpaper from './pages/wallpapers/PublishWallpaper';
import EditWallpaper from './pages/wallpapers/EditWallpaper';
//collections
import ThemeLOL from './pages/collections/ThemeLOL';
//debug
import DebugDb from './pages/debug/DebugDb';
//purchase
import DetailsPurchase from "./components/DetailsPurchase";
import ShoppingCart from "./components/ShoppingCart";

// component
import Footer from './components/Footer';
import Navbar from './components/Navbar';



function App() {
  const { user, ready } = useAuthContext();

  return (
    <div className="app defaultFontColor">
      {ready && <HashRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            {/* AUTH */}
            <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route exact path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />

            {/* ALL */}
            <Route exact path="/" element={<Home />} />

            {/* WALLPAPERS */}
            <Route exact path="/wallpaper/discovery" element={<Discovery />} />
            <Route exact path="/wallpaper/collections" element={<Collections />} />
            <Route exact path="/wallpaper/publish" element={(user && (user.role === 'admin' || user.role === 'artist')) ? <PublishWallpaper /> : <Navigate to="/" />} />
            <Route exact path="/wallpaper/edit/:id" element={(user && (user.role === 'admin' || user.role === 'artist')) ? <EditWallpaper /> : <Navigate to="/" />} />

            {/* COLLECTIONS */}
            <Route exact path="/wallpaper/collections/lol" element={<ThemeLOL />} />

            {/* PURCHASE */}
            <Route exact path="/wallpaper/detailspurchase/:id" element={user ? <DetailsPurchase /> : <Navigate to="/" />} />
            <Route exact path="/wallpaper/shoppingcart" element={user ? <ShoppingCart /> : <Navigate to="/" />} />

            {/* DEBUG */}
            <Route exact path="/debug/db" element={(user && user.role === 'admin') ? <DebugDb /> : <Navigate to="/" />} />
          </Routes>
        </div>
        <Footer />
      </HashRouter>}
    </div>
  );
}

export default App;
