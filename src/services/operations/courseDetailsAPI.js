import toast from "react-hot-toast";
import { courseEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";


const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
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
    let result = null

    try {
        const response = await apiConnector("POST", CREATE_COURSE_API, data, {
            "content-type": "multipart/form-data",
            Authorisation: `Bearer ${token}`,
        })
        console.log("CREATE_COURSE_API RESPONSE............", response)
        
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
export const editCourseDetails = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let result = null

    try {
        const response = await apiConnector("PUT", EDIT_COURSE_API, data, {
            "content-type": "multipart/form-data",
            Authorisation: `Bearer ${token}`
        })
        console.log("EDIT COURSE API RESPONSE............", response)
        
        if (!response?.data?.success) {
            throw new Error("Could Not Update Course Details")
        }
        toast.success("Course Details Updated Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("EDIT COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toString.dismiss(toastId);
    return result;
}

// create a section
export const createSection = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            "Authorisation": `Bearer ${token}`
        })

        console.log("CREATE SECTION API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Create Section")
        }
        toast.success("Course Section Created")
        result = response?.data?.updatedCourse
    } catch (error) {
        console.log("CREATE SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

// create a subsection
export const createSubSection = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorisation: `Bearer ${token}`
        })
        console.log("CREATE SUB-SECTION API RESPONSE............", response)
        
        if (!response?.data?.success) {
            throw new Error("Could Not Add Lecture")
        }
        toast.success("Lecture Added")
        result = response?.data?.data
    } catch (error) {
        console.log("CREATE SUB-SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

// update a section
export const updateSection = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector("PUT", UPDATE_SECTION_API, data, {
            Authorisation: `Bearer ${token}`
        })
        console.log("UPDATE SECTION API RESPONSE............", response)
        
        if (!response?.data?.success) {
            throw new Error("Could Not Update Section")
        }
        toast.success("Course Section Updated")
        result = response?.data?.data
    } catch (error) {
        console.log("UPDATE SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

// update a subsection
export const updateSubSection = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null;

    try {
        const response = await apiConnector("PUT", UPDATE_SUBSECTION_API, data, {
            Authorisation: `Bearer ${token}`
        })
        console.log("UPDATE SUB-SECTION API RESPONSE............", response)
        
        if (!response?.data?.success) {
            throw new Error("Could Not Update Lecture")
        }
        toast.success("Lecture Updated")
        result = response?.data?.data
    } catch (error) {
        console.log("UPDATE SUB-SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}