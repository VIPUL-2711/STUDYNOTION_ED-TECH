import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { authEndpoints } from "../apis"
import { setLoading, setToken, setSignupData } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { resetCart } from "../../slices/cartSlice"

const { SENDOTP_API, SIGNUP_API, LOGIN_API, RESET_PASSWORD_TOKEN_API, RESET_PASSWORD_API } = authEndpoints

export function sendOtp(email, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SENDOTP_API, { email })
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("OTP sent to your email")
      navigate("/verify-email")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not send OTP")
    }
    dispatch(setLoading(false))
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  contactNumber,
  otp,
  navigate
) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        contactNumber,
        otp,
      })
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Account created! Please log in")
      dispatch(setSignupData(null))
      navigate("/login")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed")
      navigate("/signup")
    }
    dispatch(setLoading(false))
  }
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", LOGIN_API, { email, password })
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Logged in successfully")
      dispatch(setToken(response.data.token))
      const userImage = response.data.existUser?.image
        ? response.data.existUser.image
        : `https://api.dicebear.com/10.x/initials/svg?seed=${response.data.existUser.firstName} ${response.data.existUser.lastName}`
      dispatch(setUser({ ...response.data.existUser, image: userImage }))
      localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user", JSON.stringify({ ...response.data.existUser, image: userImage }))
      navigate("/dashboard/my-profile")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed")
    }
    dispatch(setLoading(false))
  }
}

export function logout(navigate) {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(resetCart())
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    localStorage.removeItem("cart")
    toast.success("Logged out")
    navigate("/")
  }
}

export function getPasswordResetToken(email, setEmailSent) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESET_PASSWORD_TOKEN_API, { email })
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Reset email sent")
      setEmailSent(true)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not send reset email")
    }
    dispatch(setLoading(false))
  }
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async (dispatch) => {
    dispatch(setLoading(true))
    try {
      const response = await apiConnector("POST", RESET_PASSWORD_API, {
        password,
        confirmPassword,
        token,
      })
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      toast.success("Password reset successfully")
      navigate("/login")
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not reset password")
    }
    dispatch(setLoading(false))
  }
}
