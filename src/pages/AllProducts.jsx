import React, { useEffect, useState } from 'react'
import FilterSection from '../components/ProductPage/FilterSection'
import { getAllProducts } from '../services/operations/productDeatilsAPI';
import ShowProductTiles from '../components/ProductPage/ShowProductTiles';
import Spinner from '../components/common/Spinner';


const AllProducts = () => {
  
  const [value, setValue] = useState([0, 50000]);
  const [filterData, setFilterData] = useState({
    priceRange: value,
    discount: null,
    category: "",
    subCategory: "",
  });
  const [loading, setLoading] = useState(false)

  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getAllProductsList = async() => {
      const res = await getAllProducts(filterData);
      setProducts(res);
      console.log("Products List: ", res);
      setLoading(false);
    }
    getAllProductsList();
    
  }, [filterData])

 

  return (
    <div className='w-full bg-neutral-10 flex'>
      <div className='w-1/6  h-[100vh] overflow-y-auto px-2 overflow-x-hidden '>
        <FilterSection value={value} setValue={setValue} filterData={filterData} setFilterData={setFilterData} />
      </div>
      <div className=' w-5/6 h-screen overflow-y-auto bg-white'>
        {
          loading ?
            (<div className=' w-full h-full flex justify-center items-center'>
              <Spinner />
            </div>)
            :
            <ShowProductTiles products={products} />
        }
        
      </div>
    </div>
  )
}

export default AllProducts