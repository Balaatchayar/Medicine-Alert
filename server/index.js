require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
const ReminderModel = require("./models/Reminder"); // Ensure you have the Reminder model
const routes = require("./routes/reminderrouter");

app.use(cors());
app.use(express.json());
app.use(routes);

// Connect to MongoDB
async function main() {
  try {
    await mongoose.connect('mongodb+srv://atchayaramesh574:5v5vsmdPIIiE0DV8@login.2gh0pqz.mongodb.net/?retryWrites=true&w=majority&appName=login');
    console.log("DB Connected");
  } catch (error) {
    console.error("Error connecting to DB:", error);
  }
}

main();

// Update the root route to return reminders
app.get("/", async (req, res) => {
  try {
    const reminders = await ReminderModel.find(); // Fetch reminders from MongoDB
    res.status(200).json(reminders); // Send reminders as JSON
  } catch (error) {
    console.error("Error fetching reminders:", error);
    res.status(500).json({ error: "Failed to fetch reminders" });
  }
});

// Start the server
app.listen(6002, () => {
  console.log("Server is running");
});
