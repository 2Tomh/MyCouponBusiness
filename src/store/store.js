import { configureStore } from '@reduxjs/toolkit'
import couponReducer from "./couponSlice";
import userReducer from "./userSlice";

export default configureStore({
    reducer: {
        coupon: couponReducer,
        user: userReducer
    },
})