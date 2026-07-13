import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { courseEndpoints } from "../apis"

const { CREATE_RATING_API, GET_ALL_RATING_REVIEW_API } = courseEndpoints

export async function createRating(data, token) {
  let success = false
  try {
    const response = await apiConnector("POST", CREATE_RATING_API, data, {
      Authorization: `Bearer ${token}`,
    })
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("Review submitted")
    success = true
  } catch (error) {
    toast.error(error?.response?.data?.message || "Could not submit review")
  }
  return success
}

export async function getAllRatingReview() {
  try {
    const response = await apiConnector("GET", GET_ALL_RATING_REVIEW_API)
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    return response.data.data
  } catch (error) {
    return []
  }
}
