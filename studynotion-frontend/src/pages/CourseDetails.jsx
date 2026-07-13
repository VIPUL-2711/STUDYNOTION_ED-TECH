import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { FaStar, FaRegClock, FaRegPlayCircle } from "react-icons/fa"
import toast from "react-hot-toast"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { addToCart } from "../slices/cartSlice"
import { getAverageRating, formatDate } from "../utils/formatters"
import { ACCOUNT_TYPE } from "../utils/constants"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import Spinner from "../components/common/Spinner"

export default function CourseDetails() {
  const { courseId } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      const response = await fetchCourseDetails(courseId)
      if (response?.success) {
        setCourse(response.data)
      }
      setLoading(false)
    })()
  }, [courseId])

  if (loading) return <Spinner />
  if (!course) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-charcoal-dim">This course could not be found.</p>
      </div>
    )
  }

  const totalLectures = (course.courseContent || []).reduce(
    (acc, section) => acc + (section.subSection?.length || 0),
    0
  )
  const avgRating = getAverageRating(course.ratingAndReviews)
  const alreadyEnrolled = course.studentsEnrolled?.some((id) => id === user?._id)
  const alreadyInCart = cart.some((item) => item._id === course._id)
  const isInstructorOwner = user?.accountType === ACCOUNT_TYPE.INSTRUCTOR

  function handleAddToCart() {
    if (!token) {
      toast.error("Please log in to add courses to your cart")
      return navigate("/login")
    }
    if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("Instructors cannot purchase courses")
      return
    }
    dispatch(addToCart(course))
  }

  function handleBuyNow() {
    if (!token) {
      toast.error("Please log in to continue")
      return navigate("/login")
    }
    if (!alreadyInCart) dispatch(addToCart(course))
    navigate("/dashboard/cart")
  }

  return (
    <div>
      <div className="bg-ink-950 py-14 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="font-display text-3xl font-bold">{course.courseName}</h1>
            <p className="mt-3 text-ink-100/80">{course.courseDescription}</p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-ink-100/90">
              <span className="flex items-center gap-1 font-semibold text-amber-400">
                {avgRating || "New"} <FaStar size={12} />
                <span className="font-normal text-ink-100/70">({course.ratingAndReviews?.length || 0} ratings)</span>
              </span>
              <span>{course.studentsEnrolled?.length || 0} students enrolled</span>
            </div>

            <p className="mt-2 text-sm text-ink-100/70">
              Created by {course.instructor?.firstName} {course.instructor?.lastName}
            </p>
            <p className="mt-1 text-xs text-ink-100/50">
              Last updated {formatDate(course.createdAt) || "recently"}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <section>
            <h2 className="font-display text-xl font-semibold text-charcoal">What you'll learn</h2>
            <p className="mt-3 whitespace-pre-line text-charcoal-dim">{course.WhatYouWillLearn}</p>
          </section>

          <section className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-charcoal">Course content</h2>
              <span className="text-sm text-charcoal-dim">
                {course.courseContent?.length || 0} sections • {totalLectures} lectures
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {(course.courseContent || []).map((section) => (
                <CourseAccordionBar key={section._id} section={section} />
              ))}
              {(!course.courseContent || course.courseContent.length === 0) && (
                <p className="text-sm text-charcoal-dim">This course doesn't have content yet.</p>
              )}
            </div>
          </section>
        </div>

        <aside>
          <div className="folded-corner sticky top-24 rounded-2xl border border-ink-100 bg-white p-6 shadow-sm">
            <div className="aspect-video overflow-hidden rounded-xl bg-ink-50">
              {course.thumbnail && (
                <img src={course.thumbnail} alt={course.courseName} className="h-full w-full object-cover" />
              )}
            </div>
            <p className="mt-5 font-display text-3xl font-bold text-ink-900">₹{course.price}</p>

            {isInstructorOwner ? (
              <p className="mt-5 rounded-lg bg-ink-50 px-4 py-3 text-center text-sm text-charcoal-dim">
                Instructors can't enroll in courses
              </p>
            ) : alreadyEnrolled ? (
              <Link
                to={`/view-course/${course._id}`}
                className="mt-5 block rounded-lg bg-emerald-500 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-600"
              >
                Go to course
              </Link>
            ) : (
              <div className="mt-5 flex flex-col gap-3">
                <button
                  onClick={handleBuyNow}
                  className="rounded-lg bg-ink-900 py-3 text-sm font-semibold text-white transition hover:bg-ink-800"
                >
                  Buy now
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={alreadyInCart}
                  className="rounded-lg border border-ink-900 py-3 text-sm font-semibold text-ink-900 transition hover:bg-ink-50 disabled:opacity-50"
                >
                  {alreadyInCart ? "Already in cart" : "Add to cart"}
                </button>
              </div>
            )}

            <div className="mt-6 space-y-2 text-sm text-charcoal-dim">
              <p className="flex items-center gap-2"><FaRegPlayCircle /> {totalLectures} on-demand lectures</p>
              <p className="flex items-center gap-2"><FaRegClock /> Lifetime access</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
