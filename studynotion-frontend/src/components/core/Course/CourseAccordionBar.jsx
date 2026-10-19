import { useState } from "react"
import { IoChevronDown } from "react-icons/io5"
import { BsPlayCircle } from "react-icons/bs"
import { formatDuration } from "../../../utils/formatters"

export default function CourseAccordionBar({ section }) {
  const [open, setOpen] = useState(false)
  const subSections = section.subSection || []

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-midnight-surface/60 backdrop-blur-xl transition-all">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition hover:bg-white/5"
      >
        <span className="font-semibold text-white text-sm sm:text-base">{section.sectionName}</span>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="bg-white/5 px-2.5 py-1 rounded-md border border-white/5">{subSections.length} lecture{subSections.length !== 1 ? "s" : ""}</span>
          <IoChevronDown className={`transition-transform duration-200 text-aurora-cyan ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      {open && (
        <div className="border-t border-white/5 bg-midnight-card/40">
          {subSections.map((sub) => (
            <div key={sub._id} className="flex items-center justify-between gap-4 px-6 py-3.5 text-sm text-slate-300 border-b border-white/5 last:border-none hover:bg-white/5 transition-colors">
              <span className="flex items-center gap-2.5">
                <BsPlayCircle className="text-aurora-cyan shrink-0" /> {sub.title}
              </span>
              {sub.timeDuration && <span className="text-xs font-mono text-slate-400">{formatDuration(sub.timeDuration)}</span>}
            </div>
          ))}
          {subSections.length === 0 && (
            <p className="px-6 py-4 text-sm text-slate-400">No lectures added to this section yet.</p>
          )}
        </div>
      )}
    </div>
  )
}
