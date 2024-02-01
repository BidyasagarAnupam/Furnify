import React from 'react'
import Template from '../components/Auth/Template'
import loginImg from "../assets/Images/ChairLogo.png"

const Login = () => {
  return (
    <div className=' w-full  bg-neutral-10 h-[calc(100vh-5rem)] overflow-y-hidden'>
      <Template
        title="Sign In"
        desc="Don't have an account yet? "
        image={loginImg}
        formtype="login"
      />
    </div>
  )
}

export default Login