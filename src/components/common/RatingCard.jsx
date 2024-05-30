import React, { useState } from 'react'
import { TiStarFullOutline } from 'react-icons/ti';
import ReactStars from 'react-stars';
import { RiVerifiedBadgeFill } from "react-icons/ri";

const RatingCard = ({rating}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxPreviewLength = 120;
  console.log("Rating-->", rating);
  let Rating = rating?.rating;
  let review = rating?.review;
  let image = rating?.user?.image;
  let fName = rating?.user?.firstName;
  let lName = rating?.user?.lastName;
  let isoDate = rating?.createdAt;


  function formatReadableDate(isoDate) {
    // Create a Date object from the ISO 8601 string
    const date = new Date(isoDate);

    // Define options for date formatting
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    // Get the local date string
    const dateString = date.toLocaleDateString(undefined, dateOptions);

    return dateString;
  }

  const readableDate = formatReadableDate(isoDate);

  const toggleReview = () => {
    setIsExpanded(!isExpanded);
  };

  const isLongReview = review.length > maxPreviewLength;

  return (
    <div className='h-fit flex flex-col items-start w-[280px] rounded-md gap-5 px-2 py-2 '>
     {/* Section 1 */}
      <div className='relative pb-3 px-2 pt-2 w-full bg-neutral-3 flex flex-col gap-2 rounded-md'>
        <div className='flex items-center gap-2'>
            {/* Rating star */}
            <div>
            <ReactStars
              className='flex text-lg'
              count={5}
              edit={false}
              value={Rating}
              // char={<TiStarFullOutline/>}
              size={20}
              color2="#ffa534"
              emptyIcon={<TiStarFullOutline />}
              fullIcon={<TiStarFullOutline />}
            />
            </div>
            {/* Verified Icon */}
            <div>
            <RiVerifiedBadgeFill className='text-[#2fb8ea] text-lg ' />
            </div>
        </div>
        <div className='text-sm '>
          <div className={`relative overflow-hidden ${isExpanded ? '' : isLongReview ? 'line-clamp-4' : ''}`}>
            <div className={`relative ${isExpanded ? '' : isLongReview ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-12 after:bg-gradient-to-b after:from-transparent after:to-neutral-3' : ''}`}>
              {isExpanded || !isLongReview
                ? review
                : `${review.substring(0, maxPreviewLength)}...`}
            </div>
          </div>
          {isLongReview && (
            <p
              onClick={toggleReview}
              className="text-blue-400 underline hover:no-underline hover:text-blue-600 cursor-pointer mt-2 "
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </p>
          )}
          <div className="absolute bottom-0 left-6 w-0 h-0 border-l border-t border-solid border-white border-transparent">
            <div className="w-4 h-4 bg-neutral-3 absolute -bottom-2 left-full transform -translate-x-1/2 rotate-45"></div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className='flex items-center gap-3'>
        <img src={image} alt="User" className='w-[50px] h-[50px] rounded-full object-contain ' />
        <div className='flex flex-col gap-1'>
          <p className='text-sm font-medium'>{`${fName} ${lName}`}</p>
          <p className='text-xs font-medium text-neutral-4'>{readableDate}</p>
        </div>
      </div>

    </div>
  )
}

export default RatingCard