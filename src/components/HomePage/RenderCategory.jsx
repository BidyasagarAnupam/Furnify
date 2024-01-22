import React from 'react'
import {fetchCategories} from "../../services/operations/categoriesAPI"
import { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'

const RenderCategory = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
      const getCategories = async() =>{
         const res = await fetchCategories();
         if(res){
            setCategories(res);
         }
      }

      getCategories();
  }, [])
  return (
    <div>
       { categories.map((category, index) =>(
            <CategoryCard key={index} category={ category}/>
        ))}
    </div>
  )
}

export default RenderCategory