import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../common/IconBtn"
import { updateProfile } from '../../../services/operations/SettingsAPI'


const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]


const EditProfile = () => {
    const { user } = useSelector((state) => state.profile)
    console.log("------- From Edit Profile user is------- ", user);
    const { token } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    // useForm is used to handle the edit form submission
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const submitProfileForm = async (data) => {
        // console.log("Form Data - ", data)
        try {
            // TODO
            dispatch(updateProfile(token, data))
            console.log("Updated value : ", data);
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submitProfileForm)}>
                <div className="my-10 flex flex-col gap-y-6 neomorphic p-8 px-12">
                    <h2 className="text-lg font-semibold text-richblack-5">
                        Profile Information
                    </h2>
                    {/* div for first name and last name */}
                    {/* <div className="flex flex-col gap-5 lg:flex-row">
                        
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="firstName" className="lable-style">
                                First Name <sup className="text-pink-200">*</sup>
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="Enter first name"
                                className="form-style"
                                {...register("firstName", { required: true })}
                                defaultValue={user?.firstName}
                            />
                            {errors.firstName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your first name.
                                </span>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="lastName" className="lable-style">
                                Last Name <sup className="text-pink-200">*</sup>
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Enter first name"
                                className="form-style"
                                {...register("lastName", { required: true })}
                                defaultValue={user?.lastName}
                            />
                            {errors.lastName && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your last name.
                                </span>
                            )}
                        </div>
                    </div> */}
                    <div className="flex w-11/12 justify-between">
                        <div className="relative z-0 w-[45%]">
                            <input
                                // required
                                type="text"
                                name="firstName"
                                {...register("firstName", { required: true })}
                                defaultValue={user?.firstName}
                                id="floating_standard"
                                className=" mt-10 block  px-0 w-full text-md  bg-transparent border-0 border-b-2 
                            appearance-none text-primary border-gray-600 focus:border-neutral-4
                            focus:outline-none focus:ring-0 peer"
                                placeholder=" " />
                            <label for="floating_standard"
                                className="
                            absolute text-md text-neutral-4 duration-300 transform mt-6
                            -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
                            peer-focus:text-neutral-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto">
                                First Name
                            </label>

                            {errors.firstName && (
                                <span className="-mt-1 text-[12px] text-secondary-red">
                                    Please enter your first name.
                                </span>
                            )}
                        </div>


                        <div className="relative z-0 w-[45%]">
                            <input
                                // required
                                type="text"
                                name="lastName"
                                {...register("lastName", { required: true })}
                                defaultValue={user?.lastName}
                                id="floating_standard"
                                className=" mt-10 block  px-0 w-full text-md  bg-transparent border-0 border-b-2 
                            appearance-none text-primary border-gray-600 focus:border-neutral-4
                            focus:outline-none focus:ring-0 peer"
                                placeholder=" " />
                            <label for="floating_standard"
                                className="
                            absolute text-md text-neutral-4 duration-300 transform mt-6
                            -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
                            peer-focus:text-neutral-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto">
                                Last Name
                            </label>
                            {errors.lastName && (
                                <span className="-mt-1 text-[12px] text-secondary-red">
                                    Please enter your last name.
                                </span>
                            )}
                        </div>
                    </div>

                    {/* section for date of birth and  gender*/}
                    <div className="flex flex-col gap-5 lg:flex-row">
                        {/* section for date of birth */}
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="dateOfBirth" className="lable-style">
                                Date of Birth <sup className="text-pink-200">*</sup>
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                id="dateOfBirth"
                                className="form-style"
                                {...register("dateOfBirth", {
                                    required: {
                                        value: true,
                                        message: "Please enter your Date of Birth.",
                                    },
                                    max: {
                                        value: new Date().toISOString().split("T")[0],
                                        message: "Date of Birth cannot be in the future.",
                                    },
                                })}
                                defaultValue={user?.additionalDetails?.dateOfBirth}
                            />
                            {errors.dateOfBirth && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.dateOfBirth.message}
                                </span>
                            )}
                        </div>
                        {/* section for gender */}
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="gender" className="lable-style">
                                Gender <sup className="text-pink-200">*</sup>
                            </label>
                            <select
                                type="text"
                                name="gender"
                                id="gender"
                                className="form-style"
                                {...register("gender", { required: true })}
                                defaultValue={user?.additionalDetails?.gender}
                            >
                                {genders.map((ele, i) => {
                                    return (
                                        <option key={i} value={ele}>
                                            {ele}
                                        </option>
                                    )
                                })}
                            </select>
                            {errors.gender && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    Please enter your gender
                                </span>
                            )}
                        </div>
                    </div>

                    {/* section for contact number and about  */}
                    <div className="flex flex-col gap-5 lg:flex-row">
                        {/* section for contact number */}
                        <div className="flex flex-col gap-2 lg:w-[48%]">
                            <label htmlFor="contactNumber" className="lable-style">
                                Contact Number <sup className="text-pink-200">*</sup>
                            </label>
                            <input
                                type="tel"
                                name="contactNumber"
                                id="contactNumber"
                                placeholder="Enter Contact Number"
                                className="form-style"
                                {...register("contactNumber", {
                                    required: {
                                        value: true,
                                        message: "Please enter your Contact Number.",
                                    },
                                    maxLength: { value: 12, message: "Invalid Contact Number" },
                                    minLength: { value: 10, message: "Invalid Contact Number" },
                                })}
                                defaultValue={user?.additionalDetails?.contactNumber}
                            />
                            {errors.contactNumber && (
                                <span className="-mt-1 text-[12px] text-yellow-100">
                                    {errors.contactNumber.message}
                                </span>
                            )}
                        </div>

                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => {
                            navigate("/dashboard/account")
                        }}
                        className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
                    >
                        Cancel
                    </button>
                    <IconBtn type="submit" text="Save" />
                </div>
            </form>
        </div>
    )
}

export default EditProfile