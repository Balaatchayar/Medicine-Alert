import React, { useState, useEffect } from "react";
import axios from "axios";

const Allreminder = () => {
  const [reminderlist, setReminderlist] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    record();
  }, []);

  const record = async () => {
    try {
      const res = await axios.get("https://medicine-alert.onrender.com"); // Use the deployed backend URL
      if (Array.isArray(res.data)) {
        setReminderlist(res.data); // Populate reminders if data is an array
        setError(null); // Clear previous errors if data loads successfully
      } else {
        console.error("Unexpected response format:", res.data);
        setReminderlist([]); // Fallback to empty list
        setError("Unexpected data format from server.");
      }
    } catch (error) {
      console.error("Error fetching reminders:", error);
      setError("Failed to fetch reminders. Please try again later.");
    }
  };

  const deletereminder = async (id) => {
    try {
      await axios.delete(`https://medicine-alert.onrender.com/deletereminder/${id}`); // Use deployed backend URL
      record(); // Refresh the reminders list after deletion
    } catch (error) {
      console.error("Error deleting reminder:", error);
      setError("Failed to delete the reminder. Please try again.");
    }
  };

  return (
    <div id="carts">
      {error && <p className="error">{error}</p>} {/* Show errors if any */}
      {reminderlist.length > 0 ? (
        reminderlist.map((data, index) => (
          <div className="cart" key={data._id || index}> {/* Use unique ID as key */}
            <h3 className="remindme-text">Remind 🙋‍♂️</h3>
            <hr />
            <h1>Time:</h1>
            <p>{new Date(data.datetime).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
            <h1>Medicine Name:</h1>
            <p>{data.medicinename}</p>
            <h3>
              Name : <span>{data.caretaker || "N/A"}</span>
            </h3>
            <button id="delete" onClick={() => deletereminder(data._id)}>Delete</button>
          </div>
        ))
      ) : (
        !error && <p>No reminders found. Add some to get started!</p> // Handle empty list gracefully
      )}
    </div>
  );
};

export default Allreminder;
