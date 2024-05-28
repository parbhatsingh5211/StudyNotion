import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import Quote from '../components/core/AboutPage/Quote'
import FoundingStory from '../assets/Images/FoundingStory.png'
import StatsComponent from '../components/core/AboutPage/Stats'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'

const About = () => {
  return (
    <div>
        <div className='text-richblack-5'>
            {/* Section-1 */}
            <section>
                <div className='relative flex flex-col items-center h-[520px] md:h-[450px] lg:h-[600px] bg-richblack-800 gap-[38px] '>
                    <div className='flex flex-col items-center mt-[70px] '>
                        <div className=' text-richblack-300 mb-[30px] p-4'>
                            About us
                        </div>
                        <header className='text-center text-2xl md:text-4xl lg:w-[800px] w-[80%]'>
                            Driving Innovation in Online Education for a
                            <HighlightText text={"Brighter Future"}/>
                        </header>
                        <p className='mt-4 w-[88%] lg:w-[70%] text-center text-lg text-richblack-300 font-medium'>
                            Studynotion is at the forefront of driving innovation in online education. We're 
                            passionate about creating a brighter future by offering cutting-edge courses, 
                            leveraging emerging technologies, and nurturing a vibrant learning community.
                        </p>
                    </div>
                    <div className='absolute bottom-0 left-0 flex flex-row gap-3 mx-auto translate-x-[40%] lg:translate-x-[14%] translate-y-5 md:translate-y-[80px] w-[25%] lg:w-[80%]'>
                        <img src={BannerImage1} alt='BannerImage1' />
                        <img src={BannerImage2} alt='BannerImage2' />
                        <img src={BannerImage3} alt='BannerImage3' />
                    </div>
                </div>
            </section>

            {/* Section-2 */}
            <section>
                <div className='mt-[100px] lg:mt-[80px] flex justify-center items-center md:h-[300px]'>
                    <Quote/>
                </div>
            </section>

            {/* Section-3 */}
            <section>
                <div className='flex flex-col justify-center lg:items-center'>
                    {/* founding Story div*/}
                    <div className='flex flex-col lg:flex-row gap-16 text-center lg:text-left w-full lg:px-32 lg:py-24 px-6 py-10  justify-center items-center'>
                        {/* founding Story left box */}
                        <div className='lg:w-[450px] flex flex-col justify-between lg:gap-6 gap-4 w-[90%]'>
                            <h1 className='text-2xl md:text-4xl text-pink-500 font-semibold'>
                                Our Founding Story
                            </h1>
                            <p className='text-[16px] leading-6 font-medium text-richblack-300 '>
                                Our e-learning platform was born out of a shared vision and passion for 
                                transforming education. It all began with a group of educators, technologists, and 
                                lifelong learners who recognized the need for accessible, flexible, and 
                                high-quality learning opportunities in a rapidly evolving digital world.
                            </p>
                            <p className='text-[16px] leading-6 font-medium text-richblack-300'>
                                As experienced educators ourselves, we witnessed firsthand the limitations and 
                                challenges of traditional education systems. We believed that education should not 
                                be confined to the walls of a classroom or restricted by geographical boundaries. 
                                We envisioned a platform that could bridge these gaps and empower individuals from 
                                all walks of life to unlock their full potential.
                            </p>
                        </div>

                        {/* founding Story right box */}
                        <div className='w-[310px] md:w-[534px] flex flex-col items-center'>
                            <img src={FoundingStory} alt='foundingStoryImage' width={"full"}/>
                        </div>
                    </div>

                    {/* Vision and mission parrent div */}
                    <div className='flex flex-col md:flex-row gap-16 lg:text-left w-full lg:px-32 md:px-20 md:py-24 justify-center px-6 py-10'>
                        {/* Left Box */}
                        <div className='md:w-[486px] flex flex-col gap-6'>
                            <h1 className='text-4xl text-[#E65C00] font-semibold'>Our Vision</h1>
                            <p className='text-[16px] leading-6 font-medium text-richblack-300'>
                                With this vision in mind, we set out on a journey to create an e-learning 
                                platform that would revolutionize the way people learn. Our team of dedicated 
                                experts worked tirelessly to develop a robust and intuitive platform that combines 
                                cutting-edge technology with engaging content, fostering a dynamic and interactive 
                                learning experience.
                            </p>
                        </div>

                        {/* right Box */}
                        <div className='md:w-[486px] flex flex-col gap-6'>
                            <h1 className='text-4xl text-blue-200 font-semibold'>Our Mission</h1>
                            <p className='text-[16px] leading-6 font-medium text-richblack-300'>
                                our mission goes beyond just delivering courses online. We wanted to create a 
                                vibrant community of learners, where individuals can connect, collaborate, and 
                                learn from one another. We believe that knowledge thrives in an environment of 
                                sharing and dialogue, and we foster this spirit of collaboration through forums, 
                                live sessions, and networking opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section-4 */}
            <StatsComponent/>

            {/* Section-5 */}
            <section className='flex flex-col items-center justify-between gap-5 lg:py-24 lg:px-32'>
                <LearningGrid/>
                <ContactFormSection/>
            </section>

            {/* Section-6 */}
            <section>
                <div className='flex flex-col text-4xl font-semibold text-center py-24 gap-12 w-full'>
                    Reviews from Other learners
                    {/* <ReviewSlider/> */}
                </div>
            </section>
        </div>

        <Footer/>
    </div>
  )
}

export default About