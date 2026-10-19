import { Link } from "react-router-dom"

const RESOURCES = ["Articles", "Blog", "Chart Sheet", "Code challenges", "Docs", "Projects"]
const PLANS = ["Paid memberships", "For students", "Business solutions"]
const COMMUNITY = ["Forums", "Chapters", "Events"]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-midnight-bg text-slate-400 overflow-hidden">
      {/* Aurora Ambient Glow Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-3/4 max-w-4xl bg-gradient-to-r from-transparent via-aurora-indigo/60 to-transparent" />

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 py-16 sm:grid-cols-3 lg:grid-cols-5 relative z-10">
        <div className="col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-aurora-cyan to-aurora-indigo text-xs font-black text-white">
              S
            </div>
            <span className="font-display text-lg font-extrabold text-white">
              Study<span className="aurora-gradient-text">Notion</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            The next-generation learning platform. Learn high-impact skills with hands-on projects, tracked lecture by lecture.
          </p>
        </div>

        <FooterColumn title="Resources" items={RESOURCES} />
        <FooterColumn title="Plans" items={PLANS} />
        <FooterColumn title="Community" items={COMMUNITY} />

        <div>
          <h4 className="font-display text-sm font-semibold tracking-wide text-white uppercase">Company</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
            <li><Link to="/about" className="transition hover:text-aurora-cyan">About Us</Link></li>
            <li><Link to="/contact" className="transition hover:text-aurora-cyan">Contact Support</Link></li>
            <li><Link to="/catalog" className="transition hover:text-aurora-cyan">Browse Courses</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} StudyNotion. Engineered with precision. All rights reserved.
      </div>
    </footer>
  )
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold tracking-wide text-white uppercase">{title}</h4>
      <ul className="mt-4 space-y-2.5 text-sm text-slate-400">
        {items.map((item) => (
          <li key={item} className="cursor-pointer transition hover:text-aurora-cyan">{item}</li>
        ))}
      </ul>
    </div>
  )
}
