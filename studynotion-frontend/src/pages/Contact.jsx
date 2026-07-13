import { useState } from "react"
import toast from "react-hot-toast"

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  function handleSubmit(e) {
    e.preventDefault()
    toast.success("Thanks! We'll get back to you soon.")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-20">
      <h1 className="font-display text-3xl font-bold text-charcoal">Get in touch</h1>
      <p className="mt-2 text-charcoal-dim">Questions about a course or your account? Send us a message.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-y-5">
        <input
          required
          placeholder="Your name"
          value={formData.name}
          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
          className="rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
        />
        <input
          required
          type="email"
          placeholder="Your email"
          value={formData.email}
          onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
          className="rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
        />
        <textarea
          required
          rows={5}
          placeholder="Your message"
          value={formData.message}
          onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
          className="rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
        />
        <button
          type="submit"
          className="rounded-lg bg-ink-900 py-3 text-sm font-semibold text-white transition hover:bg-ink-800"
        >
          Send message
        </button>
      </form>
    </div>
  )
}
