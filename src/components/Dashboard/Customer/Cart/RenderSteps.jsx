import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import ShoppingCart from './ShoppingCart/index';
import CheckoutForm from './CheckoutForm/index';
import OrderSuccessful from './OrderSuccessful/index';

const RenderSteps = () => {


    const { step } = useSelector((state) => state.cart)
    const [totalMRP, setTotalMRP] = useState(0);
    const [totalDiscountedPrice, setTotalDiscountedPrice] = useState(0);
    const [showAddress, setShowAddress] = useState({});

    const steps = [
        {
            id: 1,
            title: "Shopping Cart",
        },
        {
            id: 2,
            title: "Checkout Details",
        },
        {
            id: 3,
            title: "Order Complete",
        },
    ];

    return (
        <div className='w-full flex flex-col items-center gap-3'>
            <div className='font-semibold text-4xl mr-6 mb-3'>
                {
                    step === 1 ? "Cart" : step === 2 ? "Check Out" : "Complete!"
                }
            </div>
            <div className='flex  justify-between w-8/12'>
                {
                    steps.map((item) => (
                        <div key={item.id} className='flex flex-col gap-4 w-1/3'>
                            <div className='flex gap-3 items-center ' >
                                <button
                                    className={`grid cursor-default aspect-square w-[34px] place-items-center rounded-full  ${step === item.id
                                        ? " bg-primary text-white"
                                        : `${step < item.id ? "bg-neutral-400 text-white" : "bg-green-500 text-white"}`
                                        }  `}
                                >
                                    {step > item.id ? (
                                        <FaCheck className="font-bold text-white" />
                                    ) : (
                                        item.id
                                    )}

                                </button>
                                <span className={`${step === item.id
                                    ? "  text-primary"
                                    : `${step < item.id ? " text-neutral-400" : " text-green-500"}`
                                    } `}>
                                    {
                                        item.title
                                    }
                                </span>
                            </div>
                            {item.id <= step &&
                                <div className={`h-[2px] w-[80%] ${item.id === step ? "bg-primary" : "bg-green-500"}`}></div>
                            }
                        </div>
                    ))
                }
            </div>
            {/* Render specific component based on current step */}
            {step === 1 &&
                <ShoppingCart
                totalMRP={totalMRP}
                setTotalMRP={setTotalMRP} 
                totalDiscountedPrice={totalDiscountedPrice}
                setTotalDiscountedPrice={setTotalDiscountedPrice}
                />
            }
            {step === 2 &&
                <CheckoutForm 
                totalMRP={totalMRP}
                totalDiscountedPrice={totalDiscountedPrice}
                />
            }
            {step === 3 && <OrderSuccessful />}
        </div>
    )
}

export default RenderSteps