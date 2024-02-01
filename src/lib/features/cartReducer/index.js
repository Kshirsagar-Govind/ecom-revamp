import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { REACT_APP_HOST } from "../../constants/index";

export const getCartProducts = createAsyncThunk("fetchCartlist", async (id) => {
  const response = await fetch(`${REACT_APP_HOST}/get-user-cart/${id}`);
  const data = await response.json();
  return data;
});

export const cartSlice = createSlice({
  name: "cartlist",
  initialState: {
    cartlist: [],
    isLoading: false,
    isWishlisted: false,
    isError: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getCartProducts.fulfilled, (state, action) => {
      state.cartlist = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getCartProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCartProducts.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { getProductAsync, extraReducers, postReducer } =
  cartSlice.actions;

export default cartSlice.reducer;
