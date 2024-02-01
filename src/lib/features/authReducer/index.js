import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { REACT_APP_HOST } from "../../constants";

export const userLogin = createAsyncThunk("userLogin", async (payload) => {
  const response = await fetch(`${REACT_APP_HOST}/user-login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  console.log(data);
  if (data.code == 404) throw new Error("Login Failed");
  return data;
});

const initialState = {
  data: { user_id: null },
  isAuth: false,
  isLoading: false,
  isError: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logoutUser(state) {
      state.data = { user_id: null };
    },
  },

  extraReducers(builder) {
    builder.addCase(userLogin.fulfilled, (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload.Auth));
      state.data = action.payload.Auth;
      state.isAuth = true;
      state.isLoading = false;
      state.isError = false;
      state.error = null;
    });
    builder.addCase(userLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error = "Failed to login!";
    });
  },
});

export const { reducers, extraReducers, logoutUser } = authSlice.actions;
export default authSlice.reducer;
