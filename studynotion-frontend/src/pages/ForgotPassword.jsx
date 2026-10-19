import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { IoMdArrowRoundBack } from "react-icons/io"
import { getPasswordResetToken } from "../services/operations/authAPI"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const { loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col justify-center px-6 py-12">
      <div className="glass-card rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="font-display text-2xl font-extrabold text-white">
          {emailSent ? "Check your email" : "Reset your password"}
        </h1>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          {emailSent
            ? `We've sent a password reset link to ${email}. If it doesn't arrive within 2 minutes, check your spam folder.`
            : "No worries! Enter your registered email address and we'll send you reset instructions."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <label className="block">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Email address</p>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="aurora-btn mt-6 w-full rounded-xl py-3.5 text-sm font-bold text-white transition disabled:opacity-50"
          >
            {loading ? "Sending..." : emailSent ? "Resend reset link" : "Send reset link"}
          </button>
        </form>

        <Link to="/login" className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
          <IoMdArrowRoundBack /> Back to login
        </Link>
      </div>
    </div>
  )
}
