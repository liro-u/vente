import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

// css
import './themes/default.css';
import './css/buttons.css';

// pages
import Home from './pages/Home';
import Contact from './pages/Contact';
import Anime from './pages/Anime';

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
            <Route
              exact
              path="/"
              element={<Home />}
            />
            <Route
              exact
              path="/contact"
              element={<Contact />}
            />
            <Route
              exact
              path="/wallpaper/test"
              element={<Anime />}
            />
          </Routes>
        </div>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
