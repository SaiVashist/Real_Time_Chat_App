import React, { useState, useEffect, useCallback } from 'react';
import {
  Box, List, ListItem, ListItemAvatar, ListItemText,
  Avatar, Typography, TextField, CircularProgress, ListItemIcon, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Button
} from '@mui/material';

import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';

import axios from 'axios';
import { io } from 'socket.io-client';
import debounce from 'lodash.debounce'; // For debouncing input

// Initialize Socket.IO connection
const socket = io('http://localhost:5000');

const Chats = () => {
  const [chatList, setChatList] = useState([]); // List of chats
  const [selectedChat, setSelectedChat] = useState(null); // Selected chat details
  const [openDialog, setOpenDialog] = useState(false); // Dialog state
  const [message, setMessage] = useState(''); // Message input
  const [typing, setTyping] = useState(false); // Typing indicator
  const [showList, setShowList] = useState(false); // Toggle chat list

  const [searchQuery, setSearchQuery] = useState(''); // Search input
  const [searchResults, setSearchResults] = useState([]); // Matched users
  const [isLoading, setIsLoading] = useState(false); // Loading indicator

  const userId = '676d83b30240592bd0e37289'; // Replace with logged-in user's ID

  console.log(chatList,"chat list")

  // **1. Fetch Chat List**
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/messages/chats/${userId}`);
        setChatList(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };
    fetchChats();
  }, []);

  // **2. Handle Chat Selection**
  const handleChatClick = async (chat) => {
    console.log(chat,"chat chat")
    setSelectedChat(chat);
    setOpenDialog(true);

    try {
      const response = await axios.get(`http://localhost:5000/api/messages/${chat.chatId}`);
      console.log(response.data,"response")
      setSelectedChat((prev) => ({ ...prev, messages: response.data }));
      console.log(selectedChat,"selected chat")


      //Join chat room for real-time updates
      socket.emit('joinRoom', chat.chatId);

      socket.on('receiveMessage', (newMessage) => {
        setSelectedChat((prev) => ({
          ...prev,
          messages: [...prev.messages, newMessage],
        }));
      });
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // **3. Close Chat Dialog**
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedChat(null);
    socket.disconnect();
  };

  // **4. Send Message**
  const handleSendMessage = async () => {
    console.log(selectedChat,"selected chat")
    if (message.trim()) {
      const newMessage = {
        chatId: selectedChat.chatId,
        senderId: userId,
        text: message,
      };

      try {
        const response = await axios.post('http://localhost:5000/api/messages', newMessage);
        console.log(response.data,"from send message")

        socket.emit('sendMessage', response.data);

        setSelectedChat((prev) => ({
          ...prev,
          messages: [...prev.messages, response.data],
        }));

        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  // **5. Search Users (Debounced)**
  const fetchSearchResults = async (query) => {
    setIsLoading(true);

    if (!query.trim()) {
      setSearchResults([]); // Clear results if input is empty
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/users/search?query=${query}`);
      setSearchResults(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error searching users:', error);
      setIsLoading(false);
    }
  };

  const debounceSearch = useCallback(debounce(fetchSearchResults, 300), []); // Debounce input

  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debounceSearch(query);
  };

  // **6. Create New Chat**
  const handleCreateChat = async (user) => {
    try {
      const newChat = {
        participants: [userId, user._id],
        isGroup: false,
      };

      const response = await axios.post('http://localhost:5000/api/messages/chats', newChat);

      setChatList([...chatList, response.data]);
      setSearchQuery('');
      setSearchResults([]);
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  return (
    <Box>
      <ListItem button onClick={() => setShowList(!showList)} sx={{ cursor: 'pointer' }}>
        <ListItemIcon><ChatIcon /></ListItemIcon>
        <ListItemText primary="Chats" />
      </ListItem>

      {showList && (
        <Box sx={{ height: '100%', backgroundColor: '#F8EDEB', p: 3, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ mb: 3 }}>Chats</Typography>

          {chatList.length === 0 ? (
            <Box>
              <TextField
                fullWidth
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearchInput}
                sx={{ mb: 2 }}
              />
              {isLoading && <CircularProgress sx={{ ml: '50%' }} />}

              {searchResults.length > 0 && (
                <List>
                  {searchResults.map((user) => (
                    <ListItem
                      key={user._id}
                      button
                      onClick={() => handleCreateChat(user)}
                      sx={{ mb: 2 }}
                    >
                      <ListItemAvatar>
                        <Avatar src={user.profilePicture || 'https://via.placeholder.com/150'} />
                      </ListItemAvatar>
                      <ListItemText primary={user.username} />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          ) : (
            <List>
              {chatList.map((chat) => (
                <ListItem button key={chat.chatId} onClick={() => handleChatClick(chat)} sx={{ mb: 2 }}>
                  <ListItemAvatar>
                    <Avatar src={chat.avatar || 'https://via.placeholder.com/150'} />
                  </ListItemAvatar>
                  <ListItemText primary={chat.name} secondary="select to open chat" />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
  <DialogTitle>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      {/* Chat Header */}
      <Avatar src={selectedChat?.avatar || 'https://via.placeholder.com/150'} />
      <Typography variant="h6">{selectedChat?.name}</Typography>
      <IconButton onClick={handleCloseDialog}>
        <CloseIcon />
      </IconButton>
    </Box>
  </DialogTitle>

  {/* Chat Messages */}
  <DialogContent
    sx={{
      height: '400px', // Fixed height with scroll
      overflowY: 'auto', // Enable scrolling
      padding: '10px',
      backgroundColor: '#f4f6f8', // Light background color
    }}
  >
    {selectedChat?.messages?.map((msg, index) => (
      <Box
        key={index}
        sx={{
          display: 'flex',
          justifyContent: msg.senderId === userId ? 'flex-end' : 'flex-start', // Align based on sender
          mb: 1, // Margin bottom
        }}
      >
        <Typography
          sx={{
            padding: '10px 15px',
            borderRadius: '20px',
            maxWidth: '75%',
            wordWrap: 'break-word', // Wrap long messages
            backgroundColor: msg.senderId === userId ? '#2196F3' : '#E0E0E0', // Blue for sender, gray for receiver
            color: msg.senderId === userId ? '#FFFFFF' : '#000000', // Text color
            fontSize: '0.9rem',
            boxShadow: 1,
          }}
        >
          {msg.text}
        </Typography>
      </Box>
    ))}
  </DialogContent>

  {/* Chat Input */}
  <DialogActions sx={{ padding: '10px 20px', borderTop: '1px solid #E0E0E0' }}>
    <TextField
      fullWidth
      variant="outlined"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Type a message..."
      sx={{ backgroundColor: '#FFFFFF', borderRadius: '8px' }}
    />
    <Button
      onClick={handleSendMessage}
      variant="contained"
      color="primary"
      sx={{ ml: 2, height: '56px' }}
    >
      <SendIcon />
    </Button>
  </DialogActions>
</Dialog>

    </Box>
  );
};

export default Chats;
