import { useDispatch } from "react-redux"
import { RiDeleteBin6Line } from "react-icons/ri"
import { removeFromCart } from "../../../../slices/cartSlice"

export default function RenderCartCourses({ course }) {
  const dispatch = useDispatch()

  return (
    <div className="flex items-center gap-4 border-b border-ink-100 py-5 last:border-none">
      <img src={course.thumbnail} alt={course.courseName} className="h-20 w-32 rounded-lg object-cover" />
      <div className="flex-1">
        <h3 className="font-medium text-charcoal">{course.courseName}</h3>
        <p className="mt-1 text-xs text-charcoal-dim">
          {course.instructor?.firstName} {course.instructor?.lastName}
        </p>
        <button
          onClick={() => dispatch(removeFromCart(course._id))}
          className="mt-2 flex items-center gap-1 text-xs text-rose-600 hover:underline"
        >
          <RiDeleteBin6Line /> Remove
        </button>
      </div>
      <p className="font-display text-lg font-semibold text-ink-900">₹{course.price}</p>
    </div>
  )
}
