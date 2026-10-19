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
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Email address <sup className="text-rose-500">*</sup></p>
        <input
          required
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20"
        />
      </label>

      <label className="relative block">
        <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Password <sup className="text-rose-500">*</sup></p>
        <input
          required
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20"
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-4 top-[40px] cursor-pointer text-slate-400 hover:text-white transition-colors"
        >
          {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
        </span>
        <Link to="/forgot-password">
          <p className="mt-2 text-right text-xs font-medium text-aurora-cyan hover:underline">Forgot password?</p>
        </Link>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="aurora-btn mt-2 rounded-xl py-3.5 text-sm font-bold text-white disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign in to account"}
      </button>
    </form>
  )
}
