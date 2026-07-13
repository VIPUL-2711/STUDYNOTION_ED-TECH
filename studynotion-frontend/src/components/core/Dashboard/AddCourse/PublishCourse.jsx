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
    <div className="rounded-2xl border border-ink-100 bg-white p-6">
      <h2 className="font-display text-lg font-semibold text-charcoal">Publish your course</h2>
      <p className="mt-1 text-sm text-charcoal-dim">
        Published courses appear in the catalog and can be purchased by students.
      </p>

      <label className="mt-6 flex items-center gap-3">
        <input
          type="checkbox"
          checked={publish}
          onChange={(e) => setPublish(e.target.checked)}
          className="h-4 w-4 accent-ink-900"
        />
        <span className="text-sm font-medium text-charcoal">Make this course public</span>
      </label>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => dispatch(setStep(2))}
          className="rounded-lg border border-ink-100 px-6 py-2.5 text-sm font-medium text-charcoal-dim hover:border-ink-900"
        >
          Back
        </button>
        <button
          onClick={handleFinish}
          disabled={saving}
          className="rounded-lg bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Finish"}
        </button>
      </div>
    </div>
  )
}
