import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { loading } = useSelector( (state) => state.auth );

    const { password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData ( (prevData) => ({
            ...prevData,
            [e.target.name] : e.target.value,
        }))
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token, navigate))
    }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] justify-center mt-12 text-richblack-5">
        {
            loading ? (
                <div>
                    Loading...
                </div>
            ) : (
                <div className='flex flex-col'>
                    <h1 className="text-[1.875rem] font-semibold leading-[2.375rem]">
                        Choose new password
                    </h1>
                    <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                        Almost done. Enter your new password and you are all set.
                    </p>
                    
                    <form onSubmit={handleOnSubmit}
                        className="mt-6 flex w-full flex-col gap-y-4"
                    >
                        <label className="relative">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                New Password <sup className='text-pink-200'>*</sup>
                            </p>
                            <input 
                                required
                                type= {showPassword ? "text" : "password"}
                                name='password'
                                value={password}
                                onChange={handleOnChange}
                                placeholder='Password'
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                            />
                            <span onClick = { () => setShowPassword( (prev) => !prev)} 
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"    
                            >
                                {
                                    showPassword 
                                        ? <AiOutlineEyeInvisible fontSize={24}/> 
                                        : <AiOutlineEye fontSize={24}/>
                                }
                            </span>
                        </label>

                        <label className="relative">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Confirm New Password <sup className='text-pink-200'>*</sup>
                            </p>
                            <input 
                                required
                                type= {showConfirmPassword ? "text" : "password"}
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder='Confirm Password'
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                            />
                            <span onClick = { () => setShowConfirmPassword( (prev) => !prev)} 
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                            >
                                {showConfirmPassword 
                                    ? <AiOutlineEyeInvisible fontSize={24}/> 
                                    : <AiOutlineEye fontSize={24}/>
                                }
                            </span>
                        </label>

                        <button type='submit'>
                            Reset Password
                        </button>
                    </form>
                    <div>
                        <Link to={"/login"}>
                            <p className="mt-1 ml-auto max-w-max text-xs text-blue-100"> Back to Login</p>
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default UpdatePassword