import { Outlet } from "react-router-dom"
import Sidebar from "../components/core/Dashboard/Sidebar"

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full flex-1 px-6 py-10 sm:px-10">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
