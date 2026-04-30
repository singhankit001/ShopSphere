import { createSlice, createSelector } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  try {
    const serialized = localStorage.getItem('shopsphere_cart');
    return serialized ? JSON.parse(serialized) : [];
  } catch (err) {
    return [];
  }
};

const saveCartToStorage = (items) => {
  try {
    localStorage.setItem('shopsphere_cart', JSON.stringify(items));
  } catch (err) {
    console.error("Could not save cart", err);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const productId = action.payload._id || action.payload.id;
      if (!productId) {
        console.error("Attempted to add product without ID", action.payload);
        return;
      }
      
      const existingItem = state.items.find(i => (i._id || i.id) === productId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, _id: productId, quantity: 1 });
      }
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(i => (i._id || i.id) !== productId);
      saveCartToStorage(state.items);
    },
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => (i._id || i.id) === id);
      if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter(i => (i._id || i.id) !== id);
        }
      }
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToStorage(state.items);
    },
  },
});

// MEMOIZED SELECTORS
const selectCartItems = (state) => state.cart.items;

export const selectCartTotalQuantity = createSelector(
  [selectCartItems],
  (items) => items.reduce((acc, item) => acc + item.quantity, 0)
);

export const selectCartSubtotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((acc, item) => acc + (item.discountPrice || item.price) * item.quantity, 0)
);

export const selectCartGrandTotal = createSelector(
  [selectCartSubtotal, selectCartItems],
  (subtotal, items) => {
    if (items.length === 0) return 0;
    const deliveryFee = subtotal > 500 ? 0 : 25;
    const handlingFee = 5;
    return subtotal + deliveryFee + handlingFee;
  }
);

export const { addToCart, removeFromCart, updateCartQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
