import React, { useEffect, useState } from 'react'
import { matchPath, useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo/logo.png'
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineCaretDown, AiOutlineShoppingCart } from "react-icons/ai"
import { MdKeyboardArrowDown } from 'react-icons/md'
import { BsChevronDown } from "react-icons/bs"
import ProfileDropdown from '../Auth/ProfileDropdown'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button, DropdownMenu, DropdownItem, DropdownTrigger, Dropdown, Avatar, DropdownSection } from "@nextui-org/react";
import { logout } from '../../services/operations/authAPI'
import { sidebarLinks } from '../../data/dashboard-links'


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
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    // useEffect(() => {
    //     console.log("isMenuOpen---->", isMenuOpen);
    //     setIsMenuOpen(false);
    // }, [location.hash === '#product'])

    return (
        <Navbar
            maxWidth='xl'
            position="static"
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className='bg-white'
        >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link href='/' >
                        <img src={Logo} alt="logo" className='w-[150px] aspect-square h-full mt-2' loading='lazy' />
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-10" justify="center">
                {
                    NavbarLinks.map((link, index) => {
                        if (user?.accountType === "Merchant" || user?.accountType === "Admin") {
                            if (user?.accountType !== link.type) return null;
                            else {
                                return (
                                    <NavbarItem key={index}>
                                        {
                                            <Link href={link?.path} >
                                                <p className={`${location.hash === '#product' ? '' : matchRoute(link?.path) ? "text-secondary-yellow" : "text-richblack-25"}`}>
                                                    {link?.title}
                                                </p>
                                            </Link>
                                        }
                                    </NavbarItem>
                                )
                            }
                        }
                        else if (!link?.type) {
                            return (
                                <NavbarItem key={index}>
                                    {
                                        link.title === "Shop" ? (
                                            <a href={`${link?.path}`}>
                                                <p className={`${location.hash === '#product' ? "text-secondary-yellow" : "text-richblack-25"}`}>
                                                    {link?.title}
                                                </p>
                                            </a>
                                        ) : (
                                            <Link href={link?.path} >
                                                <p className={`${location.hash === '#product' ? '' : matchRoute(link?.path) ? "text-secondary-yellow" : "text-richblack-25"}`}>
                                                    {link?.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </NavbarItem>
                            )
                        }
                    })
                }

            </NavbarContent>

            <NavbarContent justify="end">
                {/* <NavbarItem className="hidden lg:flex">
                    <Link href="#">Login</Link>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Sign Up
                    </Button>
                </NavbarItem> */}
                {
                    user && user.accountType !== "Merchant" && (
                        <NavbarItem>
                            <Link href="/dashboard/cart" className='relative'>
                                <AiOutlineShoppingCart className='text-pure-greys-100 text-2xl ' />
                                {
                                    totalItems > 0 && (
                                        <div className='flex items-center justify-center rounded-full h-4 w-4 bg-red-500 text-white text-sm absolute -right-1 -top-2'>
                                            {totalItems}
                                        </div>
                                    )
                                }
                            </Link>
                        </NavbarItem>
                    )
                }
                {
                    token === null && (
                        <NavbarItem>
                            <Link href="/login ">
                                <button className='border border-richblue-700 bg-richblack-800 px-[12px] py-[8px]
                                          text-richblack-100 rounded-md'>
                                    Login
                                </button>
                            </Link>
                        </NavbarItem>
                    )
                }
                {
                    token === null && (
                        <NavbarItem>
                            <Link href="/signup">
                                <button className='border border-richblue-700 bg-richblack-800 px-[12px] py-[8px]
                                          text-richblack-100 rounded-md'>
                                    Sign Up
                                </button>
                            </Link>
                        </NavbarItem>
                    )
                }
                {
                    token !== null && (

                        <Dropdown
                            placement="bottom-end"    
                        >
                            <DropdownTrigger>
                                <div className='flex gap-2 items-center'>
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="transition-transform"
                                        color="secondary"
                                        name={user?.firstName}
                                        size="sm"
                                        src={user?.image}
                                    />
                                    <AiOutlineCaretDown className="text-sm text-richblack-100" />
                                </div>

                            </DropdownTrigger>
                            <DropdownMenu
                                aria-label="Profile Actions"
                                variant="flat"
                                selectionMode='single'
                            >
                                <DropdownSection  showDivider>
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-medium text-medium">Signed in as</p>
                                        <p className="font-medium text-medium">{user?.email}</p>
                                    </DropdownItem>
                                </DropdownSection>

                                {/* <DropdownItem key="settings">My Settings</DropdownItem>
                                    <DropdownItem key="team_settings">Team Settings</DropdownItem>
                                    <DropdownItem key="analytics">Analytics</DropdownItem>
                                    <DropdownItem key="system">System</DropdownItem>
                                    <DropdownItem key="configurations">Configurations</DropdownItem>
                                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem> */}

                                <DropdownSection  showDivider>

                                    {
                                        sidebarLinks.map((link) => {
                                            if (link.type && user?.accountType !== link.type) return null
                                            return (
                                                <DropdownItem
                                                    key={link.id}
                                                    className={`
                                                    ${matchRoute(link.path)
                                                            ? "bg-[#c4c9d0] text-yellow-50"
                                                            : "bg-opacity-0 text-richblack-300"
                                                        }
                                                    `}
                                                >
                                                    <Link href={link.path}>
                                                        {link.name}
                                                    </Link>
                                                </DropdownItem>
                                            )
                                        })
                                    }
                                </DropdownSection>

                                <DropdownSection >
                                    <DropdownItem key="logout" color="danger" onClick={() => dispatch(logout(navigate))}>
                                        Log Out
                                    </DropdownItem>
                                </DropdownSection>
                            </DropdownMenu>
                        </Dropdown>

                    )
                }
            </NavbarContent>
            <NavbarMenu className='z-50 items-center flex flex-col'>
                {
                    NavbarLinks.map((link, index) => {
                        if (user?.accountType === "Merchant" || user?.accountType === "Admin") {
                            if (user?.accountType !== link.type) return null;
                            else {
                                return (
                                    <NavbarMenuItem

                                        
                                        key={index}>
                                        {
                                            <Link
                                                href={link?.path} >
                                                <p

                                                    className={`${location.hash === '#product' ? '' : matchRoute(link?.path) ? "text-secondary-yellow" : "text-richblack-25"}`}>
                                                    {link?.title}
                                                </p>
                                            </Link>
                                        }
                                    </NavbarMenuItem>
                                )
                            }
                        }
                        else if (!link?.type) {
                            return (
                                <NavbarMenuItem key={index}>
                                    {
                                        link.title === "Shop" ? (
                                            <a href={`${link?.path}`}>
                                                <p className={`${location.hash === '#product' ? "text-secondary-yellow" : "text-richblack-25"}`}>
                                                    {link?.title}
                                                </p>
                                            </a>
                                        ) : (
                                            <Link href={link?.path} >
                                                <p className={`${location.hash === '#product' ? '' : matchRoute(link?.path) ? "text-secondary-yellow" : "text-richblack-25"}`}>
                                                    {link?.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </NavbarMenuItem>
                            )
                        }
                    })
                }
            </NavbarMenu>
        </Navbar>
    )
}

export default NavBar