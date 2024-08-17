import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// Initial state
const initialState = {
    isLoading: false,
    allCoupon: [],
    affiliateUser: [],
    total: 0,
    error: null,
};

export const getAllCoupon = createAsyncThunk("addCoupon/getAllCoupon", async () => {
    try {
        const response = await axios.get('/product-allCoupon');
        return response.data;
    } catch (error) {
        throw error;
    }
});


export const getAllUsers = createAsyncThunk("addCoupon/getAllUsers", async () => {
    try {
        const response = await axios.get('/affiliate-user');
        return response.data;
    } catch (error) {
        throw error;
    }
});


// Slice
const addCouponSlice = createSlice({
    name: "addCoupon",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getAllCoupon.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllCoupon.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.allCoupon = payload;
                state.total = payload.length;
                state.error = null;
            })
            .addCase(getAllCoupon.rejected, (state, { error }) => {
                state.isLoading = false;
                state.error = error.message;
            })

            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.affiliateUser = payload;
                state.error = null;
            })
            .addCase(getAllUsers.rejected, (state, { error }) => {
                state.isLoading = false;
                state.error = error.message;
            })

    },
});

export default addCouponSlice.reducer;
