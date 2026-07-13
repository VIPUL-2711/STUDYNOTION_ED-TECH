import EditProfile from "../../components/core/Dashboard/Settings/EditProfile"
import ChangePassword from "../../components/core/Dashboard/Settings/ChangePassword"
import DeleteAccount from "../../components/core/Dashboard/Settings/DeleteAccount"

export default function Settings() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-charcoal">Settings</h1>
      <div className="mt-6">
        <EditProfile />
        <ChangePassword />
        <DeleteAccount />
      </div>
    </div>
  )
}
