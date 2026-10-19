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
  const alreadyEnrolled = (course.studentsEnrolled || []).some(
    (id) => (id?._id || id)?.toString() === user?._id?.toString()
  )
  const alreadyInCart = cart.some((item) => item._id === course._id)
  const isInstructorOwner = (course.instructor?._id || course.instructor)?.toString() === user?._id?.toString()

  function handleAddToCart() {
    if (!token) {
      toast.error("Please log in to add courses to your cart")
      return navigate("/login")
    }
    if (isInstructorOwner) {
      toast.error("You are the instructor of this course")
      return
    }
    dispatch(addToCart(course))
  }

  function handleBuyNow() {
    if (!token) {
      toast.error("Please log in to continue")
      return navigate("/login")
    }
    if (isInstructorOwner) {
      toast.error("You are the instructor of this course")
      return
    }
    if (!alreadyInCart) dispatch(addToCart(course))
    navigate("/dashboard/cart")
  }

  return (
    <div className="relative">
      {/* Top Banner */}
      <div className="relative border-b border-white/10 bg-gradient-to-b from-midnight-surface via-midnight-bg to-midnight-bg py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <span className="inline-block rounded-full bg-aurora-indigo/20 px-3.5 py-1 text-xs font-semibold text-aurora-cyan border border-aurora-cyan/30 mb-4">
              Comprehensive Course
            </span>
            <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl leading-tight">
              {course.courseName}
            </h1>
            <p className="mt-4 text-base text-slate-300 leading-relaxed max-w-3xl">
              {course.courseDescription}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-slate-300">
              <span className="flex items-center gap-1.5 font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                {avgRating || "New"} <FaStar size={12} />
                <span className="font-normal text-slate-400">({course.ratingAndReviews?.length || 0} reviews)</span>
              </span>
              <span className="text-slate-400">
                <strong className="text-white">{course.studentsEnrolled?.length || 0}</strong> students enrolled
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Instructor:</span>
                <span className="font-semibold text-white">
                  {course.instructor?.firstName} {course.instructor?.lastName}
                </span>
              </div>
              <span>•</span>
              <span>Updated {formatDate(course.createdAt) || "Recently"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-12">
          {/* What You'll Learn */}
          <section className="glass-card rounded-3xl border border-white/10 p-8">
            <h2 className="font-display text-xl font-bold text-white mb-4">What you'll learn</h2>
            <div className="text-slate-300 whitespace-pre-line leading-relaxed text-sm">
              {course.WhatYouWillLearn}
            </div>
          </section>

          {/* Course Content Accordions */}
          <section>
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="font-display text-xl font-bold text-white">Course curriculum</h2>
              <span className="text-xs font-semibold text-aurora-cyan bg-aurora-cyan/10 px-3 py-1 rounded-full border border-aurora-cyan/20">
                {course.courseContent?.length || 0} sections • {totalLectures} lectures
              </span>
            </div>
            <div className="mt-6 space-y-3">
              {(course.courseContent || []).map((section) => (
                <CourseAccordionBar key={section._id} section={section} />
              ))}
              {(!course.courseContent || course.courseContent.length === 0) && (
                <p className="text-sm text-slate-400">This course doesn't have lectures yet.</p>
              )}
            </div>
          </section>
        </div>

        {/* Sticky Purchase Card */}
        <aside>
          <div className="sticky top-24 rounded-3xl border border-white/15 bg-midnight-surface/80 p-6 shadow-2xl shadow-indigo-950/60 backdrop-blur-2xl">
            <div className="aspect-video overflow-hidden rounded-2xl bg-midnight-card relative border border-white/10">
              {course.thumbnail ? (
                <img src={course.thumbnail} alt={course.courseName} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">Preview</div>
              )}
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Total Price:</span>
              <p className="font-display text-3xl font-black text-white">₹{course.price}</p>
            </div>

            {isInstructorOwner ? (
              <div className="mt-6 rounded-2xl bg-aurora-indigo/10 border border-aurora-indigo/30 p-4 text-center">
                <p className="text-xs font-semibold text-aurora-cyan">You created this course</p>
                <Link
                  to={`/dashboard/edit-course/${course._id}`}
                  className="mt-3 block rounded-xl aurora-btn py-2.5 text-xs font-bold text-white text-center"
                >
                  Edit Course
                </Link>
              </div>
            ) : alreadyEnrolled ? (
              <Link
                to={`/view-course/${course._id}`}
                className="mt-6 block rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-center text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition hover:brightness-110"
              >
                Go to Course Player &rarr;
              </Link>
            ) : (
              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={handleBuyNow}
                  className="aurora-btn rounded-xl py-3 text-sm font-bold text-white"
                >
                  Enroll Now
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={alreadyInCart}
                  className="rounded-xl border border-white/15 bg-white/5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:border-aurora-cyan/40 disabled:opacity-50"
                >
                  {alreadyInCart ? "Already in Cart" : "Add to Cart"}
                </button>
              </div>
            )}

            <div className="mt-6 border-t border-white/5 pt-5 space-y-2.5 text-xs text-slate-400">
              <p className="flex items-center gap-2 text-slate-300">
                <FaRegPlayCircle className="text-aurora-cyan" /> {totalLectures} on-demand video lectures
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <FaRegClock className="text-aurora-indigo" /> Full lifetime access
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
