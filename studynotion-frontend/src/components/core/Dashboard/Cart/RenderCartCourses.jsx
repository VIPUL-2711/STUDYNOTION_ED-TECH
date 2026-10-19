import { useDispatch } from "react-redux"
import { RiDeleteBin6Line } from "react-icons/ri"
import { removeFromCart } from "../../../../slices/cartSlice"

export default function RenderCartCourses({ course }) {
  const dispatch = useDispatch()

  return (
    <div className="flex items-center gap-5 border-b border-white/5 py-5 last:border-none">
      <img src={course.thumbnail} alt={course.courseName} className="h-20 w-32 rounded-xl object-cover border border-white/10" />
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-white text-base truncate">{course.courseName}</h3>
        <p className="mt-1 text-xs text-slate-400">
          {course.instructor?.firstName} {course.instructor?.lastName}
        </p>
        <button
          onClick={() => dispatch(removeFromCart(course._id))}
          className="mt-2.5 flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
        >
          <RiDeleteBin6Line /> Remove
        </button>
      </div>
      <p className="font-display text-xl font-black text-white shrink-0">₹{course.price}</p>
    </div>
  )
}
