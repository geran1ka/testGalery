import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ACCESS_KEY, API_URL } from "../../api/const";

export const fetchPhotos = createAsyncThunk(
  "fetch/fetchPhotos",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().token.token;
      let page = getState().photos.page;
      const response = await fetch(
        `${API_URL}/photos?per_page=30&${page && `page=${page}`}`,
        token
          ? {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : {
              headers: {
                Authorization: `Client-ID ${ACCESS_KEY}`,
              },
            },
      );

      if (!response.ok) {
        return rejectWithValue({
          status: response.status,
          error: "Не удалось загрузить фотографии.",
        });
      }
      page++;

      const photos = await response.json();
      return { photos, page };
    } catch (error) {
      return error;
    }
  },
);

export const fetchSearch = createAsyncThunk(
  "fetch/fetchSearch",
  async (search, { getState, rejectWithValue }) => {
    try {
      const token = getState().token.token;
      let page = getState().photos.pageSearch;
      // if (!token) return;
      const response = await fetch(
        `${API_URL}/search/photos?per_page=30&page=${page}&query=${search}`,
        token
          ? {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          : {
              method: "GET",
              headers: {
                Authorization: `Client-ID ${ACCESS_KEY}`,
              },
            },
      );

      if (!response.ok) {
        return rejectWithValue({
          status: response.status,
          error: "Не удалось загрузить фотографии.",
        });
      }
      page++;
      const photos = await response.json();
      return { photos, page };
    } catch (error) {
      return error;
    }
  },
);

export const fetchFavoritePhotosList = createAsyncThunk(
  "fetch/fetchFavoritePhotosList",
  async (username, { getState, rejectWithValue }) => {
    try {
      const token = getState().token.token;
      const response = await fetch(
        `${API_URL}/users/${username}/likes?client_id=${ACCESS_KEY}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        return rejectWithValue({
          status: response.status,
          error: "Не удалось загрузить фотографии.",
        });
      }

      const favoritePhotosList = response.json();

      return favoritePhotosList;
    } catch (error) {
      return error;
    }
  },
);

const initialState = {
  photos: [],
  loadingPhoto: false,
  loadingSearch: false,
  loadingFavorite: false,
  error: null,
  page: 1,
  pageSearch: 1,
  like: "",
  status: "",
  search: "",
  params: "",
};

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.photos = [];
      state.loading = false;
      state.error = null;
      state.page = 1;
      state.pageSearch = 1;
      state.params = action.payload;
      state.search = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.loadingPhoto = true;
        state.error = null;
        state.status = "";
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.photos = [...state.photos, ...action.payload.photos];
        state.loadingPhoto = false;
        state.error = null;
        state.page = action.payload.page;
        state.status = "";
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.loadingPhoto = false;
        state.error = action.payload.error;
        state.status = action.payload.status;
      })
      .addCase(fetchSearch.pending, (state) => {
        state.loadingSearch = true;
        state.error = null;
        state.status = "";
      })
      .addCase(fetchSearch.fulfilled, (state, action) => {
        if (state.search === action.meta.arg) {
          state.photos = [...state.photos, ...action.payload.photos.results];
        } else {
          state.photos = action.payload.photos.results;
          state.search = action.meta.arg;
        }
        state.loadingSearch = false;
        state.error = null;
        state.pageSearch = action.payload.page;
        state.status = "";
      })
      .addCase(fetchSearch.rejected, (state, action) => {
        state.loadingSearch = false;
        state.error = action.payload.error;
        state.status = action.payload.status;
      })
      .addCase(fetchFavoritePhotosList.pending, (state) => {
        state.loadingFavorite = true;
        state.error = null;
      })
      .addCase(fetchFavoritePhotosList.fulfilled, (state, action) => {
        state.photos = action.payload;
        state.loadingFavorite = false;
        state.error = null;
      })
      .addCase(fetchFavoritePhotosList.rejected, (state, action) => {
        state.loadingFavorite = false;
        state.error = action.error;
      });
  },
});
export const { changePage } = photosSlice.actions;
export default photosSlice.reducer;
