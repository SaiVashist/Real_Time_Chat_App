const express = require('express');
const {
  sendMessage,
  getMessages,
  createChat,
  getUserChats
} = require('../controllers/messageController');

const router = express.Router();

// Chat routes
router.post('/chats', createChat); // Create a chat
router.get('/chats/:userId', getUserChats); // Get all chats for a user

// Message routes
router.post('/', sendMessage); // Send a message
router.get('/:chatId', getMessages); // Get all messages for a chat

module.exports = router;
