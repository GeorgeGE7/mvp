import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : null,
    signupMessage: null,
    isEmailVerified: false,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.signupMessage = null;
    },
    logout(state, action) {
      state.user = null;
      state.signupMessage = null;
    },
    signup(state, action) {
      state.signupMessage = action.payload;
    },
    setIsEmailVerified(state) {
      state.isEmailVerified = true;
      state.signupMessage = null;
    },
    setUserProfilePhoto(state, action) {
      state.user.profilePhoto = action.payload;
    },
    setUserProfileUsername(state, action) {
      state.user.username = action.payload;
    },
    setUserProfileBio(state, action) {
      state.user.bio = action.payload;
    },
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authReducer, authActions };
