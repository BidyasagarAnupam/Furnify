import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Nocart from '../../../../../assets/icons/cartEmpty.svg'
import CartTable from './CartTable';
import IconBtn from '../../../../common/IconBtn';
import { removeQuantity, setStep, updateQuantity } from '../../../../../slices/cartSlice';

const ShoppingCart = ({ totalMRP, setTotalMRP, totalDiscountedPrice, setTotalDiscountedPrice }) => {
  const { cart, totalItems, step, quantities } = useSelector((state) => state.cart)
  console.log("CART", cart);
// TODO:
  const dispatch = useDispatch();

  const updateTotalMRP = () => {
    console.log("---- object ", quantities);
    let total = 0;
    cart.forEach((product, index) => {
      // Calculate the total price of each product considering its quantity
      console.log("----Product price", product.price, " quantity ", quantities[index]);
      const totalPrice = product.price * quantities[index];
      total += totalPrice;
    });
    console.log("----TOTAL->", total);
    setTotalMRP(total);
  };

  const updateTotalDiscountedPrice = () => {
    let total = 0;
    cart.forEach((product, index) => {
      const discountedPrice = (Math.round(product.price - (product.price * (product.discount / 100))));
      // Calculate the total discounted price of each product considering its quantity
      const totalDiscountedPrice = discountedPrice * quantities[index];
      total += totalDiscountedPrice;
    });
    setTotalDiscountedPrice(total);
  };

  
  useEffect(() => {
    updateTotalMRP();
    updateTotalDiscountedPrice();
  }, [quantities])

  // Function to update quantity at a specific index
  const updateQuantityAtIndex = (index, newValue) => {
    // Dispatch action to update quantity
    dispatch(updateQuantity({ index, newValue }));

  };

  // Function to remove item from cart and quantities array
  const removeFromQuantity = (index) => {
    // Dispatch action to remove quantity
    dispatch(removeQuantity(index));

  };

  if (cart.length === 0) {
    return (
      <div className='w-full mt-16 flex flex-col items-center justify-center gap-9'>
        <img className='h-[200px]' src={Nocart} alt="" srcset="" />
        <span className='text-3xl'>Your Cart is Empty!</span>
      </div>
    );
  }

  return (
    <div className='w-full flex justify-between'>
      <div className='w-3/5 flex flex-col gap-3'>
        {/* Heading */}
        <div className='flex justify-between w-full pb-4 mt-4 border-b-2 border-b-primary'>
          {/* left */}
          <div className='w-[45%]'>Product</div>
          {/* right */}
          <div className='flex justify-between w-[55%]'>
            <div>Quantity</div>
            <div>Price</div>
            <div>Subtotal</div>
          </div>
        </div>
        {
          cart.map((product, index) => (
            <CartTable
              key={index}
              index={index}
              quantities={quantities}
              updateQuantityAtIndex={updateQuantityAtIndex}
              removeFromQuantity={removeFromQuantity}
              product={product}
            />

          ))
        }
      </div>

      <div className='w-[30%] pt-6 h-[48vh] sticky top-10 '>
        <div className='px-5 py-4 w-full h-full bg-white shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] '>
          <p className='text-primary text-2xl font-medium'>Cart summary</p>
          <div className='w-[100%]  h-[1px] bg-neutral-9 mt-2 '></div>
          <div className='mt-6 flex flex-col gap-4'>
            <div className='flex justify-between items-center'>
              <p className='text-medium font-medium'>Price ({totalItems} items)</p>
              <p className='text-medium font-medium'>₹{totalMRP.toLocaleString('en-IN')}</p>
            </div>
            <div className='flex justify-between items-center'>
              <p className='text-medium font-medium'>Discount</p>
              <p className='text-medium font-medium text-green-600'>- ₹{(totalMRP - totalDiscountedPrice).toLocaleString('en-IN')}</p>
            </div>
            <div className='flex justify-between items-center'>
              <p className='text-medium font-medium'>Delivery Charges</p>
              <div className='flex gap-1 items-center'>
                <p className='text-sm line-through'>₹549</p>
                <span className='text-medium font-medium text-green-600'>Free</span>
              </div>

            </div>
            <div className='flex justify-between items-center'>
              <p className='text-medium font-medium'>Secured Packaging Fee</p>
              <p className='text-sm font-medium'>₹500</p>
            </div>
            <div className='w-full h-[1px] border-dashed border-1 border-neutral-9'></div>
            <div className='flex justify-between items-center'>
              <p className='text-lg font-semibold'>Total Amount</p>
              <p className='text-lg font-medium'>₹{(totalDiscountedPrice + 500).toLocaleString('en-IN')}</p>
            </div>
            <div>
              <IconBtn onclick={() => dispatch(setStep(step + 1))} text="Checkout" customClasses="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCart


