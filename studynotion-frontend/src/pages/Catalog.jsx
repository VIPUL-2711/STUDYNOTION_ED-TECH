import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { fetchCourseCategories, getCatalogPageData } from "../services/operations/courseDetailsAPI"
import CourseCard from "../components/core/Catalog/CourseCard"
import CategoryCard from "../components/core/Catalog/CategoryCard"
import Spinner from "../components/common/Spinner"

export default function Catalog() {
  const { categoryId } = useParams()
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [catalogData, setCatalogData] = useState(null)

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      if (categoryId) {
        const data = await getCatalogPageData(categoryId)
        setCatalogData(data)
      } else {
        const cats = await fetchCourseCategories()
        setCategories(cats || [])
      }
      setLoading(false)
    })()
  }, [categoryId])

  if (loading) return <Spinner />

  if (!categoryId) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="border-b border-white/10 pb-6 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-aurora-cyan">Knowledge Base</span>
          <h1 className="mt-2 font-display text-3xl font-black text-white sm:text-4xl">Browse the Catalog</h1>
          <p className="mt-2 text-slate-400">Choose a discipline below to explore industry-aligned curricula and workshops.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard key={cat._id} category={cat} />
          ))}
          {categories.length === 0 && (
            <div className="col-span-full rounded-2xl border border-white/10 bg-midnight-surface/50 p-12 text-center">
              <p className="text-sm text-slate-400">No categories available yet.</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (!catalogData || !catalogData.selectedCategory) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        <div className="inline-block rounded-2xl border border-white/10 bg-midnight-surface/50 p-12 backdrop-blur-xl">
          <p className="text-slate-400 text-lg">This category could not be found.</p>
          <Link to="/catalog" className="aurora-btn mt-6 inline-block rounded-xl px-6 py-2.5 text-sm font-bold text-white">
            Back to catalog
          </Link>
        </div>
      </div>
    )
  }

  const { selectedCategory, differentCategory, allCourses } = catalogData

  return (
    <div className="mx-auto max-w-7xl px-6 py-14">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <Link to="/catalog" className="hover:text-white transition-colors">Catalog</Link>
        <span>/</span>
        <span className="text-aurora-cyan font-medium">{selectedCategory.name}</span>
      </div>

      <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-midnight-surface/80 via-midnight-card/80 to-midnight-surface/80 p-8 sm:p-10 backdrop-blur-xl">
        <span className="inline-block rounded-full bg-aurora-indigo/20 px-3.5 py-1 text-xs font-semibold text-aurora-cyan border border-aurora-cyan/30">
          Category Overview
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-4xl">{selectedCategory.name}</h1>
        <p className="mt-3 max-w-3xl text-slate-300 leading-relaxed">{selectedCategory.description}</p>
      </div>

      {/* Courses in Selected Category */}
      <section className="mt-14">
        <div className="border-b border-white/5 pb-4">
          <h2 className="font-display text-2xl font-bold text-white">Courses in {selectedCategory.name}</h2>
        </div>
        {selectedCategory.courses?.length ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {selectedCategory.courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-white/10 bg-midnight-surface/40 p-8 text-center">
            <p className="text-sm text-slate-400">No courses published in this category yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Different Category */}
      {differentCategory?.courses?.length > 0 && (
        <section className="mt-16">
          <div className="border-b border-white/5 pb-4">
            <h2 className="font-display text-2xl font-bold text-white">
              Explore {differentCategory.name}
            </h2>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentCategory.courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </section>
      )}

      {/* All Top Courses */}
      {allCourses?.length > 0 && (
        <section className="mt-16">
          <div className="border-b border-white/5 pb-4">
            <h2 className="font-display text-2xl font-bold text-white">Trending Programs across StudyNotion</h2>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {allCourses.slice(0, 4).map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
