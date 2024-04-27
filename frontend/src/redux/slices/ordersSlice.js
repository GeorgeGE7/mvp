import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    singleOrder: null,
    userLikeProducts: [],
    ordersCount: null,
    ordersCategory: [],
    loading: false,
    isOrderCreated: false,
    // Admin
    adminOrders: [],
  },
  reducers: {
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setSingleOrder(state, action) {
      state.singleOrder = action.payload;
    },
    setOrdersCount(state, action) {
      state.ordersCount = action.payload;
    },
    startLoading(state, action) {
      state.loading = true;
    },
    stopLoading(state, action) {
      state.loading = false;
    },
    startIsOrderCreated(state) {
      state.isOrderCreated = true;
      // state.loading = false;
    },
    stopIsOrderCreated(state) {
      state.isOrderCreated = false;
      state.loading = false;
    },
    // Admin
    setAdminOrders(state, action) {
      state.adminOrders = action.payload;
    },
  },
});

const orderReducer = orderSlice.reducer;
const orderActions = orderSlice.actions;

export { orderReducer, orderActions };
