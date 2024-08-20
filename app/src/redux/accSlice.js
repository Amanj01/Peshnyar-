import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for handling update user profile account
// @ts-ignore
export const updateProfile = createAsyncThunk('auth/updateProfile', async ({ userId, updatedFields }, thunkAPI) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/users/${userId}`, updatedFields);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Thunk for handling delete user account
export const deleteUser = createAsyncThunk('auth/deleteUser', async (userId, thunkAPI) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/users/${userId}`, {
      data: { userId },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const accSlice = createSlice({
  name: 'acc',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        console.log('Update Profile Fulfilled:', action.payload);
        state.status = 'succeeded';
        state.user = action.payload;
        // Store the entire updated user object in localStorage
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.user = null;
        // Remove user data from localStorage when account is deleted
        localStorage.removeItem('user');
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
  reducers: undefined
});

export default accSlice.reducer;
