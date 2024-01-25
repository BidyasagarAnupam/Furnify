import React from 'react'
import { fetchCategories } from "../../services/operations/categoriesAPI"
import { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'

const RenderCategory = () => {
   const [categories, setCategories] = useState([]);
   const [loading, setLoading] = useState(false);
   useEffect(() => {
      const getCategories = async () => {
         setLoading(true);
         const res = await fetchCategories();
         if (res) {
            setCategories(res);
         }
      }

      getCategories();
      setLoading(false);
   }, [])
   return (
      loading ? (
         <div>Loading...</div>
      ) :
         (<div className='grid w-11/12 mx-auto gap-y-5 lg:grid-cols-6 md:grid-cols-4 grid-cols-3'>
            {categories.map((category, index) => (
               <CategoryCard key={index} category={category} />
            ))
            }
         </div >)
   )
}

export default RenderCategory