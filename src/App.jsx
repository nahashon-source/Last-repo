// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Organizations from './pages/Organizations';
import Stories from './pages/Stories';
import About from './pages/About';
import Donate from './pages/Donate';
import ManageBeneficiariesPage from './pages/ManageBeneficiariesPage';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/organizations" element={<Organizations />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/about" element={<About />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/beneficiary-list" element={<ManageBeneficiariesPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
