import React, { useEffect, useState } from 'react'
import {
    addAddress,
    updateAddress
} from "../../../services/operations/addressAPI"
import { setAddress, setEditAddress } from "../../../slices/addressSlice"
import { useDispatch, useSelector } from 'react-redux'
import { get, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Address from '.'
import { Button } from "@nextui-org/react";


const RenderAddressForm = ({ setIsSaved, onClose }) => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        reset,
        formState: { errors },
    } = useForm()

    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.auth)
    const { address, editAddress } = useSelector((state) => state.address)
    const [loading, setLoading] = useState(false)

    const [pinCode, setPinCode] = useState('');
    const [error, setError] = useState('');
    const [locality, setLocality] = useState([]);
    const [city, setCity] = useState([]);
    const [stateName, setStateName] = useState('');


    // Fetch the address details from PIN code
    const fetchZipCodeDetails = async (input) => {
        try {
            // Fetach API
            const response = await fetch(`https://api.postalpincode.in/pincode/${input}`);
            const data = await response.json();
            console.log("Fetching the data....", data);

            if (data[0].Status === "Error") {
                toast.error("Enter a valid zip code")
                setError("ZIP code is not valid");
            } else {
                setError(true)
                const res1 = new Set();
                const res2 = new Set();
                data[0].PostOffice.map((zone) => (
                    res1.add(zone?.Name),
                    zone.Block !== "NA" && res2.add(zone?.Block)
                ))

                let Locality = Array.from(res1);
                let City = Array.from(res2);
                // To set the zipcode into useForm
                setValue("zipCode", input);
                setLocality(Locality);
                setCity(City);
                setStateName(data[0].PostOffice[0].State);
                setValue("state", data[0].PostOffice[0].State);
                setPinCode(input)
            }
        } catch (error) {
            setError("An error occurred while validating ZIP code");
        }
    }

    const handleChange = async (e) => {
        const input = e.target.value;
        if (input.length <= 6) {
            setPinCode(input);
            setError("");
            setLocality([]);
            setCity([]);
            setStateName('');
        }
        if (input.length === 6) {
            fetchZipCodeDetails(input)
        }
    };

    useEffect(() => {
        if (editAddress) {
            console.log("ADDRESS IS : ", address);
            // To show the Address form
            fetchZipCodeDetails(address.zipCode)
            setValue("address", address.address)
            setValue("city", address.city)
            // setValue("state", address.state)
            // setStateName(address.state);
            // setValue("zipCode", address.zipCode)
            // setPinCode(address.zipCode)
            setValue("name", address.name)
            setValue("contactNumber", address.contactNumber)
            setValue("addressType", address.addressType)
            
        }
    }, [editAddress])

    const isFormUpdated = () => {
        const currentValues = getValues()
        console.log("changes after editing form values:", currentValues)
        if (
            currentValues.address !== address.address ||
            currentValues.city !== address.city ||
            currentValues.state !== address.state ||
            currentValues.zipCode !== address.zipCode ||
            currentValues.name !== address.name ||
            currentValues.contactNumber !== address.contactNumber ||
            currentValues.addressType !== address.addressType ||
            currentValues.locality !== address.locality
        ) {
            return true
        }
        return false
    }

    //   handle next button click
    const onSubmit = async (data) => {
        console.log("FORM DATA:", data)
        setIsSaved(false);

        if (editAddress) {

            if (isFormUpdated()) {
                const currentValues = getValues()
                const formData = new FormData()

                console.log("CURRENT VALUES ARE ", currentValues);
                console.log("THE ADDRESS DATA IS", address);
                // console.log(data)
                formData.append("addressId", address._id)
                if (currentValues.address !== address.address) {
                    formData.append("address", data.address)
                }
                if (currentValues.city !== address.city) {
                    formData.append("city", data.city)
                }
                if (currentValues.state !== address.state) {
                    formData.append("state", data.state)
                }
                if (currentValues.zipCode !== address.zipCode) {
                    formData.append("zipCode", data.zipCode)
                }
                if (currentValues.name !== address.name) {
                    formData.append("name", data.name)
                }
                if (currentValues.contactNumber !== address.contactNumber) {
                    formData.append("contactNumber", data.contactNumber)
                }
                if (currentValues.addressType !== address.addressType) {
                    formData.append("addressType", data.addressType)
                }

                setLoading(true)
                const result = await updateAddress(formData, token)
                setLoading(false)
                if (result) {
                    dispatch(setAddress(result))
                    //To hide the form
                    setIsSaved(true)

                    dispatch(setEditAddress(false));
                }
            } else {
                toast.error("No changes made to the form")
            }
            onClose()
            return
        }

        const formData = new FormData()
        formData.append("address", data.address)
        formData.append("city", data.city)
        formData.append("state", data.state)
        formData.append("zipCode", data.zipCode)
        formData.append("name", data.name)
        formData.append("contactNumber", data.contactNumber)
        formData.append("addressType", data.addressType)
        formData.append("locality", data.locality);

        setLoading(true)
        const result = await addAddress(formData, token)
        if (result) {
            dispatch(setAddress(result))
            
            setIsSaved(true);
        }
        onClose()
        setLoading(false)
    }

    const handleCancelBtn = () => {
        onClose();
        reset();
        
        setIsSaved(false);
        dispatch(setEditAddress(false));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" flex flex-col gap-y-6 px-12">

                {/* section for name and contact number */}
                <div className="flex w-11/12 justify-between">
                    <div className="relative z-0 w-[45%]">
                        <input
                            // required
                            type="text"
                            name="name"
                            {...register("name", { required: true })}
                            id="name"
                            className=" mt-10 block  px-0 w-full text-md  bg-transparent border-0 border-b-2 
                            appearance-none text-primary border-gray-600 focus:border-neutral-4
                            focus:outline-none focus:ring-0 peer"
                            placeholder=" " />
                        <label for="name"
                            className="
                            absolute text-md text-neutral-4 duration-300 transform mt-6
                            -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
                            peer-focus:text-neutral-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto">
                            Name <sup className='text-secondary-red'>*</sup>
                        </label>

                        {errors.name && (
                            <span className="-mt-1 text-[12px] text-secondary-red">
                                Please enter your name.
                            </span>
                        )}
                    </div>

                    <div className="relative z-0 w-[45%]">
                        <input
                            // required
                            type="tel"
                            name="contactNumber"
                            {...register("contactNumber", { required: true, minLength: 10, maxLength: 10 })}
                            id="contactNumber"
                            className=" mt-10 block  px-0 w-full text-md  bg-transparent border-0 border-b-2 
                            appearance-none text-primary border-gray-600 focus:border-neutral-4
                            focus:outline-none focus:ring-0 peer"
                            placeholder=" " />
                        <label for="contactNumber"
                            className="
                            absolute text-md text-neutral-4 duration-300 transform mt-6
                            -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
                            peer-focus:text-neutral-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto">
                            Contact Number <sup className='text-secondary-red'>*</sup>
                        </label>

                        {errors.contactNumber && (
                            <span className="-mt-1 text-[12px] text-secondary-red">
                                Please enter your 10 digit number.
                            </span>
                        )}
                    </div>
                </div>

                {/* section for zipcode and locality */}
                <div className="flex w-11/12 justify-between">
                    <div className="relative z-0 w-[45%]">
                        <input
                            // required
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={pinCode}
                            onChange={handleChange}
                            ref={register("zipCode", {
                                required: true,
                                pattern: /^\d{0,6}$/, // Regex pattern for up to 6 digits
                                minLength: { value: 6 },
                            })}
                            className=" mt-10 block  px-0 w-full text-md  bg-transparent border-0 border-b-2 
                            appearance-none text-primary border-gray-600 focus:border-neutral-4
                            focus:outline-none focus:ring-0 peer"
                            placeholder=" " />
                        <label for="zipCode"
                            className="
                            absolute text-md text-neutral-4 duration-300 transform mt-6
                            -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
                            peer-focus:text-neutral-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto">
                            ZipCode <sup className='text-secondary-red'>*</sup>
                        </label>

                        {errors.zipCode && (
                            <span className="-mt-1 text-[12px] text-secondary-red">
                                {
                                    error ? error : (<span>Please enter 6-digit zipCode</span>)
                                }
                            </span>
                        )}
                    </div>
                    <div className="relative z-0 w-[45%]">
                        <select
                            // required
                            type="text"
                            name="locality"
                            {...register("locality", { required: true })}
                            id="locality"
                            className=" mt-10 block  px-0 w-full text-md  bg-transparent border-0 border-b-2 
                            appearance-none text-primary border-gray-600 focus:border-neutral-4
                            focus:outline-none focus:ring-0 peer"
                            placeholder=" " >
                            <option value="">Choose your locality</option>
                            {locality.map((ele, i) => {
                                return (
                                    <option key={i} value={ele}>
                                        {ele}
                                    </option>
                                )
                            })}
                        </select>
                        <label for="locality"
                            className="
                            absolute text-md text-neutral-4 duration-300 transform mt-6
                            -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
                            peer-focus:text-neutral-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto">
                            Locality <sup className='text-secondary-red'>*</sup>
                        </label>

                        {errors.locality && (
                            <span className="-mt-1 text-[12px] text-secondary-red">
                                Please fill out this field.
                            </span>
                        )}
                    </div>
                </div>

                {/* section for  address*/}
                <div className="relative z-0 w-11/12">
                    <textarea
                        // required
                        name="address"
                        {...register("address", { required: true })}
                        id="address"
                        className=" mt-10 block  px-0 w-full text-md  bg-transparent border-0 border-b-2 
                            appearance-none text-primary border-gray-600 focus:border-neutral-4
                            focus:outline-none focus:ring-0 peer"
                        placeholder=" " />
                    <label for="address"
                        className="
                            absolute text-md text-neutral-4 duration-300 transform mt-6
                            -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
                            peer-focus:text-neutral-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto">
                        Address(House/Building, Area and Street) <sup className='text-secondary-red'>*</sup>
                    </label>

                    {errors.address && (
                        <span className="-mt-1 text-[12px] text-secondary-red">
                            Please enter the Address.
                        </span>
                    )}
                </div>

                {/* section for city and state  */}
                <div className="flex w-11/12 justify-between">
                    <div className="relative z-0 w-[45%]">
                        <select
                            // required
                            type="text"
                            name="city"
                            {...register("city", { required: true })}
                            id="city"
                            className=" mt-10 block  px-0 w-full text-md  bg-transparent border-0 border-b-2 
                            appearance-none text-primary border-gray-600 focus:border-neutral-4
                            focus:outline-none focus:ring-0 peer"
                            placeholder=" ">
                            <option value="">Choose your city/District/Town</option>
                            {city.map((ele, i) => {
                                return (
                                    <option key={i} value={ele}>
                                        {ele}
                                    </option>
                                )
                            })}

                        </select>
                        <label for="city"
                            className="
                            absolute text-md text-neutral-4 duration-300 transform mt-6
                            -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
                            peer-focus:text-neutral-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto">
                            City/District/Town <sup className='text-secondary-red'>*</sup>
                        </label>

                        {errors.city && (
                            <span className="-mt-1 text-[12px] text-secondary-red">
                                {`${errors.city}`}
                            </span>
                        )}
                    </div>

                    <div className="relative z-0 w-[45%]">
                        <input
                            // required
                            type="text"
                            name="state"
                            id="state"
                            value={stateName}
                            readOnly="true"
                            {...register("state", { required: true})}
                            className=" mt-10 block  px-0 w-full text-md  bg-transparent border-0 border-b-2 
                            appearance-none text-primary border-gray-600 focus:border-neutral-4
                            focus:outline-none focus:ring-0 peer"
                            placeholder=" " />
                        <label for="state"
                            className="
                            absolute text-md text-neutral-4 duration-300 transform mt-6
                            -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
                            peer-focus:text-neutral-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto">
                            State <sup className='text-secondary-red'>*</sup>
                        </label>

                        {errors.state && (
                            <span className="-mt-1 text-[12px] text-secondary-red">
                                Please fill out this field.
                            </span>
                        )}
                    </div>
                </div>

                <div className=" mt-6 flex flex-col w-[45%] gap-2">
                    <p className='text-sm text-neutral-4'>Address Type <sup className='text-secondary-red'>*</sup></p>
                    <div className='flex gap-4'>
                        <div className='flex gap-3'>
                            <input
                                // required
                                type="radio"
                                name="addressType"
                                {...register("addressType", { required: true })}
                                id="home"
                                value="Home"
                            />
                            <label htmlFor="home">Home</label>
                        </div>
                        <div className='flex gap-3'>
                            <input
                                // required
                                type="radio"
                                name="addressType"
                                {...register("addressType", { required: true })}
                                id="work"
                                value="Work"
                            />
                            <label htmlFor="work">Work</label>
                        </div>
                    </div>
                    {errors.addressType && (
                        <span className="-mt-1 text-[12px] text-secondary-red">
                            Please fill out this field.
                        </span>
                    )}
                </div>

            </div>

            <div className="flex justify-end gap-x-2">
                <Button color="danger" variant="light" onPress={handleCancelBtn}>
                    Cancel
                </Button>
                <Button color="primary" type='submit' >
                    Save
                </Button>
            </div>

        </form>
    )
}

export default RenderAddressForm