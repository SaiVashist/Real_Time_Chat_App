import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../src/components/Dashboard/chatSlice'
import authReducer from '../src/components/auth/authSlice'

 const store = configureStore({
  reducer: {
    chats: chatReducer,
    auth:authReducer
  },
});
export default store