import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/Slices/authSlice";
import savedPostsReducer from "../store/Slices/savedPosts";

const store = configureStore({
  reducer: {
    auth: authReducer,
    savedPosts: savedPostsReducer
  },
});

export default store;
