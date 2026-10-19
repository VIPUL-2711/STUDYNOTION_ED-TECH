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
    <form onSubmit={handleSubmit} className="glass-card rounded-3xl border border-white/10 p-7">
      <h2 className="font-display text-lg font-bold text-white">Security & Password</h2>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <label className="block">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Current password</p>
          <input
            required
            type="password"
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20"
          />
        </label>
        <label className="block">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">New password</p>
          <input
            required
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20"
          />
        </label>
        <label className="block">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Confirm new password</p>
          <input
            required
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="aurora-btn mt-6 rounded-xl px-6 py-3 text-xs font-bold text-white transition disabled:opacity-50"
      >
        {saving ? "Updating..." : "Update Password"}
      </button>
    </form>
  )
}
