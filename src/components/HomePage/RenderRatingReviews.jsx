import React, { useEffect, useState } from 'react'
import { getAllRatingReviews } from '../../services/operations/ratingReviewAPI';
import RatingCard from '../common/RatingCard';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';
import RatingSkeleton from '../common/skeleton/RatingSkeleton';

const RenderRatingReviews = () => {
    const [ratingReviews, setRatingReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getRatingReviews = async () => {
            setLoading(true);
            const res = await getAllRatingReviews();
            if (res) {
                setRatingReviews(res);
                console.log("All rating and reviews: ", ratingReviews);
            }
            setLoading(false);
        }
        getRatingReviews();
    }, []);

    return (
        <div className='flex justify-between h-full ' >
            {
                loading ?
                    <div
                        className="w-full h-full flex gap-3 justify-center"
                    >
                        {
                            Array.from({ length: 6 }).map((_, index) => (
                                <RatingSkeleton key={index} />
                            ))
                        }
                    </div> :
                <Swiper
                    slidesPerView={5}
                    spaceBetween={10}
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
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay, Navigation, Pagination, Mousewheel, Keyboard]}
                    className="w-full h-full"
                >
                    {
                        ratingReviews.map((rating, index) => (
                            <SwiperSlide key={index}>
                                <RatingCard
                                    rating={rating} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            }
        </div>
    )
}

export default RenderRatingReviews