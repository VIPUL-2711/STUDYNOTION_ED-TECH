import { Link } from "react-router-dom"
import { FaStar } from "react-icons/fa"
import { getAverageRating } from "../../../utils/formatters"

export default function CourseCard({ course }) {
  const avgRating = getAverageRating(course.ratingAndReviews)

  return (
    <Link
      to={`/courses/${course._id}`}
      className="glass-card group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 hover:border-aurora-indigo/50"
    >
      <div>
        <div className="relative aspect-video w-full overflow-hidden bg-midnight-surface">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.courseName}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-slate-500">No thumbnail</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-card/80 via-transparent to-transparent opacity-60" />
        </div>

        <div className="p-4">
          <h3 className="line-clamp-2 font-display text-base font-bold text-white group-hover:text-aurora-cyan transition-colors">
            {course.courseName}
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            {course.instructor?.firstName ? `${course.instructor.firstName} ${course.instructor?.lastName || ""}` : "Instructor"}
          </p>

          <div className="mt-2.5 flex items-center gap-1.5 text-xs">
            <span className="font-bold text-amber-400">{avgRating || "New"}</span>
            {avgRating > 0 && <FaStar className="text-amber-400 text-xs" />}
            <span className="text-slate-500">
              ({course.ratingAndReviews?.length || 0})
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 p-4 pt-3 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Price</span>
        <p className="font-display text-lg font-extrabold text-white">₹{course.price}</p>
      </div>
    </Link>
  )
}
