import React, { useRef, useState } from 'react'
import { BiSolidPhoneCall } from "react-icons/bi";
import { IoMdMail } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import Bubble1 from "../../assets/Images/Bubble1.png"
import Bubble2 from "../../assets/Images/Bubble2.png"
import Arrow from "../../assets/Images/Arrow.png"
import { Input, Textarea } from "@nextui-org/react";
import IconBtn from '../common/IconBtn';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const ContactSection = () => {
    const siteKey = process.env.REACT_APP_SITE_KEY
    const recaptcha = useRef()
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async ( data) => {
        const captchaValue = recaptcha.current.getValue()
        if (!captchaValue) {
            alert('Please verify the reCAPTCHA!')
        } else {
            // make form submission
            reset()
            toast.success("Message sent successfully")
        }
        
    }


    return (
        <div className='w-full flex flex-row gap-10 bg-white p-5 rounded-lg h-[650px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
            <div className='w-[35%] px-8 pt-7 bg-[#011C2A] text-white rounded-md flex flex-col justify-between relative'>
                <div className='flex flex-col gap-2 h-[10%]'>
                    <p className='text-2xl font-semibold'>Contact Information</p>
                    <p className='text-medium text-neutral-9'>Say something to start a live chat!</p>
                </div>
                <div className='flex flex-col justify-between h-[30%]'>
                    <div className='flex gap-4 items-center'>
                        <BiSolidPhoneCall className='text-medium' />
                        <p>+91 8767898760</p>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <IoMdMail />
                        <Link
                            to='#'
                            onClick={(e) => {
                                window.location.href = "mailto:teamdebugger404@gmail.com";
                                e.preventDefault();
                            }}
                        >
                            teamdebugger404@gmail.com
                        </Link>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <FaLocationDot />
                        <p>NIT Jamshedpur <br /> Adityapur, Jharkhand - 831014</p>
                    </div>
                </div>
                <div className='flex flex-row gap-5 h-[20%] items-center'>
                    <div className='text-2xl rounded-full p-2 bg-[#F6AF03] text-[#011C2A] '><FaSquareXTwitter /></div>
                    <div className='text-2xl rounded-full p-2 bg-[#F6AF03] text-[#011C2A] '><FaLinkedin /></div>
                    <div className='text-2xl rounded-full p-2 bg-[#F6AF03] text-[#011C2A] '><AiFillInstagram /></div>
                </div>
                <div className='absolute w-fit right-0 bottom-0 '>
                    <img src={Bubble1} alt="Bubble1" />
                </div >
                <div className='absolute w-fit right-16 bottom-16 '>
                    <img src={Bubble2} alt="Bubble2" />
                </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit(onSubmit)} className='w-[60%] mt-3 relative' >
                <div>
                    {/* FirstName, LastName, Email, Phone Number */}
                    <div className='flex flex-col gap-8 w-full'>
                        <div className='flex gap-4 '>
                            <div className="flex flex-col w-full">
                                <Input
                                    isRequired
                                    type="text"
                                    label="First Name"
                                    labelPlacement='outside'
                                    placeholder="Enter your first name"
                                    variant='bordered'
                                {...register("fName", { required: true })}
                                />
                                {errors.fName && (
                                <span className="ml-2 text-xs tracking-wide text-red-600">
                                    Please add your first name
                                </span>
                            )}

                            </div>
                            <div className="flex flex-col w-full">
                                <Input
                                    isRequired
                                    type="text"
                                    label="Last Name"
                                    labelPlacement='outside'
                                    placeholder="Enter your last name"
                                    variant='bordered'
                                {...register("lName", { required: true })}
                                />
                                {errors.lName && (
                                <span className="ml-2 text-xs tracking-wide text-red-600">
                                    Please add your last name
                                </span>
                            )}
                            </div>
                        </div>
                        <div className='flex gap-4 '>
                            <div className='flex flex-col w-full'>
                                <Input
                                    isRequired
                                    type="email"
                                    label="Email"
                                    labelPlacement='outside'
                                    placeholder="Enter your email address"
                                    variant='bordered'
                                {...register("email", { required: true })}
                                />
                                {errors.email && (
                                <span className="ml-2 text-xs tracking-wide text-red-600">
                                    Please add your email address
                                </span>
                            )}
                            </div>
                            <div className="flex flex-col w-full">
                                <Input
                                    isRequired
                                    type="text"
                                    label="Phone Number"
                                    labelPlacement='outside'
                                    placeholder="Enter your phone number"
                                    variant='bordered'
                                {...register("phone", { required: true })}
                                />
                                {errors.phone && (
                                <span className="ml-2 text-xs tracking-wide text-red-600">
                                    Please add your phone number
                                </span>
                            )}
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <div className='w-full mt-10 '>
                        <Textarea
                            minRows={10}
                            isRequired
                            variant="bordered"
                            label={`Add Your Experience`}
                            labelPlacement="outside"
                            placeholder="Enter your description"
                        {...register("message", { required: true })}
                        />
                        {errors.message && (
                        <span className="ml-2 text-xs tracking-wide text-red-600">
                            Please enter the message.
                        </span>
                    )}
                    </div>

                    {/* Send message button */}
                    <div className=' h-fit flex justify-between mt-7 mr-4'>
                        <ReCAPTCHA
                            sitekey={siteKey}
                            ref={recaptcha}
                            className='h-fit'
                        />
                        <IconBtn
                            text="Send Message"
                            type={"submit"}
                            customClasses={"h-fit !py-3 z-10"}
                        />
                        
                    </div>

                    <div>
                        
                    </div>

                    <div className='absolute -bottom-14 right-12'>
                        <img src={Arrow} alt="Arrow" />
                    </div>


                </div>
            </form>
        </div>
    )
}

export default ContactSection