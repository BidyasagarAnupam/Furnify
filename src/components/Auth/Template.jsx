import React from 'react'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import { Link } from 'react-router-dom'

const Template = ({ title, desc, image, formtype}) => {

    return (
        <div className='flex flex-col-reverse items-center md:flex-row lg:flex-row justify-between w-11/12 max-w-[1160px] py-12 mx-auto gap-x-12 gap-y-0'>

            <div className=' w-11/12 max-w-[450px] mx-auto '>
                <img src={image}
                    alt="ChairImage"
                    width={558}
                    height={490}
                    loading="lazy"
                    
                />
            </div>

            <div className='w-11/12 max-w-[450px] mt-10 md:mt-0 lg:mt-0' >
                <h1
                    className='text-neutral-5 font-semibold text-[1.875rem] leading-[2.375rem]'
                >
                    {title}
                </h1>

                <p className='text-[1.125rem] leading[1.625rem] mt-4' >
                    <span className='text-neutral-4'>{desc}</span>
                    <Link to={formtype === "login" ? "/signup" : "/login"}>
                        <span className='text-neutral-5 font-semibold'>
                            {formtype === "login" ? "Sign Up" : "Sign in"}
                        </span>
                    </Link>
                </p>

                {formtype === "signup" ?
                    (<SignupForm />) :
                    (<LoginForm />)}

            </div>

        </div>
    )
}

export default Template
