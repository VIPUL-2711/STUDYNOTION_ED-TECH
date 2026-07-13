import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { fetchInstructorCourses } from "../../services/operations/courseAPI"
import Spinner from "../../components/common/Spinner"

export default function InstructorDashboard() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const result = await fetchInstructorCourses(token)
      setCourses(result || [])
      setLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <Spinner />

  const totalStudents = courses.reduce((acc, c) => acc + (c.studentsEnrolled?.length || 0), 0)
  const totalRevenue = courses.reduce(
    (acc, c) => acc + (c.studentsEnrolled?.length || 0) * Number(c.price || 0),
    0
  )
  const publishedCount = courses.filter((c) => c.status === "Published").length

  const stats = [
    { label: "Total courses", value: courses.length },
    { label: "Published", value: publishedCount },
    { label: "Total students", value: totalStudents },
    { label: "Total earnings", value: `₹${totalRevenue}` },
  ]

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-charcoal">
        Hi {user?.firstName}, let's build something great
      </h1>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-ink-100 bg-white p-6">
            <p className="text-sm text-charcoal-dim">{stat.label}</p>
            <p className="mt-2 font-display text-2xl font-bold text-charcoal">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-ink-100 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-charcoal">Your courses</h2>
          <Link to="/dashboard/my-courses" className="text-sm font-medium text-ink-900 hover:underline">
            View all
          </Link>
        </div>

        {courses.length === 0 ? (
          <p className="mt-4 text-sm text-charcoal-dim">Create your first course to see stats here.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {courses.slice(0, 5).map((course) => (
              <div key={course._id} className="flex items-center justify-between border-b border-ink-50 py-3 last:border-none">
                <span className="text-sm font-medium text-charcoal">{course.courseName}</span>
                <span className="text-xs text-charcoal-dim">{course.studentsEnrolled?.length || 0} students</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
