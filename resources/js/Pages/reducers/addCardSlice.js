import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from 'axios';

// Initial state
const initialState = {
    isLoading: false,
    addCard: [],
    setCoupon: [],
    total: 0,
    error: null, // Include error state to handle errors
};

// Fetch all data async thunk
export const getAllData = createAsyncThunk("addCard/getAllData", async () => {
    try {
        const response = await axios.get('/product-addCart');
        return response.data;
    } catch (error) {
        throw error; // Rethrow error to be caught by rejection handler
    }
});


// Post data async thunk with CSRF token
export const postData = createAsyncThunk("addCard/postData", async (data, {rejectWithValue}) => {
    try {
        const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
        const headers = {'X-CSRF-TOKEN': csrfToken};
        const response = await axios.post('/product-addCart', data, {headers});
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const postCouponData = createAsyncThunk("addCard/postCouponData", async (data, {rejectWithValue}) => {
    try {
        const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
        const headers = {'X-CSRF-TOKEN': csrfToken};
        const response = await axios.post('/addCart-coupon', data, {headers});
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue(error.message);
        }
    }
});


export const postCouponAffiliate = createAsyncThunk("addCard/postCouponAffiliate", async (data, {rejectWithValue}) => {
    try {
        const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
        const headers = {'X-CSRF-TOKEN': csrfToken};
        const response = await axios.post('/addCart-couponAffiliate', data, {headers});
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue(error.message);
        }
    }
});

export const removeCoupon = createAsyncThunk("addCard/removeCoupon", async (data, {rejectWithValue}) => {
    try {
        const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
        const headers = {'X-CSRF-TOKEN': csrfToken};
        const response = await axios.post('/addCart-couponRemove', data, {headers});
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue(error.message);
        }
    }
});


export const updateData = createAsyncThunk("addCard/updateData", async (data, {rejectWithValue}) => {
    try {
        const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
        const headers = {'X-CSRF-TOKEN': csrfToken};
        const response = await axios.post('/product_cart_update', data, {headers});
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue(error.message);
        }
    }
});


// Post data async thunk with CSRF token
export const postAllCheck = createAsyncThunk("addCard/postAllCheck", async (data, {rejectWithValue}) => {
    try {
        const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
        const headers = {'X-CSRF-TOKEN': csrfToken};
        const response = await axios.post('/product_postAllCheck', data, {headers});
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue(error.message);
        }
    }
});


export const deleteData = createAsyncThunk("addCard/deleteData", async (data, {rejectWithValue}) => {
    try {
        const csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
        const headers = {'X-CSRF-TOKEN': csrfToken};
        const response = await axios.post('/product_cart_delete', data, {headers});
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
        } else {
            return rejectWithValue(error.message);
        }
    }
});


// Slice
const addCardSlice = createSlice({
    name: "addCard",
    initialState,
    reducers: {
        getSingleData(state, {payload}) {
            const {id} = payload;
            state.metaData = state.addCard.filter((type) => type.id === id);
        },
    },
    extraReducers: (builder) => {
        builder
            // get all add to cart
            .addCase(getAllData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllData.fulfilled, (state, { payload }) => {
                const {product_cart, coupons} = payload
                state.isLoading = false;
                state.addCard = product_cart;
                state.setCoupon = coupons?coupons:"";
                state.total = product_cart?.length;
                state.error = null;
            })
            .addCase(getAllData.rejected, (state, { error }) => {
                state.isLoading = false;
                state.error = error.message;
            })
            // save data to cart
            .addCase(postData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(postData.fulfilled, (state, {payload}) => {
                const {product_cart, coupons} = payload
                state.isLoading = false;
                state.addCard = product_cart;
                state.setCoupon = coupons ? coupons : "";
                state.total = product_cart?.length;
                state.error = null;
            })
            .addCase(postData.rejected, (state, {payload}) => {
                state.isLoading = false;
                state.error = payload;
            })
            // update cart data
            .addCase(updateData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateData.fulfilled, (state, { payload }) => {
                const {product_cart, coupons} = payload
                state.isLoading = false;
                state.addCard = product_cart;
                state.setCoupon = coupons?coupons:"";
                // console.log("updateData load", payload);
                state.total = product_cart?.length;
                state.error = null;
            })
            .addCase(updateData.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            // post all checked cart
            .addCase(postAllCheck.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(postAllCheck.fulfilled, (state, { payload }) => {
                const {product_cart, coupons} = payload
                state.isLoading = false;
                state.addCard = product_cart;
                state.setCoupon = coupons?coupons:"";
                // console.log("updateData load", payload);
                state.total = product_cart?.length;
                state.error = null;
            })
            .addCase(postAllCheck.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            // delete data from cart
            .addCase(deleteData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteData.fulfilled, (state, { payload }) => {
                const {product_cart, coupons} = payload
                state.isLoading = false;
                state.addCard = product_cart;
                state.setCoupon = coupons?coupons:"";
                // console.log("deleteData load", payload);
                state.total = product_cart?.length;
                state.error = null;
            })
            .addCase(deleteData.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            // save coupon data
            .addCase(postCouponData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(postCouponData.fulfilled, (state, { payload }) => {
                const {product_cart, coupons} = payload
                state.isLoading = false;
                state.addCard = product_cart;
                state.setCoupon = coupons?coupons:"";
                // console.log("deleteData load", payload);
                state.total = product_cart?.length;
                state.error = null;
            })
            .addCase(postCouponData.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            // save affiliate coupon
            .addCase(postCouponAffiliate.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(postCouponAffiliate.fulfilled, (state, { payload }) => {
                const {product_cart, coupons} = payload
                state.isLoading = false;
                state.addCard = product_cart;
                state.setCoupon = coupons?coupons:"";
                // console.log("deleteData load", payload);
                state.total = product_cart?.length;
                state.error = null;
            })
            .addCase(postCouponAffiliate.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            })
            // remove coupon
            .addCase(removeCoupon.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeCoupon.fulfilled, (state, { payload }) => {
                const {product_cart, coupons} = payload
                state.isLoading = false;
                state.addCard = product_cart;
                state.setCoupon = coupons?coupons:"";
                state.total = product_cart?.length;
                state.error = null;
            })
            .addCase(removeCoupon.rejected, (state, { payload }) => {
                state.isLoading = false;
                state.error = payload;
            });
    }
});

// Export actions and reducer
export const {getSingleData} = addCardSlice.actions;
export default addCardSlice.reducer;
