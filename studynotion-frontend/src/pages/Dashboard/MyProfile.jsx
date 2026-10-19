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
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-aurora-cyan">Account Overview</span>
          <h1 className="font-display text-2xl font-black text-white sm:text-3xl">My Profile</h1>
        </div>
        <Link
          to="/dashboard/settings"
          className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/10 hover:border-aurora-cyan/40"
        >
          Edit Profile
        </Link>
      </div>

      {/* User Header Card */}
      <div className="glass-card flex flex-col gap-6 rounded-3xl border border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-5">
          <img
            src={user.image}
            alt={user.firstName}
            className="h-20 w-20 rounded-2xl object-cover ring-2 ring-aurora-indigo/50 shadow-lg shadow-indigo-500/20"
          />
          <div>
            <div className="flex items-center gap-3">
              <h2 className="font-display text-xl font-bold text-white">
                {user.firstName} {user.lastName}
              </h2>
              <span className="rounded-full bg-aurora-indigo/20 px-3 py-0.5 text-xs font-semibold text-aurora-cyan border border-aurora-cyan/30">
                {user.accountType}
              </span>
            </div>
            <p className="mt-1 text-sm text-slate-400">{user.email}</p>
          </div>
        </div>
      </div>

      {/* About & Details Card */}
      <div className="glass-card rounded-3xl border border-white/10 p-7">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h2 className="font-display text-lg font-bold text-white">Bio & Details</h2>
          <Link to="/dashboard/settings" className="text-xs font-semibold text-aurora-cyan hover:underline">
            Edit
          </Link>
        </div>
        <p className="mt-4 text-sm text-slate-300 leading-relaxed">
          {user.additionalDetails?.about || "No bio added yet. Tell others a little bit about yourself in Settings."}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div key={detail.label} className="rounded-2xl border border-white/5 bg-midnight-card/50 p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{detail.label}</p>
              <p className="mt-1.5 text-sm font-semibold text-white">{detail.value}</p>
            </div>
          ))}
        </div>

        {user.createdAt && (
          <p className="mt-8 text-xs text-slate-500">Member since {formatDate(user.createdAt)}</p>
        )}
      </div>
    </div>
  )
}
