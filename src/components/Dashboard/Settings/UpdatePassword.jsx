import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../services/operations/SettingsAPI"
import { Card, CardBody, Button } from "@nextui-org/react";


export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }, reset
  } = useForm()

  const submitPasswordForm = async (data) => {
    console.log("password Data - ", data)
    try {
      await changePassword(token, data, navigate)
      reset()
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }

  return (
    <>
      <Card className='mt-5'>
        <CardBody>
          <form onSubmit={handleSubmit(submitPasswordForm)} className="px-6">
            <div className="mb-8 flex flex-col gap-y-6">
              <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
              <div className="flex flex-col lg:flex-row justify-between w-11/12">
                <div className="relative z-0 w-[45%]">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    id="oldPassword"
                    name="oldPassword"
                    {...register("oldPassword", { required: true })}

                    className=" mt-10 block  px-0 w-full text-md  bg-transparent border-0 border-b-2 
                            appearance-none text-primary border-gray-600 focus:border-neutral-4
                            focus:outline-none focus:ring-0 peer"
                    placeholder=" " />
                  <label for="oldPassword"
                    className="
                            absolute text-md text-neutral-4 duration-300 transform mt-6
                            -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
                            peer-focus:text-neutral-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto">
                    Old Password
                  </label>
                  <span
                    onClick={() => setShowOldPassword((prev) => !prev)}
                    className="absolute right-0 top-[38px] z-[10] cursor-pointer"
                  >
                    {showOldPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                  {errors.oldPassword && (
                    <span className="-mt-1 text-[12px] text-secondary-red">
                      Please enter your old Password
                    </span>
                  )}
                </div>
                <div className="relative z-0 w-[45%]">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    id="newPassword"
                    {...register("newPassword", { required: true })}

                    className=" mt-10 block  px-0 w-full text-md  bg-transparent border-0 border-b-2 
                            appearance-none text-primary border-gray-600 focus:border-neutral-4
                            focus:outline-none focus:ring-0 peer"
                    placeholder=" " />
                  <label for="newPassword"
                    className="
                            absolute text-md text-neutral-4 duration-300 transform mt-6
                            -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0
                            peer-focus:text-neutral-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                            peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4
                            rtl:peer-focus:left-auto">
                    New Password
                  </label>
                  <span
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute right-0 top-[38px] z-[10] cursor-pointer"
                  >
                    {showNewPassword ? (
                      <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                      <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                  </span>
                  {errors.newPassword && (
                    <span className="-mt-1 text-[12px] text-secondary-red">
                      Please enter your New Password
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                onClick={() => {
                  navigate("/dashboard/my-profile")
                }}
                color="primary"
                variant="bordered"
              >
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Update
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>

    </>
  )
}