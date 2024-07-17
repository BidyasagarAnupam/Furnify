import React from 'react'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../common/IconBtn"
import { updateProfile } from '../../../services/operations/SettingsAPI'
import { RiArrowDropDownLine } from "react-icons/ri";
import { Card, CardBody, Button } from "@nextui-org/react";


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
            dispatch(updateProfile(token, data))
            console.log("Updated value : ", data);
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message)
        }
    }

    return (
        <>
            <Card className='mt-5'>
                <CardBody>
                    <form onSubmit={handleSubmit(submitProfileForm)} className='px-6'>
                        <div className="my-10 flex flex-col gap-y-6">
                            <h2 className="text-lg font-semibold text-richblack-5">
                                Profile Information
                            </h2>

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
                                        First Name <sup className='text-secondary-red'>*</sup>
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
                            <div className="flex flex-col lg:flex-row justify-between w-11/12">
                                {/* section for date of birth */}
                                <div className="relative z-0 w-[45%]">
                                    <input
                                        // required
                                        type="date"
                                        name="dateOfBirth"
                                        {...register("dateOfBirth", { required: true })}
                                        defaultValue={user?.additionalDetails?.dateOfBirth}
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
                                        Date of Birth <sup>*</sup>
                                    </label>
                                    {errors.dateOfBirth && (
                                        <span className="-mt-1 text-[12px] text-secondary-red">
                                            Please enter your Date of Birth.
                                        </span>
                                    )}
                                </div>

                                <div className="relative z-0 w-[45%]">
                                    <select
                                        // required
                                        type="text"
                                        name="gender"
                                        {...register("gender", { required: true })}
                                        defaultValue={user?.additionalDetails?.gender}
                                        id="floating_standard"
                                        className=" mt-10 block  px-0 text-md  bg-transparent border-0 border-b-2 
                            appearance-none text-primary border-gray-600 focus:border-neutral-4
                            focus:outline-none focus:ring-0 peer w-full"
                                        placeholder=" " >
                                        {genders.map((ele, i) => {
                                            return (
                                                <option key={i} value={ele}>
                                                    {ele}
                                                </option>
                                            )
                                        })}

                                    </select>
                                    <RiArrowDropDownLine className='absolute right-0 text-3xl bottom-1' />
                                    <label htmlFor="floating_standard"
                                        className="
                            absolute text-md text-neutral-4 duration-300 transform mt-6
                            -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
                            peer-focus:text-neutral-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto">
                                        Gender <sup>*</sup>
                                    </label>
                                    {errors.gender && (
                                        <span className="-mt-1 text-[12px] text-secondary-red">
                                            Please select your Gender
                                        </span>
                                    )}
                                </div>

                            </div>

                            {/* section for contact number and about  */}

                            {/* section for contact number */}
                            <div className="relative z-0 w-[45%]">
                                <input
                                    // required
                                    type="tel"
                                    name="contactNumber"
                                    {...register("contactNumber", { required: true, minLength: 10, maxLength: 10 })}
                                    defaultValue={user?.additionalDetails?.contactNumber}
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
                                    Contact Number <sup>*</sup>
                                </label>

                                {errors.contactNumber && (
                                    <span className="-mt-1 text-[12px] text-secondary-red">
                                        Please enter your 10 digit number.
                                    </span>
                                )}
                            </div>



                        </div>

                        <div className="flex justify-end gap-2">
                            <Button
                                onClick={() => {
                                    navigate("/dashboard/account")
                                }}
                                color='primary'
                                variant='bordered'
                            >
                                Cancel
                            </Button>
                            <Button type="submit" color='primary' >
                                Save
                            </Button>
                        </div>
                    </form>
                </CardBody>
                </Card>

        </>
    )
}

export default EditProfile