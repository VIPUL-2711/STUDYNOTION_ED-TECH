import { FaBookOpen } from "react-icons/fa"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

export default function Template({ title, subtitle, formType }) {
  return (
    <div className="relative mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-80 h-80 bg-aurora-indigo/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto w-full max-w-md">
        <h1 className="font-display text-3xl font-extrabold text-white sm:text-4xl">{title}</h1>
        <p className="mt-3 text-slate-300 leading-relaxed text-sm sm:text-base">{subtitle}</p>

        {formType === "login" ? <LoginForm /> : <SignupForm />}

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs uppercase tracking-wide text-slate-500">or</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <p className="text-center text-sm text-slate-400">
          {formType === "login" ? "New to StudyNotion?" : "Already have an account?"}{" "}
          <a href={formType === "login" ? "/signup" : "/login"} className="font-semibold text-aurora-cyan hover:underline">
            {formType === "login" ? "Create an account" : "Log in"}
          </a>
        </p>
      </div>

      <div className="relative hidden justify-self-center lg:block">
        <div className="flex h-[420px] w-84 flex-col justify-between rounded-3xl border border-white/15 bg-midnight-surface/80 p-8 shadow-2xl shadow-indigo-950/60 backdrop-blur-2xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-aurora-cyan to-aurora-indigo text-2xl text-white shadow-lg shadow-indigo-500/30">
            <FaBookOpen />
          </div>
          <div>
            <span className="inline-block rounded-full bg-aurora-indigo/20 px-3 py-1 text-xs font-semibold text-aurora-cyan border border-aurora-cyan/30 mb-3">
              Interactive Platform
            </span>
            <p className="font-display text-2xl font-bold text-white leading-snug">
              Learn skills that <span className="marker-highlight"><span>actually</span></span> stick.
            </p>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed">
              Curated lecture progression, verified certificates, and direct instructor guidance.
            </p>
          </div>
        </div>
        <div className="absolute -bottom-5 -right-5 -z-10 h-[420px] w-84 rounded-3xl bg-gradient-to-br from-aurora-indigo/20 to-aurora-pink/20 blur-xl" />
      </div>
    </div>
  )
}
