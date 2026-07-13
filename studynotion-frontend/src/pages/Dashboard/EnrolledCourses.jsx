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
    <div>
      <h1 className="font-display text-2xl font-bold text-charcoal">Enrolled Courses</h1>

      {courses.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-ink-100 bg-white p-10 text-center">
          <p className="text-charcoal-dim">You haven't enrolled in any courses yet.</p>
          <Link to="/catalog" className="mt-4 inline-block text-sm font-medium text-ink-900 hover:underline">
            Browse the catalog
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {courses.map((course) => {
            const progress = progressMap[course._id] || 0
            return (
              <Link
                key={course._id}
                to={`/view-course/${course._id}`}
                className="flex flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-5 transition hover:shadow-md sm:flex-row sm:items-center"
              >
                <img
                  src={course.thumbnail}
                  alt={course.courseName}
                  className="h-24 w-full rounded-xl object-cover sm:w-40"
                />
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-charcoal">{course.courseName}</h3>
                  <p className="mt-1 line-clamp-1 text-xs text-charcoal-dim">{course.courseDescription}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink-50">
                      <div
                        className="h-full rounded-full bg-emerald-500 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-charcoal-dim">{progress}%</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
