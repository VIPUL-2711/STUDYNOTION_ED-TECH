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
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/75 backdrop-blur-md p-4">
      <div className="w-full max-w-md animate-fade-in-up rounded-2xl border border-white/10 bg-midnight-card p-6 shadow-2xl relative">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="font-display text-lg font-bold text-white">Rate This Course</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white transition"
          >
            <IoClose size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/5 bg-midnight-surface/50">
            <span className="text-xs text-slate-400 mb-2">Tap stars to rate</span>
            <RatingStars rating={rating} onChange={setRating} size="text-3xl" />
          </div>
          <textarea
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Share your detailed feedback and experience with this course..."
            className="w-full rounded-xl border border-white/10 bg-midnight-surface px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition resize-y"
          />
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || rating === 0}
              className="aurora-btn px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
            >
              {saving ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
