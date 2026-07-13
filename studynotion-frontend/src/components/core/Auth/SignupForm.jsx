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
      <div className="mb-6 flex w-fit rounded-full bg-ink-50 p-1">
        {[ACCOUNT_TYPE.STUDENT, ACCOUNT_TYPE.INSTRUCTOR].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setAccountType(type)}
            className={`rounded-full px-5 py-1.5 text-sm font-medium transition ${
              accountType === type ? "bg-ink-900 text-white" : "text-charcoal-dim"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">
        <div className="flex gap-x-4">
          <label className="block w-1/2">
            <p className="mb-1 text-sm font-medium text-charcoal">First name <sup className="text-rose-600">*</sup></p>
            <input
              required
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First name"
              className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
            />
          </label>
          <label className="block w-1/2">
            <p className="mb-1 text-sm font-medium text-charcoal">Last name <sup className="text-rose-600">*</sup></p>
            <input
              required
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
            />
          </label>
        </div>

        <label className="block">
          <p className="mb-1 text-sm font-medium text-charcoal">Email address <sup className="text-rose-600">*</sup></p>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
          />
        </label>

        <label className="block">
          <p className="mb-1 text-sm font-medium text-charcoal">Contact number <sup className="text-rose-600">*</sup></p>
          <input
            required
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="9999999999"
            className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
          />
        </label>

        <div className="flex gap-x-4">
          <label className="relative block w-1/2">
            <p className="mb-1 text-sm font-medium text-charcoal">Password <sup className="text-rose-600">*</sup></p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
            />
            <span onClick={() => setShowPassword((p) => !p)} className="absolute right-4 top-[42px] cursor-pointer text-charcoal-dim">
              {showPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
            </span>
          </label>
          <label className="relative block w-1/2">
            <p className="mb-1 text-sm font-medium text-charcoal">Confirm password <sup className="text-rose-600">*</sup></p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
            />
            <span onClick={() => setShowConfirmPassword((p) => !p)} className="absolute right-4 top-[42px] cursor-pointer text-charcoal-dim">
              {showConfirmPassword ? <AiOutlineEyeInvisible size={18} /> : <AiOutlineEye size={18} />}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="mt-2 rounded-lg bg-ink-900 py-3 text-sm font-semibold text-white transition hover:bg-ink-800"
        >
          Create account
        </button>
      </form>
    </div>
  )
}
