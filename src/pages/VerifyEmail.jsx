import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OtpInput from 'react-otp-input';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, signup } from '../services/operations/authAPI';

const VerifyEmail = () => {
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { signupData, loading } = useSelector( (state) => state.auth );

    useEffect( () => {
        if(!signupData){
            navigate("/signup")
        }
    },[])

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;
        dispatch(signup( accountType, firstName, lastName, email, password, 
            confirmPassword, otp, navigate));
    }

  return (
    <div className='text-richblack-5 flex items-center justify-center mt-[150px]'>
        {loading
        ? (<div>
            Loading...
        </div>)
        : (<div className='flex flex-col items-center gap-4'>
            <h1 className='className="text-[1.875rem] font-semibold leading-[2.375rem]'>Verify Email</h1>
            <p>A verification code has been sent to you. Enter the code below</p>
            <form onSubmit={handleOnSubmit}
            className='flex flex-col items-center gap-4'>
                <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span className='opacity-30 mx-2'>-</span>}
                    renderInput={(props) => <input {...props} className='bg-richblack-800 text-4xl rounded-md px-2 py-2'/>}
                />
                <button type='submit'>
                    Verify Email
                </button>
            </form>

            <div className='flex justify-between w-full'>
                <div>
                    <Link to={"/login"}>
                        <p className="mt-1 ml-auto max-w-maxContent text-xs text-blue-100"> Back to Login</p>
                    </Link>
                </div>

                <button
                    onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                >
                    Resend it
                </button>
            </div>
        </div>)}
    </div>
  )
}

export default VerifyEmail