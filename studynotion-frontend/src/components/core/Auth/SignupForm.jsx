import { useState } from "react"
import toast from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setSignupData } from "../../../slices/authSlice"
import { sendOtp } from "../../../services/operations/authAPI"
import { ACCOUNT_TYPE } from "../../../utils/constants"

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  password: "",
  confirmPassword: "",
}

export default function SignupForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
  const [formData, setFormData] = useState(initialFormData)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    const signupData = { ...formData, accountType }
    dispatch(setSignupData(signupData))
    dispatch(sendOtp(formData.email, navigate))
    setFormData(initialFormData)
  }

  return (
    <div className="mt-6 w-full">
      {/* Account Type Toggle */}
      <div className="mb-6 flex w-fit rounded-2xl bg-white/5 border border-white/10 p-1 shadow-inner">
        {[ACCOUNT_TYPE.STUDENT, ACCOUNT_TYPE.INSTRUCTOR].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setAccountType(type)}
            className={`rounded-xl px-5 py-2 text-xs font-bold transition-all ${
              accountType === type
                ? "aurora-btn text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-4">
        <div className="flex gap-x-4">
          <label className="block w-1/2">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">First name <sup className="text-rose-500">*</sup></p>
            <input
              required
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20"
            />
          </label>
          <label className="block w-1/2">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Last name <sup className="text-rose-500">*</sup></p>
            <input
              required
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20"
            />
          </label>
        </div>

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

        <label className="block">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Contact number <sup className="text-rose-500">*</sup></p>
          <input
            required
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="9999999999"
            className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20"
          />
        </label>

        <div className="flex gap-x-4">
          <label className="relative block w-1/2">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Password <sup className="text-rose-500">*</sup></p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20"
            />
            <span onClick={() => setShowPassword((p) => !p)} className="absolute right-4 top-[40px] cursor-pointer text-slate-400 hover:text-white transition-colors">
              {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
            </span>
          </label>
          <label className="relative block w-1/2">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Confirm password <sup className="text-rose-500">*</sup></p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20"
            />
            <span onClick={() => setShowConfirmPassword((p) => !p)} className="absolute right-4 top-[40px] cursor-pointer text-slate-400 hover:text-white transition-colors">
              {showConfirmPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="aurora-btn mt-3 rounded-xl py-3.5 text-sm font-bold text-white"
        >
          Create account
        </button>
      </form>
    </div>
  )
}
