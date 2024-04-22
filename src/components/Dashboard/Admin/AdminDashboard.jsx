import React, { useEffect, useState } from 'react'
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import { deleteCategory, fetchCategories } from '../../../services/operations/categoriesAPI';
import { deleteSubCategory, fetchsubCategories } from '../../../services/operations/subCategories';
import Spinner from '../../common/Spinner';
import { RiPencilFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaPenClip, FaSquarePlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setEditCategory, setEditSubCategory, setSubCategory } from '../../../slices/categorySlice';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";


const AdminDashboard = () => {
  // const { editSubCategory, subCategory } = useSelector((state) => state.category)
  const {token} = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subC, setSubC] = useState([]);
  const [subCategoryLoading, setSubCategoryLoading] = useState(false);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSubCategory, setSelectedSubCategory] = useState("")
  const [isDeleted, setIsDeleted] = useState(false)
  const [isNotShowSubCategory, setIsNotShowSubCategory] = useState(true);
  const [type, setType] = useState("")

  const getSubCategories = async (cid) => {
    setSubCategoryLoading(true);
    if (!cid) return;

    const subCategoriesData = await fetchsubCategories(cid);
    if (subCategoriesData.length > 0) {
      setSubC(subCategoriesData);
    }
    setSubCategoryLoading(false);
  };

  useEffect(() => {
    const getAllCategories = async () => {
      const res = await fetchCategories();
      setAllCategories(res);
      console.log("RESSSSS", res[0]._id);
      setSelectedCategory(res[0]._id)
    }
    getAllCategories();
  }, [isDeleted])

  const handleCategoryClick = ({ cid }) => {
    setIsNotShowSubCategory(!isNotShowSubCategory);
    setSelectedCategory(cid);
    getSubCategories(cid);
  }

  const handleEditSubCategory = (item) => {
    dispatch(setEditSubCategory(true))
    dispatch(setSubCategory(item))

    navigate(`/dashboard/adminDashboard/edit/editsubCategory/${true}`)
  }

  const handleEditCategory = (item) => {
    dispatch(setEditCategory(true))
    dispatch(setCategory(item))
    navigate(`/dashboard/adminDashboard/edit/editCategory/true`)
  }

  const deleteModalHandler = (id, item) => {
    setType(item) 
    if (item === "subCategory")
      setSelectedSubCategory(id);
    else {
      setSelectedCategory(id)
    }
    onOpen()
  }

  const deleteHandler = async (onClose) => {
    console.log("TYPE", type)
    if (type === "subCategory") {
        await deleteSubCategory(selectedSubCategory, token)
        // alert("SubCategory deleted")
    } else {
      // alert("Category deleted")

      await deleteCategory(selectedCategory, token)
    }
    setIsDeleted(!isDeleted)
    onClose()
  }

  return (
    <div className='flex flex-col items-start gap-8'>
      <h1 className='text-3xl font-semibold '>All Categories & subcategories</h1>
      <div className='flex flex-col items-center justify-center gap-2 hover:cursor-pointer  hover:font-semibold transition-all duration-100'>
        <div onClick={() => navigate(`/dashboard/adminDashboard/add/addCategory`)} className='flex justify-center items-center w-[70px] aspect-square border-2 border-dashed rounded-md bg-[#EAF8FF] border-[#2086BF]'>
          <FaSquarePlus className='text-xl text-[#16597F]' />
        </div>
        <p className='text-sm'>Add Category</p>
      </div>
      <div className='w-full flex gap-2'>
        <Accordion className='w-1/2'>
          {
            allCategories.map((category) => (
              <AccordionItem
                isDisabled={!isNotShowSubCategory && !(selectedCategory === category._id)}
                onPress={() => handleCategoryClick({ cid: category._id })}
                key={category._id}
                aria-label={category.name}
                startContent={
                  <Avatar
                    color="primary"
                    radius="sm"
                    size='lg'
                    src={category.image}
                  />
                }
                title={
                  <div className='flex justify-between'>
                    <p>{category.name}</p>
                  </div>
                }
              >
                <div className='flex justify-center items-center gap-4'>
                  <div className='flex flex-col items-center justify-center gap-2 hover:cursor-pointer  hover:font-semibold transition-all duration-100'>
                    <div onClick={() => handleEditCategory(category) } className='flex justify-center items-center w-[70px] aspect-square border-2 border-dashed rounded-md bg-[#D3F4EF] border-[#1A9882]'>
                      <FaPenClip className='text-xl text-[#1A9882]' />
                    </div>
                    <p className='text-sm'>Edit Category</p>
                  </div>
                  <div className='flex flex-col items-center justify-center gap-2 hover:cursor-pointer  hover:font-semibold transition-all duration-100'>
                    <div onClick={() => deleteModalHandler(category._id, "category")} className='flex justify-center items-center w-[70px] aspect-square border-2 border-dashed rounded-md bg-[#FBD8DB] border-[#EB3D4D]'>
                      <MdDelete className='text-xl text-[#EB3D4D]' />
                    </div>
                    <p className='text-sm'>Delete Category</p>
                  </div>
                </div>
              </AccordionItem>
            ))

          }
        </Accordion>
        {/* All Subcategories  */}
        <div className={`w-1/2 h-fit ${isNotShowSubCategory ? "hidden" : "block"}`}>
          {
            subCategoryLoading ?
              (<div className='flex flex-row justify-center items-center mt-1'>
                <Spinner small={true} />
              </div>) :
              (
                <div className='grid grid-cols-4 gap-3 border-2 border-dotted rounded-md bg-[#F6F5F2] border-[#BBAB8C] p-3 '>
                  {
                    subC.map((item) => (
                      <div className='flex flex-col items-center justify-center gap-2 hover:cursor-pointer  hover:font-semibold transition-all duration-100'>
                        <div className=' group relative'>
                          <img src={item.image} alt="subcategory" loading='lazy' className='w-[100px] aspect-square rounded-md' />
                          <div className=' gap-2 absolute top-0 w-full h-full bg-[#4c505177] rounded-md hidden group-hover:flex items-center justify-center !opacity-100 transition-all duration-400 ease-in'>
                            <RiPencilFill className='text-2xl text-slate-300' onClick={() => handleEditSubCategory(item)} />
                            <MdDelete className='text-2xl  text-red-600' onClick={() => deleteModalHandler(item._id, "subCategory")} />
                          </div>
                        </div>
                        <p className="text-sm"
                        >{item.name}</p>
                      </div>
                    ))
                  }
                  <div className='flex flex-col items-center justify-center gap-2 hover:cursor-pointer  hover:font-semibold transition-all duration-100'>
                    <div onClick={() => navigate(`/dashboard/adminDashboard/add/addsubCategory/${selectedCategory}`)} className='flex justify-center items-center w-[100px] aspect-square border-2 border-dashed rounded-md bg-[#EAF8FF] border-[#2086BF]'>
                      <FaSquarePlus className='text-4xl text-[#16597F]' />
                    </div>
                    <p className='text-sm'>Add SubCategory</p>
                  </div>
                </div>
              )
          }
        </div>
      </div>
      <Modal backdrop='blur' isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 border-b-2">{`🚨Are you sure to delete this ${type}?`}</ModalHeader>
              <ModalBody>
                <p>
                  {`All Products will be deleted which are inside this ${type}!`}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={() => deleteHandler(onClose)}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default AdminDashboard