import { io } from "socket.io-client";

// Connect to WebSocket server
const socket = io("wss://medicine-alert.onrender.com");  // Replace with your WebSocket server URL

// Listen for events from the server
socket.on("connect", () => {
  console.log("Connected to WebSocket server");
});

socket.on("reminder-sent", (data) => {
  console.log("Received reminder data:", data);
  // You can handle the reminder data as needed, for example, display a notification
  alert(`Reminder: ${data.message} at ${data.time}`);
});

socket.on("disconnect", () => {
  console.log("Disconnected from WebSocket server");
});

export default socket;
