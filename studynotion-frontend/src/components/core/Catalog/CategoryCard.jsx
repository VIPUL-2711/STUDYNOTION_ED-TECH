import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa"

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/catalog/${category._id}`}
      className="group flex flex-col justify-between rounded-2xl border border-ink-100 bg-white p-6 transition hover:-translate-y-1 hover:border-ink-900 hover:shadow-lg"
    >
      <div>
        <h3 className="font-display text-lg font-semibold text-charcoal">{category.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-charcoal-dim">{category.description}</p>
      </div>
      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-ink-900">
        Browse courses
        <FaArrowRight className="transition group-hover:translate-x-1" size={12} />
      </div>
    </Link>
  )
}
