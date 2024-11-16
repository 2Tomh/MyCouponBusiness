import { createSlice } from "@reduxjs/toolkit";
import { cloneElement } from "react";


const couponSlice = createSlice({
    name: 'coupon',
    initialState: [{
        id: '1d33ae578cfc68',
        price: 154,
        description: "Casto shirt",
        expirationDate: null,
        quantity: 0,
        couponCode: "1234",
        used: false, 
        multiple:true
    },{
        id: '1d33ae578cfc6855',
        price: 4,
        description: "Casto shirt33",
        expirationDate: null,
        quantity: 0,
        couponCode: "12345",
        used: false,
        multiple:false
    }

],
    reducers: {
        addCoupon: (state, action) => {

            const uniqueId = Math.random().toString(16).slice(2);
            const couponCode = (Math.random() + 1).toString(36).substring(7);
            const newCoupon = { ...action.payload, id: uniqueId, couponCode: couponCode }

            return [...state, newCoupon];
        },
        removeCoupon: (state, action) => {
            const filterredCoupons = state.filter((coupon) => coupon.id !== action.payload);

            return filterredCoupons;
        },
        editCoupon: (state, action) => {

            let couponIndex = state.findIndex((coupon) => coupon.id == action.payload.id);
            const cloneState = [...state];
            cloneState[couponIndex] = action.payload;

            return cloneState;
        },
        usedCoupon:(state, action) =>{
            const usedCouponIndex = state.findIndex((coupon) => coupon.id == action.payload);
            const cloneState = [...state];
            cloneState[usedCouponIndex] = action.payload

            return cloneState;
            
        }
    }
})


export const { addCoupon, removeCoupon, editCoupon , usedCoupon } = couponSlice.actions

export default couponSlice.reducer;