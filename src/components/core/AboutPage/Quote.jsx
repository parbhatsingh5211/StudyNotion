import React from 'react'
import HighlightText from '../HomePage/HighlightText'

const Quote = () => {
  return (
    <div className='text-2xl lg:text-4xl text-center w-[82%] leading-[52px] text-richblack-100'>
        <sup className='text-richblack-600 text-4xl font-bold'>"</sup>We are passionate about revolutionizing the way we learn. Our innovative platform 
        <HighlightText text={"combines technology"}/>
        , {" "} 
        <span className='text-brown-200'>expertise</span> 
        , {" "} and community to create an {" "} 
        <span className='text-brown-200'>
            unparalleled educational experience
        </span>
        .<span className='text-richblack-600 text-4xl font-bold'>"</span>
    </div>
  )
}

export default Quote