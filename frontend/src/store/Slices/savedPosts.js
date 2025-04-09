import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSavedPosts } from "../../api/postsApi";

export const fetchSavedPosts = createAsyncThunk(
  "savedPosts/fetchSavedPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSavedPosts();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch saved posts");
    }
  }
);

const savedPostsSlice = createSlice({
  name: "savedPosts",
  initialState: {
    savedPosts: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.savedPosts = action.payload;
      })
      .addCase(fetchSavedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default savedPostsSlice.reducer;
