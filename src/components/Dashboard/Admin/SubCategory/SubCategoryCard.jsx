import React from 'react'
import { useNavigate } from 'react-router-dom';

const SubCategoryCard = ({ subCategory, categoryId }) => {
    const navigate = useNavigate();
    console.log("Subcategory: ", subCategory);
    return (
        <div onClick={()=> navigate(`/allProducts/${categoryId}/${subCategory._id}`)} className='flex flex-col gap-3 items-center'>
            <img loading='lazy' src={subCategory.image} alt={subCategory.name} className='rounded-md object-cover lg:h-[125px]' />
            <p>{subCategory.name}</p>
        </div>
    )
}

export default SubCategoryCard