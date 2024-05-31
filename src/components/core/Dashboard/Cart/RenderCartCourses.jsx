import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'

const RenderCartCourses = () => {

    const { total, cart } = useSelector( (state) => state.cart)
    const handleBuyCourse = () => {
        const courses = cart.map( (course) => course._id);
        console.log("Bought these course: ", courses)
        // TODO: API integration -> payment gateway
    }

  return (
    <div>
        <p>Total:</p>
        <p>Rs {total}</p>
        
        <IconBtn 
            text={"BUy Now"}
            onclick={handleBuyCourse}
            customClasses={"w-full justify-center"}
        />
    </div>
  )
}

export default RenderCartCourses