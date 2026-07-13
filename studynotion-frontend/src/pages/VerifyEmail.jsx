import { useEffect, useState } from "react"
import OtpInput from "react-otp-input"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { RxCountdownTimer } from "react-icons/rx"
import { signUp, sendOtp } from "../services/operations/authAPI"

export default function VerifyEmail() {
  const [otp, setOtp] = useState("")
  const { signupData, loading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!signupData) {
      navigate("/signup")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    if (!signupData) return
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      contactNumber,
    } = signupData
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        contactNumber,
        otp,
        navigate
      )
    )
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col items-center justify-center px-6">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
        <RxCountdownTimer size={22} />
      </div>
      <h1 className="font-display text-2xl font-bold text-charcoal">Verify your email</h1>
      <p className="mt-2 text-center text-sm text-charcoal-dim">
        We've sent a 6-digit code to {signupData?.email || "your email"}. Enter it below to finish creating your account.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 w-full">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span className="w-2" />}
          renderInput={(props) => (
            <input
              {...props}
              className="!w-11 rounded-lg border border-ink-100 bg-white py-3 text-center text-lg font-semibold text-charcoal outline-none focus:border-ink-900"
            />
          )}
          containerStyle="flex justify-between"
        />

        <button
          type="submit"
          disabled={loading || otp.length !== 6}
          className="mt-8 w-full rounded-lg bg-ink-900 py-3 text-sm font-semibold text-white transition hover:bg-ink-800 disabled:opacity-60"
        >
          {loading ? "Verifying..." : "Verify and create account"}
        </button>
      </form>

      <div className="mt-6 flex w-full items-center justify-between text-sm">
        <Link to="/signup" className="text-charcoal-dim hover:text-charcoal">
          &larr; Back to signup
        </Link>
        <button
          onClick={() => signupData && dispatch(sendOtp(signupData.email, navigate))}
          className="font-medium text-ink-900 hover:underline"
        >
          Resend code
        </button>
      </div>
    </div>
  )
}
