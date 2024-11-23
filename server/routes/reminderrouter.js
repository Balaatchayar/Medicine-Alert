const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv"); // Add this line
const Reminder = require("../schema/reminderschema");

dotenv.config(); // Add this line

const router = express.Router();
const app = express();

app.use(cors());

setInterval(async () => {
  try {
    const data = await Reminder.find({});
    const now = new Date();

    // Loop through reminders to send emails if due
    for (const element of data) {
      if (new Date(element.datetime) - now < 0 && !element.isReminded) {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: `${element.caretakeremail}`,
          subject: "Reminder for medicine",
          text: `Hello,

This is a friendly reminder to take your medicine:

Medicine Name: ${element.medicinename}`,
        };

        try {
          await transporter.sendMail(mailOptions);
          console.log("Email sent to:", element.caretakeremail);

          // Mark the reminder as reminded
          await Reminder.findByIdAndUpdate(element.id, { isReminded: true });
        } catch (error) {
          console.log("Email send failed ", error);
        }
      }
    }
  } catch (error) {
    console.error("Error checking reminders:", error);
  }
}, 60000); // Check reminders every minute

// Get all reminders
router.get("/allreminder", async (req, res) => {
  try {
    const data = await Reminder.find({});
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send("Error fetching reminders.");
  }
});

// Add a new reminder
router.post("/addreminder", async (req, res) => {
  try {
    const { medicinename, datetime, caretaker, caretakeremail } = req.body;

    if (!medicinename || !datetime || !caretakeremail) {
      return res.status(400).send("Please provide all necessary fields.");
    }

    const newReminder = new Reminder({
      medicinename,
      datetime,
      caretaker,
      caretakeremail,
      isReminded: false,
    });

    const savedReminder = await newReminder.save();
    res.status(200).json(savedReminder);
  } catch (error) {
    res.status(400).send("Error adding reminder.");
  }
});

// Delete a reminder by ID
router.delete("/deletereminder/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedReminder = await Reminder.findByIdAndDelete(id);
    if (!deletedReminder) {
      return res.status(404).send("Reminder not found.");
    }
    res.status(200).json(deletedReminder);
  } catch (error) {
    res.status(400).send("Error deleting reminder.");
  }
});

// Test email route
router.get("/email", (req, res) => {
  res.send("hii");
});

module.exports = router;
