import { configureStore } from '@reduxjs/toolkit';
import useReducer from '../features/userSlice'
import chatreducer from '../features/chatSlice'

export default configureStore({
  reducer: {
    user: useReducer,
    chat: chatreducer
  },
});
