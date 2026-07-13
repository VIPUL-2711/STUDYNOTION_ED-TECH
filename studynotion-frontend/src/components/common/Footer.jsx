import { Link } from "react-router-dom"

const RESOURCES = ["Articles", "Blog", "Chart Sheet", "Code challenges", "Docs", "Projects"]
const PLANS = ["Paid memberships", "For students", "Business solutions"]
const COMMUNITY = ["Forums", "Chapters", "Events"]

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-ink-950 text-ink-100">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 py-14 sm:grid-cols-3 lg:grid-cols-5">
        <div className="col-span-2 sm:col-span-1">
          <span className="font-display text-lg font-extrabold text-white">StudyNotion</span>
          <p className="mt-3 text-sm text-ink-100/70">
            Learn a new skill, one lecture at a time.
          </p>
        </div>

        <FooterColumn title="Resources" items={RESOURCES} />
        <FooterColumn title="Plans" items={PLANS} />
        <FooterColumn title="Community" items={COMMUNITY} />

        <div>
          <h4 className="font-display text-sm font-semibold text-white">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-ink-100/70">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-ink-100/50">
        © {new Date().getFullYear()} StudyNotion. All rights reserved.
      </div>
    </footer>
  )
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold text-white">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm text-ink-100/70">
        {items.map((item) => (
          <li key={item} className="cursor-pointer hover:text-white">{item}</li>
        ))}
      </ul>
    </div>
  )
}
