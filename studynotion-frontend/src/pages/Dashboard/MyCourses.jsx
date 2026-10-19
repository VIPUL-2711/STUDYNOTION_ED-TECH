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
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-aurora-cyan">Instructor Center</span>
          <h1 className="font-display text-2xl font-black text-white sm:text-3xl">My Courses</h1>
        </div>
        <button
          onClick={() => navigate("/dashboard/add-course")}
          className="aurora-btn flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold text-white"
        >
          <FiPlus /> New course
        </button>
      </div>

      {courses.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-midnight-surface/50 p-12 text-center backdrop-blur-xl">
          <p className="text-slate-400">You haven't created any courses yet.</p>
          <button
            onClick={() => navigate("/dashboard/add-course")}
            className="aurora-btn mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-xs font-bold text-white"
          >
            <FiPlus /> Create Your First Course
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course._id} className="glass-card flex flex-col gap-5 rounded-2xl border border-white/10 p-5 sm:flex-row sm:items-center">
              <img src={course.thumbnail} alt={course.courseName} className="h-24 w-full rounded-xl object-cover border border-white/10 sm:w-44 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="font-display font-bold text-white text-base truncate">{course.courseName}</h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                      course.status === "Published"
                        ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                    }`}
                  >
                    {course.status || "Draft"}
                  </span>
                </div>
                <p className="mt-1 line-clamp-1 text-xs text-slate-400">{course.courseDescription}</p>
                <p className="mt-2.5 font-display text-lg font-black text-white">₹{course.price}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2.5">
                <Link
                  to={`/dashboard/edit-course/${course._id}`}
                  className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-300 transition hover:border-aurora-cyan/50 hover:bg-white/10 hover:text-white"
                  title="Edit Course"
                >
                  <FiEdit2 />
                </Link>
                <button
                  onClick={() => confirmDelete(course._id)}
                  className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-rose-400 transition hover:border-rose-500/50 hover:bg-rose-500/10 hover:text-rose-300"
                  title="Delete Course"
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
