require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const http = require("http"); // Import the http module to create a server
const socketIo = require("socket.io"); // Import socket.io to create WebSocket connections

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = socketIo(server, { // Create the socket.io WebSocket server
  cors: {
    origin: 'https://medicine-alert.onrender.com', // Allow frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

// Import routes (Reminder routes)
const routes = require("./routes/reminderrouter");

// CORS configuration to allow specific origins for REST API
app.use(cors({
    origin: 'https://medicine-alert.onrender.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json()); // Parse JSON request bodies
app.use(routes); // Use routes from the router file

// MongoDB connection
async function main() {
    try {
       await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("DB Connected");
    } catch (err) {
        console.error("DB Connection Error:", err);
    }
}

main();

// WebSocket connection
io.on("connection", (socket) => {
  console.log("A client connected to WebSocket");

  // Example event listener on WebSocket connection
  socket.on("disconnect", () => {
    console.log("A client disconnected from WebSocket");
  });

  // You can emit events to the client
  socket.emit("message", "Hello from server");
});

// Basic route to check if the server is running
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Server listener for HTTP server (WebSocket server runs on same port)
const PORT = process.env.PORT || 6002;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
