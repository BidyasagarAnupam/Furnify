import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdArrowDropright } from "react-icons/io";
import { MdOutlineAddToPhotos } from "react-icons/md";
import IconBtn from "../../../common/IconBtn";
import ProductBuilderForm from './ProductBuilderForm';

const AddProduct = () => {
  return (
    <div>
      {/* Section 1 */}
      <div
        className='flex justify-between items-center border-1 py-4 px-6 rounded-xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
        {/* Left part */}
        <div className='flex flex-col gap-1'>
          <div className='text-2xl font-semibold text-neutral-5'>Add Product</div>
          <div className='flex flex-row items-center text-[#3F00FF] font-medium '>
            <span className='hover:underline'>
              <NavLink to={'/dashboard/account'}>Dashboard</NavLink>
            </span>
            <span><IoMdArrowDropright className='text-lg text-neutral-4' /></span>
            <span className='hover:underline'>
              <NavLink to={'/dashboard/myProducts'}>My Products</NavLink>
            </span>
            <span><IoMdArrowDropright className='text-lg  text-neutral-4' /></span>
            <span className='text-neutral-4'>Add Product</span>
          </div>
        </div>
        {/* Right Part */}
        <div className='flex flex-row gap-x-2'>
          <IconBtn
            text={"Discard Changes"}
            outline={true}
            color='secondary-red'
          />
          <IconBtn
            text={"Add Product"}
            color='bg-[#327590]'
          >
            <MdOutlineAddToPhotos className='text-lg' />
          </IconBtn>
        </div>
      </div>

      {/* Section 2 */}
      <div>
        <ProductBuilderForm/>
      </div>
    </div>
  )
}

export default AddProduct