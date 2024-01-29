import React from 'react'
import Template from '../components/Auth/Template'
import signupImg from "../assets/Images/ChairLogo.png"

const Signup = () => {
  return (
    <div className=' w-full  bg-neutral-10'>
      <Template
        title="Sign up"
        desc="Already have an account? "
        image={signupImg}
        formtype="signup"
      />
     </div>
  )
}

export default Signup