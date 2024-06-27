import React from 'react'

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Autoplay, Pagination } from 'swiper/modules';

import Course_Card from './Course_Card'

const CourseSlider = ({Courses}) => {

  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          loop={true}
          spaceBetween={50}
          pagination={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{ 1024: { slidesPerView: 3 } }}
          modules={[Autoplay, Pagination]}
          className='mySwiper'
        >
          {Courses?.map((course, index) => (
            <SwiperSlide key={index} className='p-8'>
              <Course_Card course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider