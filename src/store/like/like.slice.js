import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../api/const";

export const fetchLikedPhoto = createAsyncThunk(
  "fetch/fetchLikedPhoto",
  async (id, { getState, rejectWithValue }) => {
    const token = getState().token.token;

    try {
      const response = await fetch(`${API_URL}/photos/${id}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return rejectWithValue({
          status: response.status,
          error: "Не удалось поставить like фотографии.",
        });
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  },
);

export const fetchDisLikedPhoto = createAsyncThunk(
  "fetch/fetchDisLikedPhoto",
  async (id, { getState, rejectWithValue }) => {
    const token = getState().token.token;

    try {
      const response = await fetch(`${API_URL}/photos/${id}/like`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return rejectWithValue({
          status: response.status,
          error: "Не удалось поставить dislike фотографии.",
        });
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  },
);

const initialState = {
  likedByUser: NaN,
  likeCount2: null,
  likeCount: 0,
  loading: false,
  error: null,
};

const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    setLikePhoto: (state, action) => {
      state.likeCount = action.payload;
    },
    likedPhoto: (state) => {
      state.likeCount += 1;
    },
    dislikedPhoto: (state) => {
      state.likeCount -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikedPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLikedPhoto.fulfilled, (state, action) => {
        state.likeCount = action.payload.photo.likes;
        state.likedByUser = action.payload.photo.liked_by_user;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLikedPhoto.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error;
      })
      .addCase(fetchDisLikedPhoto.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDisLikedPhoto.fulfilled, (state, action) => {
        state.likeCount = action.payload.photo.likes;
        state.likedByUser = action.payload.photo.liked_by_user;
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDisLikedPhoto.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error;
      });
  },
});

export default likeSlice.reducer;
export const { likedPhoto, dislikedPhoto, setLikePhoto } = likeSlice.actions;
