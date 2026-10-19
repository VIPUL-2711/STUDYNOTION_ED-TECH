import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { IoMdArrowRoundBack } from "react-icons/io"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import toast from "react-hot-toast"
import { resetPassword } from "../services/operations/authAPI"

export default function UpdatePassword() {
  const { loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useParams()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" })

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    dispatch(resetPassword(formData.password, formData.confirmPassword, token, navigate))
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col justify-center px-6 py-12">
      <div className="glass-card rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="font-display text-2xl font-extrabold text-white">Choose a new password</h1>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          Almost done. Enter and confirm your new secure password below.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-y-4">
          <label className="relative block">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">New password</p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20"
            />
            <span
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-4 top-[40px] cursor-pointer text-slate-400 hover:text-white transition-colors"
            >
              {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
            </span>
          </label>

          <label className="relative block">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Confirm new password</p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20"
            />
            <span
              onClick={() => setShowConfirmPassword((p) => !p)}
              className="absolute right-4 top-[40px] cursor-pointer text-slate-400 hover:text-white transition-colors"
            >
              {showConfirmPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="aurora-btn mt-3 rounded-xl py-3.5 text-sm font-bold text-white transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Reset password"}
          </button>
        </form>

        <Link to="/login" className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
          <IoMdArrowRoundBack /> Back to login
        </Link>
      </div>
    </div>
  )
}
