const BASE_URL = import.meta.env.VITE_BASE_URL || "https://studynotion-ed-tech-5wau.onrender.com/api/v1"

// AUTH ENDPOINTS -> mounted at /api/v1/auth (routes/User.js)
export const authEndpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  RESET_PASSWORD_TOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESET_PASSWORD_API: BASE_URL + "/auth/reset-password",
}

// PROFILE ENDPOINTS -> mounted at /api/v1/profile (routes/Profile.js)
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

// COURSE ENDPOINTS -> mounted at /api/v1/course (routes/Course.js)
export const courseEndpoints = {
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  COURSE_FULL_DETAILS_API: BASE_URL + "/course/getFullCourseDetails",
  GET_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",

  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",

  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",

  UPDATE_COURSE_PROGRESS_API: BASE_URL + "/course/updateCourseProgress",
  GET_ENROLLED_COURSES_PROGRESS_API: BASE_URL + "/course/getEnrolledCoursesProgress",

  CREATE_CATEGORY_API: BASE_URL + "/course/createCategory",
  GET_ALL_CATEGORY_API: BASE_URL + "/course/showAllCategories",
  CATEGORY_PAGE_DETAILS_API: BASE_URL + "/course/getCategoryPageDetails",

  CREATE_RATING_API: BASE_URL + "/course/createRating",
  GET_AVERAGE_RATING_API: BASE_URL + "/course/getAverageRating",
  GET_ALL_RATING_REVIEW_API: BASE_URL + "/course/getReviews",
}

// PAYMENT ENDPOINTS -> mounted at /api/v1/payment (routes/Payments.js)
export const paymentEndpoints = {
  CAPTURE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  VERIFY_PAYMENT_API: BASE_URL + "/payment/verifyPayment",
}
