import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'


import {
  Box,
  Button,
  List,
  ListItem,
  IconButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import CouponDialog from './CouponDialog';
import { addCoupon, removeCoupon , editCoupon } from "../../store/couponSlice";

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


  return (
    <Box p={3} style={{ width: "80%" }}>
      <Typography variant="h4" gutterBottom>
        Coupon Management
      </Typography>
      <Button variant="contained" color="primary" onClick={() => setIsDialogVisible(true)}>
        Add New Coupon
      </Button>

      <List>
        {coupons.map((coupon, index) => (
          <ListItem key={index} divider  >

            <ListItemText
              primary={coupon.description}
              secondary={
                <>
                  <Typography variant="body2">{coupon.description}</Typography>

                  {coupon.expirationDate && <Typography variant="caption">Expires on: {coupon.expirationDate?.toDate().toDateString()}</Typography>}

                  <Typography variant="caption"> {coupon.quantity}  </Typography>

                  <Typography variant="caption"> {coupon.price}  </Typography>

                  <Typography variant="caption"> {coupon.couponCode}  </Typography>
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
      <CouponDialog onClose={closeDialog} isOpen={isDialogVisible} editCoupon={onSaveCouponEdit} addCoupon={addNewCoupon} coupon={coupon} isEditMode={coupon ? true : false} />

    </Box>

  );
}

export default CouponManagement;
