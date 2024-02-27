import React from 'react'
import FilterSection from './FilterSection'
import { NavLink } from 'react-router-dom'
import { IoMdArrowDropright } from 'react-icons/io'
import IconBtn from '../../../common/IconBtn'
import { MdOutlineAddToPhotos } from 'react-icons/md'

const MyProducts = () => {
  return (
    <div>
      {/* Header Section */}
      <div
        className='flex justify-between items-center border-1 py-4 px-6 rounded-xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
        {/* Left part */}
        <div className='flex flex-col gap-1'>
          <div className='text-2xl font-semibold text-neutral-5'>Products</div>
          <div className='flex flex-row items-center text-[#3F00FF] font-medium '>
            <span className='hover:underline'>
              <NavLink to={'/dashboard/account'}>Dashboard</NavLink>
            </span>
            <span><IoMdArrowDropright className='text-lg text-neutral-4' /></span>
            <span className='text-neutral-4'>
              <span>My Products</span>
            </span>
          </div>
        </div>
        {/* Right Part */}
        <div className='flex flex-row gap-x-2'>
          <IconBtn
            // onclick={() => reset()}
            // disabled={loading}
            text={"Discard Changes"}
            outline={true}
            color='secondary-red'
          />
          <IconBtn
            // disabled={loading}
            // type="submit"
            text={"Save Changes"}
            color='bg-[#327590]'
          >
            <MdOutlineAddToPhotos className='text-lg' />
          </IconBtn>
        </div>
      </div>
      <div>
        <h1>Products</h1>
        {/* Search  */}
      </div>
      <FilterSection />
    </div>
  )
}

export default MyProducts