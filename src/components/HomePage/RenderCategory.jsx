import React from 'react'
import { fetchCategories } from "../../services/operations/categoriesAPI"
import { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import CategorySkeleton from '../common/skeleton/CategorySkeleton'

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
         setLoading(false);
      }

      getCategories();
      
   }, [])
   return (
      <div className='grid w-11/12 mx-auto gap-y-5 lg:grid-cols-6 md:grid-cols-3 grid-cols-1 '>
         {
            loading ? (
               Array.from({ length: 12 }).map((_, index) => (
                  <CategorySkeleton key={index} />
               ))
            ) :
            (
               categories.map((category, index) => (
                  <CategoryCard key={index} category={category} />
               ))

               )
         }
      </div >
   )
}

export default RenderCategory