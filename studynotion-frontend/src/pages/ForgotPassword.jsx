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
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col justify-center px-6">
      <h1 className="font-display text-2xl font-bold text-charcoal">
        {emailSent ? "Check your email" : "Reset your password"}
      </h1>
      <p className="mt-2 text-sm text-charcoal-dim">
        {emailSent
          ? `We've sent a password reset link to ${email}`
          : "No worries, we'll send you reset instructions."}
      </p>

      <form onSubmit={handleSubmit} className="mt-8">
        {!emailSent && (
          <label className="block">
            <p className="mb-1 text-sm font-medium text-charcoal">Email address</p>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
            />
          </label>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-ink-900 py-3 text-sm font-semibold text-white transition hover:bg-ink-800 disabled:opacity-60"
        >
          {loading ? "Sending..." : emailSent ? "Resend email" : "Send reset link"}
        </button>
      </form>

      <Link to="/login" className="mt-6 flex items-center gap-2 text-sm text-charcoal-dim hover:text-charcoal">
        <IoMdArrowRoundBack /> Back to login
      </Link>
    </div>
  )
}
