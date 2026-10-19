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
      <div className="flex h-[calc(100vh-3.5rem)] flex-1 items-center justify-center px-6 text-center">
        <div className="glass-card max-w-md p-8 rounded-2xl border border-white/10">
          <p className="text-slate-300 font-medium">Select a lecture from the sidebar to start learning.</p>
        </div>
      </div>
    )
  }

  const currentSection = courseSectionData.find((s) => s._id === sectionId)
  const currentSub = currentSection?.subSection?.find((s) => s._id === subSectionId)

  if (!currentSection || !currentSub) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] flex-1 items-center justify-center px-6 text-center">
        <div className="glass-card max-w-md p-8 rounded-2xl border border-white/10">
          <p className="text-slate-300 font-medium">This lecture could not be found.</p>
        </div>
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
    <div className="flex-1 px-4 py-6 sm:px-8 md:px-10 md:py-8">
      <div className="mx-auto max-w-5xl">
        {/* Video Theater Frame */}
        <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black border border-white/10 shadow-2xl">
          {currentSub.videoURL ? (
            <video
              key={currentSub._id}
              src={currentSub.videoURL}
              controls
              controlsList="nodownload"
              className="h-full w-full object-contain"
              onEnded={handleMarkComplete}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400">
              No video source available for this lecture
            </div>
          )}
        </div>

        {/* Action Header */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-white">
              {currentSub.title}
            </h1>
            <p className="mt-1 text-xs sm:text-sm font-medium text-cyan-400">
              {currentSection.sectionName}
            </p>
          </div>
          <button
            onClick={handleMarkComplete}
            disabled={marking || isComplete}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
              isComplete
                ? "border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 cursor-default"
                : "aurora-btn text-white disabled:opacity-50"
            }`}
          >
            <BsCheckCircleFill className={isComplete ? "text-emerald-400" : "text-white"} />
            {isComplete ? "Completed" : marking ? "Saving..." : "Mark as Complete"}
          </button>
        </div>

        {/* Lecture Notes / Description */}
        {currentSub.description && (
          <div className="mt-6 rounded-xl border border-white/10 bg-midnight-card/60 p-5 backdrop-blur-md">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">About this lecture</h3>
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{currentSub.description}</p>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
          <button
            onClick={() => prevLecture && goTo(prevLecture)}
            disabled={!prevLecture}
            className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition"
          >
            ← Previous Lecture
          </button>

          <button
            onClick={() => setShowReviewModal(true)}
            className="text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition"
          >
            ★ Leave a Review
          </button>

          <button
            onClick={() => nextLecture && goTo(nextLecture)}
            disabled={!nextLecture}
            className="aurora-btn px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-30 disabled:pointer-events-none"
          >
            Next Lecture →
          </button>
        </div>
      </div>

      {showReviewModal && <CourseReviewModal onClose={() => setShowReviewModal(false)} />}
    </div>
  )
}
