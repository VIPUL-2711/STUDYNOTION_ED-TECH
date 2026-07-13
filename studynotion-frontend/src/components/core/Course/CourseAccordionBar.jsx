import { useState } from "react"
import { IoChevronDown } from "react-icons/io5"
import { BsPlayCircle } from "react-icons/bs"
import { formatDuration } from "../../../utils/formatters"

export default function CourseAccordionBar({ section }) {
  const [open, setOpen] = useState(false)
  const subSections = section.subSection || []

  return (
    <div className="overflow-hidden rounded-xl border border-ink-100 bg-white">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-medium text-charcoal">{section.sectionName}</span>
        <div className="flex items-center gap-3 text-xs text-charcoal-dim">
          <span>{subSections.length} lecture{subSections.length !== 1 ? "s" : ""}</span>
          <IoChevronDown className={`transition ${open ? "rotate-180" : ""}`} />
        </div>
      </button>

      {open && (
        <div className="border-t border-ink-100">
          {subSections.map((sub) => (
            <div key={sub._id} className="flex items-center justify-between gap-4 px-5 py-3 text-sm text-charcoal-dim">
              <span className="flex items-center gap-2">
                <BsPlayCircle /> {sub.title}
              </span>
              {sub.timeDuration && <span>{formatDuration(sub.timeDuration)}</span>}
            </div>
          ))}
          {subSections.length === 0 && (
            <p className="px-5 py-3 text-sm text-charcoal-dim">No lectures added yet.</p>
          )}
        </div>
      )}
    </div>
  )
}
