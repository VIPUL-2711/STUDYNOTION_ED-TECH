import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { BsCheckCircleFill } from "react-icons/bs"
import { markLectureAsComplete } from "../../../services/operations/courseProgressAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"
import CourseReviewModal from "./CourseReviewModal"

export default function VideoDetails() {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, completedLectures } = useSelector((state) => state.viewCourse)
  const [marking, setMarking] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)

  if (!courseSectionData || courseSectionData.length === 0) return null

  if (!sectionId || !subSectionId) {
    return (
      <div className="flex h-[calc(100vh-64px)] flex-1 items-center justify-center px-6 text-center">
        <p className="text-charcoal-dim">Pick a lecture from the sidebar to get started.</p>
      </div>
    )
  }

  const currentSection = courseSectionData.find((s) => s._id === sectionId)
  const currentSub = currentSection?.subSection?.find((s) => s._id === subSectionId)

  if (!currentSection || !currentSub) {
    return (
      <div className="flex h-[calc(100vh-64px)] flex-1 items-center justify-center px-6 text-center">
        <p className="text-charcoal-dim">This lecture could not be found.</p>
      </div>
    )
  }

  // build a flat, ordered list of all lectures for prev/next navigation
  const flatLectures = courseSectionData.flatMap((section) =>
    (section.subSection || []).map((sub) => ({ sectionId: section._id, sub }))
  )
  const currentIndex = flatLectures.findIndex((l) => l.sub._id === subSectionId)
  const prevLecture = currentIndex > 0 ? flatLectures[currentIndex - 1] : null
  const nextLecture = currentIndex < flatLectures.length - 1 ? flatLectures[currentIndex + 1] : null
  const isComplete = completedLectures.includes(subSectionId)

  async function handleMarkComplete() {
    if (isComplete) return
    setMarking(true)
    const success = await markLectureAsComplete({ courseId, subSectionId }, token)
    if (success) {
      dispatch(updateCompletedLectures(subSectionId))
      toast.success("Marked as complete")
    }
    setMarking(false)
  }

  function goTo(lecture) {
    navigate(`/view-course/${courseId}/section/${lecture.sectionId}/sub-section/${lecture.sub._id}`)
  }

  return (
    <div className="flex-1 px-6 py-8 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
          {currentSub.videoURL ? (
            <video
              key={currentSub._id}
              src={currentSub.videoURL}
              controls
              className="h-full w-full"
              onEnded={handleMarkComplete}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-white/60">No video uploaded</div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl font-bold text-charcoal">{currentSub.title}</h1>
            <p className="mt-1 text-sm text-charcoal-dim">{currentSection.sectionName}</p>
          </div>
          <button
            onClick={handleMarkComplete}
            disabled={marking || isComplete}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition disabled:cursor-default ${
              isComplete
                ? "bg-emerald-100 text-emerald-700"
                : "bg-ink-900 text-white hover:bg-ink-800"
            }`}
          >
            <BsCheckCircleFill />
            {isComplete ? "Completed" : marking ? "Saving..." : "Mark as complete"}
          </button>
        </div>

        <p className="mt-4 text-sm text-charcoal-dim">{currentSub.description}</p>

        <div className="mt-8 flex items-center justify-between border-t border-ink-100 pt-6">
          <button
            onClick={() => prevLecture && goTo(prevLecture)}
            disabled={!prevLecture}
            className="rounded-lg border border-ink-100 px-5 py-2.5 text-sm font-medium text-charcoal-dim disabled:opacity-40"
          >
            Previous
          </button>

          <button
            onClick={() => setShowReviewModal(true)}
            className="text-sm font-medium text-ink-900 hover:underline"
          >
            Leave a review
          </button>

          <button
            onClick={() => nextLecture && goTo(nextLecture)}
            disabled={!nextLecture}
            className="rounded-lg bg-ink-900 px-5 py-2.5 text-sm font-medium text-white disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {showReviewModal && <CourseReviewModal onClose={() => setShowReviewModal(false)} />}
    </div>
  )
}
