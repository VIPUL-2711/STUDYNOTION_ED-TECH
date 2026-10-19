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
        className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 p-1 pr-3.5 transition hover:border-aurora-indigo/50 hover:bg-white/10"
      >
        <img src={user.image} alt={user.firstName} className="h-8 w-8 rounded-full object-cover ring-2 ring-aurora-indigo/40" />
        <span className="hidden text-sm font-semibold text-slate-200 sm:block">{user.firstName}</span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-52 animate-fade-in-up overflow-hidden rounded-2xl border border-white/10 bg-midnight-surface/95 py-2 shadow-2xl shadow-indigo-950/70 backdrop-blur-2xl">
          <div className="border-b border-white/5 px-4 py-2 mb-1">
            <p className="text-xs font-semibold text-white truncate">{user.firstName} {user.lastName}</p>
            <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
          </div>
          <Link
            to="/dashboard/my-profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            <VscDashboard className="text-aurora-cyan" /> Dashboard
          </Link>
          <button
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex w-full items-center gap-2.5 px-4 py-2 text-left text-sm text-rose-400 transition hover:bg-rose-500/10 hover:text-rose-300"
          >
            <VscSignOut /> Log out
          </button>
        </div>
      )}
    </div>
  )
}
