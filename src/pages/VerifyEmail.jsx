import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OtpInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { sendOTP, signUp } from '../services/operations/authAPI';
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";



const VerifyEmail = () => {
    const { signupData, loading } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // For timmer
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    useEffect(() => {
        if (!signupData) {
            navigate('/signup');
        }
    }, [])

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const { accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;
        console.log(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
        );
        dispatch(signUp(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate));

    }

    const handleOnResend = () => {
        dispatch(sendOTP(signupData.email, navigate))
        setMinutes(1)
        setSeconds(30)
    }

    return (
        <div className="min-h-[calc(100vh-9vh)] bg-neutral-10 grid place-items-center">
            {
                loading ? (
                    <div>
                        <div className="spinner"></div>
                    </div>
                ) : (
                    <div className="max-w-[500px] p-4 lg:p-8">
                        <h1 className="text-neutral-5 font-semibold text-[1.875rem] leading-[2.375rem]">Verify Email</h1>
                            <p className="text-[1.125rem] leading-[1.625rem] my-4 text-neutral-5">{`A verification code has been sent to ${signupData.email}. Enter the code below`}</p>
                        <form onSubmit={handleOnSubmit}>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderSeparator={<span></span>}
                                renderInput={(props) => (
                                    <input
                                        {...props}
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-[48px] lg:w-[60px] border-0 bg-neutral-9 rounded-[0.5rem] text-primary font-semibold text-xl aspect-square text-center focus:border-0 focus:outline-2 focus:outline-neutral-5"
                                        placeholder='-'
                                    />
                                )}
                                containerStyle={{
                                    justifyContent: "space-between",
                                    gap: "0 6px",
                                }}
                            />
                            <button
                                type='submit'
                                className="mt-6 w-full rounded-[8px] bg-primary text-white py-[8px] px-[12px] font-medium"
                            >
                                Verify Email
                            </button>
                        </form>
                        <div className='flex justify-between'>
                                <div className="mt-6 flex items-center justify-between">
                                    <Link to="/signup" >
                                        <p className="text-neutral-5 font-semibold flex items-center gap-x-2">
                                            <BiArrowBack /> Back To Signup
                                        </p>
                                    </Link>
                                </div>
                                <div className="mt-6">
                                    {seconds > 0 || minutes > 0 ? (
                                        <p className='text-neutral-5 font-semibold'>
                                            Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                            {seconds < 10 ? `0${seconds}` : seconds}
                                        </p>
                                    ) : (
                                        <button
                                                className="flex items-center text-neutral-5 font-semibold gap-x-2"
                                            onClick={handleOnResend}
                                        >
                                            <RxCountdownTimer/>
                                            Resend it
                                        </button>
                                    )}
                                </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default VerifyEmail