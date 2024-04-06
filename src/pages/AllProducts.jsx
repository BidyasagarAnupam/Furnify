import React from 'react'
import FilterSection from '../components/ProductPage/FilterSection'


const AllProducts = () => {

  return (
    <div className='w-full bg-neutral-10 flex'>
      <div className='w-1/6  h-[100vh] overflow-y-auto px-2 overflow-x-hidden '>
        <FilterSection/>
      </div>
      <div className=' w-5/6 h-screen bg-slate-900'>

      </div>
    </div>
  )
}

export default AllProducts