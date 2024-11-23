import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: Boolean(localStorage.getItem('userData')), // Check if userData is stored
  userData: JSON.parse(localStorage.getItem('userData')) || null, // Load userData data
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.userData = action.payload;
      localStorage.setItem('userData', JSON.stringify(action.payload)); // Save userData
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
      localStorage.removeItem('userData'); // Clear userData
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
