import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Upload from './Upload';
import { fetchCategories } from '../../../../services/operations/categoriesAPI';
import { fetchsubCategories } from '../../../../services/operations/subCategories';
import { setProduct } from "../../../../slices/productSlice"
import toast from 'react-hot-toast';
import { addProductDetails, editProductDetails } from "../../../../services/operations/productDeatilsAPI"
import { NavLink } from 'react-router-dom'
import { IoMdArrowDropright } from "react-icons/io";
import { MdOutlineAddToPhotos } from "react-icons/md";
import IconBtn from "../../../common/IconBtn";

const ProductBuilderForm = () => {
    const dispatch = useDispatch()
    const { product, editProduct } = useSelector((state) => state.product);
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false)
    const [productCategory, setProductCategory] = useState([])
    const [productsubCategory, setProductSubCategory] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true)
            const categories = await fetchCategories()
            if (categories.length > 0) {
                // console.log("categories", categories)
                setProductCategory(categories)
            }
            setLoading(false)
        }
        getCategories();
    }, [])

    const handleCategoryChange = (e) => {
        const input = e.target.value;
        setSelectedCategory(input);
    }
    useEffect(() => {
        const getsubCategories = async (cid) => {
            console.log("CID: ", cid);
            setLoading(true)
            if (!cid) {
                return;
            }
            const subCategories = await fetchsubCategories(cid)
            console.log("SubCategory: ", subCategories);
            if (subCategories.length > 0) {
                setProductSubCategory(subCategories)
            }
            setLoading(false)
        }
        getsubCategories(selectedCategory);
    }, [selectedCategory])

    useEffect(() => {
        if (editProduct) {
            setValue("productName", product.name)
            setValue("productDesc", product.description)
            setValue("dimension", product.weight)
            setValue("price", product.price)
            setValue("discount", product.discount)
            setValue("productImage", product.image)
            setValue("productCategory", product.category)
            setValue("productSubCategory", product.subCategory)
        }
    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues()

        if (
            currentValues.productName !== product.name ||
            currentValues.productDesc !== product.description ||
            currentValues.dimension !== product.dimension ||
            currentValues.price !== product.price ||
            currentValues.discount !== product.discount ||
            currentValues.productImage !== product.image ||
            currentValues.productCategory._id !== product.category._id ||
            currentValues.productSubCategory._id !== product.subCategory._id
        ) {
            return true
        }
        return false
    }

    const onSubmit = async (data) => {
        console.log("Data is : ", data);
        if (editProduct) {

            if (isFormUpdated) {
                const currentValues = getValues()
                const formData = new FormData()

                formData.append("productId", product._id)
                if (currentValues.productName !== product.name) {
                    formData.append("productName", data.productName)
                }
                if (currentValues.productDesc !== product.description) {
                    formData.append("productDesc", data.productDesc)
                }
                if (currentValues.dimension !== product.weight) {
                    formData.append("dimension", data.dimension)
                }
                if (currentValues.price !== product.price) {
                    formData.append("price", data.price)
                }
                if (currentValues.discount !== product.discount) {
                    formData.append("discount", data.discount)
                }
                if (currentValues.productImage !== product.image) {
                    formData.append("productImage", data.productImage)
                }
                if (currentValues.productCategory !== product.category) {
                    formData.append("productCategory", data.productCategory)
                }
                if (currentValues.productSubCategory !== product.subCategory) {
                    formData.append("productSubCategory", data.productSubCategory)
                }

                setLoading(true)
                const result = await editProductDetails(formData, token)
                setLoading(false)
                if (result) {
                    dispatch(setProduct(result))
                }
            } else {
                toast.error("No changes made to the form")
            }
            return;
        }

        const formData = new FormData()
        formData.append("productName", data.productName)
        formData.append("productDesc", data.productDesc)
        formData.append("dimension", data.dimension)
        formData.append("price", data.price)
        formData.append("discount", data.discount)
        formData.append("productImage", data.productImage)
        formData.append("productCategory", data.productCategory)
        formData.append("productSubCategory", data.productSubCategory)
        setLoading(true)
        console.log("Form data is: ", formData);
        const result = await addProductDetails(formData, token)
        if (result) {
            dispatch(setProduct(result))
        }
        setLoading(false)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Header Section */}
            <div
                className='flex justify-between items-center border-1 py-4 px-6 rounded-xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
                {/* Left part */}
                <div className='flex flex-col gap-1'>
                    <div className='text-2xl font-semibold text-neutral-5'>Add Product</div>
                    <div className='flex flex-row items-center text-[#3F00FF] font-medium '>
                        <span className='hover:underline'>
                            <NavLink to={'/dashboard/account'}>Dashboard</NavLink>
                        </span>
                        <span><IoMdArrowDropright className='text-lg text-neutral-4' /></span>
                        <span className='hover:underline'>
                            <NavLink to={'/dashboard/myProducts'}>My Products</NavLink>
                        </span>
                        <span><IoMdArrowDropright className='text-lg  text-neutral-4' /></span>
                        <span className='text-neutral-4'>
                            {
                                editProduct ? "Edit Product" : "Add Product"
                            }
                        </span>
                    </div>
                </div>
                {/* Right Part */}
                <div className='flex flex-row gap-x-2'>
                    <IconBtn
                        onclick={() => reset()}
                        disabled={loading}
                        text={"Discard Changes"}
                        outline={true}
                        color='secondary-red'
                    />
                    <IconBtn
                        disabled={loading}
                        type="submit"
                        text={!editProduct ? "Add Product" : "Save Changes"}
                        color='bg-[#327590]'
                    >
                        <MdOutlineAddToPhotos className='text-lg' />
                    </IconBtn>
                </div>
            </div>
            {/* general info section & product media section  */}
            <div className='flex flex-row gap-x-6 mt-7'>
                <div
                    className='w-3/5 flex flex-col gap-1 rounded-xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] py-5 px-5'>
                    <h1 className='text-lg font-semibold'>General Information</h1>
                    <div className='flex flex-col gap-2 mt-1'>
                        <label htmlFor="productName" className='text-neutral-11'>Product Name<sup className="text-secondary-red text-sm mt-2">*</sup></label>
                        <input
                            type="text"
                            id="productName"
                            placeholder="Enter Product Name"
                            {...register("productName", { required: true })}
                            className='inputField'
                        />
                        {errors.productName && (
                            <span className="ml-2 text-xs tracking-wide text-secondary-red">
                                Product Name is required
                            </span>
                        )}
                    </div>

                    <div className='flex flex-col gap-2 mt-1'>
                        <label htmlFor="productDesc" className='text-neutral-11'>Product Description<sup className="text-secondary-red text-sm mt-2">*</sup></label>
                        <textarea rows={5}
                            id="productDesc"
                            placeholder="Enter product description"
                            {...register("productDesc", { required: true })}
                            className='inputField'
                        />
                        {errors.productDesc && (
                            <span className="ml-2 text-xs tracking-wide text-secondary-red">
                                Product Description is required
                            </span>
                        )}
                    </div>

                    <div className='flex w-full gap-5'>
                        <div className='flex flex-col gap-2 mt-1 w-3/5'>
                            <label htmlFor="dimension">Dimensions<sup className="text-secondary-red text-sm mt-2">*</sup></label>
                            <input
                                type="text"
                                id="dimension"
                                placeholder='Ex: 78" x 75"'
                                {...register("dimension", { required: true })}
                                className='inputField'
                            />
                            {errors.dimension && (
                                <span className="ml-2 text-xs tracking-wide text-secondary-red">
                                    Dimension is required
                                </span>
                            )}
                        </div>
                        <div className='flex flex-col gap-2 mt-2'>
                            <p>Do you want to publish ?</p>
                            <div className='flex flex-row gap-3'>
                                <div className=' flex gap-1'>
                                    <input type="radio" name="status" id="yes" value="true" defaultChecked="true" />
                                    <label htmlFor="yes">Yes</label>
                                </div>
                                <div className=' flex gap-1'>
                                    <input type="radio" name="status" id="no" value="false" />
                                    <label htmlFor="no">No</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-2/5 flex flex-col gap-1 rounded-xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] py-5 px-5'>
                    <h1 className='text-lg font-semibold'>Product Media</h1>
                    <Upload
                        name="productImage"
                        label="Product Image"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        editData={editProduct ? product?.image : null}
                    />

                </div>
            </div>
            {/* Pricing and category section */}
            <div className='flex flex-row gap-x-6 mt-7'>
                <div className='w-3/5 flex flex-col gap-1 rounded-xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] py-5 px-5'>
                    <h1 className='text-lg font-semibold'>Pricing</h1>
                    <div className='flex flex-row gap-2'>
                        <div className='w-1/2 flex flex-col gap-2 mt-1'>
                            <label htmlFor="price" className='text-neutral-11'>Base Price<sup className="text-secondary-red text-sm mt-2">*</sup></label>
                            <input
                                type="text"
                                id="price"
                                placeholder="Enter Price"
                                {...register("price", { required: true })}
                                className='inputField'
                            />
                            {errors.price && (
                                <span className="ml-2 text-xs tracking-wide text-secondary-red">
                                    Price is required
                                </span>
                            )}
                        </div>
                        <div className='w-1/2 flex flex-col gap-2 mt-1' >
                            <label htmlFor="discount">Discount Percentage (%)</label>
                            <input
                                type="text"
                                id="discount"
                                placeholder="Enter discount in percentage"
                                {...register("discount", { required: true })}
                                className='inputField'
                            />
                            {errors.discount && (
                                <span className="ml-2 text-xs tracking-wide text-secondary-red">
                                    This field is required
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className='w-2/5 flex flex-col gap-1 rounded-xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] py-5 px-5'>
                    <h1 className='text-lg font-semibold'>Category</h1>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="productCategory">Product Category<sup className="text-secondary-red text-sm mt-2">*</sup></label>
                        <select
                            {...register("productCategory", { required: true })}
                            defaultValue=""
                            id="productCategory"
                            className='inputField'
                            onChange={handleCategoryChange}
                        >
                            <option value="" disabled>
                                Choose a Category
                            </option>
                            {!loading &&
                                productCategory?.map((category, indx) => (
                                    <option key={indx} value={category?._id}>
                                        {category?.name}
                                    </option>
                                ))}
                        </select>
                        {errors.productCategory && (
                            <span className="ml-2 text-xs tracking-wide text-secondary-red">
                                Please choose a Category
                            </span>
                        )}
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="productSubCategory">Product SubCategory<sup className="text-secondary-red text-sm mt-2">*</sup></label>
                        <select
                            {...register("productSubCategory", { required: true })}
                            defaultValue=""
                            id="productSubCategory"
                            className='inputField'
                        >
                            <option value="" disabled>
                                Choose a SubCategory
                            </option>
                            {!loading &&
                                productsubCategory?.map((subCategory, indx) => (
                                    <option key={indx} value={subCategory?._id}>
                                        {subCategory?.name}
                                    </option>
                                ))}
                        </select>
                        {errors.productSubCategory && (
                            <span className="ml-2 text-xs tracking-wide text-secondary-red">
                                Please choose a SubCategory
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </form>
    )
}

export default ProductBuilderForm