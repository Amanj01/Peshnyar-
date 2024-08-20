import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import CryptoJS from 'crypto-js';


// Thunk for handling user registration
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:8000/api/auth/register', userData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Thunk for handling user login
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:8000/api/auth/login', credentials);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const SECRET_KEY = 'amanj7887'; // Store this securely, not in the code

const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    status: 'idle',
    error: null,
    isLogin: JSON.parse(localStorage.getItem('isLogin')) || false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLogin = false;
      localStorage.removeItem('isLogin');
      localStorage.removeItem('encryptedUser');
    },
    initializeAuth: (state) => {
      const encryptedUser = localStorage.getItem('encryptedUser');
      if (encryptedUser) {
        state.user = decryptData(encryptedUser);
        state.isLogin = true;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const userToStore = {
          id: action.payload._id,
          username: action.payload.username,
          
          // Add other necessary fields, but omit sensitive information
        };
        state.user = userToStore;
        localStorage.setItem('encryptedUser', encryptData(userToStore));
        localStorage.setItem('isLogin', JSON.stringify(true));
      })      
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;