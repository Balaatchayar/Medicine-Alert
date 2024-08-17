import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'; // Import the new HomePage component
import Reminderpage from './Addreminder';
import Navbar from './Navbar';
import Allreminder from './Allreminder';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Landing page with background */}
        <Route path="/allreminder" element={<Allreminder />} /> {/* Other pages */}
        <Route path="/addreminder" element={<Reminderpage />} />
      </Routes>
    </>
  );
};

export default App;
