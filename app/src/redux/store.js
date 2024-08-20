
import { configureStore } from '@reduxjs/toolkit'
import darkModeReducer from "./modeSlice"
import authReducer from './authSlice';
import postReducer from './postSlice';
import accReducer from './accSlice';

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    auth: authReducer,
    post: postReducer,
    acc: accReducer,

  },
})