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
    <div className="space-y-8">
      <div className="border-b border-white/5 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-aurora-cyan">Instructor Analytics</span>
        <h1 className="font-display text-2xl font-black text-white sm:text-3xl">
          Welcome back, {user?.firstName}
        </h1>
        <p className="mt-1 text-xs text-slate-400">Here is your high-level overview of enrollment performance and revenue.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className="glass-card rounded-3xl border border-white/10 p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{stat.label}</p>
            <p className={`mt-3 font-display text-3xl font-black ${stat.label.includes("earnings") ? "aurora-gradient-text" : "text-white"}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-3xl border border-white/10 p-7">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h2 className="font-display text-lg font-bold text-white">Course Performance Summary</h2>
          <Link to="/dashboard/my-courses" className="text-xs font-semibold text-aurora-cyan hover:underline">
            View all courses &rarr;
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-sm text-slate-400">Publish your first curriculum to start tracking enrollment data.</p>
          </div>
        ) : (
          <div className="mt-4 divide-y divide-white/5">
            {courses.slice(0, 5).map((course) => (
              <div key={course._id} className="flex items-center justify-between py-4">
                <span className="text-sm font-semibold text-white truncate max-w-md">{course.courseName}</span>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                  <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/5 text-aurora-cyan font-bold">
                    {course.studentsEnrolled?.length || 0} students
                  </span>
                  <span className="text-white font-bold">₹{Number(course.price || 0) * (course.studentsEnrolled?.length || 0)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
