import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage'; 
import Reminderpage from './Addreminder';
import Navbar from './Navbar';
import Allreminder from './Allreminder';
import socket from './socket';  // Import socket.js

const App = () => {
  // Setting up WebSocket event listeners
  useEffect(() => {
    // Listen for reminders sent from the backend
    socket.on('reminder-sent', (data) => {
      console.log("Received reminder:", data);
      alert(`Reminder: ${data.message} at ${data.time}`);  // Example of showing an alert

      // Here you could also update state to show reminders in the UI, etc.
    });

    // Cleanup socket connection when the component is unmounted
    return () => {
      socket.disconnect();
    };
  }, []);  // Empty array means this effect runs only once when the component mounts

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
