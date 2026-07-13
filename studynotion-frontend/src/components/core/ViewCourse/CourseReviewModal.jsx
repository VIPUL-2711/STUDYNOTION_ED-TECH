import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { IoClose } from "react-icons/io5"
import RatingStars from "../../common/RatingStars"
import { createRating } from "../../../services/operations/ratingAPI"

export default function CourseReviewModal({ onClose }) {
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [saving, setSaving] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (rating === 0) return
    setSaving(true)
    const success = await createRating(
      { courseId: courseEntireData._id, rating, review },
      token
    )
    setSaving(false)
    if (success) onClose()
  }

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-charcoal/50 backdrop-blur-sm">
      <div className="w-11/12 max-w-md animate-fade-in-up rounded-2xl border border-ink-100 bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold text-charcoal">Rate this course</h3>
          <button onClick={onClose} className="text-charcoal-dim hover:text-charcoal">
            <IoClose size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5">
          <div className="flex justify-center">
            <RatingStars rating={rating} onChange={setRating} size="text-3xl" />
          </div>
          <textarea
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your experience with this course..."
            className="mt-5 w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
          />
          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-ink-100 px-5 py-2.5 text-sm font-medium text-charcoal-dim"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || rating === 0}
              className="rounded-lg bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
            >
              {saving ? "Submitting..." : "Submit review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
