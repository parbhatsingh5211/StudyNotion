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
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';

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
  const [isActive, setIsActive] = useState(Array(0));

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

  const handleActive = (id) => {
    setIsActive(
        !isActive.includes(id)
         ? isActive.concat(id)
         : isActive.filter((e)=> e != id)
    )
  }

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
    <div className='flex flex-col  text-white'>

        <div className='relative flex flex-col justify-start p-8'>
            <p>{courseName}</p>
            <p>{courseDescription}</p>
            <div className='flex gap-x-2'>
                <span>{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} reviews) `}</span>
                <span>{`(${studentsEnrolled.length} students enrolled)`}</span>
            </div>

            <div>
                <p>Created By {`${instructor.firstName}`}</p>
            </div>

            <div className='flex gap-x-3'>
                <p>
                    Created At {formatDate(createdAt)}
                </p>
                <p>
                    {" "} English
                </p>
            </div>

            <div>
                <CourseDetailsCard 
                    course = {courseData?.data?.courseDetails}
                    setConfirmationModal = {setConfirmationModal}
                    handleBuyCourse = {handleBuyCourse}
                />
            </div>
        </div>

        <div>
            <p> What You WIll learn</p>
            <div>
                {whatYouWillLearn}
            </div>
        </div>

        <div>
            <div>
                <p>Course Content:</p>
            </div>

            <div className='flex gap-x-3 justify-between'>
                <div className='flex gap-x-3'>
                     <span>
                          {courseContent.length} section(s)
                      </span>
                     <span>
                          {totalNoOfLectures} lectures
                     </span>
                     <span>
                          {courseData.data?.totalDuration} total length
                     </span>
                </div>

                <div>
                    <button
                        onClick={() => setIsActive([])}>
                        Collapse all Sections
                    </button>
                </div>
            </div>
        </div>

        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}

export default CourseDetails