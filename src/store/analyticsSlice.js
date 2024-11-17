import { createSlice } from "@reduxjs/toolkit";

const analyticsSlice = createSlice({
    name: "analytic",
    initialState: {
        usedCoupons: [
            {
                username:'tom',
                couponId: '1d33ae578cfc6855',
                date: new Date()
            },
            {
                username:'TAL',
                couponId: '1d33ae578cfc6855',
                date: new Date()
            },
            {
                username:'tomWWWW',
                couponId: '1d33ae578cfc6855',
                date: new Date()
            },
        ]
    },
    reducers: {
        saveCoupon: (state, action) => {
            const cloneCoupons = [...state.usedCoupons];

            cloneCoupons.push(action.payload);

            return { ...state, usedCoupons: cloneCoupons }
        },
        removeUsedCoupon: (state, action) => {
            let cloneCoupons = [...state.usedCoupons];

            cloneCoupons = cloneCoupons.filter((c) => c.couponId !== action.payload.id);

            return { ...state, usedCoupons: cloneCoupons }
        }
    }
})

export const { saveCoupon, removeUsedCoupon } = analyticsSlice.actions;

export default analyticsSlice.reducer;