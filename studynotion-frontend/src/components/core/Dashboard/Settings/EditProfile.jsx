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
    <form onSubmit={handleSubmit} className="rounded-2xl border border-ink-100 bg-white p-6">
      <h2 className="font-display text-lg font-semibold text-charcoal">Profile information</h2>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block">
          <p className="mb-1 text-sm font-medium text-charcoal">Contact number</p>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
          />
        </label>

        <label className="block">
          <p className="mb-1 text-sm font-medium text-charcoal">Gender</p>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
          >
            <option value="">Select</option>
            {GENDERS.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <p className="mb-1 text-sm font-medium text-charcoal">Date of birth</p>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
          />
        </label>
      </div>

      <label className="mt-5 block">
        <p className="mb-1 text-sm font-medium text-charcoal">About</p>
        <textarea
          name="about"
          rows={3}
          value={formData.about}
          onChange={handleChange}
          placeholder="Tell us a bit about yourself"
          className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
        />
      </label>

      <button
        type="submit"
        disabled={loading}
        className="mt-5 rounded-lg bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save changes"}
      </button>
    </form>
  )
}
