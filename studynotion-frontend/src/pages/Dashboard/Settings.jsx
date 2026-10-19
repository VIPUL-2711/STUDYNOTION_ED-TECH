import EditProfile from "../../components/core/Dashboard/Settings/EditProfile"
import ChangePassword from "../../components/core/Dashboard/Settings/ChangePassword"
import DeleteAccount from "../../components/core/Dashboard/Settings/DeleteAccount"

export default function Settings() {
  return (
    <div className="space-y-6">
      <div className="border-b border-white/5 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-aurora-cyan">Account Configuration</span>
        <h1 className="font-display text-2xl font-black text-white sm:text-3xl">Settings</h1>
      </div>
      <div className="space-y-6">
        <EditProfile />
        <ChangePassword />
        <DeleteAccount />
      </div>
    </div>
  )
}
