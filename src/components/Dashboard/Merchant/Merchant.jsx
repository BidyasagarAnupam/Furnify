import React from 'react'
import { useSelector } from 'react-redux'
import squareIconRev from "../../../assets/icons/Square Icon Badge Total Revenue.svg"
import squareIconOrder from "../../../assets/icons/Square Icon Badge Total Order.svg"
import squareIconCustomer from "../../../assets/icons/Square Icon Badge Total Customer.svg"
import squareIconProduct from "../../../assets/icons/Square Icon Badge Total Products.svg"
import SemiCircleChart from '../Charts/SemiCircleChart'


const Merchant = () => {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className='w-full'>
      {/* Merchant name */}
      <div>
        <p className='text-2xl font-medium font-inter text-dashboard-black'>{`Welcome Back ${user.firstName} 👋🏻`}</p>
        <p className='text-sm text-dashboard-grey mt-1'>Elevating merchant performance through intuitive analytics</p>
      </div>

      {/* Card Section */}
      <div className='mt-12 w-full justify-between gap-4 grid grid-cols-4'>
        <div className="px-5 py-5 rounded-xl bg-cover h-40 bg-revenueImg bg-[#1D1F2C] ">
          <div className='flex flex-col items-start gap-4'>
            <img src={squareIconRev} alt="SquareIcon" />
            <p className='text-white opacity-75'>Total Revenue</p>
            <div className='flex gap-2 items-center'>
              <p className='text-white text-2xl'>$75,500</p>
              <p className='bg-white text-white bg-opacity-15 px-2 py-1 rounded-lg text-xs'>+10%</p>
            </div>
          </div>
        </div>
        <div className="px-5 py-5 rounded-xl bg-cover h-40 bg-orderImg bg-[#883DCF] ">
          <div className='flex flex-col items-start gap-4'>
            <img src={squareIconOrder} alt="squareIconOrder" />
            <p className='text-white opacity-75'>Total Order</p>
            <div className='flex gap-2 items-center'>
              <p className='text-white text-2xl'>31,500</p>
              <p className='bg-white text-white bg-opacity-15 px-2 py-1 rounded-lg text-xs'>+15%</p>
            </div>
          </div>
        </div>
        <div className="px-5 py-5 rounded-xl bg-cover h-40 bg-customerImg bg-[#3250FF] ">
          <div className='flex flex-col items-start gap-4'>
            <img src={squareIconCustomer} alt="squareIconCustomer" />
            <p className='text-white opacity-75'>Total Customer</p>
            <div className='flex gap-2 items-center'>
              <p className='text-white text-2xl'>$24,500</p>
              <p className='bg-white text-white bg-opacity-15 px-2 py-1 rounded-lg text-xs'>-25%</p>
            </div>
          </div>
        </div>
        <div className="px-5 py-5 rounded-xl bg-cover h-40 bg-productImg bg-[#2BB2FE] ">
          <div className='flex flex-col items-start gap-4'>
            <img src={squareIconProduct} alt="squareIconProduct" />
            <p className='text-white opacity-75'>Total Product</p>
            <div className='flex gap-2 items-center'>
              <p className='text-white text-2xl'>247</p>
              <p className='bg-white text-white bg-opacity-15 px-2 py-1 rounded-lg text-xs'>0%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className='mt-6 w-full h-[350px] justify-between gap-6 grid grid-cols-3'>
          <div className='col-span-1 h-full rounded-lg bg-white'>
            <SemiCircleChart/>
          </div>
          <div className='col-span-2 h-full rounded-lg bg-white'>
          {/* 2nd Graph */}
          
          </div>
      </div>
    </div>
  )
}

export default Merchant