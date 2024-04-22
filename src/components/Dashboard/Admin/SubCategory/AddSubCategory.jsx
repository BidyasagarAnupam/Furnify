import React, { useEffect, useState } from 'react'
import { IoMdArrowDropright } from 'react-icons/io'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { RxCross2 } from "react-icons/rx";
import { FiPlus } from "react-icons/fi";
import SquareIcon from "../../../../assets/icons/Square Icon Badge.png"
import { useForm } from 'react-hook-form';
import Upload from '../../Merchant/AddProduct/Upload';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@nextui-org/react';
import { createSubCategory, editsubCategory } from '../../../../services/operations/subCategories';
import { setCategory, setSubCategory } from '../../../../slices/categorySlice'
import toast from 'react-hot-toast';
import IconBtn from '../../../common/IconBtn'
import { MdOutlineAddToPhotos } from 'react-icons/md';
import { createCategory, editCategory } from '../../../../services/operations/categoriesAPI';
const AddSubCategory = () => {
    const { subCategory, category } = useSelector((state) => state.category)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cId, type, check, isEdit } = useParams()
    const [loading, setLoading] = useState(false)

    // Hum konse page main hain
    let isEditPage = false, isEditCategory = false, isAddCategory = false;
    console.log("TYPE", type)
    console.log("CHECK", check)

    // If type is 
    if(check) {
        isEditPage = true;
        if (check === 'editCategory') {
            isEditCategory = true;
        } else {
            isEditCategory = false;
        }
    } else {
        // Hum Add wale page main hai
        isEditPage = false;
        if (type === 'addCategory') {
            isAddCategory = true;
        } else {
            isAddCategory = false;
        }
    }
    const editSubc = isEdit;
    const editSubcategory = (editSubc === 'true')

    let whatItIs = isEditPage ? (isEditCategory ? "Edit Category" : "Edit Subcategory") : (isAddCategory ? "Add Category" : "Add Subcategory")

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (whatItIs === 'Edit Subcategory') {
            console.log("Chala edit subcategory");
            console.log("SUCATEGORY", subCategory)
            setValue("name", subCategory?.name)
            setValue("image", subCategory?.image)
        } else if (whatItIs === 'Edit Category') {
            console.log("Chala edit category");
            setValue("name", category?.name)
            setValue("image", category?.image)
        }
    }, [])

    const isFormUpdated = () => {

        const currentValues = getValues()
        if (whatItIs === 'Edit Subcategory') {
            if (
                currentValues?.name !== subCategory?.name ||
                currentValues?.image !== subCategory?.image) {
                return true;
            }
        } else if (whatItIs === 'Edit Category') {
            if (
                currentValues?.name !== category?.name ||
                currentValues?.image !== category?.image) {
                return true;
            }
        }
        
        return false;
    }

    const onSubmit = async (data) => {

        // For Edit subcategory
        if (whatItIs === 'Edit Subcategory') {
            // Then we check if the form is updated or not
            if (isFormUpdated) {
                const currentValues = getValues()
                const formData = new FormData()

                formData.append("subId", subCategory._id)
                data.subId = subCategory._id
                console.log("DATA is", data);
                if (currentValues?.name !== subCategory?.name) {
                    formData.append("name", data?.name)
                }
                if (currentValues?.image !== subCategory?.image) {
                    formData.append("image", data?.image)
                }
                setLoading(true)
                const result = await editsubCategory(formData, token)
                setLoading(false)
                if (result) {
                    dispatch(setSubCategory(result))
                    navigate('/dashboard/adminDashboard')
                }
                // Form is not updated
            } else {
                toast.error("No changes made to the form")
            }
            return;
            // For Edit Category
        } else if (whatItIs === 'Edit Category') {
            if (isFormUpdated) {
                const currentValues = getValues()
                console.log("currentValues", currentValues);
                console.log("Category", category);
                const formData = new FormData()

                formData.append("cid", category._id)
                console.log("DATA is", data);
                if (currentValues?.name !== category?.name) {
                    formData.append("name", data?.name)
                }
                if (currentValues?.image !== category?.image) {
                    formData.append("image", data?.image)
                }
                setLoading(true)
                const result = await editCategory(formData, token)
                setLoading(false)
                if (result) {
                    dispatch(setCategory(result))
                    navigate('/dashboard/adminDashboard')
                }

            } else {
                toast.error("No changes made to the form")
            }
            return;
        }


        

        data.cid = cId
        // console.log("DATA", data);
        const formData = new FormData()
        formData.append("name", data?.name)
        formData.append("image", data?.image)
        formData.append("cid", cId)

        console.log("FROM DATA", formData);
        setLoading(true)

        // Add Subcategory
        if (whatItIs === 'Add Subcategory') {
            const result = await createSubCategory(data, token)
            console.log("SubCategory created", result);
            if (result) {
                dispatch(setSubCategory(result))
                navigate('/dashboard/adminDashboard')
            } 
        } else if (whatItIs === 'Add Category'){
            const result = await createCategory(data, token)
            console.log("Category created", result);
            if (result) {
                dispatch(setCategory(result))
                navigate('/dashboard/adminDashboard')
            } 
        }
        
        setLoading(false)
    }


    return (
        <div className='w-full flex flex-col gap-10'>
            <div className='w-full flex justify-between'>
                <div className='flex flex-col gap-1'>
                    <div className='text-2xl font-semibold text-neutral-5'>{whatItIs}</div>
                    <div className='flex flex-row items-center text-[#883DCF] font-medium gap-1'>
                        <span className='hover:underline'>
                            <NavLink to={'/dashboard/adminDashboard'}>Dashboard</NavLink>
                        </span>
                        <span><IoMdArrowDropright className='text-lg text-neutral-4' /></span>
                        <span className='hover:underline'>
                            <NavLink to={'/dashboard/adminDashboard'}>Categories</NavLink>
                        </span>
                        <span><IoMdArrowDropright className='text-lg text-neutral-4' /></span>
                        <span className='text-neutral-4'>
                            <p>{whatItIs}</p>
                        </span>
                    </div>
                </div>

            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-3 gap-4 h-[350px] '>
                    <div className='shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] h-full col-span-1 bg-white rounded-lg  p-3 flex flex-col items-start
                '>
                        <p className='text-lg font-medium mb-2'>Thumbnail</p>
                        {/* <p>Photo</p> */}
                        <Upload
                            name="image"
                            label={`${whatItIs === "Add Category" || whatItIs === "Edit Category" ? "Category Image" : "SubCategory Image"}`}
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            color='text-[#883DCF]'
                            editData={
                                whatItIs === "Edit Category"
                                    ? category?.image
                                    : whatItIs === "Edit Subcategory"
                                        ? subCategory?.image
                                        : null
                            }
                            // editSubcategory ? subCategory?.image : null
                        />

                    </div>
                    <div className='shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] h-fit col-span-2 bg-white rounded-lg  p-3'>
                        <p className='text-lg font-medium mb-10'>General Information</p>
                        <Input
                            isRequired
                            type="text"
                            label="Name"
                            defaultValue={
                                whatItIs === "Edit Category"
                                    ? category?.name
                                    : whatItIs === "Edit Subcategory"
                                        ? subCategory?.name
                                        : null
                            }
                            variant='bordered'
                            labelPlacement='outside'
                            {...register("name", { required: true })}
                            placeholder="Enter Subcategory Name"
                        />
                        {errors?.name && (
                            <span className="ml-2 text-xs tracking-wide text-secondary-red">
                                Name is required
                            </span>
                        )}

                        <div className='flex flex-row gap-x-2'>
                            <IconBtn
                                
                                disabled={loading}
                                text={"Discard Changes"}
                                outline={true}
                                color='secondary-red'
                            />
                            <IconBtn
                                disabled={loading}
                                type="submit"
                                text={whatItIs === "Edit Category" || whatItIs === "Edit SubCategory" ? "Save Changes" : whatItIs}
                                color='bg-[#327590]'
                            >
                                <MdOutlineAddToPhotos className='text-lg' />
                            </IconBtn>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddSubCategory