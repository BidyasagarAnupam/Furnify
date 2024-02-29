import React, { useState } from 'react'
import { BiSortAlt2 } from "react-icons/bi";
import { BiFilter } from "react-icons/bi";

const FilterSection = () => {

  const [isAll, setIsAll] = useState(true)
  const [isPublished, setIsPublished] = useState(false)
  const [isUnPublished, setIsUnPublished] = useState(false);

  return (
    <>
      <div className='flex justify-between w-full mt-4'>
        {/* Left Section */}
        <div className='flex justify-between items-center gap-2'>
          <div
            className={`${isAll ? "bg-primary text-white" : " text-primary border"}
            py-1 px-4 rounded-full
            `}
          >{`All (3)`}
          </div>
          <div
            className={`${isPublished ? "bg-primary text-white" : " text-primary border"}
            py-1 px-4 rounded-full
            `}
          >{`Published (2)`}</div>
          <div
            className={`${isUnPublished ? "bg-primary text-white" : " text-primary border"}
            py-1 px-4 rounded-full
            `}
          >{`Unpublished (1)`}</div>
        </div>

        {/* Right Section */}
        <div className=' flex justify-between items-center gap-2'>
          <div
            className='flex gap-1 items-center py-1 px-3 border rounded-md'
          >
            <BiFilter />
            Filter</div>
          <div className='flex gap-1 items-center py-1 px-3 border rounded-md'>
            <BiSortAlt2 />
            Sort
          </div>
        </div>

      </div>

    </>
  )
}

export default FilterSection