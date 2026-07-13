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
      <aside className="hidden h-[calc(100vh-64px)] w-64 shrink-0 flex-col border-r border-ink-100 bg-white sm:flex">
        <nav className="flex flex-1 flex-col gap-1 p-4">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                matchRoute(link.path)
                  ? "bg-ink-50 text-ink-900"
                  : "text-charcoal-dim hover:bg-ink-50 hover:text-charcoal"
              }`}
            >
              <link.icon size={18} />
              {link.name}
            </Link>
          ))}

          <Link
            to="/dashboard/settings"
            className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
              matchRoute("/dashboard/settings")
                ? "bg-ink-50 text-ink-900"
                : "text-charcoal-dim hover:bg-ink-50 hover:text-charcoal"
            }`}
          >
            <VscSettingsGear size={18} />
            Settings
          </Link>
        </nav>

        <div className="border-t border-ink-100 p-4">
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
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-rose-600 transition hover:bg-rose-50"
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
