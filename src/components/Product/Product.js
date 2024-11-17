
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Alert, Button, Chip, Snackbar, TextField } from '@mui/material';
import { useState } from 'react';
import styles from "./Product.module.css"
import { useDispatch, useSelector } from "react-redux"
import DeleteIcon from '@mui/icons-material/Delete';
import { removeUsedCoupon, saveCoupon } from '../../store/analyticsSlice';
import { decrementQuantity, incrementQuantity } from '../../store/couponSlice';


const Product = (props) => {
    const [couponCode, setCouponCode] = useState("")
    const [appliedCoupons, setAppliedCoupons] = useState([])
    const [isCouponVisible, setIsCouponVisible] = useState(false)
    const [price, setPrice] = useState(props.item?.price ?? 0);
    const [snackbar, setSnackbar] = useState({ visible: false, message: "" })

    const coupons = useSelector(state => state.coupon);
    const user = useSelector(state => state.user)
    const analytics = useSelector(state => state.analytics)

    const dispatch = useDispatch();

    const applyCoupon = () => {
        let coupon = coupons.find((coupon) => coupon.couponCode == couponCode)

        const today = new Date();


        if (!coupon?.isMulti && appliedCoupons.length > 0 || appliedCoupons.some((c) => !c.isMulti)) {
            return setSnackbar({ visible: true, message: "Coupon cannot be used with other coupons" })
        }

        if (!coupon?.price || coupon?.expirationDate && coupon?.expirationDate < today) {
            return setSnackbar({ visible: true, message: "Coupon is expired" })
        };

        let isApplied = analytics.usedCoupons.find((c) => c.couponId == coupon.id);

        if (isApplied) {
            return setSnackbar({ visible: true, message: "Coupon is already applied" })
        }

        let discount = price * (1 - coupon.price / 100);

        setPrice(Math.trunc(discount))

        setAppliedCoupons((prevState) => {
            const cloneState = [...prevState]
            cloneState.push(coupon)
            return cloneState
        })

        setCouponCode("");
        setIsCouponVisible(false);

        dispatch(saveCoupon({ username: user.username, couponId: coupon.id, date: new Date() }))
        if(coupon.quantity){

            dispatch(decrementQuantity(coupon));
        }
    }

    const handleDeleteCoupon = (index) => {
        const coupon = appliedCoupons[index];

        const filterredCoupons = appliedCoupons.filter((c) => c.couponCode !== coupon.couponCode);

        let discount = props.item.price;

        for (let i = 0; i < filterredCoupons.length; i++) {
            discount = discount * (1 - filterredCoupons[i].price / 100);
        }

        setPrice(discount);

        setAppliedCoupons(filterredCoupons)

        dispatch(removeUsedCoupon({ id: coupon.id }));
        if(coupon.quantity){
            dispatch(incrementQuantity(coupon));
        }
    }

    return (
        <>
            <Card sx={{ maxWidth: 345, padding: '20px' }}>
                <CardMedia
                    component="img"
                    sx={{ height: "150px", backgroundSize: "contain", objectFit: "contain" }}
                    image={props.item.src}
                />
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {props.item.description}
                    </Typography>
                    <Typography variant="subtitle1" >Price:{price}$</Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <div className={styles.couponContainer}>
                        {appliedCoupons.length > 0 && appliedCoupons.map((c, index) =>
                            <Chip
                                sx={{ width: '60%' }}
                                label={c.couponCode}
                                onDelete={() => handleDeleteCoupon(index)}
                                deleteIcon={<DeleteIcon />}
                                variant="filled"
                                color="success"
                            />
                        )}
                        <Button variant="outlined" onClick={() => setIsCouponVisible(true)}>Add coupon</Button>
                        {isCouponVisible &&
                            <div className='coupon'>
                                <TextField label="Coupon" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                                <Button variant="contained" onClick={applyCoupon}>Apply</Button>
                                <Button variant="outlined" onClick={() => setIsCouponVisible(false)}>Close</Button>
                            </div>
                        }
                    </div>

                </CardActions>



            </Card>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: "center" }}
                open={snackbar.visible}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ visible: false, message: "" })}
            >
                <Alert

                    severity="error"
                    variant="filled"
                    sx={{ width: "200px" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
}

export default Product;