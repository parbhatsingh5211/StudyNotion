import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating'

const Course_Card = ({course, Height}) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course.ratingAndReviews)
        setAvgReviewCount(count);
    }, [course])

  return (
    <div className= 'hover:shadow-[0_5px_10px_rgba(8,_112,_184,_0.3)] hover:scale-105 transition-all delay-300 rounded-xl'>
        <Link to={`/courses/${course._id}`}>
            <div>
                <div className="rounded-lg">
                    <img 
                        src={course?.thumbnail}
                        alt='courseThumbnail'
                        className={`w-full aspect-5/3 object-fill rounded-xl`}
                    />
                </div>
                <div className="flex flex-col gap-2 px-2 py-3">
                    <p className="text-xl text-richblack-5">{course?.courseName}</p>
                    <p className="text-sm text-richblack-50">
                        {course?.instructor?.firstName} {course?.instructor?.lastName}
                    </p>
                    <div className='flex items-center gap-2'>
                        <span className="text-yellow-5">{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount} />
                        <span className="text-richblack-400">
                            {course?.ratingAndReviews?.length} Ratings
                        </span>
                    </div>
                    <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default Course_Card