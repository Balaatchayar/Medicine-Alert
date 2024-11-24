import { useState } from 'react';
import axios from 'axios';
import './App.css';
import { useNavigate } from 'react-router-dom';

const Reminderpage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    medicinename: "",
    datetime: "",
    caretaker: "",
    caretakeremail: ""
  });
  const [errors, setErrors] = useState({});
  const backendUrl = 'https://medicine-alert-backend.onrender.com'; // Update backend URL

  const adddata = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const validate = () => {
    let formErrors = {};
    let isValid = true;

    if (!data.medicinename) {
      formErrors.medicinename = "Medicine Name is required";
      isValid = false;
    }

    if (!data.datetime) {
      formErrors.datetime = "Date & Time is required";
      isValid = false;
    }

    if (data.caretakeremail && !/\S+@\S+\.\S+/.test(data.caretakeremail)) {
      formErrors.caretakeremail = "Invalid email format";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const submit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    try {
      const res = await axios.post(`${backendUrl}/addreminder`, data);
      if (res.status === 200) {
        alert("Reminder added successfully");
        navigate("/allreminder"); // Redirect to Allreminder page
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error adding reminder:", error);
      alert("Error adding reminder");
    }
  };

  return (
    <div className="add-reminder-page">
      <form onSubmit={submit}>
        <div>
          <p>Medicine Name:</p>
          <input
            type="text"
            name="medicinename"
            value={data.medicinename}
            onChange={adddata}
          />
          {errors.medicinename && <p className="error">{errors.medicinename}</p>}
        </div>

        <div>
          <p>Date & Time:</p>
          <input
            type="datetime-local"
            name="datetime"
            value={data.datetime}
            onChange={adddata}
          />
          {errors.datetime && <p className="error">{errors.datetime}</p>}
        </div>

        <div>
          <p>Name (optional):</p>
          <input
            type="text"
            name="caretaker"
            value={data.caretaker}
            onChange={adddata}
          />
        </div>

        <div>
          <p>Email Address:</p>
          <input
            type="email"
            name="caretakeremail"
            value={data.caretakeremail}
            onChange={adddata}
          />
          {errors.caretakeremail && <p className="error">{errors.caretakeremail}</p>}
        </div>

        <button className="submit-btn" type="submit">Add Reminder</button>
      </form>
    </div>
  );
};

export default Reminderpage;
