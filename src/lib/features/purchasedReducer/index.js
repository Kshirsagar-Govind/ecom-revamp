import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { REACT_APP_HOST } from "../../constants/index";

export const getPurchasedProducts = createAsyncThunk("fetchPurchasedlist", async (id) => {
  const response = await fetch(`${REACT_APP_HOST}/product-purchased-history/${id}`);
  const data = await response.json();
  console.log(data);
  return data;
});

export const purchasedSlice = createSlice({
  name: "purchasedList",
  initialState: {
    purchasedList: [],
    isLoading: false,
    isWishlisted: false,
    isError: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getPurchasedProducts.fulfilled, (state, action) => {
      state.purchasedList = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getPurchasedProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPurchasedProducts.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { getProductAsync, extraReducers, postReducer } =
  purchasedSlice.actions;

export default purchasedSlice.reducer;
