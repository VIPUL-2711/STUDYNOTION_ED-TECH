import { Link } from "react-router-dom"
import { FaStar } from "react-icons/fa"
import { getAverageRating } from "../../../utils/formatters"

export default function CourseCard({ course }) {
  const avgRating = getAverageRating(course.ratingAndReviews)

  return (
    <Link
      to={`/courses/${course._id}`}
      className="folded-corner group block overflow-hidden rounded-2xl border border-ink-100 bg-white transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="aspect-video w-full overflow-hidden bg-ink-50">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.courseName}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-charcoal-dim">No image</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="line-clamp-2 font-display text-base font-semibold text-charcoal">
          {course.courseName}
        </h3>
        <p className="mt-1 text-xs text-charcoal-dim">
          {course.instructor?.firstName} {course.instructor?.lastName}
        </p>
        <div className="mt-2 flex items-center gap-1 text-sm">
          <span className="font-semibold text-amber-600">{avgRating || "New"}</span>
          {avgRating > 0 && <FaStar className="text-amber-500" size={12} />}
          <span className="text-xs text-charcoal-dim">
            ({course.ratingAndReviews?.length || 0})
          </span>
        </div>
        <p className="mt-2 font-display text-lg font-bold text-ink-900">₹{course.price}</p>
      </div>
    </Link>
  )
}
