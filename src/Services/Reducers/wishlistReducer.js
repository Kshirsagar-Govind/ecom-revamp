import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { REACT_APP_HOST } from "../../lib/constants";

export const getWishlistProducts = createAsyncThunk(
  "fetchWishlist",
  async (id) => {
    const response = await fetch(`${REACT_APP_HOST}/get-user-wishlist/${id}`);
    const data = await response.json();
    return data;
  }
);


export const checkWishilistProduct = createAsyncThunk(
  "checkWishlist",
  async (id, product_id) => {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/get-user-wishlist/${id}`
    );
    const data = response.json();
    data.data.forEach((element) => {
      if (element.product_id == product_id) return true;
    });
  }
);

export const productSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    isLoading: false,
    isWishlisted: false,
    isError: false,
  },
  reducers: {
    addTowishlistProduct(state, action){
      const item = action.payload;
      let old = state.data;
      state.data = old.push(item)
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getWishlistProducts.fulfilled, (state, action) => {
      state.wishlist = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getWishlistProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getWishlistProducts.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },

});

// Action creators are generated for each case reducer function
export const { getProductAsync, extraReducers, postReducer } =
  productSlice.actions;

export default productSlice.reducer;
