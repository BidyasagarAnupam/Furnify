import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import PrimaryButton from "../common/PrimaryButton"

import { sendOTP } from "../../services/operations/authAPI"
import { setSignupData } from "../../slices/authSlice"
import { ACCOUNT_TYPE } from "../../utils/constants"
import Tab from "../../components/common/Tab"

const SignupForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // customer or merchant
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.CUSTOMER)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const { firstName, lastName, email, password, confirmPassword } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    // Handle Form Submission
    const handleOnSubmit = (e) => {
        e.preventDefault()


        if (password !== confirmPassword) {
            toast.error("Password not match with confirm password")
            return
        }
        const signupData = {
            ...formData,
            accountType,
        }

        // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignupData(signupData))
        // Send OTP to user for verification
        dispatch(sendOTP(formData.email, navigate))

        // Reset
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
        setAccountType(ACCOUNT_TYPE.CUSTOMER)
    }

    // data to pass to Tab component
    const tabData = [
        {
            id: 1,
            tabName: "Customer",
            type: ACCOUNT_TYPE.CUSTOMER,
        },
        {
            id: 2,
            tabName: "Merchant",
            type: ACCOUNT_TYPE.MERCHANT,
        },
    ]


    return (
        <div>
            {/* Tab */}
            <Tab tabData={tabData} field={accountType} setField={setAccountType} />
            {/* Form */}
            <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
                <div className="flex gap-x-4">
                    <div className="relative z-0">
                        <input
                            required
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={handleOnChange}
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
                    </div>

                    <div className="relative z-0">
                        <input
                            required
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={handleOnChange}
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
                    </div>
                </div>

                <div className="relative z-0">
                    <input
                        required
                        type="text"
                        name="email"
                        value={email}
                        onChange={handleOnChange}
                        id="floating_standard"
                        className=" mt-10 block  px-0 w-10/12 text-md  bg-transparent border-0 border-b-2 
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
                        Email
                    </label>
                </div>
                <div className="flex gap-x-4">
                    <div className="relative z-0">
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            id="floating_standard"
                            name="password"
                            value={password}
                            onChange={handleOnChange}

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
                            Password
                        </label>
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-0 top-[38px] z-[10] cursor-pointer"
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </div>
                    <div className="relative z-0">
                        <input
                            required
                            type={showConfirmPassword ? "text" : "password"}
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleOnChange}
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
                            Confirm Password
                        </label>
                        <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-0 top-[38px] z-[10] cursor-pointer"
                        >
                            {showConfirmPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </div>
                </div>
                
                <PrimaryButton type={"submit"} text={"Sign up"} width={"11/12"} />

            </form>
        </div>
    )
}

export default SignupForm