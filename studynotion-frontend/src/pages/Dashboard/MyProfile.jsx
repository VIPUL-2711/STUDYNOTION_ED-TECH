import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { formatDate } from "../../utils/formatters"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)

  if (!user) return null

  const details = [
    { label: "First name", value: user.firstName },
    { label: "Last name", value: user.lastName },
    { label: "Email", value: user.email },
    { label: "Contact number", value: user.contactNumber || "Not added" },
    { label: "Gender", value: user.additionalDetails?.gender || "Not added" },
    { label: "Date of birth", value: user.additionalDetails?.dateOfBirth || "Not added" },
  ]

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-charcoal">My Profile</h1>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-ink-100 bg-white p-6">
        <div className="flex items-center gap-4">
          <img src={user.image} alt={user.firstName} className="h-16 w-16 rounded-full object-cover" />
          <div>
            <p className="font-display text-lg font-semibold text-charcoal">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-charcoal-dim">{user.email}</p>
          </div>
        </div>
        <Link
          to="/dashboard/settings"
          className="rounded-lg border border-ink-900 px-4 py-2 text-sm font-medium text-ink-900 transition hover:bg-ink-50"
        >
          Edit
        </Link>
      </div>

      <div className="mt-6 rounded-2xl border border-ink-100 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-charcoal">About</h2>
          <Link to="/dashboard/settings" className="text-sm font-medium text-ink-900 hover:underline">
            Edit
          </Link>
        </div>
        <p className="mt-3 text-sm text-charcoal-dim">
          {user.additionalDetails?.about || "Write something about yourself in Settings."}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div key={detail.label}>
              <p className="text-xs uppercase tracking-wide text-charcoal-dim">{detail.label}</p>
              <p className="mt-1 text-sm font-medium text-charcoal">{detail.value}</p>
            </div>
          ))}
        </div>

        {user.createdAt && (
          <p className="mt-6 text-xs text-charcoal-dim">Member since {formatDate(user.createdAt)}</p>
        )}
      </div>
    </div>
  )
}
