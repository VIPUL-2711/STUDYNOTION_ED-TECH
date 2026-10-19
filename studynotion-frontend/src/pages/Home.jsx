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
      setCategories(Array.isArray(cats) ? cats : [])
      setCourses(Array.isArray(allCourses) ? allCourses.slice(0, 8) : [])
      setLoading(false)
    })()
  }, [])

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-16 sm:pt-28 overflow-hidden">
        {/* Ambient background blur circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-aurora-indigo/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-64 h-64 bg-aurora-cyan/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-aurora-cyan backdrop-blur-xl shadow-inner">
            <span className="h-1.5 w-1.5 rounded-full bg-aurora-cyan animate-pulse" />
            Empowering the Next Generation of Builders
          </span>

          <h1 className="mt-8 font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl leading-[1.15]">
            Master skills that actually matter, <span className="aurora-gradient-text">engineered</span> for your future.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300 leading-relaxed">
            Hands-on courses in software engineering, modern AI, product design, and business. Learn from industry leaders, tracked lecture by lecture.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/catalog"
              className="aurora-btn flex items-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-bold text-white"
            >
              <span>Explore All Courses</span>
              <FaArrowRight size={12} />
            </Link>
            <Link
              to="/signup"
              className="rounded-xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-xl transition hover:border-aurora-cyan/40 hover:bg-white/10 hover:text-white"
            >
              Become an Instructor
            </Link>
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PERKS.map((perk, i) => (
            <div key={perk.title} className="glass-card rounded-2xl p-7 border border-white/10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-aurora-cyan/15 to-aurora-indigo/15 border border-white/10 text-aurora-cyan text-xl mb-5">
                <perk.icon />
              </div>
              <h3 className="font-display text-lg font-bold text-white">{perk.title}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{perk.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="flex items-end justify-between border-b border-white/5 pb-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-aurora-cyan">Browse Categories</p>
              <h2 className="mt-1 font-display text-2xl font-extrabold text-white">Find your specialty</h2>
            </div>
            <Link to="/catalog" className="text-sm font-semibold text-aurora-indigo hover:text-aurora-cyan transition-colors">
              View all &rarr;
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.slice(0, 6).map((cat) => (
              <CategoryCard key={cat._id} category={cat} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Courses Section */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between border-b border-white/5 pb-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-aurora-cyan">Featured Programs</p>
            <h2 className="mt-1 font-display text-2xl font-extrabold text-white">Popular courses to start now</h2>
          </div>
          <Link to="/catalog" className="text-sm font-semibold text-aurora-indigo hover:text-aurora-cyan transition-colors">
            View all courses &rarr;
          </Link>
        </div>

        {loading ? (
          <Spinner />
        ) : courses.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-midnight-surface/50 p-12 text-center backdrop-blur-xl">
            <p className="text-slate-400">No published courses available yet. Check back soon!</p>
          </div>
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
