import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { paymentEndpoints } from "../apis"
import { resetCart } from "../../slices/cartSlice"
import { setPaymentLoading } from "../../slices/courseSlice"

const { CAPTURE_PAYMENT_API, VERIFY_PAYMENT_API } = paymentEndpoints

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

// pays for and enrolls in a single course, resolves true/false when the checkout flow finishes
function payForSingleCourse(course, token, userDetails) {
  return new Promise(async (resolve) => {
    try {
      const authHeader = { Authorization: `Bearer ${token}` }

      const orderResponse = await apiConnector(
        "POST",
        CAPTURE_PAYMENT_API,
        { course_id: course._id },
        authHeader
      )

      if (!orderResponse.data.success) {
        toast.error(orderResponse.data.message || `Could not initiate payment for ${course.courseName}`)
        return resolve(false)
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        currency: orderResponse.data.currency,
        amount: orderResponse.data.amount,
        order_id: orderResponse.data.orderId,
        name: "StudyNotion",
        description: `Enrollment for ${orderResponse.data.courseName}`,
        image: "/logo.svg",
        prefill: {
          name: `${userDetails?.firstName || ""} ${userDetails?.lastName || ""}`,
          email: userDetails?.email,
        },
        handler: async function (response) {
          try {
            const verifyResponse = await apiConnector(
              "POST",
              VERIFY_PAYMENT_API,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                course_id: course._id,
              },
              authHeader
            )
            if (!verifyResponse.data.success) {
              throw new Error(verifyResponse.data.message)
            }
            toast.success(`Enrolled in ${course.courseName}`)
            resolve(true)
          } catch (error) {
            toast.error("Payment verification failed")
            resolve(false)
          }
        },
        modal: {
          ondismiss: function () {
            resolve(false)
          },
        },
        theme: {
          color: "#1B1464",
        },
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
      paymentObject.on("payment.failed", function () {
        toast.error("Payment failed, please try again")
        resolve(false)
      })
    } catch (error) {
      toast.error(error?.response?.data?.message || "Could not process payment")
      resolve(false)
    }
  })
}

export function buyCourses(courses, token, userDetails, navigate) {
  return async (dispatch) => {
    const scriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    if (!scriptLoaded) {
      toast.error("Razorpay SDK failed to load, check your internet connection")
      return
    }

    dispatch(setPaymentLoading(true))

    let anySucceeded = false
    for (const course of courses) {
      // eslint-disable-next-line no-await-in-loop
      const success = await payForSingleCourse(course, token, userDetails)
      if (success) anySucceeded = true
    }

    dispatch(setPaymentLoading(false))

    if (anySucceeded) {
      dispatch(resetCart())
      navigate("/dashboard/enrolled-courses")
    }
  }
}
