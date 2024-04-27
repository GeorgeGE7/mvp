// frontend/src/redux/slices/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userCartSlice = createSlice({
  name: "cart",
  initialState: {
    userCart: localStorage.getItem("userCart")
      ? JSON.parse(localStorage.getItem("userCart"))
      : [],
  },
  reducers: {
    handleCartAddOrRemove: (state, action) => {
      const item = action.payload;
      const existingItem = state.userCart.find((i) => i._id === item._id);

      if (existingItem) {
        const index = state.userCart.findIndex((i) => i.id === item._id);
        if (index !== -1) {
          state.userCart.splice(index, 1);
        }
      } else {
        state.userCart.push(action.payload);
      }

      // Save userCart into local storage
      try {
        localStorage.setItem("userCart", JSON.stringify(state.userCart));
      } catch (error) {
        console.log(`error in handleCartAddOrRemove: ${error}`);
      }
    },
    clearUserCart: (state) => {
      state.userCart = [];

      // Remove userCart from local storage
      localStorage.removeItem("userCart");
    },
    removeItemFromCart: (state, action) => {
      const item = action.payload;

      const index = state.userCart.findIndex((i) => i._id === item.postId);
      if (index !== -1) {
        state.userCart.splice(index, 1);
      }

      // Save userCart into local storage
      try {
        localStorage.setItem("userCart", JSON.stringify(state.userCart));
      } catch (error) {
        console.log(`error in removeItemFromCart: ${error}`);
      }
    },
  },
});

const userCartReducer = userCartSlice.reducer;
const userCartActions = userCartSlice.actions;

export { userCartReducer, userCartActions };
