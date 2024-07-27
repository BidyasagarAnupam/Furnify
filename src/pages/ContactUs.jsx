import React from 'react'
import { IoMdArrowDropright } from 'react-icons/io'
import { NavLink } from 'react-router-dom'
import DummyImg from "../assets/Images/DummyImg.png"
import ContactUsImg from "../assets/contactUsImg.svg"
import IconBtn from "../components/common/IconBtn"
import { BsArrowRight } from "react-icons/bs";
import {useNavigate} from "react-router-dom"
import ContactSection from '../components/ContactUs/ContactSection'

const ContactUs = () => {
    const navigate = useNavigate();
    return (
        <div className='w-full  bg-background'>
            <div className='mt-6 w-10/12 flex flex-col mx-auto gap-11'>
                <div className='w-full flex flex-row items-center'>
                    <div className='flex flex-col items-start gap-8 w-[50%] '>
                        <div className='flex flex-row items-center text-[#3F00FF] font-medium '>
                            <span className='hover:underline'>
                                <NavLink to={'/'}>Home</NavLink>
                            </span>
                            <span><IoMdArrowDropright className='text-lg text-neutral-4' /></span>
                            <span className='text-neutral-4'>
                                <span>Contact Us</span>
                            </span>
                        </div>

                        <div>
                            <p className='text-4xl  font-semibold'>We believe in sustainable decor. We’re passionate about life at home.</p>
                        </div>

                        <div>
                            <p className='text-md text-neutral-4'>Our features timeless furniture, with natural fabrics, curved lines, plenty of mirrors and classic design, which can be incorporated into any decor project. The pieces enchant for their sobriety, to last for generations, faithful to the shapes of each period, with a touch of the present</p>
                        </div>
                    </div>
                    <div className='w-[50%]'>
                        <img src={ContactUsImg} alt="Contact Us" className='w-[500px] mx-auto rounded-md' />
                    </div>
                </div>

                <div className='w-full flex flex-row items-center'>
                    {/* Image Section */}
                    <div className='w-[50%] '>
                        <img src={DummyImg} alt="Dummy" className='w-[500px] mx-auto rounded-md ' />
                    </div>
                    {/* About us Section */}
                    <div className='w-[40%] flex flex-col items-start mx-auto gap-3'>
                        <p className='text-3xl font-medium'>About Us</p>
                        <p className='text-neutral-4 text-medium'>3legant is a gift & decorations store based in HCMC, Vietnam. Est since 2019.
                            Our customer service is always prepared to support you 24/7</p>
                        <IconBtn
                            text="Shop Now"
                            onclick={() => navigate("/allProducts")}
                        >
                            <BsArrowRight className='text-lg font-semibold' />
                        </IconBtn>
                    </div>
                </div>

                <div className='mt-5 w-full flex flex-col items-center gap-3'>
                    <p className='text-[#F6AF03] text-3xl font-bold'>Contact Us</p>
                    <p className='-mt-1 text-medium text-neutral-4 tracking-wide'>Any question or remarks? Just write us a message!</p>
                    <ContactSection />
                </div>
            </div>
        </div>
    )
}

export default ContactUs