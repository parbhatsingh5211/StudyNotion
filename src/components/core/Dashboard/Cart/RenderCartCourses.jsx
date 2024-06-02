import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-rating-stars-component'
import { VscStarFull } from "react-icons/vsc";
import { RiDeleteBin6Line } from 'react-icons/ri';
import { removeFromCart } from '../../../../slices/cartSlice';

const RenderCartCourses = () => {

    const { cart } = useSelector( (state) => state.cart);
    const dispatch = useDispatch();

  return (
    <div>
        {cart.map( (course, index) => (
            <div key={index}>
                <div>
                    <img src={course?.thumbnail} alt='courseImage'/>
                    <div>
                        <p>{course?.courseName}</p>
                        <p>{course?.category?.name}</p>
                        <div>
                            <span>4.8</span>
                            <ReactStars
                                count={5}
                                size={20}
                                edit={false}
                                activeColor={"#ffd700"}
                                emptyIcon={<VscStarFull />}
                                fullIcon={<VscStarFull />}
                            />
                            <span>
                                {course?.ratingAndRevies?.length} Ratings
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <button
                        onClick={ () => dispatch(removeFromCart(course._id))}
                    >
                        <RiDeleteBin6Line />
                        <span>Remove</span>
                    </button>
                    <p>Rs {course?.price}</p>
                </div>

            </div>
        ))}
    </div>
  )
}

export default RenderCartCourses