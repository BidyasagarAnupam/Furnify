import React, { useState } from 'react'
import { BiSortAlt2 } from "react-icons/bi";
import { BiFilter } from "react-icons/bi";
import FilterModal from './FilterModal';
import { TbZoomReset } from "react-icons/tb";

const FilterSection = ({ setQuery, all, publishedCount }) => {

  const [isAll, setIsAll] = useState(true)
  const [isPublished, setIsPublished] = useState(false)
  const [isUnPublished, setIsUnPublished] = useState(false);
  const [filterModal, setFilterModal] = useState(false)

  return (
    <>
      <div className='flex justify-between w-full mt-4'>
        {/* Left Section */}
        <div className='flex justify-between items-center gap-2'>
          <div
            className={`${isAll ? "bg-primary text-white" : " text-primary border"}
            py-1 px-4 rounded-full
            `}
          >{`All (${all})`}
          </div>
          <div
            className={`${isPublished ? "bg-primary text-white" : " text-primary border"}
            py-1 px-4 rounded-full
            `}
          >{`Published (${publishedCount})`}</div>
          <div
            className={`${isUnPublished ? "bg-primary text-white" : " text-primary border"}
            py-1 px-4 rounded-full
            `}
          >{`Unpublished (${all - publishedCount})`}</div>
        </div>

        {/* Right Section */}
        <div
          onClick={() => setQuery(null)}
          className=' flex justify-between items-center gap-2 hover:cursor-pointer'>
          <div>
            <div className='flex gap-1 items-center py-1 px-3 border rounded-md'>
              <TbZoomReset />
              Reset
            </div>
          </div>
          <div
            onClick={() => setFilterModal(true)}
            className='flex gap-1 items-center py-1 px-3 border rounded-md hover:cursor-pointer'
          >
            <BiFilter />
            Filter
          </div>
          <div className='flex gap-1 items-center py-1 px-3 border rounded-md'>
            <BiSortAlt2 />
            Sort
          </div>
        </div>

      </div>
      {filterModal && <FilterModal setQuery={setQuery} setFilterModal={setFilterModal} />}

    </>
  )
}

export default FilterSection