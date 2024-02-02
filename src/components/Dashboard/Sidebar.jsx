import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../data/dashboard-links"
import { logout } from "../../services/operations/authAPI"
import ConfirmationModal from "../common/ConfirmationModal"
import SidebarLink from "./SidebarLink"
import { MdOutlineCameraAlt } from "react-icons/md";
import { IconContext } from "react-icons"

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)

  if (profileLoading || authLoading) {
    return (
      <div className="grid h-[calc(100vh-3.5rem)] min-w-[220px] items-center border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="spinner"></div>
      </div>
    )
  }

  function getTimeOfDay() {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 6 && currentHour < 12) {
      return 'Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Afternoon';
    } else {
      return 'Evening';
    }
  }

  return (
    <>
      <div className="flex h-[calc(70vh-3.5rem)] 
      min-w-[220px] flex-col 
      neomorphic
      lg:mt-20
      lg:ml-6
      relative
       py-10">
        {/* image */}
        
        <div className="flex flex-col">
          <div className="rounded-full relative -top-5 left-[30%]">
            <img src={user?.image} alt={`profile-${user?.firstName}`}
              className="aspect-square w-[70px] rounded-full object-cover"
            />
            <NavLink to={'/dashboard/settings'}>
              <div className="absolute top-12 left-10 text-2xl rounded-full bg-white p-[0.20rem]">
                <MdOutlineCameraAlt />
              </div>
            </NavLink>
          </div>
          <div>
            <p className="text-center font-semibold mb-5">{`Good ${getTimeOfDay()} Divyanshu😊`}</p>
          </div>
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
          <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => dispatch(logout(navigate)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="px-8 py-2 text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-2">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>
        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}
