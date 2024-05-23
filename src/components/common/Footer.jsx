import React from 'react'
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare, FaYoutubeSquare } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import visaLogo from '../../assets/Images/Visa-Logo.png'
import mastercardLogo from '../../assets/Images/mastercard-loog.webp'
import americanEXpressLogo from '../../assets/Images/american-express.svg'
import paypalLogo from '../../assets/Images/paypal-logo.png'

const Footer = () => {
  return (
    <footer className='relative mt-6 w-full bg-[#313C4E]'>
      <div className='w-full px-5 py-4  lg:w-11/12 md:py-9 md:px-10 lg:px-24 mx-auto text-white'>
        <div className='flex flex-col gap-4 flex-wrap  md:flex-row md:justify-around lg:justify-between items-center mb-10'>
        {/* News letter */}
          <div className='flex flex-col gap-3 w-full  md:w-fit'>
            <p className='text-3xl text-center md:text-left'>News Letter</p>
            <p className='md:w-2/3'>
              Suscribe to our newsletter and get the latest updates and promotions
            </p>
            <div className='flex flex-col gap-2'>
              <input type="text" placeholder='Email' className='md:w-2/3 py-3 px-2 rounded-sm text-black'/>
              <button className='md:w-2/3 py-3 px-2 bg-[#FF8316] rounded-sm'>Suscribe</button>
            </div>
          </div>
          <div className='w-full text-center md:text-left md:w-fit flex flex-col gap-3 md:gap-8'>
            <p className='text-2xl'>Categories</p>
            <div className='flex flex-col gap-2'>
              <p>Mattresses & Beddings</p>
              <p>Beds & Side Tables</p>
              <p>Pillows & Cushions</p>
              <p>Sofas & Seating</p>
              <p>Wardrobes & Dressing Tables</p>
            </div>
          </div>
          <div className='w-full text-center md:text-left md:w-fit flex flex-col gap-3 md:gap-8'>
            <p className='text-2xl'>Support</p>
            <div className='flex flex-col gap-2'>
              <p>My Account</p>
              <p>Help Center</p>
              <p>FAQ</p>
              <p>Contact Us</p>
            </div>
          </div>
          {/* Location */}
          <div className='w-full text-center md:text-left md:w-fit flex flex-col gap-3 md:gap-8'>
            <p className='text-2xl'>Locations</p>
            <div className='flex flex-col gap-2'>
              <p>NIT Jamshedpur</p>
              <p className='flex gap-1 items-center justify-center'><MdEmail className='text-[#FF8316]'/> teamdebugger404@gmail.com</p>
              <p className='flex gap-1 items-center justify-center'><FaPhone className='text-[#FF8316]' />+91 981xxxxx38</p>
              <div className='flex gap-4 justify-center'>
                {/* icons */}
                <FaFacebookSquare className='text-4xl cursor-pointer'/>
                <FaInstagramSquare className='text-4xl cursor-pointer'/>
                <FaTwitterSquare className='text-4xl cursor-pointer'/>
                <FaYoutubeSquare className='text-4xl cursor-pointer'/>
              </div>
            </div>
          </div>
        </div>
        {/* Horizontal bar */}
        <div className='absolute left-0 right-0 border-t border-gray-500'> </div>
        <div className='flex gap-3 flex-col justify-center md:flex-row md:justify-between items-center py-3'>
          <p className=''>Copyright © 2024 Furnify. All Rights Reserved.</p>
          {/* Payment logo */}
          <div className='flex justify-around md:justify-between items-center w-full md:w-1/4'>
            <img src={visaLogo} alt="Visa logo" width="60px" className='h-fit'/>
            <img src={mastercardLogo} alt="mastercardLogo" width="60px" className='h-fit' />
            <img src={americanEXpressLogo} alt="american express logo" width="50px" className='h-fit' />
            <img src={paypalLogo} alt="paypal logo" width="70px" className='h-fit' />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer