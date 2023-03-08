import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

// pages
import Home from './pages/Home';

// component
import Footer from './components/Footer';
import NavBar from './components/Navbar';


function App() {
  return (
    <div className="app">
      <HashRouter>
        <NavBar />
        <div className='pages'>
          <Routes>
            <Route
              exact
              path="/"
              element={<Home />}
            />
          </Routes>
        </div>
        <Footer />
      </HashRouter>
    </div>
  );
}

export default App;
