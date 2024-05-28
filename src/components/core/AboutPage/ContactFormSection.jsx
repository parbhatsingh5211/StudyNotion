import React from 'react'
import ContactUsForm from '../ContatcPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='md:w-[600px] p-8 gap-9 flex flex-col items-center text-richblack-5'>
        <div className='flex flex-col items-center gap-3'>
            <h1 className='text-4xl font-semibold '>
                Get in Touch
            </h1>
            <p className='text-base font-medium text-richblack-300'>
                We'd love to here for you, Please fill out this form.
            </p>
        </div>
        <div className='w-full'>
            <ContactUsForm />
        </div>
    </div>
  )
}

export default ContactFormSection