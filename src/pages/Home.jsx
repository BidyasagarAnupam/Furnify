import React from 'react'
import one from "../assets/icons/one.svg"
import two from "../assets/icons/two.svg"
import three from "../assets/icons/three.svg"
import four from "../assets/icons/four.svg"
import bgImg1 from '../assets/Images/bgImg1.png'
import bgImg2 from '../assets/Images/bgImg2.png'
import RenderCategory from '../components/HomePage/RenderCategory'
import RenderNewLaunches from '../components/HomePage/RenderNewLaunches'
import { RiCheckboxCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom"
import RenderRatingReviews from '../components/HomePage/RenderRatingReviews'

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className='w-full h-[1000px] bg-hero-section bg-no-repeat bg-cover flex flex-col justify-center items-center relative'>
        <div className='text-[3.5rem] w-1/2 text-white font-semibold text-center leading-[4rem] -mt-36'>Furniture that everyone Loves</div>
        <p className='w-1/2 text-center text-white text-lg mt-10 tracking-wide'>
          We have 5000+ Reviews and customers trust on our furniture and Qualilty products.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, impedit!
        </p>
        <Link to={'/allProducts'} className=' text-neutral-3 px-20 py-3 bg-yellow-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg  mt-12 mr-16 font-semibold
        "'>Shop By Category</Link>

        {/* <div className='w-full h-10 bg-gradient-to-b from-secondary-brown to-neutral-3 absolute bottom-0'></div> */}

        <div className='grid lg:grid-cols-4 grid-cols-2 lg:grid-rows-1 grid-rows-2 gap-y-10 p-6 gap-x-3 lg:w-8/12 w-2/3 lg:h-[150px] h-[300px] absolute lg:-bottom-16 -bottom-32 bg-secondary-darkgreen rounded-3xl'>
          <div className=' h-full text-neutral-3 border-r-2 border-r-neutral-3 flex flex-col gap-3 items-center justify-center'>
            <img src={one} alt="" className='w-12 h-12' />
            <p className='w-8/12 text-center text-white font-semibold'>1 Million+ Happy Customers</p>
          </div>
          <div className=' h-full text-neutral-3 lg:border-r-2 border-r-neutral-3 flex flex-col gap-3 items-center justify-center'>
            <img src={two} alt="" className='w-12 h-12' />
            <p className='w-8/12 text-center text-white font-semibold'>Free Shipping</p>
          </div>
          <div className=' h-full text-neutral-3 border-r-2 border-r-neutral-3 flex flex-col gap-3 items-center justify-center'>
            <img src={three} alt="" className='w-12 h-12' />
            <p className='w-8/12 text-center text-white font-semibold'>Free Installation</p>
          </div>
          <div className=' h-full text-neutral-3 flex flex-col gap-3 items-center justify-center'>
            <img src={four} alt="" className='w-12 h-12' />
            <p className='w-8/12 text-center text-white font-semibold'>No Cost EMIs</p>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className='w-11/12 mt-20 flex flex-col mx-auto'>
        <div className=' flex w-full justify-between h-[500px] p-11'>
          <div className='flex items-center justify-center w-1/2'>
            <img src={bgImg1} alt="" className='h-[90%] rounded-md' />
          </div>
          <div className='flex items-center justify-center w-1/2 py-4'>
            <div className='flex gap-4 h-[90%] flex-col '>
              {/* heading */}
              <h1 className='text-4xl text-neutral-5 w-2/3 font-semibold'>We Create your home more aestetic</h1>
              {/* sub heading */}
              <p className='w-3/4 tracking-wide text-neutral-5'>Furnitre power is a software as services for multiperpose business management system, </p>

              {/* points */}
              <div className='flex flex-col gap-11'>
                <div className='flex gap-3'>
                  {/* icon */}
                  <div>
                    <RiCheckboxCircleFill className='text-2xl' />
                  </div>

                  {/* text */}
                  <div className='flex flex-col gap-2'>
                    <p className='font-semibold'>Valuation Services</p>
                    <p className='text-sm text-neutral-4'>Sometimes features require a short description.  This can be detailed description</p>
                  </div>
                </div>
                <div className='flex gap-3'>
                  {/* icon */}
                  <div>
                    <RiCheckboxCircleFill className='text-2xl' />
                  </div>

                  {/* text */}
                  <div className='flex flex-col gap-2'>
                    <p className='font-semibold'>Development of Furniture Modelss</p>
                    <p className='text-sm text-neutral-4'>Sometimes features require a short description. This can be detailed description</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: New Launches */}
      <div className="flex flex-col">
        <p className="flex px-10 my-5 items-start font-bold text-4xl text-neutral-4 overflow-hidden">
          New Launches
        </p> 
        <div className='h-[360px]'>
          <RenderNewLaunches />
        </div>
      </div>

      {/* Section 4 */}
      <div className='w-11/12 flex flex-col mx-auto'>
        <div className=' flex flex-row-reverse w-full justify-between h-[500px] p-11'>
          <div className='flex items-center justify-center w-1/2'>
            <img src={bgImg2} alt="" className='h-[90%] rounded-md' />
          </div>
          <div className='flex items-center justify-center w-1/2 py-4'>
            <div className='flex gap-6 h-[90%] flex-col '>
              {/* heading */}
              <h1 className='text-4xl text-neutral-5 w-4/5 font-semibold'>The Best Furniture Manufacturer of your choice</h1>
              {/* sub heading */}
              <p className='w-3/4 tracking-wide text-neutral-5 leading-7'>Furnitre power is a software as services for multiperpose business management system, expecially for them who are running two or more business exploree the future Furnitre power is a software as services \ </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Shop by Category*/}
      <div id='product' className=' mx-auto mt-3 '>
        <p className='
        text-center text-[2rem] font-semibold
        '>
          Shop By Category
        </p>
        <div className='mx-auto mt-4'>
          <RenderCategory />
        </div>

      </div>

      {/* Section5 - Rating and Review Section */}
      <div className='flex flex-col mt-10'>
        {/* Heading section */}
        <div className='flex flex-col text-center'>
          <p className='text-[2rem] font-semibold'>Their Words, Our Pride</p>
          <p className='text-lg text-neutral-4'>Happy Words of our Happy Customers</p>
        </div>
        <div className='w-full mx-auto h-[300px] mt-10'>
          <RenderRatingReviews/>
        </div>
      </div>

    </div>
  )
}

export default Home