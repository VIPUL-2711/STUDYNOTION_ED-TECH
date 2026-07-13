import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { logout } from "../../services/operations/authAPI"
import useOnClickOutside from "../../hooks/useOnClickOutside"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 rounded-full border border-ink-100 p-1 pr-3 transition hover:border-ink-900"
      >
        <img src={user.image} alt={user.firstName} className="h-8 w-8 rounded-full object-cover" />
        <span className="hidden text-sm font-medium sm:block">{user.firstName}</span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-48 animate-fade-in-up overflow-hidden rounded-xl border border-ink-100 bg-white py-2 shadow-xl">
          <Link
            to="/dashboard/my-profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-4 py-2 text-sm text-charcoal hover:bg-ink-50"
          >
            <VscDashboard /> Dashboard
          </Link>
          <button
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-rose-600 hover:bg-ink-50"
          >
            <VscSignOut /> Log out
          </button>
        </div>
      )}
    </div>
  )
}
