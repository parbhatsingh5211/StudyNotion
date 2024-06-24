import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import Error from './Error';
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from '../components/common/RatingStars'
import { formatDate } from '../services/formatDate'

const CourseDetails = () => {
  const {user} = useSelector((state) => state.profile);
  const {token} = useSelector((state) => state.auth);
  const {loading} = useSelector((state) => state.profile);
  const {paymentLoading} = useSelector((state) => state.course)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {courseId} = useParams();

  const [courseData, setCourseData] = useState(null);
  const [avgReviewCount, setAvgReviewCount] = useState(0);
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(null);

  useEffect(() => {
    const getCourseFullDetails = async() => {
      try {
        const result = await fetchCourseDetails(courseId);
        setCourseData(result);
      } catch (error) {
        console.log("Could not fetch course details");
      }
    }
    getCourseFullDetails();
  }, [courseId])
  console.log("COURSE DATA: ",courseData)

  useEffect(() => {
    const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
    setAvgReviewCount(count)
  }, [courseData])

  useEffect(() => {
    let lectures = 0;
    courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0;
    })
    setTotalNoOfLectures(lectures);
  }, [courseData])

// To update
  const handleBuyCourse = () => {
    if(token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not Logged in",
      text2: "Please Login to Purchase the course",
      btn1text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if(loading || !courseData) {
    return (
      <div className='spinner'></div>
    )
  }

  if(!courseData.success) {
    return (
      <div>
        <Error /> 
      </div>
    )
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = courseData?.data?.courseDetails

  return (
    <div className='flex flex-col items-center text-richblack-5'>
      <div className='relative'>
        <p>{courseName}</p>
        <p>{courseDescription}</p>
        
        <div className='flex gap-x-2'>
          <span>{avgReviewCount}</span>
          <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
          <span>{ratingAndReviews.length} reviews </span>
          <span>{studentsEnrolled.length} stdents Enrolled</span>
        </div>
        
        <div>
          <p>
            Created BY {instructor.firstName} {instructor.lastName}
          </p>
        </div>

        <div>
          <p>
            Created At {formatDate(createdAt)}
          </p>
        </div>
      </div>
      <button onClick={handleBuyCourse}>
        Buy Course
      </button>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default CourseDetails