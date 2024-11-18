import { useSelector } from "react-redux";
import MaterialTable from 'material-table';
import { Box, Typography } from "@mui/material";
import styles from "./Report.module.css"
import bubbles from "../../images/bubbles.svg";
import products from "../../utils/products";
import Search from '@material-ui/icons/Search'
import SaveAlt from '@material-ui/icons/SaveAlt'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Clear from '@material-ui/icons/Clear';
import Check from '@material-ui/icons/Check'
import FilterList from '@material-ui/icons/FilterList'
import Remove from '@material-ui/icons/Remove'

function Report() {
  const user = useSelector((state) => state.user)
  const coupon = useSelector((state => state.coupon))
  const analytics = useSelector((state => state.analytics))


  const tableIcons = {
    Check: Check,
    ResetSearch: Clear,
    DetailPanel: ChevronRight,
    Export: SaveAlt,
    Filter: FilterList,
    FirstPage: FirstPage,
    LastPage: LastPage,
    NextPage: ChevronRight,
    PreviousPage: ChevronLeft,
    Search: Search,
    ThirdStateCheck: Remove,
  }

  const columns = [
    { title: 'Username', field: 'username' },
    { title: 'Price', field: 'price' },
    { title: 'Used date', field: 'date' },
    { title: 'Description', field: 'description' },
    { title: 'Code', field: 'code' }

  ]
  const findCouponById = (id) => {
    return coupon.find((c) => c.id == id);
  }

  
/*Calculates the total number of product items across all products. */
  const calculateProductsAmount = () => {
    return products.reduce((acc, product) => acc + product.items.length, 0)
  }

  const createTableDataSource = () => {
    return analytics.usedCoupons.map((row) => {
      const couponData = findCouponById(row.couponId);
      return {
        username: row.username,
        price: couponData.price,
        date: row.date?.toDateString(),
        description: couponData.description,
        code: couponData.couponCode,
      }
    })
  }

  return (

    <div className={styles.container}>
      <h2 className={styles.reportHeadLine}>דוחות ומעקב אחר האתר</h2>
      <div className={styles.boxContainer}>

        <Box className={`${styles.redBox}  ${styles.box}`}>
          <img src={bubbles} />
          <Typography variant="h4">עד כה שומשו </Typography>
          <Typography variant="h5">{analytics.usedCoupons.length}</Typography>
          <Typography variant="h4">קופונים </Typography>

        </Box>
        <Box className={`${styles.blueBox}  ${styles.box}`}>
          <img src={bubbles} />
          <Typography textAlign="center" variant="h4">מס' משתמשים רשומים</Typography>
          <Typography variant="h5">{user.users.length}</Typography>
        </Box>
        <Box className={`${styles.greenBox}  ${styles.box}`}>
          <img src={bubbles} />
          <Typography variant="h4">מספר מוצרים</Typography>
          <Typography variant="h5">{calculateProductsAmount()}</Typography>
        </Box>
      </div>

      <div className={styles.table}>
        <MaterialTable
          icons={tableIcons}
          title="Used coupons"
          columns={columns}
          data={createTableDataSource()}
          options={{
            exportButton: true
          }}

        />

      </div>
    </div>
  );
};


export default Report;
