import React, { useState } from 'react'
import SubCategoryModal from '../Dashboard/Admin/SubCategory/SubCategoryModal'

const CategoryCard = ({ category }) => {

  console.log("ALL categories are", category)
  // to keep track of confirmation modal
  const [subCategoryModal, setSubCategoryModal] = useState(null)

  return (
    <>
      <div

        onClick={() =>
          setSubCategoryModal({
            heading: category.name,
            subCategory: category.subCategory,
            categoryImage: category.image,
            categoryId: category._id,
            closeIconHandler: () => setSubCategoryModal(null),
          })
        }


        className='
      flex w-auto flex-col gap-y-3 
      items-center justify-center
      hover:cursor-pointer
      pt-3
      '
      >
        <img loading='lazy' className='
      neomorphic
        aspect-square h-auto
        max-w-44 rounded-md
        transition-all
      ease-in-out
      duration-200
      hover:scale-105
      hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)]
        ' src={category?.image} alt="CategoryImage" />
        <p>{category.name}</p>
      </div>
      {subCategoryModal && <SubCategoryModal modalData={subCategoryModal} />}
    </>
  )
}

export default CategoryCard