import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Link, matchPath, useLocation } from "react-router-dom"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { IoChevronDown } from "react-icons/io5"
import { fetchCourseCategories } from "../../services/operations/courseDetailsAPI"
import { ACCOUNT_TYPE } from "../../utils/constants"
import ProfileDropdown from "./ProfileDropdown"

const NAV_LINKS = [
  { title: "Home", path: "/" },
  { title: "Catalog", path: "catalog" },
]

export default function Navbar() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [categories, setCategories] = useState([])

  useEffect(() => {
    ;(async () => {
      const result = await fetchCourseCategories()
      setCategories(result || [])
    })()
  }, [])

  function matchRoute(route) {
    return matchPath({ path: route }, location.pathname)
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-midnight-bg/85 backdrop-blur-xl transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-aurora-cyan via-aurora-indigo to-aurora-pink p-[1px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-midnight-bg font-display text-lg font-black text-white">
              S
            </div>
          </div>
          <span className="font-display text-xl font-extrabold tracking-tight">
            <span className="text-white">Study</span>
            <span className="aurora-gradient-text">Notion</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium text-slate-300">
            {NAV_LINKS.map((link, index) =>
              link.title === "Catalog" ? (
                <li key={index} className="group relative">
                  <div className="flex cursor-pointer items-center gap-1.5 py-2 text-slate-300 transition hover:text-white">
                    <span>Catalog</span>
                    <IoChevronDown className="text-xs transition-transform duration-200 group-hover:rotate-180 text-slate-400 group-hover:text-aurora-cyan" />
                  </div>
                  <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 translate-y-2 rounded-2xl border border-white/10 bg-midnight-surface/95 p-3 opacity-0 shadow-2xl shadow-indigo-950/60 backdrop-blur-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Categories</p>
                    {categories.length === 0 && (
                      <p className="px-3 py-2 text-xs text-slate-400">No categories yet</p>
                    )}
                    <div className="max-h-72 overflow-y-auto space-y-1">
                      {categories.map((cat) => (
                        <Link
                          key={cat._id}
                          to={`/catalog/${cat._id}`}
                          className="block rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white hover:border-l-2 hover:border-aurora-cyan pl-3"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              ) : (
                <li key={index}>
                  <Link
                    to={link.path}
                    className={`relative py-2 text-sm transition ${
                      matchRoute(link.path)
                        ? "font-semibold text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gradient-to-r after:from-aurora-cyan after:to-aurora-indigo after:rounded-full"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          {user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link
              to="/dashboard/cart"
              className="relative rounded-xl border border-white/10 p-2 text-slate-300 transition hover:border-aurora-indigo/50 hover:bg-white/5 hover:text-white"
            >
              <AiOutlineShoppingCart className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-aurora-indigo to-aurora-pink text-[11px] font-bold text-white shadow-md shadow-pink-500/30">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {!token && (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="aurora-btn rounded-xl px-4 py-2 text-sm font-semibold text-white"
              >
                Sign up
              </Link>
            </div>
          )}

          {token && <ProfileDropdown />}
        </div>
      </div>
    </header>
  )
}
