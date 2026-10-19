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
    <div className="mb-10 flex items-center">
      {STEPS.map((s, index) => (
        <div key={s.id} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-2xl text-xs font-bold transition-all ${
                step === s.id
                  ? "aurora-btn text-white shadow-lg shadow-indigo-500/30 scale-105"
                  : step > s.id
                  ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                  : "border border-white/10 bg-white/5 text-slate-500"
              }`}
            >
              {step > s.id ? <FaCheck size={12} /> : s.id}
            </div>
            <p className={`mt-2.5 hidden text-xs font-semibold sm:block ${step === s.id ? "text-white" : "text-slate-500"}`}>
              {s.title}
            </p>
          </div>
          {index < STEPS.length - 1 && (
            <div
              className={`mx-3 h-0.5 flex-1 transition-all ${
                step > s.id ? "bg-gradient-to-r from-emerald-500 to-aurora-cyan" : "bg-white/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
