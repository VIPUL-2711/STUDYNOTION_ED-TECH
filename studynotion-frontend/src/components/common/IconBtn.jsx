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
      className={`flex items-center justify-center gap-x-2 rounded-lg px-5 py-2.5 font-medium transition-all duration-150
        disabled:cursor-not-allowed disabled:opacity-60
        ${
          outline
            ? "border border-ink-900 text-ink-900 hover:bg-ink-50"
            : "bg-ink-900 text-white hover:bg-ink-800 active:scale-[0.98]"
        }
        ${customClasses}`}
    >
      {text && <span>{text}</span>}
      {children}
    </button>
  )
}
