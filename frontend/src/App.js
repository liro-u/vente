import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

// css
import './themes/default.css';
import './css/buttons.css';

// pages
import Home from './pages/Home';
import Contact from './pages/Contact';
import Discovery from './pages/Discovery';
import ThemeLol from './pages/ThemeLol';

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
              path="/wallpaper/discovery"
              element={<Discovery />}
            />
            <Route
                exact
                path="/wallpaper/theme/lol"
                element={<ThemeLol />}
            />
          </Routes>
        </div>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
