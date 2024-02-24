import React from 'react'

const SubCategoryCard = ({ subCategory }) => {
    console.log("Subcategory: ", subCategory);
    return (
        <div className='flex flex-col gap-3 items-center'>
            <img loading='lazy' src={subCategory.image} alt={subCategory.name} className='rounded-md object-cover lg:h-[125px]' />
            <p>{subCategory.name}</p>
        </div>
    )
}

export default SubCategoryCard