const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
// const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

dotenv.config();
connectDB();

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/chats', chatRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);


// Socket.IO for real-time messages
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('joinRoom', ({ sender, receiver }) => {
    const room = [sender, receiver].sort().join('_');
    socket.join(room);
  });

  socket.on('sendMessage', (data) => {
    const { sender, receiver, message } = data;
    const room = [sender, receiver].sort().join('_');
    io.to(room).emit('receiveMessage', { sender, message });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
http.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
