export default function Spinner({ small = false }) {
  const size = small ? "h-6 w-6 border-2" : "h-12 w-12 border-[3px]"
  return (
    <div className="flex w-full items-center justify-center py-12">
      <div
        className={`${size} animate-spin rounded-full border-white/10 border-t-aurora-cyan border-r-aurora-indigo shadow-lg shadow-indigo-500/30`}
      />
    </div>
  )
}
