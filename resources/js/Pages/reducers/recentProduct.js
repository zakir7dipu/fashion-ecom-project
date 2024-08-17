import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// Initial state
const initialState = {
    isLoading: false,
    products: [],
    total: 0,
    error: null,
};

// Fetch all data async thunk
export const getRecentProduct = createAsyncThunk("recentProduct/getRecentProduct", async () => {
    try {
        const response = await axios.get('/recent_product');
        return response.data;
    } catch (error) {
        throw error;
    }
});

// Slice
const recentProductSlice = createSlice({
    name: "recentProduct",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getRecentProduct.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getRecentProduct.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.products = payload;
                state.total = payload.length;
                state.error = null;
            })
            .addCase(getRecentProduct.rejected, (state, { error }) => {
                state.isLoading = false;
                state.error = error.message;
            });
    },
});

export default recentProductSlice.reducer;
