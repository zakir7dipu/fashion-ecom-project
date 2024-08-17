
import { configureStore } from '@reduxjs/toolkit';
import addCardSlice from "@/Pages/reducers/addCardSlice";
import CommonDataGetSlice from "@/Pages/reducers/CommonDataGetSlice";
// import recentProductSlice from "@/Pages/reducers/recentProduct";
import addCouponSlice from "@/Pages/reducers/addCouponSlice";
import clientNavbar from "@/Pages/reducers/clientNavbar.js";


const store = configureStore({
    reducer: {
        addCard: addCardSlice,
        commonData: CommonDataGetSlice,
        // recentProduct: recentProductSlice,
        addCoupon: addCouponSlice,
        clientNav: clientNavbar
    }
})
export default store;

