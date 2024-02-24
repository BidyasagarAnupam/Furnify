import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Upload from './Upload';

const ProductBuilderForm = () => {
    const { product, editProduct } = useSelector((state) => state.product);
    const { token } = useSelector((state) => state.auth);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm()

    return (
        <form>
            {/* general info section & product media section  */}
            <div className='flex flex-row gap-x-6 mt-7'>
                <div
                    className='w-3/5 flex flex-col gap-1 rounded-xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] py-5 px-5'>
                    <h1 className='text-lg font-semibold'>General Information</h1>
                    <div className='flex flex-col gap-2 mt-1'>
                        <label htmlFor="productName" className='text-neutral-11'>Product Name<sup className="text-secondary-red text-sm">*</sup></label>
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
                        <label htmlFor="productDesc" className='text-neutral-11'>Product Description<sup className="text-secondary-red text-sm">*</sup></label>
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
                </div>
                <div className='w-2/5 flex flex-col gap-1 rounded-xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] py-5 px-5'>
                    <h1 className='text-lg font-semibold'>Product Media</h1>
                    <label htmlFor="productImage">Product Image</label>
                    <Upload
                        name="productImage"
                        label="Product Thumbnail"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        editData={editProduct ? product?.thumbnail : null}
                    />

                </div>
            </div>
            {/* Pricing and category section */}
            <div>
                <div></div>
                <div></div>
            </div>
        </form>
    )
}

export default ProductBuilderForm