import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getUserDetails } from "../../services/operations/profileAPI"
import { getEnrolledCoursesProgress } from "../../services/operations/courseProgressAPI"
import { useDispatch } from "react-redux"
import Spinner from "../../components/common/Spinner"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const [progressMap, setProgressMap] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      await dispatch(getUserDetails(token))
      const progress = await getEnrolledCoursesProgress(token)
      setProgressMap(progress || {})
      setLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <Spinner />

  const courses = user?.courses || []

  return (
    <div className="space-y-6">
      <div className="border-b border-white/5 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-aurora-cyan">Student Portal</span>
        <h1 className="font-display text-2xl font-black text-white sm:text-3xl">Enrolled Courses</h1>
      </div>

      {courses.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-midnight-surface/50 p-12 text-center backdrop-blur-xl">
          <p className="text-slate-400">You haven't enrolled in any courses yet.</p>
          <Link to="/catalog" className="aurora-btn mt-6 inline-block rounded-xl px-6 py-2.5 text-xs font-bold text-white">
            Explore Courses
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => {
            const progress = progressMap[course._id] || 0
            return (
              <Link
                key={course._id}
                to={`/view-course/${course._id}`}
                className="glass-card flex flex-col gap-5 rounded-2xl border border-white/10 p-5 transition-all hover:border-aurora-cyan/40 sm:flex-row sm:items-center"
              >
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="h-24 w-full rounded-xl object-cover border border-white/10 sm:w-44 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-bold text-white truncate">{course.courseName}</h3>
                  <p className="mt-1 line-clamp-1 text-xs text-slate-400">{course.courseDescription}</p>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5 border border-white/5">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-aurora-cyan to-aurora-indigo transition-all duration-500 shadow-sm shadow-cyan-500/50"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono font-bold text-aurora-cyan">{progress}%</span>
                  </div>
                </div>

                <div className="sm:self-center shrink-0">
                  <span className="inline-block rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-xs font-semibold text-slate-200 transition group-hover:border-aurora-cyan/50 hover:bg-white/10">
                    Continue &rarr;
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
