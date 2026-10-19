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
    <div className="glass-card rounded-2xl border border-white/10 p-6 md:p-8">
      <h2 className="font-display text-xl font-bold text-white">Course Builder</h2>
      <p className="mt-1 text-sm text-slate-400">Organize your course into sections and video lectures.</p>

      <div className="mt-6 space-y-4">
        {(course?.courseContent || []).map((section) => (
          <SectionCard key={section._id} section={section} />
        ))}
      </div>

      <form onSubmit={handleAddSection} className="mt-6 flex flex-col sm:flex-row gap-3">
        <input
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          placeholder="New section name, e.g. Getting Started & Fundamentals"
          className="flex-1 rounded-xl border border-white/10 bg-midnight-card/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition"
        />
        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-5 py-2.5 text-sm font-medium text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition disabled:opacity-50"
        >
          <FiPlus className="text-lg" /> Add Section
        </button>
      </form>

      <div className="mt-8 flex justify-between pt-4 border-t border-white/10">
        <button
          onClick={() => dispatch(setStep(1))}
          className="rounded-xl border border-white/15 px-6 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="aurora-btn px-6 py-2.5 text-sm font-semibold text-white"
        >
          Next
        </button>
      </div>
    </div>
  )
}
