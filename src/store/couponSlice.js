import { createSlice } from "@reduxjs/toolkit";

const couponSlice = createSlice({
    name: 'coupon',
    initialState: [{
        id: '1d33ae578cfc68',
        price: 10,
        description: "Casto shirt",
        expirationDate: null,
        quantity: null,
        couponCode: "1234",
        isMulti: true,
        createdBy: "Admin",
        createdDate: new Date(),
    }, {
        id: '1d33ae578cfc6855',
        price: 5,
        description: "Casto shirt33",
        expirationDate: new Date("11/17/2024"),
        quantity: null,
        couponCode: "12345",
        isMulti: false,
        createdBy: "Admin",
        createdDate: new Date("11/15/2024")
    }


    ],
    reducers: {
        addCoupon: (state, action) => {

            const uniqueId = Math.random().toString(16).slice(2);
            const couponCode = (Math.random() + 1).toString(36).substring(7);
            const newCoupon = { ...action.payload, id: uniqueId, couponCode: couponCode, createdDate: new Date() }


            return [...state, newCoupon];
        },
        removeCoupon: (state, action) => {
            const filterredCoupons = state.filter((coupon) => coupon.id !== action.payload);

            return filterredCoupons;
        },
        editCoupon: (state, action) => {

            let couponIndex = state.findIndex((coupon) => coupon.id == action.payload.id);
            const cloneState = [...state];

            cloneState[couponIndex] = { ...cloneState[couponIndex], ...action.payload};

            return cloneState;
        },
        decrementQuantity: (state, action) => {
            const coupon = state.find((c) => c.id == action.payload.id);

            coupon.quantity--;

            return state;
        },
        incrementQuantity: (state, action) => {
            const coupon = state.find((c) => c.id == action.payload.id);

            coupon.quantity++;

            return state;
        }
    }
})


export const { addCoupon, removeCoupon, editCoupon, decrementQuantity, incrementQuantity } = couponSlice.actions

export default couponSlice.reducer;