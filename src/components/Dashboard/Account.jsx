import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import IconBtn from '../common/IconBtn'
import { RiEditBoxLine } from 'react-icons/ri'
import { formattedDate } from "../../utils/dateFormatter"
import { IoMdArrowDropright } from 'react-icons/io'
import { Button, Input } from '@nextui-org/react'
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

const Account = () => {
  const { user } = useSelector((state) => state.profile)
  console.log("-------From My Profile user is --------", user);
  const navigate = useNavigate();
  return (
    <div>
      <div
        className='flex justify-between items-center border-1 mb-8 py-4 px-6 rounded-xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
        {/* Left part */}
        <div className='flex flex-col gap-1'>
          <div className='text-2xl font-semibold text-neutral-5'>My Account</div>
          <div className='flex flex-row items-center text-[#3F00FF] font-medium '>
            <span className='hover:underline'>
              <NavLink to={'/dashboard/account'}>Dashboard</NavLink>
            </span>
            <span><IoMdArrowDropright className='text-lg text-neutral-4' /></span>
            <span className='text-neutral-4'>
              <span>Personal Details</span>
            </span>
          </div>
        </div>
        {/* Right Part */}
        <div className='flex flex-row gap-x-2'>
          <Button
            color='primary'
            endContent={<RiEditBoxLine />}
            onPress={() => navigate("/dashboard/settings")}
          >
            Edit
          </Button>
        </div>
      </div>
      {/* section 3 */}

      <Card className="w-full p-5">
        <CardBody>
          <div className='grid grid-cols-2 gap-5 w-full'>
            <Input color='primary' type="text" variant='faded' label="First Name" defaultValue={user?.firstName} readOnly />
            <Input type="text" variant='bordered' label="Last Name" defaultValue={user?.lastName} readOnly />
            <Input type="email" variant='faded' label="Email" defaultValue={user?.email} readOnly />
            <Input type="number" variant='bordered' label="Phone Number" placeholder='Add Phone Number' defaultValue={user?.additionalDetails?.contactNumber} readOnly />
            <Input type="text" variant='faded' label="Gender" placeholder='Add Gender' defaultValue={user?.additionalDetails?.gender} readOnly />
            <Input type="text" variant='bordered' label="Date of Birth" defaultValue={formattedDate(user?.additionalDetails?.dateOfBirth) ??
              "Add Date Of Birth"} readOnly />
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default Account