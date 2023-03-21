import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

// css
import './themes/default.css';
import './css/buttons.css';

// pages
import Home from './pages/Home';
import Contact from './pages/Contact';
import Discovery from './pages/Discovery';
import Collections from './pages/Collections';
import PublishWallpaper from './pages/PublishWallpaper';

// collections
import ThemeLOL from './pages/collections/ThemeLOL';

// component
import Footer from './components/Footer';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="app defaultFontColor">
      <HashRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="/wallpaper/discovery" element={<Discovery />} />
            <Route exact path="/wallpaper/collections" element={<Collections />} />

            <Route exact path="/wallpaper/publish" element={<PublishWallpaper />} />

            <Route exact path="/wallpaper/collections/lol" element={<ThemeLOL />} />
          </Routes>
        </div>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
