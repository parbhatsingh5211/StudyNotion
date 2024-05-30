import React from 'react'
import ContactUsForm from '../components/core/ContatcPage/ContactUsForm'
import Footer from '../components/common/Footer'

const Contact = () => {
  return (
    <div className='text-richblack-200'>
        <div className='flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)] justify-between md:px-32 md:py-20 px-5 py-6 gap-14'>
            <div className='lg:W-[450px]  h-fit flex flex-col gap-6 p-6 bg-richblack-800 rounded-xl'>
                <div className='lg:w-[450px]'>
                    <h1 className='text-lg font-semibold text-richblack-5'>Chat on us</h1>
                    <p>Our friendly team is here to help.</p>
                    <p>@parbhatsingh.sr@gmail.com</p>
                </div>
                <div>
                    <h1 className='text-lg font-semibold text-richblack-5'>Visit us</h1>
                    <p>Come and say hello at our office HQ.</p>
                    <p>Here is the location/address</p>
                </div>
                <div>
                    <h1 className='text-lg font-semibold text-richblack-5'>Call us</h1>
                    <p>Mon - Fri From 8am to 5pm</p>
                    <p>+123 456 7890</p>
                </div>
            </div>
            <div className='lg:w-[55%] flex flex-col gap-8 border-richblack-600 border-[1px] p-7 md:p-12 rounded-xl'>
                <div className='text-2xl md:text-4xl font-semibold text-richblack-5 flex flex-col gap-3'>
                    Got a Idea? We’ve got the skills. Let’s team up
                    <p className='text-base font-medium'>Tall us more about yourself and what you’re got in mind.</p>
                </div>
                <ContactUsForm/>
            </div>
        </div>

        <div className='flex flex-col text-2xl md:text-4xl font-semibold text-center py-24 gap-12 w-full'>
            Reviews from Other learners
            {/* <ReviewSlider/> */}
        </div>

        <Footer />
    </div>
    
    
  )
}

export default Contact