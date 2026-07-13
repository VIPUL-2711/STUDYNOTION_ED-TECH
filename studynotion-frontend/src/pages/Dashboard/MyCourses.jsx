import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi"
import { fetchInstructorCourses, deleteCourse } from "../../services/operations/courseAPI"
import ConfirmationModal from "../../components/common/ConfirmationModal"
import Spinner from "../../components/common/Spinner"

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const navigate = useNavigate()

  async function loadCourses() {
    setLoading(true)
    const result = await fetchInstructorCourses(token)
    setCourses(result || [])
    setLoading(false)
  }

  useEffect(() => {
    loadCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function confirmDelete(courseId) {
    setConfirmationModal({
      text1: "Delete this course?",
      text2: "Enrolled students will lose access. This can't be undone.",
      btn1Text: "Delete",
      btn2Text: "Cancel",
      btn1Handler: async () => {
        await deleteCourse(courseId, token)
        setConfirmationModal(null)
        loadCourses()
      },
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (loading) return <Spinner />

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-charcoal">My Courses</h1>
        <button
          onClick={() => navigate("/dashboard/add-course")}
          className="flex items-center gap-2 rounded-lg bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-ink-800"
        >
          <FiPlus /> New course
        </button>
      </div>

      {courses.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-ink-100 bg-white p-10 text-center">
          <p className="text-charcoal-dim">You haven't created any courses yet.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {courses.map((course) => (
            <div key={course._id} className="flex flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-5 sm:flex-row sm:items-center">
              <img src={course.thumbnail} alt={course.courseName} className="h-24 w-full rounded-xl object-cover sm:w-40" />
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-display font-semibold text-charcoal">{course.courseName}</h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      course.status === "Published"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {course.status || "Draft"}
                  </span>
                </div>
                <p className="mt-1 line-clamp-1 text-xs text-charcoal-dim">{course.courseDescription}</p>
                <p className="mt-2 font-display font-semibold text-ink-900">₹{course.price}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Link
                  to={`/dashboard/edit-course/${course._id}`}
                  className="rounded-lg border border-ink-100 p-2.5 text-charcoal-dim hover:border-ink-900 hover:text-charcoal"
                >
                  <FiEdit2 />
                </Link>
                <button
                  onClick={() => confirmDelete(course._id)}
                  className="rounded-lg border border-ink-100 p-2.5 text-charcoal-dim hover:border-rose-600 hover:text-rose-600"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <ConfirmationModal modalData={confirmationModal} />
    </div>
  )
}
