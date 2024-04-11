import React from 'react'
import Order from '../../../../../assets/icons/Order.svg'
import IconBtn from '../../../../common/IconBtn'
import {useNavigate} from 'react-router-dom'
import { setStep } from '../../../../../slices/cartSlice'
import { useDispatch } from 'react-redux'

const OrderSuccessful = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className='flex flex-col justify-center items-center w-full mt-6 gap-5'>
      <p className='text-3xl text-neutral-4 font-semibold'>Thank You! 🎉</p>
      <p className='text-4xl mt-2 text-neutral-6 font-semibold'>Your order has been received</p>
      <p className='text-md text-neutral-4 font-medium'>Check you email for more details</p>
      <img className='mt-10 mb-5' src={Order} alt="" width="300px"  />
      <IconBtn 
        text="Go to Orders"
        onclick={() => {
          navigate('/dashboard/my-orders')
          dispatch(setStep(1))
        }}
      />
    </div>
  )
}

export default OrderSuccessful