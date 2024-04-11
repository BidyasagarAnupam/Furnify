import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import Logo from '../../assets/logo/logo-color.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from "react-icons/ai"
import { MdKeyboardArrowDown } from 'react-icons/md'
import { BsChevronDown } from "react-icons/bs"
import ProfileDropdown from '../Auth/ProfileDropdown'


const NavBar = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    const [subLinks, setSubLinks] = useState([])
    const [loading, setLoading] = useState(false)

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div className='flex h-14 items-center justify-center border-b-2 border-neutral-4 '>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                {/* logo */}
                <Link to="/">
                    <img src={Logo} alt="logo" width={120} height={40} loading='lazy' />
                </Link>

                {/* Nav links */}
                <nav>
                    <ul className='flex gap-x-6 text-richblack-25'>
                        {
                            NavbarLinks.map((link, index) => {
                                if (user?.accountType === "Merchant") {
                                    if (user?.accountType !== link.type) return null;
                                    else {
                                        return (
                                            <li key={index}>
                                                {
                                                    <Link to={link?.path} >
                                                        <p className={`${location.hash === '#product' ? '' : matchRoute(link?.path) ? "text-secondary-yellow" : "text-richblack-25"}`}>
                                                            {link?.title}
                                                        </p>
                                                    </Link>
                                                }
                                            </li>
                                        )
                                    }
                                }
                                else if (!link?.type) {
                                    return (
                                        <li key={index}>
                                            {
                                                link.title === "Products" ? (
                                                    <a href={`${link?.path}`}>
                                                        <p className={`${location.hash === '#product' ? "text-secondary-yellow" : "text-richblack-25"}`}>
                                                            {link?.title}
                                                        </p>
                                                    </a>
                                                ) : (
                                                    <Link to={link?.path} >
                                                        <p className={`${location.hash === '#product' ? '' : matchRoute(link?.path) ? "text-secondary-yellow" : "text-richblack-25"}`}>
                                                            {link?.title}
                                                        </p>
                                                    </Link>
                                                )
                                            }
                                        </li>
                                    )
                                }
                            })
                        }
                    </ul>
                </nav>

                {/* Sign in, signup / User drop down */}
                <div className='flex gap-x-4 items-center'>
                    {
                        user && user.accountType !== "Merchant" && (
                            <Link to="/dashboard/cart" className='relative'>
                                <AiOutlineShoppingCart className='text-pure-greys-100 text-2xl ' />
                                {
                                    totalItems > 0 && (
                                        <div className='flex items-center justify-center rounded-full h-4 w-4 bg-red-500 text-white text-sm absolute -right-1 -top-2'>
                                            {totalItems}
                                        </div>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login ">
                                <button className='border border-richblue-700 bg-richblack-800 px-[12px] py-[8px]
                                 text-richblack-100 rounded-md'>
                                    Login
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className='border border-richblue-700 bg-richblack-800 px-[12px] py-[8px]
                                 text-richblack-100 rounded-md'>
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }
                    {
                        token !== null && <ProfileDropdown />
                    }
                </div>
            </div>
        </div>
    )
}

export default NavBar