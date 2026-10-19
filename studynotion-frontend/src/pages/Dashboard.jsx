import { Outlet } from "react-router-dom"
import Sidebar from "../components/core/Dashboard/Sidebar"

export default function Dashboard() {
  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col md:flex-row bg-midnight">
      <Sidebar />
      <main className="w-full flex-1 px-4 py-8 sm:px-8 md:px-10">
        <div className="mx-auto max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
