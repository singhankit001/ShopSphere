import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { products as fallbackProducts } from '../../data/shopData';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (search = '') => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products${search}`);
    return data.products || data || fallbackProducts;
  } catch (error) {
    console.error("API failed, using fallback products", error);
    return fallbackProducts;
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
