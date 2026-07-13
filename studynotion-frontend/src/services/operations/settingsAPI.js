import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { profileEndpoints, authEndpoints } from "../apis"
import { setUser, setProfileLoading } from "../../slices/profileSlice"
import { logout } from "./authAPI"

const { UPDATE_PROFILE_API, DELETE_PROFILE_API } = profileEndpoints
const { CHANGE_PASSWORD_API } = authEndpoints

export function updateProfile(token, formData) {
  return async (dispatch) => {
    dispatch(setProfileLoading(true))
    try {
      const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const currentUser = JSON.parse(localStorage.getItem("user"))
      const updatedUser = { ...currentUser, ...formData }
      dispatch(setUser(updatedUser))
      localStorage.setItem("user", JSON.stringify(updatedUser))
      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not update profile")
    }
    dispatch(setProfileLoading(false))
  }
}

export function changePassword(token, formData) {
  return async () => {
    try {
      const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
        Authorization: `Bearer ${token}`,
      })
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password changed successfully")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not change password")
    }
  }
}

export function deleteAccount(token, navigate) {
  return async (dispatch) => {
    try {
      const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, {
        Authorization: `Bearer ${token}`,
      })
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Account deleted")
      dispatch(logout(navigate))
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not delete account")
    }
  }
}
