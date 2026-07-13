export default function Spinner({ small = false }) {
  const size = small ? "h-6 w-6 border-2" : "h-12 w-12 border-4"
  return (
    <div className="flex w-full items-center justify-center py-10">
      <div
        className={`${size} animate-spin rounded-full border-ink-100 border-t-amber-500`}
      />
    </div>
  )
}
