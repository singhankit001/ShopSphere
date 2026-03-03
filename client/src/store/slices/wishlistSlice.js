import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: localStorage.getItem('wishlist')
      ? JSON.parse(localStorage.getItem('wishlist'))
      : [],
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const exists = state.items.find(i => i._id === action.payload._id);
      if (exists) {
        state.items = state.items.filter(i => i._id !== action.payload._id);
      } else {
        state.items.push(action.payload);
      }
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem('wishlist');
    },
  },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
