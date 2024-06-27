import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { apiConnector } from '../../../services/apiconnector';
import { contactusEndpoint } from '../../../services/apis';
import CountryCode from '../../../data/countrycode.json'
import toast from 'react-hot-toast';

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful},
    } = useForm();

    const submitContactForm = async(data) => {
        // console.log(":ogging Data: ", data );
        try{
            setLoading(true);
            const toastId = toast.loading("Loading...")
            const res = await apiConnector(
                "POST",
                contactusEndpoint.CONTACT_US_API,
                data
            )
            toast.dismiss(toastId);
            toast.success("Message Sent Successfully")
            // console.log("Email Response: ", res );
        } catch (error) {
            console.log("Error: ", error.messsage);
            toast.success("Can't send Message")
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
    <form 
      onSubmit={handleSubmit(submitContactForm)}
    >
        <div className="flex flex-col gap-7">
           <div className="flex flex-col gap-5 lg:flex-row">
                <label className="flex flex-col gap-2 lg:w-[48%]">
                    <p className="lable-style">First Name</p>
                    <input
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter first name'
                        className="form-style"
                        {...register("firstname", { required: true })}
                    />
                    {errors.firstname && (
                        <span className="-mt-1 text-[12px] text-yellow-100">
                            Please enter your first name.
                        </span>
                    )}
                </label>
                <label className="flex flex-col gap-2 lg:w-[48%]">
                    <p className="lable-style">Last Name</p>
                    <input
                        type='text'
                        name='lastname'
                        id='lastname'
                        placeholder='Enter last name'
                        className="form-style"
                        {...register("lastname")}
                    />
                </label>
           </div>

            <label className="flex flex-col gap-2">
                <p className="lable-style">Email Address</p>
                <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter email address'
                    className="form-style"
                    {...register("email", { required: true })}
                />
                {errors.email && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        Please enter your email address.
                    </span>
                )}
            </label>

            <label className="flex flex-col gap-2">
                <p className="lable-style">Phone Numbor</p>
                <div className="flex gap-5">
                    {/* Dropdown */}
                    <div className="flex w-[81px] flex-col gap-2">
                        <select
                            type="text"
                            name="firstname"
                            id="firstname"
                            placeholder="Enter first name"
                            className="form-style"
                            {...register("countrycode", { required: true })}
                        >
                            {CountryCode.map((ele, i) => {
                                return (
                                <option key={i} value={ele.code}>
                                    {ele.code} -{ele.country}
                                </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="flex w-[calc(100%-90px)] flex-col gap-2">
                        <input
                            type="number"
                            name="phonenumber"
                            id="phonenumber"
                            placeholder="12345 67890"
                            className="form-style"
                            {...register("phoneNo", {
                                required: {
                                value: true,
                                message: "Please enter your Phone Number.",
                                },
                                maxLength: { value: 12, message: "Invalid Phone Number" },
                                minLength: { value: 10, message: "Invalid Phone Number" },
                            })}
                        />
                    </div>
                </div>
                {errors.phoneNo && (
                    <span className="-mt-1 text-[12px] text-yellow-100">
                        {errors.phoneNo.message}
                    </span>
                )}

            </label>

            <label className="flex flex-col gap-2">
                <p className="lable-style">Messsage</p>
                <textarea
                    name='message'
                    id='message'
                    cols="30"
                    rows="7"
                    placeholder='Enter Your message here...'
                    className="form-style"
                    {...register("message", { required: true })}
                />
                {errors.message && (
                    <span>
                    Please enter your message.
                    </span>
                )}
            </label>

            <button 
                disabled={loading}
                type='submit'
                className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                ${!loading &&
                    "transition-all duration-200 hover:scale-95 hover:shadow-none"
                }  disabled:bg-richblack-500 sm:text-[16px] `}
            >
                Send Message
            </button>
        </div>
    </form>
  )
}

export default ContactUsForm