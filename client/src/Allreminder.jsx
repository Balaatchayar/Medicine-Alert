import React, { useState, useEffect } from "react";
import axios from 'axios';

const Allreminder = () => {
  const [reminderlist, setReminderlist] = useState([]);
  const backendUrl = 'https://medicine-alert-backend.onrender.com'; // Update backend URL

  useEffect(() => {
    record();
  }, []); // Empty dependency array

  const record = async () => {
    try {
      const res = await axios.get(`${backendUrl}/allreminder`);
      setReminderlist(res.data);
    } catch (error) {
      console.error("Error fetching reminders:", error);
    }
  };

  const deletereminder = async (id) => {
    try {
      await axios.delete(`${backendUrl}/deletereminder/${id}`);
      record(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting reminder:", error);
    }
  };

  return (
    <div id="carts">
      {reminderlist.map((data, index) => (
        <div className="cart" key={index}>
          <h3 className='remindme-text'>Remind 🙋‍♂️</h3>
          <hr />
          <h1>Time:</h1>
          <p>{new Date(data.datetime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          <h1>Medicine Name:</h1>
          <p>{data.medicinename}</p>
          <h3>Name : <span>{data.caretaker}</span></h3>
          <button id="delete" onClick={() => deletereminder(data._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Allreminder;
