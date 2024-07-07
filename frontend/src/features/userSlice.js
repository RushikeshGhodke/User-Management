// src/features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api.js';

// Thunks
export const fetchUsers = createAsyncThunk('user/fetchUsers', async () => {
  const response = await api.get('/users/listUsers');
  return response.data.data; // Adjust based on your API response structure
});

export const addUser = createAsyncThunk('user/addUser', async (user) => {
  const response = await api.post('/users/addUser', user);
  return response.data.data; // Adjust based on your API response structure
});

export const deleteUser = createAsyncThunk('user/deleteUser', async (userId) => {
  console.log(userId);
  await api.delete('/users/deleteUser', { data: { id: userId } });
  return userId;
});

export const updateUser = createAsyncThunk('user/updateUser', async (user) => {
  const response = await api.put('/users/editUser', user);
  return response.data.data; // Adjust based on your API response structure
});

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
