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
import { setSubCategory } from '../../../../slices/categorySlice'
import toast from 'react-hot-toast';
import IconBtn from '../../../common/IconBtn'
import { MdOutlineAddToPhotos } from 'react-icons/md';
const AddSubCategory = () => {
    const { subCategory } = useSelector((state) => state.category)
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { cId } = useParams()
    const [loading, setLoading] = useState(false)
    const editSubc = useParams().isEdit;
    const editSubcategory = (editSubc === 'true')
    console.log("editSubcategory", editSubcategory);
    useEffect(() => {
        console.log("subCategory", subCategory);
    }, [subCategory])

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        if (editSubcategory) {
            console.log("Chala");
            setValue("name", subCategory.name)
            setValue("image", subCategory.image)
        }
    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues()
        if (
            currentValues.name !== subCategory.name ||
            currentValues.image !== subCategory.image) {
            return true;
        }
        return false;
    }

    const onSubmit = async (data) => {
        if (editSubcategory) {
            if (isFormUpdated) {
                const currentValues = getValues()
                console.log("currentValues", currentValues);
                console.log("subCategory", subCategory);
                const formData = new FormData()

                formData.append("subId", subCategory._id)
                data.subId = subCategory._id
                console.log("DATA is", data);
                if (currentValues.name !== subCategory.name) {
                    formData.append("name", data.name)
                }
                if (currentValues.image !== subCategory.image) {
                    formData.append("image", data.image)
                }
                setLoading(true)
                const result = await editsubCategory(formData, token)
                setLoading(false)
                if (result) {
                    dispatch(setSubCategory(result))
                    navigate('/dashboard/adminDashboard')
                }

            } else {
                toast.error("No changes made to the form")

            }
            return;
        }
        data.cid = cId
        console.log("DATA", data);
        const formData = new FormData()
        formData.append("name", data.name)
        formData.append("image", data.image)
        formData.append("cid", cId)

        console.log("FROM DATA", formData);
        setLoading(true)
        const result = await createSubCategory(data, token)
       
        console.log("SubCategory created", result);
        if (result) {
            dispatch(setSubCategory(result))
            navigate('/dashboard/adminDashboard')
        } 
        setLoading(false)
    }


    return (
        <div className='w-full flex flex-col gap-10'>
            <div className='w-full flex justify-between'>
                <div className='flex flex-col gap-1'>
                    <div className='text-2xl font-semibold text-neutral-5'>Add SubCategory</div>
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
                            <NavLink to={'/dashboard/adminDashboard/addSubCategory'}>Add SubCategory</NavLink>
                        </span>
                    </div>
                </div>

                {/* <div className='flex items-center gap-6'>
                    <div className='flex gap-1 items-center p-3 border-1 border-[#858D9D] text-[#858D9D] rounded-lg'>
                        <RxCross2 className='text-xl' />
                        <button className='text-sm'>Cancel</button>
                    </div>
                    <div className='flex gap-1 items-center p-3 text-white rounded-lg bg-[#883DCF]'>
                        <FiPlus className='text-xl' />
                        <button className='text-sm'>Add SubCategory</button>
                    </div>
                </div> */}

            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-3 gap-4 h-[350px] '>
                    <div className='shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] h-full col-span-1 bg-white rounded-lg  p-3 flex flex-col items-start
                '>
                        <p className='text-lg font-medium mb-2'>Thumbnail</p>
                        {/* <p>Photo</p> */}
                        <Upload
                            name="image"
                            label="SubCategory Image"
                            register={register}
                            setValue={setValue}
                            errors={errors}
                            color='text-[#883DCF]'
                            editData={editSubcategory ? subCategory?.image : null}
                        />

                    </div>
                    <div className='shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] h-fit col-span-2 bg-white rounded-lg  p-3'>
                        <p className='text-lg font-medium mb-10'>General Information</p>
                        <Input
                            isRequired
                            type="text"
                            label="Name"
                            defaultValue={subCategory?.name}
                            variant='bordered'
                            labelPlacement='outside'
                            {...register("name", { required: true })}
                            placeholder="Enter Subcategory Name"
                        />
                        {errors.name && (
                            <span className="ml-2 text-xs tracking-wide text-secondary-red">
                                Product Name is required
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
                                text={!editSubcategory ? "Add Product" : "Save Changes"}
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