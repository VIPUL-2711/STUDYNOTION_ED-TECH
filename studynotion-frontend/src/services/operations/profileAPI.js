import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"
import { setUser } from "../../slices/profileSlice"

const { GET_USER_DETAILS_API } = profileEndpoints

export function getUserDetails(token) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.data?.image
        ? response.data.data.image
        : `https://api.dicebear.com/10.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
      const updatedUser = { ...response.data.data, image: userImage }
      dispatch(setUser(updatedUser))
      localStorage.setItem("user", JSON.stringify(updatedUser))
    } catch (error) {
      console.log("GET_USER_DETAILS_API error", error)
    }
  }
}
