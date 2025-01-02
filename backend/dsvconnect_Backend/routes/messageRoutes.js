const express = require('express');
const {
  sendMessage,
  getMessages,
  createChat,
  getUserChats
} = require('../controllers/messageController');

const router = express.Router();

// Chat routes
router.post('/createChat', createChat); // Create a chat
router.get('/getChats/:userId', getUserChats); // Get all chats for a user

// Message routes
router.post('/sendMessage', sendMessage); // Send a message
router.get('/getMessages/:chatId', getMessages); // Get all messages for a chat

module.exports = router;
