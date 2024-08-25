# Medicine Alert

## Overview

Medicine Alert is a MERN stack application that sends email reminders to patients for their medication schedules. 

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Balaatchayar/Medicine-Alert
  
2. **Install backend dependencies and start the server:**
    ```sh
    cd server
    npm install
    node index.js

3. **Install frontend dependencies and start the vite development server**
    ```sh
    cd client
    npm install
    npm start

4.**Database Setup**

To connect your database, you need to update the `server/index.js` file with the appropriate MongoDB connection string.

## Environment Configuration

### Server

Create a `.env` file in the `server` directory.

Add the following variables:

   ```env
    EMAIL_USER=your-email@example.com
    EMAIL_PASS=your-email-password
   ```

![Project Screenshot](./client/src/Assets/Screenshot1.png)



