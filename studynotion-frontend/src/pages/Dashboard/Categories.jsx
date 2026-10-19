import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { fetchCourseCategories } from "../../services/operations/courseDetailsAPI"
import { createCategory } from "../../services/operations/courseAPI"
import Spinner from "../../components/common/Spinner"

export default function Categories() {
  const { token } = useSelector((state) => state.auth)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({ name: "", description: "" })

  async function loadCategories() {
    setLoading(true)
    const result = await fetchCourseCategories()
    setCategories(result || [])
    setLoading(false)
  }

  useEffect(() => {
    loadCategories()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    const result = await createCategory(formData, token)
    if (result) {
      setFormData({ name: "", description: "" })
      loadCategories()
    }
    setSaving(false)
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-white/5 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-aurora-cyan">Administration</span>
        <h1 className="font-display text-2xl font-black text-white sm:text-3xl">Manage Categories</h1>
        <p className="mt-1 text-xs text-slate-400">Define course disciplines and subject classifications for the catalog.</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card rounded-3xl border border-white/10 p-7">
        <h2 className="font-display text-lg font-bold text-white">Create New Category</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            required
            placeholder="Category name (e.g., Artificial Intelligence)"
            value={formData.name}
            onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20"
          />
          <input
            required
            placeholder="Short description of this discipline"
            value={formData.description}
            onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
            className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="aurora-btn mt-5 rounded-xl px-6 py-3 text-xs font-bold text-white transition disabled:opacity-50"
        >
          {saving ? "Creating..." : "Create Category"}
        </button>
      </form>

      <div>
        <h2 className="font-display text-lg font-bold text-white mb-4">Existing Categories</h2>
        {loading ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <div key={cat._id} className="glass-card rounded-2xl border border-white/10 p-5">
                <p className="font-bold text-white text-base">{cat.name}</p>
                <p className="mt-1.5 text-xs text-slate-400 leading-relaxed">{cat.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
