import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndpoints } from "../apis"

const {
  GET_ALL_COURSE_API,
  COURSE_DETAILS_API,
  COURSE_FULL_DETAILS_API,
  GET_ALL_CATEGORY_API,
  CATEGORY_PAGE_DETAILS_API,
} = courseEndpoints

export async function fetchCourseCategories() {
  try {
    const response = await apiConnector("GET", GET_ALL_CATEGORY_API)
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    return response.data.data
  } catch (error) {
    toast.error("Could not load categories")
    return []
  }
}

export async function getCatalogPageData(categoryId) {
  try {
    const response = await apiConnector("POST", CATEGORY_PAGE_DETAILS_API, { categoryId })
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    return response.data.data
  } catch (error) {
    toast.error("Could not load catalog page")
    return null
  }
}

export async function getAllCourses() {
  try {
    const response = await apiConnector("GET", GET_ALL_COURSE_API)
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    return response.data.data
  } catch (error) {
    toast.error("Could not load courses")
    return []
  }
}

export async function fetchCourseDetails(courseId) {
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API, { courseId })
    return response.data
  } catch (error) {
    return error.response?.data
  }
}

export async function fetchFullCourseDetails(courseId, token) {
  try {
    const response = await apiConnector("POST", COURSE_FULL_DETAILS_API, { courseId }, {
      Authorization: `Bearer ${token}`,
    })
    return response.data
  } catch (error) {
    return error.response?.data
  }
}
