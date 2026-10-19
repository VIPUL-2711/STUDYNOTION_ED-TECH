import { useState } from "react"
import { useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io"
import { BsCheckCircleFill, BsCircle, BsPlayCircle } from "react-icons/bs"
import { HiMenuAlt2 } from "react-icons/hi"
import { IoClose } from "react-icons/io5"

export default function VideoDetailsSidebar() {
  const { sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { courseSectionData, courseEntireData, completedLectures } = useSelector(
    (state) => state.viewCourse
  )

  const totalLectures = (courseSectionData || []).reduce(
    (acc, s) => acc + (s.subSection?.length || 0),
    0
  )
  const completedCount = completedLectures.length
  const progressPercent = totalLectures > 0 ? Math.round((completedCount / totalLectures) * 100) : 0

  const sidebarContent = (
    <>
      <div className="border-b border-white/10 p-5 bg-white/[0.02]">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-cyan-400 transition"
          >
            <IoIosArrowBack /> Back to Courses
          </button>
          {mobileOpen && (
            <button
              onClick={() => setMobileOpen(false)}
              className="text-slate-400 hover:text-white md:hidden"
            >
              <IoClose size={20} />
            </button>
          )}
        </div>

        <h2 className="mt-3 line-clamp-2 font-display text-base font-bold text-white">
          {courseEntireData?.courseName}
        </h2>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span>{completedCount} / {totalLectures} lectures</span>
          <span className="font-semibold text-cyan-400">{progressPercent}%</span>
        </div>

        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {(courseSectionData || []).map((section) => (
          <div key={section._id} className="border-b border-white/5">
            <p className="bg-white/[0.03] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              {section.sectionName}
            </p>
            {(section.subSection || []).map((sub) => {
              const isActive = sub._id === subSectionId
              const isComplete = completedLectures.includes(sub._id)
              return (
                <Link
                  key={sub._id}
                  to={`/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${sub._id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-5 py-3 text-sm transition border-l-2 ${
                    isActive
                      ? "border-cyan-400 bg-cyan-500/10 font-semibold text-cyan-300"
                      : "border-transparent text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                  }`}
                >
                  {isComplete ? (
                    <BsCheckCircleFill className="shrink-0 text-emerald-400" />
                  ) : isActive ? (
                    <BsPlayCircle className="shrink-0 text-cyan-400" />
                  ) : (
                    <BsCircle className="shrink-0 text-slate-600" />
                  )}
                  <span className="line-clamp-2 text-xs md:text-sm">{sub.title}</span>
                </Link>
              )
            })}
          </div>
        ))}
      </div>
    </>
  )

  return (
    <>
      {/* Mobile Top Bar to Open Syllabus */}
      <div className="flex md:hidden items-center justify-between border-b border-white/10 bg-midnight-card/90 px-4 py-3 backdrop-blur-md">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
        >
          <HiMenuAlt2 size={18} /> Course Syllabus ({completedCount}/{totalLectures})
        </button>
        <span className="text-xs text-slate-400">{progressPercent}% complete</span>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden bg-black/70 backdrop-blur-sm">
          <div className="h-full w-4/5 max-w-sm flex flex-col bg-midnight-card border-r border-white/10 shadow-2xl animate-fade-in-up">
            {sidebarContent}
          </div>
          <div className="flex-1" onClick={() => setMobileOpen(false)} />
        </div>
      )}

      {/* Desktop Persistent Sidebar */}
      <div className="hidden md:flex sticky top-14 h-[calc(100vh-3.5rem)] w-80 shrink-0 flex-col border-r border-white/10 bg-midnight-card/80 backdrop-blur-xl">
        {sidebarContent}
      </div>
    </>
  )
}
