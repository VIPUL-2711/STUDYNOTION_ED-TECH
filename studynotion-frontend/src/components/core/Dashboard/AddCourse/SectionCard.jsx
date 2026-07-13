import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { FiTrash2, FiEdit2, FiPlus } from "react-icons/fi"
import { BsPlayCircle } from "react-icons/bs"
import toast from "react-hot-toast"
import {
  createSubSection,
  updateSubSection,
  deleteSubSection,
  deleteSection,
  updateSection,
} from "../../../../services/operations/courseAPI"
import { setCourse } from "../../../../slices/courseSlice"

export default function SectionCard({ section }) {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)

  const [editingName, setEditingName] = useState(false)
  const [sectionName, setSectionName] = useState(section.sectionName)

  const [showLectureForm, setShowLectureForm] = useState(false)
  const [editingLecture, setEditingLecture] = useState(null)
  const [lectureData, setLectureData] = useState({ title: "", description: "", timeDuration: "" })
  const [videoFile, setVideoFile] = useState(null)
  const [saving, setSaving] = useState(false)

  function refreshSectionInCourse(updatedSection) {
    const updatedContent = course.courseContent.map((s) =>
      s._id === updatedSection._id ? updatedSection : s
    )
    dispatch(setCourse({ ...course, courseContent: updatedContent }))
  }

  async function handleRenameSection() {
    if (!sectionName.trim()) return
    const updated = await updateSection({ sectionId: section._id, sectionName, courseId: course._id }, token)
    if (updated) {
      // updateSection returns the updated course, not just the section - refresh whole course
      dispatch(setCourse(updated))
    }
    setEditingName(false)
  }

  async function handleDeleteSection() {
    const updated = await deleteSection({ sectionId: section._id, courseId: course._id }, token)
    if (updated) {
      dispatch(setCourse(updated))
    }
  }

  function openAddLecture() {
    setEditingLecture(null)
    setLectureData({ title: "", description: "", timeDuration: "" })
    setVideoFile(null)
    setShowLectureForm(true)
  }

  function openEditLecture(sub) {
    setEditingLecture(sub)
    setLectureData({ title: sub.title, description: sub.description, timeDuration: sub.timeDuration || "" })
    setVideoFile(null)
    setShowLectureForm(true)
  }

  async function handleLectureSubmit(e) {
    e.preventDefault()
    if (!editingLecture && !videoFile) {
      toast.error("Please choose a video file")
      return
    }
    setSaving(true)
    const data = new FormData()
    data.append("sectionId", section._id)
    data.append("title", lectureData.title)
    data.append("description", lectureData.description)
    data.append("timeDuration", lectureData.timeDuration || "0")
    if (videoFile) data.append("videoFile", videoFile)

    if (editingLecture) {
      data.append("subSectionId", editingLecture._id)
      const updatedSection = await updateSubSection(data, token)
      if (updatedSection) refreshSectionInCourse(updatedSection)
    } else {
      const updatedSection = await createSubSection(data, token)
      if (updatedSection) refreshSectionInCourse(updatedSection)
    }
    setSaving(false)
    setShowLectureForm(false)
  }

  async function handleDeleteLecture(subSectionId) {
    const success = await deleteSubSection({ subSectionId, sectionId: section._id }, token)
    if (success) {
      const updatedContent = course.courseContent.map((s) =>
        s._id === section._id
          ? { ...s, subSection: s.subSection.filter((sub) => sub._id !== subSectionId) }
          : s
      )
      dispatch(setCourse({ ...course, courseContent: updatedContent }))
    }
  }

  return (
    <div className="rounded-xl border border-ink-100 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-ink-100 px-5 py-4">
        {editingName ? (
          <input
            autoFocus
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
            onBlur={handleRenameSection}
            onKeyDown={(e) => e.key === "Enter" && handleRenameSection()}
            className="w-full rounded-lg border border-ink-100 px-3 py-1.5 text-sm outline-none focus:border-ink-900"
          />
        ) : (
          <p className="font-medium text-charcoal">{section.sectionName}</p>
        )}
        <div className="flex shrink-0 items-center gap-3 text-charcoal-dim">
          <FiEdit2 className="cursor-pointer hover:text-charcoal" onClick={() => setEditingName(true)} />
          <FiTrash2 className="cursor-pointer hover:text-rose-600" onClick={handleDeleteSection} />
        </div>
      </div>

      <div className="px-5 py-3">
        {(section.subSection || []).map((sub) => (
          <div key={sub._id} className="flex items-center justify-between gap-3 border-b border-ink-50 py-2.5 last:border-none">
            <span className="flex items-center gap-2 text-sm text-charcoal">
              <BsPlayCircle className="shrink-0 text-charcoal-dim" /> {sub.title}
            </span>
            <div className="flex shrink-0 items-center gap-3 text-charcoal-dim">
              <FiEdit2 size={14} className="cursor-pointer hover:text-charcoal" onClick={() => openEditLecture(sub)} />
              <FiTrash2 size={14} className="cursor-pointer hover:text-rose-600" onClick={() => handleDeleteLecture(sub._id)} />
            </div>
          </div>
        ))}

        {!showLectureForm && (
          <button
            onClick={openAddLecture}
            className="mt-3 flex items-center gap-2 text-sm font-medium text-ink-900 hover:underline"
          >
            <FiPlus /> Add a lecture
          </button>
        )}

        {showLectureForm && (
          <form onSubmit={handleLectureSubmit} className="mt-3 space-y-3 rounded-lg bg-ink-50 p-4">
            <input
              required
              placeholder="Lecture title"
              value={lectureData.title}
              onChange={(e) => setLectureData((p) => ({ ...p, title: e.target.value }))}
              className="w-full rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm outline-none focus:border-ink-900"
            />
            <textarea
              required
              rows={2}
              placeholder="Short description"
              value={lectureData.description}
              onChange={(e) => setLectureData((p) => ({ ...p, description: e.target.value }))}
              className="w-full rounded-lg border border-ink-100 bg-white px-3 py-2 text-sm outline-none focus:border-ink-900"
            />
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              className="block w-full text-xs text-charcoal-dim file:mr-3 file:rounded-lg file:border-0 file:bg-white file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-ink-900"
            />
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-ink-900 px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
              >
                {saving ? "Saving..." : editingLecture ? "Update lecture" : "Save lecture"}
              </button>
              <button
                type="button"
                onClick={() => setShowLectureForm(false)}
                className="rounded-lg border border-ink-100 px-4 py-2 text-xs font-medium text-charcoal-dim"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
