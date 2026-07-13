import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { FiPlus } from "react-icons/fi"
import { createSection } from "../../../../services/operations/courseAPI"
import { setCourse, setStep } from "../../../../slices/courseSlice"
import SectionCard from "./SectionCard"

export default function CourseBuilderForm() {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [sectionName, setSectionName] = useState("")
  const [saving, setSaving] = useState(false)

  async function handleAddSection(e) {
    e.preventDefault()
    if (!sectionName.trim()) return
    setSaving(true)
    const updatedCourse = await createSection(
      { sectionName, courseId: course._id },
      token
    )
    if (updatedCourse) {
      dispatch(setCourse(updatedCourse))
      setSectionName("")
    }
    setSaving(false)
  }

  function handleNext() {
    const hasContent = (course.courseContent || []).some((s) => s.subSection?.length > 0)
    if (!course.courseContent || course.courseContent.length === 0) {
      toast.error("Add at least one section")
      return
    }
    if (!hasContent) {
      toast.error("Add at least one lecture")
      return
    }
    dispatch(setStep(3))
  }

  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-6">
      <h2 className="font-display text-lg font-semibold text-charcoal">Course builder</h2>
      <p className="mt-1 text-sm text-charcoal-dim">Organize your course into sections and lectures.</p>

      <div className="mt-6 space-y-4">
        {(course?.courseContent || []).map((section) => (
          <SectionCard key={section._id} section={section} />
        ))}
      </div>

      <form onSubmit={handleAddSection} className="mt-5 flex gap-3">
        <input
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          placeholder="New section name, e.g. Getting Started"
          className="flex-1 rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm outline-none focus:border-ink-900"
        />
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-lg border border-ink-900 px-4 py-2.5 text-sm font-medium text-ink-900 hover:bg-ink-50 disabled:opacity-60"
        >
          <FiPlus /> Add section
        </button>
      </form>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => dispatch(setStep(1))}
          className="rounded-lg border border-ink-100 px-6 py-2.5 text-sm font-medium text-charcoal-dim hover:border-ink-900"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="rounded-lg bg-ink-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-ink-800"
        >
          Next
        </button>
      </div>
    </div>
  )
}
