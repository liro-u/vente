import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

// css
import './themes/default.css';
import './css/buttons.css';

// pages
import Home from './pages/Home';
import Contact from './pages/Contact';

// component
import Footer from './components/Footer';
import NavBar from './components/Navbar';


function App() {
  return (
    <div className="app defaultFontColor">
      <HashRouter>
        <NavBar />
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
          </Routes>
        </div>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
