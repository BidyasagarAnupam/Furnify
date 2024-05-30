import React, { useEffect, useState } from 'react'
import { getAllRatingReviews } from '../../services/operations/ratingReviewAPI';
import RatingCard from '../common/RatingCard';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';

const RenderRatingReviews = () => {
    const [ratingReviews, setRatingReviews ] = useState([]);
    
    useEffect(() =>{
        const getRatingReviews = async() =>{
            const res = await getAllRatingReviews();
            if(res){
                setRatingReviews(res);
                console.log("All rating and reviews: ", ratingReviews);
            }
        }
        getRatingReviews();
    }, []);

  return (
    <div className='flex justify-between h-full ' >
          <Swiper
              slidesPerView={5}
              spaceBetween={10}
              cssMode={true}
              navigation={true}
              mousewheel={true}
              keyboard={true}
              freeMode={true}
              modules={[Navigation, Pagination, Mousewheel, Keyboard]}
              className="w-full h-full "
          >
              {
                  ratingReviews.map((rating, index) => (
                      <SwiperSlide  key={index}>
                          <RatingCard
                           rating={rating} />
                      </SwiperSlide>
                  ))
              }
          </Swiper>
    </div>
  )
}

export default RenderRatingReviews