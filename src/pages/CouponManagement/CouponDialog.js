import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Switch,
    TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import styles from "./CouponDialog.module.css"

const CouponDialog = (props) => {
    const [quantityEnabled, setQuantityEnabled] = useState(false)
    const [couponState, setCouponState] = useState({
        price: 0,
        description: "",
        expirationDate: null,
        quantity: 0,
        percentage: 0.00,
        id: null,
        couponCode:""
    })


    useEffect(() => {
        if (props.coupon) {

            setCouponState({
                price: props.coupon?.price,
                description: props.coupon?.description,
                expirationDate: props.coupon?.expirationDate,
                quantity: props.coupon?.quantity,
                id: props.coupon?.id,
                couponCode: props.coupon?.couponCode
            })
            if (props.coupon.quantity > 0) {
                setQuantityEnabled(true)
            }
        }
    }, [props?.coupon])

    function saveCoupon(e) {
        e.preventDefault();

        const isDescriptionValid = couponState.description.trim().length > 0;

        const isPriceValid = couponState.price > 0;

        if (isDescriptionValid && isPriceValid) {
            const couponObject = {
                id: couponState.id,
                description: couponState.description,
                price: couponState.price,
                expirationDate: couponState.expirationDate,
                quantity: quantityEnabled ? couponState.quantity : null,
                couponCode: couponState.couponCode
            }

            if (props.isEditMode) {
                props.editCoupon(couponObject)
            } else {
                props.addCoupon(couponObject);
            }
            clearCouponState()
        }
    }

    const clearCouponState = () => {
        setCouponState({
            price: 0,
            description: "",
            expirationDate: null,
            quantity: 0,
            couponCode: ""
        })
    }


    return (
        <Dialog open={props.isOpen} onClose={props.onClose}>
            <form onSubmit={saveCoupon}>
                <DialogTitle>{props.isEditMode ? " Edit coupon" : "Add new coupon"}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Coupon description"
                        fullWidth
                        multiline
                        rows={3}
                        value={couponState.description}
                        onChange={(e) => setCouponState((prevState) => ({ ...prevState, description: e.target.value }))}
                    />
                    <div>
                        <TextField
                            margin="dense"
                            label="Coupon price"
                            fullWidth
                            required
                            slotProps={{ input: { inputProps: { min: 0 } } }}
                            type="number"
                            value={couponState.price}
                            onChange={(e) => setCouponState((prevState) => ({ ...prevState, price: e.target.value, percentage: e.target.value * 100 }))}
                        />
                        {/* <TextField
                            margin="dense"
                            label="Price %"
                            fullWidth
                            required
                            slotProps={{ input: { inputProps: { min: 0 } } }}
                            type="number"
                            value={couponState.percentage}
                            onChange={(e) => setCouponState((prevState) => ({ ...prevState, percentage: e.target.value, price: prevState.price / 100 }))}
                        /> */}
                    </div>
                    <div>
                        <TextField
                            margin="dense"
                            label="Coupon code"
                            fullWidth
                            required
                            slotProps={{ input: { inputProps: { min: 0 } } }}
                            type="number"
                            value={couponState.couponCode}
                            onChange={(e) => setCouponState((prevState) => ({ ...prevState, couponCode: e.target.value }))}
                        />

                    </div>
                    <div className={styles.quantityContainer}>
                        <TextField
                            margin="dense"
                            label="Coupon quantity"
                            fullWidth
                            required
                            type="number"
                            slotProps={{ input: { inputProps: { min: 0 } } }}
                            value={couponState.quantity}
                            onChange={(e) => setCouponState((prevState) => ({ ...prevState, quantity: e.target.value }))}
                            disabled={quantityEnabled}
                        />

                        <FormControlLabel control={<Switch onChange={() => setQuantityEnabled((prevState) => !prevState)} value={quantityEnabled} />} label="Unlimited" />
                    </div>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker minDate={dayjs()} format='DD/MM/YYYY' value={couponState.expirationDate} onChange={(e) => setCouponState((prevState) => ({ ...prevState, expirationDate: e }))} />
                    </LocalizationProvider>

                </DialogContent>

                <DialogActions>
                    <Button onClick={props.onClose} color="secondary" >
                        Cancel
                    </Button>

                    <Button color="primary" variant="contained" type='submit'>
                        {props.isEditMode ? "Edit Coupon" : "Add Coupon"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default CouponDialog;