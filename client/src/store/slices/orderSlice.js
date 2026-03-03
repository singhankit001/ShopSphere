import { createSlice } from '@reduxjs/toolkit';
import { getStoredOrders, saveStoredOrders, upsertStoredOrder, updateStoredOrderStatus } from '../../utils/commerceStorage';

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: getStoredOrders(),
    activeOrder: null,
    delivery: {
      currentStatus: 'Placed',
      etaSeconds: 600,
      riderProgress: 0
    }
  },
  reducers: {
    hydrateOrders: (state) => {
      state.orders = getStoredOrders();
    },
    addOrder: (state, action) => {
      state.orders = upsertStoredOrder(action.payload);
      state.activeOrder = action.payload;
    },
    setActiveOrder: (state, action) => {
      state.activeOrder = action.payload;
    },
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;
      state.orders = updateStoredOrderStatus(id, status);
      if (state.activeOrder && (state.activeOrder._id === id || state.activeOrder.orderId === id)) {
        state.activeOrder = {
          ...state.activeOrder,
          orderStatus: status
        };
      }
    },
    syncOrders: (state, action) => {
      state.orders = action.payload;
      saveStoredOrders(action.payload);
    },
    setDeliverySimulation: (state, action) => {
      state.delivery = {
        ...state.delivery,
        ...action.payload
      };
    }
  }
});

export const {
  hydrateOrders,
  addOrder,
  setActiveOrder,
  updateOrderStatus,
  syncOrders,
  setDeliverySimulation
} = orderSlice.actions;

export default orderSlice.reducer;
