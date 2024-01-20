import React from 'react'
import Banner from "../assets/Images/Banner.png"

const Home = () => {
  return (
    <div>
        {/* Section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 gap-y-10 max-w-maxContent items-center 
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
        </div>

        {/* Section 2 */}
        <div>

        </div>
    </div>
  )
}

export default Home