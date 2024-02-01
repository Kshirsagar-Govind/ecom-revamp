import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// First, create the thunk
export const getAllProducts = createAsyncThunk("fetchAllProducts", async () => {
  const response = await fetch(
    `${process.env.REACT_APP_HOST}/get-product-data`
  );
  return response.json();
});

export const getWishlistProducts = createAsyncThunk(
  "fetchWishlist",
  async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/get-user-wishlist/${id}`
    );
    return response.json();
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    wishlist: [],
    isLoading: false,
    isError: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isError = true;
    });
  },

  wishlistReducers: (builder) => {
    builder.addCase(getWishlistProducts.fulfilled, (state, action) => {
      state.wishlist = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getWishlistProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getWishlistProducts.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { getProductAsync, extraReducers, wishlistReducers } =
  productSlice.actions;

export default productSlice.reducer;
