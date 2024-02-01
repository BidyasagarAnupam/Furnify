import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

import {login} from "../../services/operations/authAPI"
import PrimaryButton from "../common/PrimaryButton"

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false)

    const {email, password } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    // Handle Form Submission
    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch((login(email, password, navigate)))
    }


    return (
        <div>
            {/* Form */}
            <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">

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
            
                <div className="relative z-0">
                        <input
                            required
                            type={showPassword ? "text" : "password"}
                            id="floating_standard"
                            name="password"
                            value={password}
                            onChange={handleOnChange}

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
                            Password
                        </label>
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute lg:right-20 top-[38px] z-[10] cursor-pointer"
                        >
                            {showPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                    </span>
                    
                    <Link to="/forgot-password">
                        <p className="mt-2 ml-auto mr-[4.5rem] max-w-max text-sm text-neutral-5 font-semibold">
                            Forgot Password ?
                        </p>
                    </Link>

                </div>

                <PrimaryButton type={"submit"} text={"Sign in"} width={"11/12"}/>
                
            </form>
        </div>
    )
}

export default LoginForm