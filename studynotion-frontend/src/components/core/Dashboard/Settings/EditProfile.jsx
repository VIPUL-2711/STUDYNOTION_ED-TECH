import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateProfile } from "../../../../services/operations/settingsAPI"

const GENDERS = ["Male", "Female", "Non-Binary", "Prefer not to say"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    gender: user?.additionalDetails?.gender || "",
    dateOfBirth: user?.additionalDetails?.dateOfBirth || "",
    about: user?.additionalDetails?.about || "",
    contactNumber: user?.contactNumber || "",
  })

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(updateProfile(token, formData))
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-3xl border border-white/10 p-7">
      <h2 className="font-display text-lg font-bold text-white">Profile Information</h2>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Contact Number</p>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="+91 9999999999"
            className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20"
          />
        </label>

        <label className="block">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Gender</p>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20"
          >
            <option value="" className="bg-midnight-surface text-slate-400">Select Gender</option>
            {GENDERS.map((g) => (
              <option key={g} value={g} className="bg-midnight-surface text-white">{g}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Date of Birth</p>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20 [color-scheme:dark]"
          />
        </label>
      </div>

      <label className="mt-5 block">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">About / Bio</p>
        <textarea
          name="about"
          rows={3}
          value={formData.about}
          onChange={handleChange}
          placeholder="Tell other students and instructors a bit about your background and interests"
          className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20 resize-none"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="aurora-btn mt-6 rounded-xl px-6 py-3 text-xs font-bold text-white transition disabled:opacity-50"
      >
        {loading ? "Saving Changes..." : "Save Changes"}
      </button>
    </form>
  )
}
