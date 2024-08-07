import React, { useEffect, useState } from 'react'
import FilterSection from '../components/ProductPage/FilterSection'
import { getAllProducts } from '../services/operations/productDeatilsAPI';
import ShowProductTiles from '../components/ProductPage/ShowProductTiles';
import Spinner from '../components/common/Spinner';
import { useParams } from 'react-router-dom';
import ProductCardSkeleton from '../components/common/skeleton/ProductCardSkeleton';


const AllProducts = () => {
  
  const [value, setValue] = useState([0, 50000]);
  
  const [loading, setLoading] = useState(false)

  const [products, setProducts] = useState([]);

  const { categoryId, subCategoryId } = useParams()

  const [filterData, setFilterData] = useState({
    priceRange: value,
    discount: null,
    category: categoryId ? categoryId : "",
    subCategory: subCategoryId ? subCategoryId : "",
    rating:null
  });



  useEffect(() => {
    setLoading(true);
    const getAllProductsList = async () => {
      console.log("FILTER DATA", filterData);
      const res = await getAllProducts(filterData);
      setProducts(res);
      console.log("Products List: ", res);
      setLoading(false);
    }
    getAllProductsList();
    
  }, [filterData])

 

  return (
    <div className='w-full bg-white flex'>
      <div className='w-1/6  h-[100vh] overflow-y-auto px-2 overflow-x-hidden '>
        <FilterSection value={value} setValue={setValue} filterData={filterData} setFilterData={setFilterData} />
      </div>
      <div className=' w-5/6 h-screen overflow-y-auto bg-background'>
        {
          loading ?
            (
              <div className='grid mx-3 my-3 grid-cols-2 lg:grid-cols-4 gap-2 gap-y-10'>
                {
                  Array.from({ length: 8 }).map((_, index) => (
                    <ProductCardSkeleton key={index} />
                  ))
                }
              </div>
            )
            :
            <ShowProductTiles products={products} />
        }
        
      </div>
    </div>
  )
}

export default AllProducts