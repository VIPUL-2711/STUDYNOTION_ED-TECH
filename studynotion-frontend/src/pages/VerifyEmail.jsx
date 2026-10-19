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
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col items-center justify-center px-6 py-12">
      <div className="glass-card w-full rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-aurora-cyan/20 to-aurora-indigo/20 border border-aurora-cyan/30 text-aurora-cyan shadow-lg shadow-cyan-500/10">
          <RxCountdownTimer size={26} />
        </div>
        <h1 className="font-display text-2xl font-extrabold text-white">Verify your email</h1>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          We've sent a 6-digit confirmation code to{" "}
          <strong className="text-white">{signupData?.email || "your email"}</strong>. Enter it below to finish registration.
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
                className="!w-12 h-12 rounded-xl border border-white/15 bg-midnight-card text-center text-lg font-bold text-white outline-none transition focus:border-aurora-cyan focus:ring-2 focus:ring-aurora-cyan/20"
              />
            )}
            containerStyle="flex justify-between"
          />

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="aurora-btn mt-8 w-full rounded-xl py-3.5 text-sm font-bold text-white transition disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify and create account"}
          </button>
        </form>

        <div className="mt-6 flex w-full items-center justify-between text-xs font-semibold">
          <Link to="/signup" className="text-slate-400 hover:text-white transition-colors">
            &larr; Back to signup
          </Link>
          <button
            type="button"
            onClick={() => signupData && dispatch(sendOtp(signupData.email, navigate))}
            className="text-aurora-cyan hover:underline transition-colors"
          >
            Resend code
          </button>
        </div>
      </div>
    </div>
  )
}
