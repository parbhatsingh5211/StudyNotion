import RenderSteps from "./RenderSteps";

export default function AddCourse() {
    return (
        <>
            <div className="flex flex-col-reverse lg:flex-row text-richblack-5 gap-16">
                <div className="lg:w-[60%] flex flex-col gap-y-4">
                    <h1 className="text-2xl text-center">Add Course</h1>
                    <div className="flex flex-col">
                        <RenderSteps />
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-xl">Course Upload Tips</p>
                    <ul className="text-sm text-richblack-50 leading-6">
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                        <li>Video section controls the course overview video.</li>
                        <li>Set the Course Price option or make it free.</li>
                        <li>Standard size for the course thumbnail is 1024x576.</li>
                    </ul>
                </div>
            </div>
        </>
    )
}