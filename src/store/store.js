import { configureStore } from '@reduxjs/toolkit'
import couponReducer from "./couponSlice";
import userReducer from "./userSlice";
import analyticReducer from "./analyticsSlice";

export default configureStore({
    reducer: {
        coupon: couponReducer,
        user: userReducer,
        analytics: analyticReducer
    },
})