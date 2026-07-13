import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaArrowRight, FaChalkboardTeacher, FaLaptopCode, FaCertificate } from "react-icons/fa"
import { fetchCourseCategories, getAllCourses } from "../services/operations/courseDetailsAPI"
import CourseCard from "../components/core/Catalog/CourseCard"
import CategoryCard from "../components/core/Catalog/CategoryCard"
import Spinner from "../components/common/Spinner"

const PERKS = [
  {
    icon: FaChalkboardTeacher,
    title: "Taught by working instructors",
    body: "Every course is built by people who use these skills at work, not just teach them.",
  },
  {
    icon: FaLaptopCode,
    title: "Learn by building",
    body: "Lecture-along projects instead of passive watching — you finish with something real.",
  },
  {
    icon: FaCertificate,
    title: "Track real progress",
    body: "Course progress is saved lecture by lecture, so you always know exactly where you left off.",
  },
]

export default function Home() {
  const [categories, setCategories] = useState([])
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const [cats, allCourses] = await Promise.all([fetchCourseCategories(), getAllCourses()])
      setCategories(cats || [])
      setCourses((allCourses || []).slice(0, 8))
      setLoading(false)
    })()
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink-100 bg-white px-4 py-1.5 text-xs font-medium text-charcoal-dim">
            New cohorts opening this month
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-charcoal sm:text-5xl">
            Skills worth <span className="marker-highlight"><span>underlining</span></span>, taught by people who use them.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-charcoal-dim">
            Browse hands-on courses in tech, design, and business — built by instructors, tracked lecture by lecture.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/catalog"
              className="flex items-center gap-2 rounded-lg bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink-800"
            >
              Explore courses <FaArrowRight size={12} />
            </Link>
            <Link
              to="/signup"
              className="rounded-lg border border-ink-100 bg-white px-6 py-3 text-sm font-semibold text-charcoal transition hover:border-ink-900"
            >
              Become an instructor
            </Link>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-y border-ink-100 bg-white py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 sm:grid-cols-3">
          {PERKS.map((perk) => (
            <div key={perk.title}>
              <perk.icon className="text-2xl text-amber-500" />
              <h3 className="mt-4 font-display text-lg font-semibold text-charcoal">{perk.title}</h3>
              <p className="mt-2 text-sm text-charcoal-dim">{perk.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold text-charcoal">Browse by category</h2>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 6).map((cat) => (
              <CategoryCard key={cat._id} category={cat} />
            ))}
          </div>
        </section>
      )}

      {/* Featured courses */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl font-bold text-charcoal">Featured courses</h2>
          <Link to="/catalog" className="text-sm font-medium text-ink-900 hover:underline">
            View all
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : courses.length === 0 ? (
          <p className="mt-8 text-sm text-charcoal-dim">No published courses yet — check back soon.</p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
