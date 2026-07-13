import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndpoints } from "../apis"

const { UPDATE_COURSE_PROGRESS_API, GET_ENROLLED_COURSES_PROGRESS_API } = courseEndpoints

export async function markLectureAsComplete(data, token) {
  let success = false
  try {
    const response = await apiConnector("POST", UPDATE_COURSE_PROGRESS_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    success = true
  } catch (error) {
    toast.error("Could not update progress")
  }
  return success
}

export async function getEnrolledCoursesProgress(token) {
  try {
    const response = await apiConnector("GET", GET_ENROLLED_COURSES_PROGRESS_API, null, {
      Authorization: `Bearer ${token}`,
    })
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    return response.data.data
  } catch (error) {
    return {}
  }
}
