const http = require('http'); // Import the HTTP module
const express = require('express'); // Import Express framework
const path = require('path'); // Import Path module for directory operations
const { Server } = require('socket.io'); // Import Server class from Socket.IO
const jwt = require('jsonwebtoken'); // Import JWT module
const secretkey="secretkey" //hidden
const app = express(); // Create an Express application

// Define the path to the public directory
const publicPath = path.join(__dirname, 'public');

// Create an HTTP server with the Express app
const server = http.createServer(app)

// Create a Socket.IO server and attach it to the HTTP server
const io = new Server(server);



io.on('connection', (socket) => {  //// Handle WebSocket connections

    console.log(`A new user has connected: ${socket.id}`);

    // Handle incoming messages from clients
    socket.on('user-message', (message) => {
        const timestamp = new Date().toLocaleTimeString();
        io.emit('message', { username: message.username, message: message.message, timestamp });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Serve static files from the public directory
app.use(express.static(publicPath));

// Start the server on port 8000
server.listen(8000, () => console.log('Server started on port 8000'));
