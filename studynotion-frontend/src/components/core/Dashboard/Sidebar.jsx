import { useDispatch, useSelector } from "react-redux"
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom"
import {
  VscAccount,
  VscSettingsGear,
  VscMortarBoard,
  VscBook,
  VscAdd,
  VscGraph,
  VscBriefcase,
  VscSignOut,
} from "react-icons/vsc"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { logout } from "../../../services/operations/authAPI"
import { ACCOUNT_TYPE } from "../../../utils/constants"
import ConfirmationModal from "../../common/ConfirmationModal"
import { useState } from "react"

const studentLinks = [
  { name: "My Profile", path: "/dashboard/my-profile", icon: VscAccount },
  { name: "Enrolled Courses", path: "/dashboard/enrolled-courses", icon: VscBook },
  { name: "Cart", path: "/dashboard/cart", icon: AiOutlineShoppingCart },
]

const instructorLinks = [
  { name: "My Profile", path: "/dashboard/my-profile", icon: VscAccount },
  { name: "Dashboard", path: "/dashboard/instructor", icon: VscGraph },
  { name: "My Courses", path: "/dashboard/my-courses", icon: VscBriefcase },
  { name: "Add Course", path: "/dashboard/add-course", icon: VscAdd },
]

const adminLinks = [
  { name: "My Profile", path: "/dashboard/my-profile", icon: VscAccount },
  { name: "Categories", path: "/dashboard/categories", icon: VscMortarBoard },
]

export default function Sidebar() {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [confirmationModal, setConfirmationModal] = useState(null)

  const links =
    user?.accountType === ACCOUNT_TYPE.INSTRUCTOR
      ? instructorLinks
      : user?.accountType === ACCOUNT_TYPE.ADMIN
      ? adminLinks
      : studentLinks

  function matchRoute(route) {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <>
      {/* Mobile Horizontal Navigation Tabs */}
      <div className="flex sm:hidden overflow-x-auto gap-2 p-3 border-b border-white/10 bg-midnight-surface/90 backdrop-blur-xl no-scrollbar w-full">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
              matchRoute(link.path)
                ? "bg-aurora-indigo/20 text-white border border-aurora-cyan/40"
                : "text-slate-400 bg-white/5 hover:text-white"
            }`}
          >
            <link.icon size={15} className={matchRoute(link.path) ? "text-aurora-cyan" : ""} />
            {link.name}
          </Link>
        ))}
        <Link
          to="/dashboard/settings"
          className={`flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
            matchRoute("/dashboard/settings")
              ? "bg-aurora-indigo/20 text-white border border-aurora-cyan/40"
              : "text-slate-400 bg-white/5 hover:text-white"
          }`}
        >
          <VscSettingsGear size={15} />
          Settings
        </Link>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden h-[calc(100vh-64px)] w-64 shrink-0 flex-col border-r border-white/10 bg-midnight-surface/60 backdrop-blur-xl sm:flex sticky top-16">
        <nav className="flex flex-1 flex-col gap-1.5 p-4">
          <p className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">Navigation</p>
          {links.map((link) => {
            const isActive = matchRoute(link.path)
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-aurora-indigo/20 via-aurora-indigo/10 to-transparent text-white border-l-2 border-aurora-cyan shadow-sm shadow-indigo-950"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`}
              >
                <link.icon size={18} className={`transition-colors ${isActive ? "text-aurora-cyan" : "group-hover:text-aurora-cyan"}`} />
                {link.name}
              </Link>
            )
          })}

          <div className="my-2 border-t border-white/5" />

          <Link
            to="/dashboard/settings"
            className={`group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
              matchRoute("/dashboard/settings")
                ? "bg-gradient-to-r from-aurora-indigo/20 to-transparent text-white border-l-2 border-aurora-cyan shadow-sm shadow-indigo-950"
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
            }`}
          >
            <VscSettingsGear size={18} className="group-hover:text-aurora-cyan transition-colors" />
            Settings
          </Link>
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Log out?",
                text2: "You'll need to log in again to access your dashboard.",
                btn1Text: "Log out",
                btn2Text: "Cancel",
                btn1Handler: () => {
                  dispatch(logout(navigate))
                  setConfirmationModal(null)
                },
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-rose-400 transition hover:bg-rose-500/10 hover:text-rose-300"
          >
            <VscSignOut size={18} />
            Log out
          </button>
        </div>
      </aside>
      <ConfirmationModal modalData={confirmationModal} />
    </>
  )
}
