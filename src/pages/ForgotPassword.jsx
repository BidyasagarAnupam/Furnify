import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import PrimaryButton from "../components/common/PrimaryButton"

import { getPasswordResetToken } from "../services/operations/authAPI"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
    <div className="grid min-h-[calc(100vh-5rem)] place-items-center w-full bg-neutral-10">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-neutral-5">
            {!emailSent ? "Reset your password" : "Check email"}
          </h1>
          <p className="my-4 -mb-2 text-[17px] leading-[1.625rem] text-neutral-5">
            {!emailSent
              ? "Kindly provide your email to receive password reset instructions. For account recovery assistance, please reach out. Your security is of the utmost importance. "
                : <>We have sent the reset email to <span className="font-semibold">{email}</span></>}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
                <div className="relative z-0">
                  <input
                    required
                    type="text"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    id="floating_standard"
                    className=" mt-10 block  px-0 w-11/12 text-md  bg-transparent border-0 border-b-2 
                            appearance-none text-primary border-gray-600 focus:border-neutral-4
                            focus:outline-none focus:ring-0 peer"
                    placeholder=" " />
                  <label for="floating_standard"
                    className="
                            absolute text-md text-neutral-4 duration-300 transform mt-6
                            -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
                            peer-focus:text-neutral-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-10
                            peer-focus:scale-75 peer-focus:-translate-y-16 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto">
                    Email
                  </label>
                </div>
            )}
            
              {
                !emailSent ?
                  <PrimaryButton type={"submit"} text={"Submit"} width={"11/12"} /> :
                  <PrimaryButton type={"submit"} text={"Resend Email"} width={"11/12"} />
              }
              
          </form>
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack /> Back To Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword
