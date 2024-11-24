import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'; 
import Reminderpage from './Addreminder';
import Navbar from './Navbar';
import Allreminder from './Allreminder';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/allreminder" element={<Allreminder />} />
        <Route path="/addreminder" element={<Reminderpage />} />
      </Routes>
    </>
  );
};

export default App;
