require('dotenv').config(); // Load environment variables (for other uses)
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();

const routes = require("./routes/reminderrouter");

// CORS configuration to allow specific origins
app.use(cors({
    origin: 'https://medicine-alert.onrender.com', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true
}));

app.use(express.json()); // Parse JSON request bodies
app.use(routes); // Use routes from the router file

// MongoDB connection
async function main() {
    try {
        await mongoose.connect('mongodb+srv://atchayaramesh574:5v5vsmdPIIiE0DV8@login.2gh0pqz.mongodb.net/?retryWrites=true&w=majority&appName=login', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB Connected");
    } catch (err) {
        console.error("DB Connection Error:", err);
    }
}

main();

// Basic route to check if the server is running
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Server listener
const PORT = process.env.PORT || 6002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
