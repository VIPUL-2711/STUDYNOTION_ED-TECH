import { FaBookOpen } from "react-icons/fa"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

export default function Template({ title, subtitle, formType }) {
  return (
    <div className="mx-auto grid min-h-[calc(100vh-64px)] max-w-6xl grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-2">
      <div className="mx-auto w-full max-w-md">
        <h1 className="font-display text-3xl font-bold text-charcoal">{title}</h1>
        <p className="mt-3 text-charcoal-dim">{subtitle}</p>

        {formType === "login" ? <LoginForm /> : <SignupForm />}

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-ink-100" />
          <span className="text-xs uppercase tracking-wide text-charcoal-dim">or</span>
          <div className="h-px flex-1 bg-ink-100" />
        </div>

        <p className="text-center text-sm text-charcoal-dim">
          {formType === "login" ? "New to StudyNotion?" : "Already have an account?"}{" "}
          <a href={formType === "login" ? "/signup" : "/login"} className="font-medium text-ink-900 hover:underline">
            {formType === "login" ? "Create an account" : "Log in"}
          </a>
        </p>
      </div>

      <div className="relative hidden justify-self-center lg:block">
        <div className="folded-corner flex h-96 w-80 rotate-2 flex-col justify-between rounded-2xl border border-ink-100 bg-white p-8 shadow-xl">
          <FaBookOpen className="text-4xl text-amber-500" />
          <div>
            <p className="font-display text-xl font-semibold text-charcoal">
              Learn skills that <span className="marker-highlight"><span>actually</span></span> stick.
            </p>
            <p className="mt-3 text-sm text-charcoal-dim">
              Real projects, real instructors, at your own pace.
            </p>
          </div>
        </div>
        <div className="absolute -bottom-6 -left-6 -z-10 h-96 w-80 -rotate-3 rounded-2xl bg-amber-100" />
      </div>
    </div>
  )
}
