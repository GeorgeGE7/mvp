import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    singlePost: null,
    userLikeProducts: [],
    postsCount: null,
    postsCategory: [],
    loading: false,
    isPostCreated: false,
    searchBar: true,
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setSinglePost(state, action) {
      state.singlePost = action.payload;
    },
    setPostsCount(state, action) {
      state.postsCount = action.payload;
    },
    setPostsCategory(state, action) {
      state.postsCategory = action.payload;
    },
    setSinglePostLike(state, action) {
      state.singlePost.likes = action.payload.likes;
    },
    setUserLikedProducts(state, action) {
      state.userLikeProducts = action.payload;
    },
    startLoading(state, action) {
      state.loading = true;
    },
    stopLoading(state, action) {
      state.loading = false;
    },
    startIsPostCreated(state) {
      state.isPostCreated = true;
      state.loading = false;
    },
    stopIsPostCreated(state) {
      state.isPostCreated = false;
    },
    addPostReview(state, action) {
      state.singlePost.comments.push(action.payload);
    },
    updatePosteReview(state, action) {
      state.singlePost.comments = state.singlePost.comments.map((comment) =>
        comment._id === action.payload._id ? action.payload : comment
      );
    },
    deletePosteReview(state, action) {
      const commentToBeDeleted = state.singlePost.comments.find(
        (comment) => comment._id === action.payload
      );
      const CommentToBeDeletedIndex =
        state.singlePost.comments.indexOf(commentToBeDeleted);

      state.singlePost.comments.splice(CommentToBeDeletedIndex, 1);
    },
    deletePost(state, action) {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload
      );
    },
    setSearchBar(state) {
      state.searchBar = true;
    },
    hideSearchBar(state) {
      state.searchBar = false;
    },
  },
});

const postReducer = postSlice.reducer;
const postActions = postSlice.actions;

export { postReducer, postActions };
