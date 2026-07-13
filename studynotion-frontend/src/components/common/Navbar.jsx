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

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="relative font-display text-xl font-extrabold text-ink-900">
            Study<span className="marker-highlight"><span>Notion</span></span>
          </span>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm font-medium text-charcoal">
            {NAV_LINKS.map((link, index) =>
              link.title === "Catalog" ? (
                <li key={index} className="group relative">
                  <div className="flex cursor-pointer items-center gap-1 py-2">
                    <span>Catalog</span>
                    <IoChevronDown className="transition group-hover:rotate-180" />
                  </div>
                  <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 translate-y-1 rounded-xl border border-ink-100 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {categories.length === 0 && (
                      <p className="px-3 py-2 text-xs text-charcoal-dim">No categories yet</p>
                    )}
                    {categories.map((cat) => (
                      <Link
                        key={cat._id}
                        to={`/catalog/${cat._id}`}
                        className="block rounded-lg px-3 py-2 text-sm hover:bg-ink-50"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                </li>
              ) : (
                <li key={index}>
                  <Link
                    to={link.path}
                    className={`py-2 transition hover:text-ink-900 ${
                      matchRoute(link.path) ? "text-ink-900" : "text-charcoal-dim"
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
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-charcoal" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-semibold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {!token && (
            <Link
              to="/login"
              className="rounded-lg border border-ink-100 px-4 py-2 text-sm font-medium text-charcoal transition hover:border-ink-900"
            >
              Log in
            </Link>
          )}
          {!token && (
            <Link
              to="/signup"
              className="rounded-lg bg-ink-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-ink-800"
            >
              Sign up
            </Link>
          )}
          {token && <ProfileDropdown />}
        </div>
      </div>
    </header>
  )
}
