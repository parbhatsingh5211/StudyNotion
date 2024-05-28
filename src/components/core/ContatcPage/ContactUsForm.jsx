import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../../services/apiconnector';
import { contactusEndpoint } from '../../../services/apis';
import CountryCode from '../../../data/countrycode.json'

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful},
    } = useForm();

    const submitContactForm = async(data) => {
        console.log(":ogging Data: ", data );
        try{
            setLoading(true);
            // const response =await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = { status: "Ok" }
            console.log("Logging Response: ", response );
        } catch (error) {
            console.log("Error: ", error.messsage);
            setLoading(false)
        }
    }

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
            })
        }
    },[reset, isSubmitSuccessful])

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
        <div className='flex flex-col gap-3 text-richblack-800'>
           <div className='flex gap-5'>
                <label className='w-full'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">First Name</p>
                    <input
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter first name'
                        {...register("firstname", { required: true })}
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                    {
                        errors.firstname && (
                            <span>
                                Please enter your first name.
                            </span>
                        )
                    }
                </label>
                <label className='w-full'>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Last Name</p>
                    <input
                        type='text'
                        name='lastname'
                        id='lastname'
                        placeholder='Enter last name'
                        {...register("lastname")}
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                </label>
           </div>

            <label className='w-full'>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address</p>
                <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter email address'
                    {...register("email", { required: true })}
                    style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
                {
                    errors.lastname && (
                        <span>
                            Please enter your email address.
                        </span>
                    )
                }
            </label>

            <label className='flex flex-col gap-2'>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Phone Numbor</p>
                <div className='flex flex-row gap-5 w-full'>
                    {/* Dropdown */}
                    <select
                        name='dropdown'
                        id='dropdown'
                        {...register("countrycode", { required: true })}
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-[17%] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    >
                        {
                            CountryCode.map( (ele, i) => (
                                <option key={i} value={ele.code} className='bg-richblack-700'>
                                    {ele.code} -{ele.country}
                                </option>
                            ))
                        }
                    </select>
                    <input 
                        type='number'
                        name='phonenumber'
                        id='phonenumber'
                        placeholder='01234 56789'
                        {...register("phoneNo", 
                        { 
                            required: {value: true, message: "Please Enter Phone Number"},
                            maxLength: {value:10, message: "Invalid Phone Number"},
                            minLength: {value:8, message:"Invalid Phone Number"}
                        })}
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                </div>
                {
                    errors.phoneNo && (
                        <span>
                            {errors.phoneNo.message}
                        </span>
                    )
                }

            </label>

            <label className='w-full'>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Messsage</p>
                <textarea
                    name='message'
                    id='message'
                    rows="5"
                    placeholder='Enter Your message here...'
                    {...register("message", { required: true })}
                    style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
                {
                    errors.message && (
                        <span>
                        Please enter your message.
                        </span>
                    )
                }
            </label>

            <button type='submit'
                className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                Send Message
            </button>
        </div>
    </form>
  )
}

export default ContactUsForm