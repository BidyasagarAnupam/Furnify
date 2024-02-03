import React from 'react'
import Banner from "../assets/Images/Banner.png"
import one from "../assets/icons/one.svg"
import two from "../assets/icons/two.svg"
import three from "../assets/icons/three.svg"
import four from "../assets/icons/four.svg"
import RenderCategory from '../components/HomePage/RenderCategory'
import RenderNewLaunches from '../components/HomePage/RenderNewLaunches'

const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      {/* <div className='relative mx-auto flex flex-col w-11/12 gap-y-10 max-w-maxContent items-center 
      text-white justify-between'>
        <img className="w-full" src={Banner} alt="BannerImage" />
        <div className='flex justify-between w-full items-center'>
          <h1 className='lg: text-[72px] w-[40%] leading-tight'>
            Simply Unique/
            Simply Better.
          </h1>

          <p className='w-[40%] text-md text-neutral-4'>
            <span className='text-neutral-4 font-bold'>Furnify</span> is a gift & decorations store based in HCMC, <br /> Vietnam. Est since 2019.
          </p>
        </div>
      </div> */}

      <div className='w-full h-[780px] bg-hero-section bg-no-repeat bg-cover flex flex-col justify-center items-center'>
        <div className='text-[3.5rem] w-1/2 text-neutral-3 font-semibold text-center leading-[4rem] -mt-36'>Furniture that everyone Loves</div>
        <p className='w-1/2 text-center text-neutral-9 text-lg mt-10 tracking-wide'>
          We have 5000+ Reviews and customers trust on our furniture and Qualilty products.
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, impedit!
        </p>
        <button className=' text-neutral-3 px-20 py-3 bg-primary rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 mt-12
"'>Shop Now</button>
      </div>

      {/* Section 2 */}
      <div className='w-full'>
        <div className='h-3 bg-neutral-8'></div>
        <div
          className='
              w-9/12 flex flex-row
              gap-x-2 items-center
              mx-auto justify-evenly
              my-2 
        '>
          <div className='flex gap-3 items-center justify-center'>
            <img src={one} alt="" />
            <p className='text-secondary-purple font-semibold'>1 Million+ Happy Customers</p>
          </div>
          <div className='flex gap-3 items-center justify-center'>
            <img src={two} alt="" />
            <p className='text-secondary-purple font-semibold'>Free Shipping</p>
          </div>
          <div className='flex gap-3 items-center justify-center'>
            <img src={three} alt="" />
            <p className='text-secondary-purple font-semibold'>Free Installation</p>
          </div>
          <div className='flex gap-3 items-center justify-center'>
            <img src={four} alt="" />
            <p className='text-secondary-purple font-semibold'>No Cost EMIs</p>
          </div>
        </div>
        <div className='h-3 bg-neutral-8'>

        </div>
      </div>

      {/* Section 3 : Shop by Category*/}
      <div id={'product'} className='mt-3 mx-auto '>
        <p className='
        text-center text-[2rem] font-semibold
        '>
          Shop By Category
        </p>
        <div className='mx-auto mt-4'>
          <RenderCategory />
        </div>

      </div>

      {/* Section 4: New Launches */}
      <div className="flex flex-col bg-neutral-2 mt-5">
        <p className="flex px-5 my-5 items-start font-bold text-4xl text-neutral-4 overflow-hidden">
          New Launches
        </p>
        <div>
          <RenderNewLaunches />
        </div>

      </div>


    </div >
  )
}

export default Home