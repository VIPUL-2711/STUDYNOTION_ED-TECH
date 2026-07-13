import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { changePassword } from "../../../../services/operations/settingsAPI"

export default function ChangePassword() {
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match")
      return
    }
    setSaving(true)
    await dispatch(changePassword(token, formData))
    setSaving(false)
    setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-ink-100 bg-white p-6">
      <h2 className="font-display text-lg font-semibold text-charcoal">Change password</h2>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <label className="block">
          <p className="mb-1 text-sm font-medium text-charcoal">Current password</p>
          <input
            required
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
          />
        </label>
        <label className="block">
          <p className="mb-1 text-sm font-medium text-charcoal">New password</p>
          <input
            required
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
          />
        </label>
        <label className="block">
          <p className="mb-1 text-sm font-medium text-charcoal">Confirm new password</p>
          <input
            required
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="mt-5 rounded-lg bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800 disabled:opacity-60"
      >
        {saving ? "Updating..." : "Update password"}
      </button>
    </form>
  )
}
