import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial State
const initialState = {
  chatList: [],
  selectedChat: null,
  messages: [],
  searchResults: [],
  isLoading: false,
  isSearchLoading: false,
  error: null,
};

// Async Thunks
export const fetchChats = createAsyncThunk('chats/fetchChats', async (userId) => {
  const response = await axios.get(`http://localhost:5000/api/messages/getChats/${userId}`);
  return response.data;
});

export const fetchMessages = createAsyncThunk('chats/fetchMessages', async (chatId) => {
  const response = await axios.get(`http://localhost:5000/api/messages/getMessages/${chatId}`);
  return response.data;
});

export const sendMessage = createAsyncThunk(
  'chats/sendMessage',
  async ({ chatId, senderId, text }) => {
    const response = await axios.post('http://localhost:5000/api/messages/sendMessage', {
      chatId,
      senderId,
      text,
    });
    return response.data;
  }
);

export const searchUsers = createAsyncThunk('chats/searchUsers', async (query) => {
  const response = await axios.get(`http://localhost:5000/api/users/search?query=${query}`);
  return response.data;
});

// New Thunk for creating a chat
export const createChat = createAsyncThunk(
  'chats/createChat',
  async ( { userId, participantId } ) => {
    console.log(userId , participantId , "frmo slice")
    const newChat = {
      participants: [userId, participantId],
      isGroup: false,
    };
 
    const response = await axios.post('http://localhost:5000/api/messages/createChat', newChat);
    return response.data;
  }
);

// Chat Slice
const chatSlice = createSlice({
  name: 'chats',
  initialState,
  reducers: {
    setSelectedChat(state, action) {
      state.selectedChat = action.payload;
    },
    clearMessages(state) {
      state.messages = [];
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chatList = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(searchUsers.pending, (state) => {
        state.isSearchLoading = true;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.isSearchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchUsers.rejected, (state) => {
        state.isSearchLoading = false;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.searchResults = []; // Clear search results after creating a chat
      })
      .addCase(createChat.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { setSelectedChat, addMessage, clearMessages } = chatSlice.actions;

export default chatSlice.reducer;
