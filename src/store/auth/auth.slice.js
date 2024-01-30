import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../api/const";

export const fetchAuth = createAsyncThunk(
  "fetch/fetchAuth",
  async (_, { getState }) => {
    const token = getState().token.token;

    if (!token) return;

    const response = await fetch(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Ошибка авторизации");
    }

    return await response.json();
  },
);

const initialState = {
  data: {},
  loading: false,
  status: "",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLogout: (state) => {
      state.data = {};
      state.status = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.loading = true;
        state.status = "";
        state.error = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.status = "login";
        state.error = null;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.loading = false;
        state.status = "error";
        state.error = action.error;
      });
  },
});

export default authSlice.reducer;
export const { authLogout } = authSlice.actions;
