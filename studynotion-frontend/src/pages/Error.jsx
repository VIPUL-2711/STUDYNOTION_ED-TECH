import { Link } from "react-router-dom"

export default function Error() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-8xl font-black aurora-gradient-text tracking-tighter">404</p>
      <h1 className="mt-4 font-display text-3xl font-extrabold text-white">Destination not found</h1>
      <p className="mt-2 text-sm text-slate-400 max-w-sm">The requested URL or resource does not exist or has been relocated to another workspace.</p>
      <Link
        to="/"
        className="aurora-btn mt-8 rounded-xl px-7 py-3 text-sm font-bold text-white"
      >
        Return to Home
      </Link>
    </div>
  )
}
