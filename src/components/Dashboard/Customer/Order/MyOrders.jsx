import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {fetchOrders} from "../../../../services/operations/orderAPI"
import { useDispatch } from "react-redux"
import Spinner from "../../../common/Spinner"
import OrderCard from './OrderCard'

const MyOrders = () => {
  const {token} = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() =>{
    const getAllOrdersList = async() =>{
      setLoading(true);
      const res = await fetchOrders(token);
      console.log("RES:" , res);
      setOrders(res);
      setLoading(false);
    }
    getAllOrdersList();
  }, []);

  if(loading){
    return (
      <div className='w-full h-screen flex justify-center items-center text-xl -mt-20'>
        <Spinner/>
      </div>
    )
  }

  return (
    <div>
      <p className='text-2xl font-semibold'>My Orders</p>
      <div className='w-full flex flex-col gap-8 mt-10'>
        {
          orders.map((order) => (
            <OrderCard key={order._id} order = {order} />
          ))
        }
      </div>
    </div>
  )
}

export default MyOrders