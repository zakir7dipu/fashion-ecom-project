import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
    isLoading: true,
    company: [],
    categories: [],
    sliders: [],
    total: 0,
    error: null,
};

// Fetch company data async thunk
export const getCompanyData = createAsyncThunk("commonData/getCompanyData", async () => {
    try {
        const response = await axios.get('/company_slice');
        return response.data;
    } catch (error) {
        throw error;
    }
});

// Fetch categories data async thunk
export const getCategoriesData = createAsyncThunk("commonData/getCategoriesData", async () => {
    try {
        const response = await axios.get('/categories_slice');
        return response.data;
    } catch (error) {
        throw error;
    }
});

// Fetch categories data async thunk
export const getSliderData = createAsyncThunk("commonData/getSliderData", async () => {
    try {
        const response = await axios.get('/slide_slice');
        return response.data;
    } catch (error) {
        throw error;
    }
});

// Slice
const CommonDataGetSlice = createSlice({
    name: "commonData",
    initialState,
    reducers: {
        getSingleData(state, { payload }) {
            const { id } = payload;
            state.metaData = state.categories.filter((type) => type.id === id);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCompanyData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCompanyData.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.company = payload;
                // console.log("company", payload);
                state.error = null;
            })
            .addCase(getCompanyData.rejected, (state, { error }) => {
                state.isLoading = false;
                state.error = error.message;
            })
            .addCase(getCategoriesData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getCategoriesData.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.categories = payload;
                // console.log("categories", payload);
                state.total = payload.length;
                state.error = null;
            })
            .addCase(getCategoriesData.rejected, (state, { error }) => {
                state.isLoading = false;
                state.error = error.message;
            })
            .addCase(getSliderData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getSliderData.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.sliders = payload;
                // console.log("categories", payload);
                state.total = payload.length;
                state.error = null;
            })
            .addCase(getSliderData.rejected, (state, { error }) => {
                state.isLoading = false;
                state.error = error.message;
            });
    },
});

// Export actions and reducer
export const { getSingleData } = CommonDataGetSlice.actions;
export default CommonDataGetSlice.reducer;
