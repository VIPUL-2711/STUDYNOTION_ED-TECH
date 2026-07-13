export function formatDate(dateString) {
  if (!dateString) return ""
  const date = new Date(dateString)
  const options = { year: "numeric", month: "short", day: "numeric" }
  return date.toLocaleDateString("en-US", options)
}

export function getAverageRating(ratingAndReviews = []) {
  if (!ratingAndReviews || ratingAndReviews.length === 0) return 0
  const total = ratingAndReviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0)
  return Math.round((total / ratingAndReviews.length) * 10) / 10
}

export function formatDuration(seconds = 0) {
  const s = Number(seconds) || 0
  const mins = Math.floor(s / 60)
  const secs = Math.floor(s % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function initials(firstName = "", lastName = "") {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase()
}
