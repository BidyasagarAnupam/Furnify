import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import squareIconRev from "../../../assets/icons/Square Icon Badge Total Revenue.svg"
import squareIconOrder from "../../../assets/icons/Square Icon Badge Total Order.svg"
import squareIconCustomer from "../../../assets/icons/Square Icon Badge Total Customer.svg"
import squareIconProduct from "../../../assets/icons/Square Icon Badge Total Products.svg"
import SemiCircleChart from '../Charts/SemiCircleChart'
import RevenueSalesChart from '../Charts/Revenue_Sales_Chart'
import { fetchMerchantOrders } from '../../../services/operations/orderAPI'
import ManageOrder from './ManageOrder'


const Merchant = () => {

  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const [isStatusChanged, setIsStatusChanged] = useState(false)
  const [uniqueUserCount, setUniqueUserCount] = useState(0)

  useEffect(() => {
    const getAllOrdersList = async () => {
      setLoading(true);
      const res = await fetchMerchantOrders(token);
      console.log('RES:', res);

      // Filter unique users
      const uniqueUsers = new Set();
      res.forEach(order => {
        uniqueUsers.add(order.user); // Assuming `user` is the user ID
      });

      // Count the unique users
      setUniqueUserCount(uniqueUsers.size);

      setOrders(res);
      setLoading(false);
    };
    getAllOrdersList();
  }, [isStatusChanged]);

  let totalRevenue = 0;
    totalRevenue = orders.reduce((total, order) => {
    return total + (Math.round(order?.product?.price - (order?.product?.price * (order?.product?.discount / 100)))) * order?.quantity;
  }, 0);
  

  return (
    <div className='w-full'>
      {/* Merchant name */}
      <div>
        <p className='text-2xl font-medium font-inter text-dashboard-black'>{`👋 Welcome Back ${user.firstName}`}</p>
        <p className='text-sm text-dashboard-grey mt-1'>Elevating merchant performance through intuitive analytics</p>
      </div>

      {/* Card Section */}
      <div className='mt-12 w-full justify-between gap-4 grid grid-cols-4'>
        <div className="px-5 py-5 rounded-xl bg-cover h-40 bg-revenueImg bg-[#1D1F2C] ">
          <div className='flex flex-col items-start gap-4'>
            <img src={squareIconRev} alt="SquareIcon" />
            <p className='text-white opacity-75'>Total Revenue</p>
            <div className='flex gap-2 items-center'>
              <p className='text-white text-2xl'>₹{totalRevenue.toLocaleString()}</p>
              <p className='bg-white text-white bg-opacity-15 px-2 py-1 rounded-lg text-xs'>+10%</p>
            </div>
          </div>
        </div>
        <div className="px-5 py-5 rounded-xl bg-cover h-40 bg-orderImg bg-[#883DCF] ">
          <div className='flex flex-col items-start gap-4'>
            <img src={squareIconOrder} alt="squareIconOrder" />
            <p className='text-white opacity-75'>Total Order</p>
            <div className='flex gap-2 items-center'>
              <p className='text-white text-2xl'>{orders.length}</p>
              <p className='bg-white text-white bg-opacity-15 px-2 py-1 rounded-lg text-xs'>+15%</p>
            </div>
          </div>
        </div>
        <div className="px-5 py-5 rounded-xl bg-cover h-40 bg-customerImg bg-[#3250FF] ">
          <div className='flex flex-col items-start gap-4'>
            <img src={squareIconCustomer} alt="squareIconCustomer" />
            <p className='text-white opacity-75'>Total Customer</p>
            <div className='flex gap-2 items-center'>
              <p className='text-white text-2xl'>{uniqueUserCount}</p>
              <p className='bg-white text-white bg-opacity-15 px-2 py-1 rounded-lg text-xs'>-25%</p>
            </div>
          </div>
        </div>
        <div className="px-5 py-5 rounded-xl bg-cover h-40 bg-productImg bg-[#2BB2FE] ">
          <div className='flex flex-col items-start gap-4'>
            <img src={squareIconProduct} alt="squareIconProduct" />
            <p className='text-white opacity-75'>Total Products</p>
            <div className='flex gap-2 items-center'>
              <p className='text-white text-2xl'>{user.products.length}</p>
              <p className='bg-white text-white bg-opacity-15 px-2 py-1 rounded-lg text-xs'>0%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className='mt-6 w-full h-[350px] justify-between gap-6 grid grid-cols-3'>
        <div className='col-span-1 px-4 py-6 h-full rounded-lg bg-white'>
          <div className='flex flex-col gap-1 mb-10'>
            <p className='text-2xl text-[#1D1F2C]'>Target</p>
            <p className='text-sm text-[#777980]'>Revenue Target</p>
          </div>
          <SemiCircleChart />
          <div className='text-center text-[#667085] text-sm'>
            You succeed earn <span className='text-[#1D1F2C]'>$240</span> today, its higher than yesterday
          </div>
          <div>

          </div>
        </div>
        <div className='col-span-2 h-full px-4 py-6 rounded-lg bg-white'>
          {/* 2nd Graph */}
          <div className='flex flex-col gap-1'>
            <p className='text-2xl text-[#1D1F2C]'>Statistic</p>
            <p className='text-sm text-[#777980]'>Revenue and Sales</p>
          </div>
          <RevenueSalesChart orders={orders} loading={loading} />
        </div>
      </div>

      {/* Manage Order */}
      <div className='mt-20 w-full h-[350px]  grid grid-cols-3'>
        <div className='col-span-3  py-6 h-full rounded-lg bg-white'>
          <ManageOrder orders={orders} loading={loading} setIsStatusChanged={setIsStatusChanged} isStatusChanged={isStatusChanged } />
        </div>
      </div>
    </div>
  )
}

export default Merchant