import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../../services/operations/authAPI"

export default function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector((state) => state.auth)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(login(formData.email, formData.password, navigate))
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex w-full flex-col gap-y-5">
      <label className="block">
        <p className="mb-1 text-sm font-medium text-charcoal">Email address <sup className="text-rose-600">*</sup></p>
        <input
          required
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm text-charcoal outline-none transition focus:border-ink-900"
        />
      </label>

      <label className="relative block">
        <p className="mb-1 text-sm font-medium text-charcoal">Password <sup className="text-rose-600">*</sup></p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm text-charcoal outline-none transition focus:border-ink-900"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-[42px] cursor-pointer text-charcoal-dim"
        >
          {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </span>
        <Link to="/forgot-password">
          <p className="mt-2 text-right text-sm text-ink-700 hover:underline">Forgot password?</p>
        </Link>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 rounded-lg bg-ink-900 py-3 text-sm font-semibold text-white transition hover:bg-ink-800 disabled:opacity-60"
      >
        {loading ? "Logging in..." : "Log in"}
      </button>
    </form>
  )
}
