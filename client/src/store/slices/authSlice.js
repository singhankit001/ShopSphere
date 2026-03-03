import { createSlice } from '@reduxjs/toolkit';

const getSafeUserFromStorage = () => {
  try {
    const raw = localStorage.getItem('user');
    if (!raw || raw === 'undefined') return null;
    return JSON.parse(raw);
  } catch (err) {
    console.error("Auth hydration error:", err);
    localStorage.removeItem('user');
    return null;
  }
};

const userFromStorage = getSafeUserFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: userFromStorage,
    loading: false,
    error: null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    loadUser: (state) => {
      state.user = getSafeUserFromStorage();
    }
  },
});

export const { setCredentials, logout, setLoading, setError, loadUser } = authSlice.actions;
export default authSlice.reducer;
