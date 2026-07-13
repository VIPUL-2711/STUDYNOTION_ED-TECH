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
    <div>
      <h1 className="font-display text-2xl font-bold text-charcoal">Categories</h1>

      <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-ink-100 bg-white p-6">
        <h2 className="font-display text-lg font-semibold text-charcoal">Create a new category</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            required
            placeholder="Category name"
            value={formData.name}
            onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
            className="rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm outline-none focus:border-ink-900"
          />
          <input
            required
            placeholder="Short description"
            value={formData.description}
            onChange={(e) => setFormData((p) => ({ ...p, description: e.target.value }))}
            className="rounded-lg border border-ink-100 bg-white px-4 py-2.5 text-sm outline-none focus:border-ink-900"
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="mt-4 rounded-lg bg-ink-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-800 disabled:opacity-60"
        >
          {saving ? "Creating..." : "Create category"}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="font-display text-lg font-semibold text-charcoal">All categories</h2>
        {loading ? (
          <Spinner />
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <div key={cat._id} className="rounded-xl border border-ink-100 bg-white p-5">
                <p className="font-medium text-charcoal">{cat.name}</p>
                <p className="mt-1 text-sm text-charcoal-dim">{cat.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
