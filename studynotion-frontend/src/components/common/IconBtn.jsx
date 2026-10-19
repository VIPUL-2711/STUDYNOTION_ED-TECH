export default function IconBtn({
  text,
  onClick,
  children,
  disabled = false,
  outline = false,
  customClasses = "",
  type = "button",
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={`flex items-center justify-center gap-x-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-200
        disabled:cursor-not-allowed disabled:opacity-50
        ${
          outline
            ? "border border-white/15 bg-white/5 text-slate-200 hover:bg-white/10 hover:border-aurora-indigo/50 active:scale-[0.98]"
            : "aurora-btn text-white active:scale-[0.98]"
        }
        ${customClasses}`}
    >
      {text && <span>{text}</span>}
      {children}
    </button>
  )
}
