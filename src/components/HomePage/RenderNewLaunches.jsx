import React, { useState, useEffect } from 'react';
import { getNewProducts } from "../../services/operations/productDeatilsAPI";
import ProductCard from '../common/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import ProductCardSkeleton from '../common/skeleton/ProductCardSkeleton';

const RenderNewLaunches = () => {
    const [newProduct, setNewProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getNewProduct = async () => {
            setLoading(true);
            const res = await getNewProducts();
            if (res) {
                setNewProduct(res);
                console.log("The new products are: ", res);
            }
            setLoading(false);
        };
        getNewProduct();
    }, []);

    return (
        <div className='h-full'>
            {loading ? (
                <div className="w-full h-full flex gap-3 justify-center">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <ProductCardSkeleton key={index} />
                    ))}
                </div>
            ) : (
                newProduct.length === 0 ? (
                    <div className="w-full h-full flex justify-center items-center text-4xl font-semibold">
                        No new products available..😕
                    </div>
                ) : (
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={5}
                        cssMode={true}
                        navigation={true}
                        mousewheel={true}
                        keyboard={true}
                        freeMode={true}
                        loop={true}
                        autoplay={{
                            delay: 1000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        modules={[Autoplay, Navigation, Mousewheel, Keyboard]}
                        className="w-full h-full"
                    >
                        {newProduct.map((product, index) => (
                            <SwiperSlide key={index}>
                                <ProductCard product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )
            )}
        </div>
    );
};

export default RenderNewLaunches;
