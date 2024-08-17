import {route} from "ziggy-js";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    navLinks: [
        {
            name: "Dashboard",
            link: route('user.dashboard')
        },
        {
            name: "My Profile",
            link: route('user.profile')
        },
        {
            name: "Address Info",
            link: route('user.address_info')
        },
        {
            name: "My Orders",
            link: route('customer.orders')
        },
        {
            name: "Wishlist",
            link: route('wish.index')
        },
        {
            name: "Order Tracking",
            link: route("orders.tracking")
        },
        {
            name: "Affiliate Program",
            link: route("affiliate.index")
        },
        {
            name: "Change Password",
            link: route("change.password")
        }
    ]
}

// slice
const clientNavbarSlice = createSlice({
    name: "addCard",
    initialState,
    reducers: {
        getNavLinksData(state) {
            return state;
        },
    },
});

export const {getNavLinksData} = clientNavbarSlice.actions;
export default clientNavbarSlice.reducer;
