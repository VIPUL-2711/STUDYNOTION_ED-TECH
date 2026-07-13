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
        <h1 className="font-display text-3xl font-bold text-charcoal">Browse the catalog</h1>
        <p className="mt-2 text-charcoal-dim">Pick a category to see what's inside.</p>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <CategoryCard key={cat._id} category={cat} />
          ))}
          {categories.length === 0 && (
            <p className="text-sm text-charcoal-dim">No categories available yet.</p>
          )}
        </div>
      </div>
    )
  }

  if (!catalogData || !catalogData.selectedCategory) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <p className="text-charcoal-dim">This category could not be found.</p>
        <Link to="/catalog" className="mt-4 inline-block text-sm font-medium text-ink-900 hover:underline">
          Back to catalog
        </Link>
      </div>
    )
  }

  const { selectedCategory, differentCategory, allCourses } = catalogData

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <p className="text-sm text-charcoal-dim">Home / Catalog / <span className="text-charcoal">{selectedCategory.name}</span></p>
      <h1 className="mt-2 font-display text-3xl font-bold text-charcoal">{selectedCategory.name}</h1>
      <p className="mt-2 max-w-2xl text-charcoal-dim">{selectedCategory.description}</p>

      <section className="mt-10">
        <h2 className="font-display text-xl font-semibold text-charcoal">Courses in this category</h2>
        {selectedCategory.courses?.length ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {selectedCategory.courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-charcoal-dim">No courses published in this category yet.</p>
        )}
      </section>

      {differentCategory?.courses?.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-semibold text-charcoal">
            Explore {differentCategory.name}
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentCategory.courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        </section>
      )}

      {allCourses?.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-xl font-semibold text-charcoal">More top courses</h2>
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
