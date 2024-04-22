import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { formattedDate } from '../../../../utils/dateFormatter'
import { RiArrowDropDownLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom'
import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,
    Button,
    Textarea, Input
} from "@nextui-org/react";
import { useSelector } from 'react-redux';
import ReactStars from 'react-stars';
import { TiStarFullOutline } from 'react-icons/ti';
import { useForm } from 'react-hook-form';
import { createRating } from '../../../../services/operations/ratingReviewAPI'
import IconBtn from '../../../common/IconBtn'
import toast from 'react-hot-toast';


const OrderCard = ({ order }) => {
    const navigate = useNavigate();
    const [isHovering, setIsHovering] = useState(false);
    const modal1 = useDisclosure()
    const modal2 = useDisclosure()
    const { user } = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)

    const isOpen1 = modal1.isOpen;
    const onOpen1 = modal1.onOpen;
    const onClose1 = modal1.onClose;

    const isOpen2 = modal2.isOpen;
    const onOpen2 = modal2.onOpen;
    const onClose2 = modal2.onClose;
    const onOpenChange2 = modal2.onOpenChange

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm()

    const ratingChanged = (newRating) => {
        // console.log(newRating)
        setValue("productRating", newRating)
    }

    useEffect(() => {
        setValue("productReview", "")
        setValue("productRating", 0)
        setValue("productTitle", "")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onSubmit = async (data) => {

        if (data.productRating === 0 || data.productReview === '') {
            toast.error("Both Fields are required")
            onClose2();
            return
        }

        await createRating(
            {
                productId: order.product._id,
                rating: data.productRating,
                review: data.productReview,
                title: data.productTitle
            },
            token
        )
        onClose2();
    }

    const handleMouseOver = () => {
        setIsHovering(true);
    };

    const handleMouseOut = () => {
        setIsHovering(false);
    };




    return (
        <div    >
            {/* Main Container */}
            <div className='w-full flex flex-col  rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
                {/* Header */}
                <div className='bg-[#c2c2c2] flex w-full rounded-t-md justify-between items-center border-b-1 border-neutral-4 px-4 py-3 relative'>
                    {/* Left part */}
                    <div className='w-[50%] flex justify-between items-center'>
                        <div className='flex flex-col text-xs font-medium items-center '>
                            <p className='text-black'>ORDER PLACED</p>
                            <p>{formattedDate(order.orderedAt)}</p>
                        </div>
                        <div className='flex flex-col text-xs font-medium items-center '>
                            <p className='text-black'>TOTAL</p>
                            <p>  {`₹${(Math.round(order.product.price - (order.product.price * (order.product.discount / 100))) + 500).toLocaleString('en-IN')}`}</p>
                        </div>
                        <div className='flex flex-col text-xs font-medium items-center relative '>
                            <p className='text-black'>SHIP TO</p>
                            <div className='flex gap-1 items-center ' onMouseOver={handleMouseOver}
                                onMouseOut={handleMouseOut}>
                                <p>{order.address.name}</p>
                                <span className='text-xl'><RiArrowDropDownLine /></span>
                            </div>
                            {
                                isHovering && (
                                    <div className='flex flex-col absolute top-10 gap-2 shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] bg-white py-3 px-2 lg:w-[200px] rounded-sm tracking-wider'>
                                        <span className='font-semibold'>{`${order.address.name}`}</span>
                                        {
                                            `${order.address.address},${order.address.locality}, ${order.address.city},${order.address.state},
                                          ${order.address.zipCode}
                                        `
                                        }
                                    </div>
                                )
                            }
                        </div>

                    </div>
                    {/* Right Part */}
                    <div className='flex flex-col  text-xs font-medium items-center'>
                        <p>ORDER ID</p>
                        <p>#{order._id}</p>
                    </div>
                </div>

                {/* Body */}
                <div className='px-4 py-3 flex justify-between items-center bg-[#f5f5f5]'>
                    {/* Left Section */}
                    <div onClick={() => navigate(`/product/${order.product._id}`)} className='flex gap-4 w-fit items-center cursor-pointer'>
                        <img src={order.product.image} alt="OrderPicture" className='w-[120px] h-[100px] object-cover rounded-md ' />
                        <p className='text-sm font-medium hover:underline hover:text-blue-800'>{order.product.name}</p>
                    </div>
                    <div className={`w-fit mx-auto px-5 py-2 text-sm
                                     rounded-lg
                                     ${order.status === 'Confirmed' && "bg-[#FFF0EA] text-[#F86624]"}
                                     ${order.status === 'Shipped' && "bg-[#EAF8FF] text-[#2BB2FE]"}
                                     ${order.status === 'Out for Delivery' && "bg-[#FEF4CF] text-[#BB960B]"}
                                     ${order.status === 'Delivered' && "bg-[#E9FAF7] text-[#1A9882]"}
                                     ${order.status === 'Cancelled' && "bg-[#FBD8DB] text-[#EB3D4D]"}
                                     `}>
                        {`Your Order has been ${order.status}`}
                    </div>
                    {/* Right Section */}
                    <div className='flex flex-col w-[30%]  gap-3 items-end'>
                        <button className='text-xs font-semibold border-1 border-neutral-4 rounded-md hover:shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] px-6 py-3 transition-all duration-200 ease-in-out'
                            onClick={onOpen1}
                        >
                            View Order Details
                        </button>

                        <button className='text-xs font-medium border-1 bg-primary text-white border-primary rounded-md hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] px-4 py-3 transition-all duration-200 ease-in-out' onClick={onOpen2}>
                            Write a Product Review
                        </button>
                    </div>
                </div>
            </div>
            <Modal backdrop="blur" isOpen={isOpen1} onClose={onClose1}>
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 border-b-1 border-neutral-4">Order Details</ModalHeader>
                            <ModalBody>
                                <div className='flex justify-between items-center'>
                                    <p>Item(s) Subtotal:</p>
                                    <p> {`₹${(Math.round(order.product.price - (order.product.price * (order.product.discount / 100)))).toLocaleString('en-IN')}`}</p>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <p>Shipping:</p>
                                    <div className='flex gap-2 items-center'>
                                        <p className='line-through text-red-600'>₹499</p>
                                        <span className='text-green-500 tracking-wide font-medium'>FREE</span>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <p>Secured Packaging Fee:</p>
                                    <p> {`₹500`}</p>
                                </div>
                                <div className='w-full h-[1px] border-1 border-dashed border-primary'></div>
                                <div className='flex justify-between items-center'>
                                    <p>Grand Total:</p>
                                    <p> {`₹${(Math.round(order.product.price - (order.product.price * (order.product.discount / 100))) + 500).toLocaleString('en-IN')}`}</p>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <Modal
                isOpen={isOpen2}
                onOpenChange={onOpenChange2}
                placement="top-center"
                onClose={onClose2}
            >
                <ModalContent>
                    {(onClose2) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Add Review</ModalHeader>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <ModalBody>

                                    <div className='flex flex-col gap-3 w-full'>
                                        <div className='flex gap-2 w-full items-start'>
                                            <img src={user.image} alt="" className='rounded-full h-[50px] w-[50px] object-contain' />
                                            <div className='flex flex-col'>
                                                <p className='text-medium font-semibold'>{`${user.firstName} ${user.lastName}`}</p>
                                                <p className='text-sm'>Posting Publicly</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col items-start ' >
                                            <h1>Rate this product <sup className="text-pink-700">*</sup></h1>
                                            <div>
                                                <ReactStars
                                                    className='flex gap-2 -mt-2'
                                                    count={5}
                                                    onChange={ratingChanged}
                                                    size={24}
                                                    color2="#ffa534"
                                                    emptyIcon={<TiStarFullOutline />}
                                                    fullIcon={<TiStarFullOutline />}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <Input
                                                isRequired
                                                type="text"
                                                label="Title"
                                                labelPlacement='outside'
                                                placeholder="Enter review title"
                                                variant='bordered'
                                                {...register("productTitle", { required: true })}
                                            />
                                            {errors.productTitle && (
                                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                                    Please Add the title
                                                </span>
                                            )}
                                        </div>

                                        <div>
                                            <Textarea
                                                isRequired
                                                variant="bordered"
                                                label={`Add Your Experience`}
                                                labelPlacement="outside"
                                                placeholder="Enter your description"
                                                {...register("productReview", { required: true })}
                                            />
                                            {errors.productReview && (
                                                <span className="ml-2 text-xs tracking-wide text-pink-200">
                                                    Please Add Your Experience
                                                </span>
                                            )}
                                        </div>

                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="flat" onPress={onClose2}>
                                        Cancel
                                    </Button>
                                    <Button color='primary' type='submit'>
                                        Save
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </div>
    )
}

export default OrderCard