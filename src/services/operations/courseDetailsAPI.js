import toast from "react-hot-toast";
import { courseEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";


const {
    GET_ALL_COURSE_API,
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
} = courseEndpoints

export const getAllCourses = async () => {
    const toastId = toast.loading("Loading...")
    let result = []

    try {
        const response = await apiConnector("GET", GET_ALL_COURSE_API)
        if (!response?.data?.success) {
            throw Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("GET_ALL_COURSE_API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const fetchCourseDetails = async (courseId) => {
    const toastId = toast.loading("Loading...");
    let result = []

    try {
        const response = await apiConnector("GET", COURSE_DETAILS_API, {
            courseId,
        })
        console.log("COURSE_DETAILS_API API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("COURSE_DETAILS_API ERROR............", error)
        result = error.response.data
        // toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

// fetching the available course categories
export const fetchCourseCategories = async () => {
    let result = []
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API)
        console.log("COURSE_CATEGORIES_API API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data
    } catch (error) {
        console.log("COURSE_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
    }
    return result;
}

// add the course details
export const addCourseDetails = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result = []

    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "content-type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
        })
        console.log("CREATE COURSE API RESPONSE............", response)
        
        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details")
        }
        toast.success("Course Details Added Successfully")
        result = response?.data?.data;
    } catch (error) {
        console.log("COURSE_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

// edit the course details