import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { resetPassword } from "../services/operations/authAPI"

export default function UpdatePassword() {
  const { loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useParams()

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" })

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(resetPassword(formData.password, formData.confirmPassword, token, navigate))
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col justify-center px-6">
      <h1 className="font-display text-2xl font-bold text-charcoal">Choose a new password</h1>
      <p className="mt-2 text-sm text-charcoal-dim">
        Almost done. Enter your new password below.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-y-5">
        <label className="relative block">
          <p className="mb-1 text-sm font-medium text-charcoal">New password</p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
          />
          <span onClick={() => setShowPassword((p) => !p)} className="absolute right-4 top-[42px] cursor-pointer text-charcoal-dim">
            {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
          </span>
        </label>

        <label className="block">
          <p className="mb-1 text-sm font-medium text-charcoal">Confirm new password</p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-lg bg-ink-900 py-3 text-sm font-semibold text-white transition hover:bg-ink-800 disabled:opacity-60"
        >
          {loading ? "Updating..." : "Reset password"}
        </button>
      </form>
    </div>
  )
}
