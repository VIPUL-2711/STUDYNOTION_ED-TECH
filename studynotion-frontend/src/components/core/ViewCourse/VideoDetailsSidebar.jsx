import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"
import { BsCheckCircleFill, BsCircle, BsPlayCircle } from "react-icons/bs"

export default function VideoDetailsSidebar() {
  const { sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const { courseSectionData, courseEntireData, completedLectures } = useSelector(
    (state) => state.viewCourse
  )

  return (
    <div className="hidden h-[calc(100vh-64px)] w-80 shrink-0 flex-col overflow-y-auto border-r border-ink-100 bg-white sm:flex">
      <div className="border-b border-ink-100 p-5">
        <button
          onClick={() => navigate("/dashboard/enrolled-courses")}
          className="flex items-center gap-2 text-sm text-charcoal-dim hover:text-charcoal"
        >
          <IoIosArrowBack /> Back to courses
        </button>
        <h2 className="mt-3 line-clamp-2 font-display font-semibold text-charcoal">
          {courseEntireData?.courseName}
        </h2>
        <p className="mt-1 text-xs text-charcoal-dim">
          {completedLectures.length} / {courseSectionData.reduce((acc, s) => acc + (s.subSection?.length || 0), 0)} completed
        </p>
      </div>

      <div className="flex-1">
        {courseSectionData.map((section) => (
          <div key={section._id} className="border-b border-ink-50">
            <p className="bg-ink-50 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-charcoal-dim">
              {section.sectionName}
            </p>
            {(section.subSection || []).map((sub) => {
              const isActive = sub._id === subSectionId
              const isComplete = completedLectures.includes(sub._id)
              return (
                <Link
                  key={sub._id}
                  to={`/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${sub._id}`}
                  className={`flex items-center gap-3 px-5 py-3 text-sm transition ${
                    isActive ? "bg-ink-50 font-medium text-ink-900" : "text-charcoal-dim hover:bg-ink-50"
                  }`}
                >
                  {isComplete ? (
                    <BsCheckCircleFill className="shrink-0 text-emerald-500" />
                  ) : isActive ? (
                    <BsPlayCircle className="shrink-0 text-ink-900" />
                  ) : (
                    <BsCircle className="shrink-0" />
                  )}
                  <span className="line-clamp-2">{sub.title}</span>
                </Link>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
