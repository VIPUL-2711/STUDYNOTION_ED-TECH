import { useSelector } from "react-redux"
import { FaCheck } from "react-icons/fa"

const STEPS = [
  { id: 1, title: "Course Information" },
  { id: 2, title: "Course Builder" },
  { id: 3, title: "Publish" },
]

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course)

  return (
    <div className="mb-8 flex items-center">
      {STEPS.map((s, index) => (
        <div key={s.id} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                step === s.id
                  ? "border-ink-900 bg-ink-900 text-white"
                  : step > s.id
                  ? "border-emerald-500 bg-emerald-500 text-white"
                  : "border-ink-100 bg-white text-charcoal-dim"
              }`}
            >
              {step > s.id ? <FaCheck size={12} /> : s.id}
            </div>
            <p className="mt-2 hidden text-xs font-medium text-charcoal-dim sm:block">{s.title}</p>
          </div>
          {index < STEPS.length - 1 && (
            <div className={`mx-3 h-0.5 flex-1 ${step > s.id ? "bg-emerald-500" : "bg-ink-100"}`} />
          )}
        </div>
      ))}
    </div>
  )
}
