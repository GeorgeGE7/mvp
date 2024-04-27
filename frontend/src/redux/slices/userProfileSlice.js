import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    userProfile: null,
    loading: false,
    isProfileDeleted: false,
    usersCount: null,
    usersProfile: [],
  },
  reducers: {
    setUserProfile(state, action) {
      state.userProfile = action.payload;
    },
    setUserProfilePhoto(state, action) {
      state.userProfile.profilePhoto = action.payload;
    },
    updateUserProfile(state, action) {
      state.userProfile = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    },
    setIsProfileDeleted(state) {
      state.isProfileDeleted = true;
      state.loading = false;
    },
    stopIsProfileDeleted(state) {
      state.isProfileDeleted = false;
    },
    setUsersCount(state, action) {
      state.usersCount = action.payload;
    },
    setUsersProfile(state, action) {
      state.usersProfile = action.payload;
    },
  },
});

const userProfileReducer = userProfileSlice.reducer;
const userProfileActions = userProfileSlice.actions;

export { userProfileReducer, userProfileActions };
