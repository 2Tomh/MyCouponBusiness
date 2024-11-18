import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {Box, Button, List, ListItem, IconButton, ListItemText, Typography,} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import CouponDialog from './CouponDialog';
import { addCoupon, removeCoupon, editCoupon } from "../../store/couponSlice";
import styles from "./CouponDialog.module.css"


function CouponManagement() {
  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [coupon, setCoupon] = useState()

  const coupons = useSelector((state) => state.coupon)

  const dispatch = useDispatch();

  const addNewCoupon = (newCoupon) => {
    dispatch(addCoupon(newCoupon))
    setIsDialogVisible(false)
  }

  const deleteCoupon = (couponId) => {
    dispatch(removeCoupon(couponId))
  }

  const onSaveCouponEdit = (coupon) => {
    dispatch(editCoupon(coupon))

  }

  const modifyCoupon = (couponId) => {
    const modifiedCoupon = coupons.find((coupon) => coupon.id == couponId);

    setCoupon(modifiedCoupon)

    setIsDialogVisible(true);
  }

  const closeDialog = () => {
    setIsDialogVisible(false);
    setCoupon(null)

  }

  const openDialog = () => {
    setCoupon(null);
    setIsDialogVisible(true)
  }


  return (
    <Box p={3}  className={styles.addCouponBox} >
      <Typography style={{ marginRight:"auto" ,   marginLeft: "auto"}} variant="h4" gutterBottom>
        Coupon Management
      </Typography>
      <Button style={{ marginRight:"auto" ,   marginLeft: "auto", width: "20%"}} variant="contained" color="primary" onClick={openDialog}>
        Add New Coupon
      </Button>

      <List >
        {coupons.map((coupon, index) => (
          <ListItem key={index} divider  >

            <ListItemText
              primary={coupon.description}
              secondary={
                <>
                  <Typography variant="body2">{coupon.description}</Typography>

                  {coupon?.expirationDate &&
                    <Typography variant="caption">
                      Expires on: {coupon?.expirationDate.toDateString()} |
                    </Typography>
                  }

                  <Typography variant="caption">Quantity: {coupon.quantity ?? 'Unlimited'} |  </Typography>

                  <Typography variant="caption">Price: {coupon.price}  | </Typography>

                  <Typography variant="caption">Code: {coupon.couponCode}  </Typography>
                </>
              }
            />
            <button color="secondary" onClick={() => modifyCoupon(coupon.id)} >
              <IconButton color="primary">
                <Edit />
              </IconButton>
            </button>
            <button color="secondary" onClick={() => deleteCoupon(coupon.id)} >
              <IconButton color="secondary"  >
                <Delete />
              </IconButton>
            </button>
          </ListItem>
        ))}
      </List>
      {isDialogVisible && <CouponDialog onClose={closeDialog} isOpen={isDialogVisible} editCoupon={onSaveCouponEdit} addCoupon={addNewCoupon} coupon={coupon} isEditMode={coupon ? true : false} />}

    </Box>

  );
}

export default CouponManagement;
