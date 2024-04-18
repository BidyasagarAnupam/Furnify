import React, { useEffect, useState } from 'react'
import { TiStarFullOutline } from 'react-icons/ti'
import { removeFromCart } from '../../../../../slices/cartSlice'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from "react-redux"
import ReactStars from "react-rating-stars-component"
import toast from 'react-hot-toast'


const CartTable = (
    {
        index,
        product,
        quantities,
        updateQuantityAtIndex,
        removeFromQuantity,
    }
) => {
    const [quantity, setQuantity] = useState(quantities[index])
    const { cart } = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const displayPrice = () => {
        return (Math.round(product.price - (product.price * (product.discount / 100))))
    }
    const [subTotal, setSubTotal] = useState(displayPrice())

    useEffect(() => {
        setSubTotal(displayPrice() * quantity)
    }, [quantity])

    const increment = () => {
        if (quantity <= 4) {
            updateQuantityAtIndex(index, quantity + 1)
            setQuantity(quantity + 1);
        }

        else
            toast.error("You can't add more than 5 products")
    }
    const decrement = () => {
        if (quantity > 1) {
            updateQuantityAtIndex(index, quantity - 1)
            setQuantity(quantity - 1);
        }
        else
            toast.error("Minimum 1 quantity must be required")
    }

    const removeBtnHandler = () => {
        removeFromQuantity(index)
        dispatch(removeFromCart(product._id))
    }

    return (
        <div className='flex justify-between w-full border-b-1'>
            {/* Left */}
            <div className='w-[45%] flex gap-4 p-2'>
                {/* Product Image */}
                <div>
                    <img
                        src={product?.image}
                        alt={product?.name}
                        className="h-[100px] w-[120px] rounded-lg "
                    />
                </div>
                <div className='flex flex-col gap-1 items-start justify-center'>
                    <span className='relative group text-medium font-semibold'>
                        {breakLongString(product.name)}
                        <div className='z-20 min-w-max text-xs px-2 p-1 top-5 
                        left-10 max-w-maxContent bg-neutral-11
                        rounded-sm text-white absolute hidden
                        group-hover:block transition-all duration-200 ease-in'>
                            {
                                product.name
                            }
                        </div>
                    </span>
                    <div>
                        <ReactStars
                            count={5}
                            // value={product?.ratingAndReviews?.length}
                            // TODO: Add rating and reviews
                            value={4}
                            size={15}
                            edit={false}
                            half={true}
                            activeColor="#ffa534"
                            emptyIcon={<TiStarFullOutline />}
                            fullIcon={<TiStarFullOutline />}
                        />
                    </div>
                    <button
                        onClick={() =>
                            removeBtnHandler()
                        }
                        className="flex w-fit items-center 
                    gap-x-1 rounded-md py-1 px-[3px] 
                    text-red-500 text-sm font-medium
                    hover:scale-105 transition-all duration-200
                    hover:text-red-600
                    "
                    >
                        <RxCross2 />
                        <span >Remove</span>
                    </button>
                </div>
            </div>
            {/* right */}
            <div className='flex justify-between items-center w-[55%]'>
                <div className=' w-fit px-4 py-[3px] rounded-lg border border-neutral-5 flex items-center gap-4'>
                    <span className='text-lg cursor-pointer' onClick={() => decrement()}>-</span>
                    <span className='font-semibold'>{quantity}</span>
                    <span className='text-lg cursor-pointer' onClick={() => increment()}>+</span>
                </div>
                <div>
                    {
                        '₹ ' + displayPrice().toLocaleString('en-IN')
                    }
                </div>
                <div>
                    {
                        '₹ ' + subTotal.toLocaleString('en-IN')
                    }
                </div>
            </div>
        </div>
    )
}

export default CartTable

// Function to break long strings into two lines by slicing words
function breakLongString(str) {

    const result = str.length > 12 ? str.slice(0, 12) + "..." : str;
    return result;


}