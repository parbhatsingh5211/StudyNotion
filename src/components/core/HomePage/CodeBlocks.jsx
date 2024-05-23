import React from 'react'
import CTAButton from './Button'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({
    position, heading, subheding, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor
}) => {
  return (
    <div className={`flex ${position} my-[100px] justify-between`}>
        {/* Section-1 */}
        <div className='w-[45%] flex flex-col gap-5'>
            {heading}
            <div className='text-richblack-300 font-bold '>
                {subheding}
            </div>

            <div className='flex gap-7 mt-[52px]'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                    </div>
                </CTAButton>
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                </CTAButton>
            </div>
        </div>

        {/* Section-2 */}
        <div className='h-fit flex flex-row py-4 w-[350px] lg:w-[590px] gap-2'>
            {/* addd Gradient */}
            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                <TypeAnimation
                    sequence = {[codeblock, 2000, ""]}
                    repeat = {Infinity}
                    cursor = {true}
                    style = {
                        {
                            whiteSpace: "pre-line",
                            display: "block"
                        }
                    }
                    omitDeletionAnimation= {true}
                />
            </div>
        </div>
    </div>
  )
}

export default CodeBlocks