import React, { useEffect, useState } from 'react'
import FilterSection from './FilterSection'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import { IoMdArrowDropright } from 'react-icons/io'
import IconBtn from '../../../common/IconBtn'
import { MdOutlineAddToPhotos } from 'react-icons/md'
import { IoSearch } from "react-icons/io5";
import ProductsList from './ProductsList'
import { fetchMerchantProducts } from '../../../../services/operations/productDeatilsAPI'
import { useSelector } from 'react-redux'

const MyProducts = () => {
  const navigate = useNavigate();
  const [searchProduct, setSearchProduct] = useState('');
  const [productList, setProductList] = useState([]);
  // const [publishedCount, setPublishedCount] = useState(0)
  const [query, setQuery] = useState({
  })
  const { token } = useSelector((state) => state.auth)
  const [isDeleted, setIsDeleted] = useState(false);

  const handleChange = (e) => {
    setSearchProduct(e.target.value);
  }

  // TODO: Add search functionalty (Enter and Button Click)
  // TODO: Sort Button Functionality Remaining
  // TODO: Problem in reset button 

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetchMerchantProducts(query, token)
      console.log("All Products of Merchant ", res);
      if (res) {
        setProductList(res);
        // count published products
        res.forEach((product) => {
          console.log("status", product.status);
          
        })
        
      }
    }
    fetchProducts()
  }, [isDeleted, query])


  return (
    <div>
      {/* Header Section */}
      <div
        className='flex justify-between items-center border-1 py-4 px-6 rounded-xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
        {/* Left part */}
        <div className='flex flex-col gap-1'>
          <div className='text-2xl font-semibold text-neutral-5'>Products</div>
          <div className='flex flex-row items-center text-[#3F00FF] font-medium '>
            <span className='hover:underline'>
              <NavLink to={'/dashboard/account'}>Dashboard</NavLink>
            </span>
            <span><IoMdArrowDropright className='text-lg text-neutral-4' /></span>
            <span className='text-neutral-4'>
              <span>My Products</span>
            </span>
          </div>
        </div>
        {/* Right Part */}
        <div className='flex flex-row gap-x-2'>
          <div className='flex gap-2 bg-neutral-2 items-center rounded-md lg:w-[300px]'>
            <IoSearch className='ml-2 text-xl' />
            <input
              type="text"
              onChange={handleChange}
              value={searchProduct}
              placeholder='Search Products...'
              className="appearance-none border-none bg-transparent focus:outline-none focus:ring-0"
            />

          </div>
          <IconBtn
            // disabled={loading}
            // type="submit"
            onclick={() => navigate('/dashboard/addProduct')}
            text={"New Product"}
            color='bg-[#327590]'
          >
            <MdOutlineAddToPhotos className='text-lg' />
          </IconBtn>
        </div>
      </div>
      <div>
        {/* Search  */}
      </div>
      <FilterSection setQuery={setQuery} all={productList.length} />

      {/* All Products */}
      <ProductsList productList={productList} setIsDeleted={setIsDeleted} isDeleted={isDeleted} />
    </div>
  )
}

export default MyProducts