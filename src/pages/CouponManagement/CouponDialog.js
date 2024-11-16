import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
    Checkbox,
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
import { useSelector } from 'react-redux';

const CouponDialog = (props) => {
    const [isUnlimited, setIsUnlimited] = useState(false)
    const [couponState, setCouponState] = useState({
        price: 0,
        description: "",
        expirationDate: null,
        quantity: 0,
        percentage: 0.00,
        id: null,
        isMulti: true
    })


    const user = useSelector(state => state.user);

    useEffect(() => {
        if (props.coupon) {
            setCouponState({
                price: props.coupon?.price,
                description: props.coupon?.description,
                expirationDate: props.coupon?.expirationDate,
                quantity: props.coupon?.quantity,
                id: props.coupon?.id,
                isMulti: props.coupon?.isMulti
            })
            
            if (props.coupon.quantity > 0) {
                setIsUnlimited(false)
            }
            else if(!props.coupon.quantity){
                setIsUnlimited(true)
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
                quantity: isUnlimited ? null : couponState.quantity,
                isMulti: couponState.isMulti,
                createdBy: user.username
            }

            if (props.isEditMode) {
                props.editCoupon(couponObject)
            } else {
                props.addCoupon(couponObject);
            }
            clearCouponState()
            props.onClose()
        }
    }

    const clearCouponState = () => {
        setCouponState({
            price: 0,
            description: "",
            expirationDate: null,
            quantity: 0,
            isMulti: false
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
                            disabled={isUnlimited}
                        />

                        <FormControlLabel control={<Switch onChange={() => setIsUnlimited((prevState) => !prevState)} checked={isUnlimited} />} label="Unlimited" />
                    </div>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker minDate={dayjs()} format='DD/MM/YYYY' value={couponState.expirationDate} onChange={(e) => setCouponState((prevState) => ({ ...prevState, expirationDate: e }))} />
                    </LocalizationProvider>

                    <FormControlLabel control={
                        <Checkbox
                            onChange={() => setCouponState((prevState) => ({ ...prevState, isMulti: !prevState.isMulti }))}
                            checked={couponState.isMulti}
                        />} label="Can be used with other coupons ?" />
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