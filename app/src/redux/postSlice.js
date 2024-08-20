// @ts-nocheck
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for creating a post
export const createPost = createAsyncThunk('posts/createPost', async (postData, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:8000/api/posts', postData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Thunk for updating a post
export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, postData }, thunkAPI) => {
  try {
    const response = await axios.put(`http://localhost:8000/api/posts/${id}`, postData );
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);

  }
});


// Thunk for deleting a post
export const deletePost = createAsyncThunk('posts/deletePost', async ({ id, postData }, thunkAPI) => {
  console.log('id , postData', id , postData);
  const userId = postData;
  console.log('username', username);

  try {
    await axios.delete(`http://localhost:8000/api/posts/${id}` , userId);
    return id; // Return the ID to remove it from the state
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    // Optionally, you can add some reducers for synchronous actions here
  },
  extraReducers: (builder) => {
    builder
      // Handle creating a post
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts.push(action.payload); // Add the new post to the posts array
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Handle updating a post
      .addCase(updatePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.posts.findIndex(post => post._id === action.payload._id);
        if (index !== -1) {
          state.posts[index] = action.payload; // Update the post in the array
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Handle deleting a post
      .addCase(deletePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = state.posts.filter(post => post._id !== action.payload); // Remove the deleted post from the array
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default postSlice.reducer;
