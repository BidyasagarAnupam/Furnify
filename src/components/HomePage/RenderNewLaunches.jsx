import React from 'react'
import { useState, useEffect } from 'react';
import { getNewProducts } from "../../services/operations/productDeatilsAPI"
import ProductCard from '../common/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

const RenderNewLaunches = () => {
    const [newProduct, setNewProduct] = useState([]);
    useEffect(() => {
        const getNewProduct = async () => {
            const res = await getNewProducts();
            if (res) {
                setNewProduct(res);
                console.log("The new products are: ", res);
            }
        }
        getNewProduct();
    }, [])
    return (
        <div className='h-full'>
            <Swiper
                slidesPerView={5}
                spaceBetween={10}
                cssMode={true}
                navigation={true}
                mousewheel={true}
                keyboard={true}
                freeMode={true}
                modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                className="w-full h-full"
            >
                {
                    newProduct.map((product, index) => (
                        <SwiperSlide key={index} >
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default RenderNewLaunches