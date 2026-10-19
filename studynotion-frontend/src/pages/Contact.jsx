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
      <div className="glass-card rounded-3xl border border-white/10 p-8 shadow-2xl backdrop-blur-xl">
        <span className="inline-block rounded-full bg-aurora-indigo/20 px-3.5 py-1 text-xs font-semibold text-aurora-cyan border border-aurora-cyan/30 mb-3">
          Direct Inquiries
        </span>
        <h1 className="font-display text-3xl font-extrabold text-white">Get in touch</h1>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          Questions regarding enrollment, enterprise licenses, or technical assistance? Send us a message and our support team will respond promptly.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-y-4">
          <label className="block">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Full Name</p>
            <input
              required
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20"
            />
          </label>

          <label className="block">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Email Address</p>
            <input
              required
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20"
            />
          </label>

          <label className="block">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">Your Message</p>
            <textarea
              required
              rows={4}
              placeholder="Tell us what you need help with..."
              value={formData.message}
              onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
              className="w-full rounded-xl border border-white/10 bg-midnight-card px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition focus:border-aurora-cyan/50 focus:ring-1 focus:ring-aurora-cyan/20 resize-none"
            />
          </label>

          <button
            type="submit"
            className="aurora-btn mt-2 rounded-xl py-3.5 text-sm font-bold text-white transition"
          >
            Send message
          </button>
        </form>
      </div>
    </div>
  )
}
