import React, { useEffect, useState } from 'react'
import GetAvgRating from '../../utils/avgRating';
import { GiRoundStar } from "react-icons/gi";
import { Progress } from "@nextui-org/react";

const RatingAndReview = ({ ratingAndReviews }) => {


    console.log("Rating andReview", ratingAndReviews)
    let avg = GetAvgRating(ratingAndReviews)

    let oneStar = 0, twoStar = 0, threeStar = 0, fourStar = 0, fiveStar = 0, length = 0;

    for (const key in ratingAndReviews) {
        if (ratingAndReviews.hasOwnProperty(key)) {
            const review = ratingAndReviews[key];
            if (review.rating >= 4.5) fiveStar++;
            else if (review.rating >= 3.5) fourStar++;
            else if (review.rating >= 2.5) threeStar++;
            else if (review.rating >= 1.5) twoStar++;
            else oneStar++;
            length++;
        }
    }

    let oneStarProgress, twoStarProgress, threeStarProgress, fourStarProgress, fiveStarProgress;
    
    oneStarProgress = Math.round(oneStar/length*100);
    twoStarProgress = Math.round(twoStar/length*100);
    threeStarProgress = Math.round(threeStar/length*100);
    fourStarProgress = Math.round(fourStar/length*100);
    fiveStarProgress = Math.round(fiveStar/length*100);

    
    

    return (
        <div className='lg:mt-24'>
            <div className='mx-auto w-11/12 bg-white'>
                {/* Heading Section */}
                <div className='flex flex-col gap-1'>
                    <h1 className='text-4xl font-semibold'>Customers love us!</h1>
                    <p className='ml-2 text-medium text-neutral-4 tracking-wider'>Explore customer's rating and reviews</p>
                </div>

                {/* Avg rating section */}
                <div className='flex w-full '>
                    {/* Left Section */}
                    <div className='flex w-[50%] mt-4'>
                        <div className='w-[50%] flex flex-col gap-2 items-center justify-center'>
                            <div className='flex items-center gap-2'>
                                <p className='text-4xl font-semibold'>{avg}</p>
                                <GiRoundStar className='text-[#ffa534] text-5xl ' />
                            </div>
                            <p className='text-xs w-[70%] text-center'>Overall rating of this product by our customers.</p>
                        </div>
                        <div className='w-[50%] flex flex-col gap-2 '>
                            <div className='flex gap-5 items-center w-[70%]'>
                                <span className='flex gap-1 items-center '>5 <GiRoundStar className='text-[#ffa534]' /></span>
                                <Progress
                                    size="sm"
                                    value={fiveStarProgress}
                                    color="success"
                                    className=""
                                />
                                <p className='font-semibold text-sm'>{fiveStar}</p>
                            </div>
                            <div className='flex gap-5 items-center w-[70%]'>
                                <span className='flex gap-1 items-center '>4 <GiRoundStar className='text-[#ffa534]' /></span>
                                <Progress
                                    size="sm"
                                    value={fourStarProgress}
                                    color="success"
                                    className=""
                                />
                                <p className='font-semibold text-sm'>{fourStar}</p>
                            </div>
                            <div className='flex gap-5 items-center w-[70%]'>
                                <span className='flex gap-1 items-center '>3 <GiRoundStar className='text-[#ffa534]' /></span>
                                <Progress
                                    size="sm"
                                    value={threeStarProgress}
                                    color="success"
                                    className=""
                                />
                                <p className='font-semibold text-sm'>{threeStar}</p>
                            </div>
                            <div className='flex gap-5 items-center w-[70%]'>
                                <span className='flex gap-1 items-center '>2 <GiRoundStar className='text-[#ffa534]' /></span>
                                <Progress
                                    size="sm"
                                    value={twoStarProgress}
                                    color="success"
                                    className=""
                                />
                                <p className='font-semibold text-sm'>{twoStar}</p>
                            </div>
                            <div className='flex gap-5 items-center w-[70%]'>
                                <span className='flex gap-1 items-center '>1 <GiRoundStar className='text-[#ffa534]' /></span>
                                <Progress
                                    size="sm"
                                    value={oneStarProgress}
                                    color="success"
                                    className=""
                                />
                                <p className='font-semibold text-sm'>{oneStar}</p>
                            </div>
                        </div>
                    </div>
                    {/* Rating Image */}
                    <div></div>
                </div>
                {/* All ratings */}
                <div className='flex flex-col gap-3 w-full'> 
                    {
                        ratingAndReviews.map((item) => (
                            <div key={item._id}>
                                
                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default RatingAndReview