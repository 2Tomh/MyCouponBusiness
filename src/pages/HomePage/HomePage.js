import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import 'swiper/css/navigation';
import { Box, Typography } from "@mui/material";
import styles from "./HomePage.module.css"
import Product from '../../components/Product/Product';
import { Navigation } from 'swiper/modules';
import products from './products';

function HomePage() {


    return (
        <Box className={styles.productsContainer} >
            {products.map((category, i) =>
                <div key={i}>
                    <Box className={styles.product}>
                        <Typography variant='h3' textAlign={"center"}>{category.category}</Typography>
                        <Swiper
                            navigation={true}
                            slidesPerView={4}
                            spaceBetween={30}
                            modules={[Navigation]}
                        >
                            {category.items.length > 0 && category.items.map((item, index) =>
                                <SwiperSlide key={index}>
                                    <Product item={item} />
                                </SwiperSlide>
                            )}
                        </Swiper>
                    </Box>
                    <hr />
                </div>
            )}
        </Box >
    )
};

export default HomePage;
