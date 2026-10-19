import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa"

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/catalog/${category._id}`}
      className="glass-card group flex flex-col justify-between rounded-2xl border border-white/10 p-6 transition-all hover:border-aurora-cyan/40"
    >
      <div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aurora-indigo/10 border border-aurora-indigo/20 text-aurora-cyan mb-4 group-hover:scale-110 transition-transform">
          <span className="font-display font-bold">{category.name?.[0] || "C"}</span>
        </div>
        <h3 className="font-display text-lg font-bold text-white group-hover:text-aurora-cyan transition-colors">{category.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-400 leading-relaxed">{category.description}</p>
      </div>
      <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-aurora-cyan">
        <span>Browse courses</span>
        <FaArrowRight className="transition-transform group-hover:translate-x-1" size={10} />
      </div>
    </Link>
  )
}
