import { Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"

import Navbar from "./components/common/Navbar"
import Footer from "./components/common/Footer"
import ProtectedRoute from "./components/common/ProtectedRoute"
import OpenRoute from "./components/common/OpenRoute"

import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import VerifyEmail from "./pages/VerifyEmail"
import ForgotPassword from "./pages/ForgotPassword"
import UpdatePassword from "./pages/UpdatePassword"
import Catalog from "./pages/Catalog"
import CourseDetails from "./pages/CourseDetails"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Error from "./pages/Error"

import Dashboard from "./pages/Dashboard"
import MyProfile from "./pages/Dashboard/MyProfile"
import Settings from "./pages/Dashboard/Settings"
import EnrolledCourses from "./pages/Dashboard/EnrolledCourses"
import Cart from "./pages/Dashboard/Cart"
import MyCourses from "./pages/Dashboard/MyCourses"
import AddCourse from "./pages/Dashboard/AddCourse"
import EditCourse from "./pages/Dashboard/EditCourse"
import InstructorDashboard from "./pages/Dashboard/InstructorDashboard"
import Categories from "./pages/Dashboard/Categories"

import ViewCourse from "./pages/ViewCourse"
import VideoDetails from "./components/core/ViewCourse/VideoDetails"

import { ACCOUNT_TYPE } from "./utils/constants"

export default function App() {
  const { user } = useSelector((state) => state.profile)

  return (
    <div className="flex min-h-screen flex-col bg-paper text-charcoal">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:categoryId" element={<Catalog />} />
          <Route path="/courses/:courseId" element={<CourseDetails />} />

          <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
          <Route path="/signup" element={<OpenRoute><Signup /></OpenRoute>} />
          <Route path="/verify-email" element={<OpenRoute><VerifyEmail /></OpenRoute>} />
          <Route path="/forgot-password" element={<OpenRoute><ForgotPassword /></OpenRoute>} />
          <Route path="/update-password/:token" element={<OpenRoute><UpdatePassword /></OpenRoute>} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="my-profile" element={<MyProfile />} />
            <Route path="settings" element={<Settings />} />

            {user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="enrolled-courses" element={<EnrolledCourses />} />
                <Route path="cart" element={<Cart />} />
              </>
            )}

            {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="instructor" element={<InstructorDashboard />} />
                <Route path="my-courses" element={<MyCourses />} />
                <Route path="add-course" element={<AddCourse />} />
                <Route path="edit-course/:courseId" element={<EditCourse />} />
              </>
            )}

            {user?.accountType === ACCOUNT_TYPE.ADMIN && (
              <Route path="categories" element={<Categories />} />
            )}
          </Route>

          <Route
            path="/view-course/:courseId"
            element={
              <ProtectedRoute>
                <ViewCourse />
              </ProtectedRoute>
            }
          >
            <Route index element={<VideoDetails />} />
            <Route path="section/:sectionId/sub-section/:subSectionId" element={<VideoDetails />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
