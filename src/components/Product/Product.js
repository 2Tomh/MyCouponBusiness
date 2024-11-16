
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import styles from "./Product.module.css"
import { useSelector } from "react-redux"


const Product = (props) => {
    const [couponCode, setCouponCode] = useState("")
    const [couponMoreCode, setMoreCouponCode] = useState("")

    const [isCouponVisible, setIsCouponVisible] = useState(false)
    const [price, setPrice] = useState(props.item.price);
    const [addAnotheCoupon ,setAddAnotheCoupon]= useState(false)

    const coupons = useSelector(state => state.coupon);

    const applyCoupon = () => {
        let coupon = coupons.find((coupon) => coupon.couponCode == couponCode || coupon.couponMoreCode == couponCode )
        if (!coupon.price) return;

        let discount = props.item.price * (1 - coupon.price / 100);
        setPrice(discount)

    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                sx={{ height: "150px", backgroundSize: "contain", objectFit: "contain" }}
                image={props.item.src}
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    This impressive paella is a perfect party dish and a fun meal to cook
                    together with your guests. Add 1 cup of frozen peas along with the mussels,
                    if you like.
                </Typography>
                <Typography variant="subtitle1" >Price:{price}$</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <div className={styles.couponContainer}>
                    <Button variant="outlined" onClick={() => setIsCouponVisible(true)}>Add coupon</Button>
                    {isCouponVisible &&
                        <div className='coupon'>
                            <TextField label="Coupon" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                            <Button variant="contained" onClick={applyCoupon}>Apply</Button>
                            <Button variant="outlined" onClick={() => setIsCouponVisible(false)}>Close</Button>
                            <br/><br/>
                            <Button variant="outlined" onClick={() => setAddAnotheCoupon(true)}>add more Coupon</Button>
                        </div>
                    }
                </div>
            </CardActions>
                    <CardActions disableSpacing  >
                        <div className={styles.couponContainer}>
                            {addAnotheCoupon &&
                                <div className='coupon'>
                                    <TextField label="Coupon" value={couponMoreCode} onChange={(e) => setMoreCouponCode(e.target.value)} />
                                    <Button variant="contained" onClick={applyCoupon}>Apply</Button>
                                    <Button variant="outlined" onClick={() => setAddAnotheCoupon(false)}>Close</Button>
                                </div>
                            }
                        </div>
                    </CardActions>

        </Card>
    );
}

export default Product;