export default function About() {
  const stats = [
    { label: "Active Learners", value: "25,000+" },
    { label: "Expert Instructors", value: "350+" },
    { label: "Hands-on Courses", value: "1,200+" },
    { label: "Satisfaction Rate", value: "99.4%" },
  ]

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <div className="text-center">
        <span className="inline-block rounded-full bg-aurora-indigo/20 px-3.5 py-1 text-xs font-semibold text-aurora-cyan border border-aurora-cyan/30 mb-4">
          Our Core Mission
        </span>
        <h1 className="font-display text-4xl font-black text-white sm:text-5xl leading-tight">
          We believe learning should be <span className="aurora-gradient-text">hands-on</span>.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-slate-300 leading-relaxed">
          StudyNotion bridges the gap between theoretical knowledge and real-world execution. Every course is built around live projects, milestone-driven tracking, and mentors with proven track records in the industry.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card rounded-2xl p-6 text-center border border-white/10">
            <p className="font-display text-2xl font-black text-white sm:text-3xl">{s.value}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
