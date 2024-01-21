import { toast } from "react-hot-toast"

import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { resetCart } from "../../slices/cartSlice"
import { apiConnector } from "../apiconnector"
import { authEndpoints } from "../apis"

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
} = authEndpoints

export function sendotp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
            })

            console.log("SENDOTP API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error();
            }

            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
        } catch (error) {
            console.log("SENDOTP API ERROR............", error.response.data)
            toast.error(error.response.data.message)
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate) {

    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                accountType,
                otp
            })

            console.log("SIGNUP API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Signup Successful")
            navigate("/login")
        } catch (error) {
            console.log("SIGNUP API ERROR............", error.response.data)
            // toast.error("Signup Failed")
            toast.error(error.response.data.message)
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }

}

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            })

            console.log("LOGIN API RESPONSE............", response)

            if (!response.data.success) {
                console.log("Yahan pe error aaya");
                throw new Error(response.data.message)
            }

            toast.success("Login Successful");

            // set the token data
            dispatch(setToken(response.data.token))

            console.log("TOKEN SET HO GEYA............");

            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            console.log("USER SET HONE WALA HAI.........");

            dispatch(setUser({ ...response.data.user, image: userImage }))
            console.log("USER SET HO GEYA>>>>>");

            // to store thw token into local storage
            localStorage.setItem("token", JSON.stringify(response.data.token))

            
            console.log("~~~~~~~~~~~FROM LOGIN user data ", response.data.user);

            // to store the user into local storage
            localStorage.setItem("user", JSON.stringify(response.data.user))

            navigate("/dashboard/my-profile")
        } catch (error) {
            console.log("LOGIN API ERROR............", error.response.data)
            // toast.error("Login Failed, Check your userId or password")
            toast.error(error.response.data.message)
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", RESETPASSTOKEN_API, { email, })

            console.log("RESETPASSTOKEN RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Reset Email Sent")
            setEmailSent(true)
        } catch (error) {
            console.log("RESETPASSTOKEN ERROR............", error)
            // toast.error("Failed To Send Reset Email")
            toast.error(error.response.data.message)
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export function resetPassword(password, confirmPassword, token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            console.log("Password: " + password);
            console.log("confirmPassword : " + confirmPassword);
            console.log("token : " + token);
            const response = await apiConnector("POST", RESETPASSWORD_API, { password, confirmPassword, token, });
            console.log("Idhar to aaraha hai");


            console.log("RESETPASSWORD RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Password Reset Successfully")
            navigate("/login")
        } catch (error) {
            console.log("RESETPASSWORD ERROR............", error.response.data)
            toast.error(error.response.data.message)
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}