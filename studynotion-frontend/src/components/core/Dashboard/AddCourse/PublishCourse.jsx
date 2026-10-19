import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { editCourseDetails } from "../../../../services/operations/courseAPI"
import { resetCourseState, setStep } from "../../../../slices/courseSlice"

export default function PublishCourse() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [publish, setPublish] = useState(course?.status === "Published")
  const [saving, setSaving] = useState(false)

  async function handleFinish() {
    setSaving(true)
    await editCourseDetails(
      { courseId: course._id, status: publish ? "Published" : "Draft" },
      token
    )
    setSaving(false)
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  return (
    <div className="glass-card rounded-2xl border border-white/10 p-6 md:p-8">
      <h2 className="font-display text-xl font-bold text-white">Publish Your Course</h2>
      <p className="mt-1 text-sm text-slate-400">
        Published courses appear in the live catalog and can be discovered and purchased by students worldwide.
      </p>

      <label className="mt-6 flex items-center gap-3.5 p-4 rounded-xl border border-white/10 bg-midnight-surface/50 cursor-pointer hover:border-cyan-500/40 transition">
        <input
          type="checkbox"
          checked={publish}
          onChange={(e) => setPublish(e.target.checked)}
          className="h-5 w-5 rounded border-white/20 accent-cyan-500 cursor-pointer"
        />
        <div>
          <span className="text-sm font-semibold text-white">Make this course public</span>
          <p className="text-xs text-slate-400">Uncheck to keep it in Draft mode until you are ready to launch.</p>
        </div>
      </label>

      <div className="mt-8 flex justify-between pt-4 border-t border-white/10">
        <button
          onClick={() => dispatch(setStep(2))}
          className="rounded-xl border border-white/15 px-6 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition"
        >
          Back
        </button>
        <button
          onClick={handleFinish}
          disabled={saving}
          className="aurora-btn px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : publish ? "Publish Course" : "Save as Draft"}
        </button>
      </div>
    </div>
  )
}
