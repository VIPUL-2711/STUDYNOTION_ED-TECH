import { Link } from "react-router-dom"

export default function Error() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-6xl font-extrabold text-ink-900">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-charcoal">Page not found</h1>
      <p className="mt-2 text-charcoal-dim">The page you're looking for doesn't exist or has moved.</p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink-800"
      >
        Back to home
      </Link>
    </div>
  )
}
