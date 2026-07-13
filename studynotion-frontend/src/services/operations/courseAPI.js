import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndpoints } from "../apis"

const {
  CREATE_COURSE_API,
  EDIT_COURSE_API,
  GET_INSTRUCTOR_COURSES_API,
  DELETE_COURSE_API,
  CREATE_SECTION_API,
  UPDATE_SECTION_API,
  DELETE_SECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SUBSECTION_API,
  DELETE_SUBSECTION_API,
  CREATE_CATEGORY_API,
} = courseEndpoints

const authHeader = (token) => ({ Authorization: `Bearer ${token}` })

export async function addCourseDetails(formData, token) {
  let result = null
  try {
    const response = await apiConnector("POST", CREATE_COURSE_API, formData, authHeader(token))
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Course created")
    result = response.data.data
  } catch (error) {
    toast.error(error?.response?.data?.message || "Could not create course")
  }
  return result
}

export async function editCourseDetails(formData, token) {
  let result = null
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, formData, authHeader(token))
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Course updated")
    result = response.data.data
  } catch (error) {
    toast.error(error?.response?.data?.message || "Could not update course")
  }
  return result
}

export async function fetchInstructorCourses(token) {
  let result = []
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_COURSES_API, null, authHeader(token))
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    toast.error("Could not fetch your courses")
  }
  return result
}

export async function deleteCourse(courseId, token) {
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, { courseId }, authHeader(token))
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Course deleted")
    return true
  } catch (error) {
    toast.error(error?.response?.data?.message || "Could not delete course")
    return false
  }
}

export async function createSection(data, token) {
  let result = null
  try {
    const response = await apiConnector("POST", CREATE_SECTION_API, data, authHeader(token))
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Section added")
    result = response.data.data
  } catch (error) {
    toast.error(error?.response?.data?.message || "Could not add section")
  }
  return result
}

export async function updateSection(data, token) {
  let result = null
  try {
    const response = await apiConnector("POST", UPDATE_SECTION_API, data, authHeader(token))
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Section updated")
    result = response.data.data
  } catch (error) {
    toast.error(error?.response?.data?.message || "Could not update section")
  }
  return result
}

export async function deleteSection(data, token) {
  let result = null
  try {
    const response = await apiConnector("POST", DELETE_SECTION_API, data, authHeader(token))
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Section deleted")
    result = response.data.data
  } catch (error) {
    toast.error(error?.response?.data?.message || "Could not delete section")
  }
  return result
}

export async function createSubSection(data, token) {
  let result = null
  try {
    const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, authHeader(token))
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Lecture added")
    result = response.data.data
  } catch (error) {
    toast.error(error?.response?.data?.message || "Could not add lecture")
  }
  return result
}

export async function updateSubSection(data, token) {
  let result = null
  try {
    const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, authHeader(token))
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Lecture updated")
    result = response.data.data
  } catch (error) {
    toast.error(error?.response?.data?.message || "Could not update lecture")
  }
  return result
}

export async function deleteSubSection(data, token) {
  try {
    const response = await apiConnector("POST", DELETE_SUBSECTION_API, data, authHeader(token))
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Lecture deleted")
    return true
  } catch (error) {
    toast.error(error?.response?.data?.message || "Could not delete lecture")
    return false
  }
}

export async function createCategory(data, token) {
  let result = null
  try {
    const response = await apiConnector("POST", CREATE_CATEGORY_API, data, authHeader(token))
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Category created")
    result = response.data.data
  } catch (error) {
    toast.error(error?.response?.data?.message || "Could not create category")
  }
  return result
}
