import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviews: [],
  },
  reducers: {
    setReviews(state, action) {
      state.reviews = action.payload;
    },
    deleteReview(state, action) {
      state.reviews = state.reviews.filter((r) => r._id !== action.id);
    },
  },
});

const reviewReducer = reviewSlice.reducer;
const reviewActions = reviewSlice.actions;

export { reviewReducer, reviewActions };
