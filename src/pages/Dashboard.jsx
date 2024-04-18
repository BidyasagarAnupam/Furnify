import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import Sidebar from "../components/Dashboard/Sidebar"

function Dashboard() {
    const { loading: profileLoading } = useSelector((state) => state.profile)
    const { loading: authLoading } = useSelector((state) => state.auth)

    if (profileLoading || authLoading) {
        return (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div className="  flex min-h-[calc(100vh-2rem)] bg-[#F9F9FC]">
            <Sidebar />
            <div className="h-[calc(100vh-2rem)] flex-1 overflow-auto">
                <div className="mx-auto w-11/12  py-10 ">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
