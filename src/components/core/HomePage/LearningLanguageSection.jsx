import React from 'react'
import HighlightText from './HighlightText'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lesson from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from './Button' 

const LearningLanguageSection = () => {
  return (
    <div>
        <div className='flex flex-col gap-3 mt-[150px] items-center'>
            <div className='text-4xl font-semibold text-center'>
                Your Swiss Knife for 
                <HighlightText text={"learning any language"}/>
            </div>
            <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[55%] font-inter'>
            Using spin making learning multiple languages easy.  
            with 20+ languages realistic voice-over, progress tracking, 
            custom schedule and more.
            </div>
            <div className='flex flex-row items-center justify-center mt-3'>
                <img 
                    src={know_your_progress} 
                    alt='knowYourProgressImage' 
                    className='object-contain -mr-32'
                    />
                <img 
                    src={compare_with_others} 
                    alt='ComparewithOthersImage' 
                    className='object-contain'
                    />
                <img 
                    src={plan_your_lesson} 
                    alt='PlanYourLessonImage' 
                    className='object-contain Image -ml-36'
                    />
            </div>
            <div className='w-fit h-[150px]'>
                <CTAButton active={true} linkto={"/signup"}>
                    Learn More
                </CTAButton>
            </div>

        </div>
    </div>
  )
}

export default LearningLanguageSection