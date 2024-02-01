import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getSingleProduct = createAsyncThunk(
  "fetchSingleProduct",
  async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_HOST}/get-product-data/${id}`
    );
    return response.json();
  }
);



export const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState: {
    data: {},
    isLoading: false,
    isError: false,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getSingleProduct.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.isLoading = false;
    });
    builder.addCase(getSingleProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getSingleProduct.rejected, (state, action) => {
      state.isError = true;
    });
  },

});

// Action creators are generated for each case reducer function
export const { getProductAsync, extraReducers, postReducer } =
  singleProductSlice.actions;

export default singleProductSlice.reducer;
