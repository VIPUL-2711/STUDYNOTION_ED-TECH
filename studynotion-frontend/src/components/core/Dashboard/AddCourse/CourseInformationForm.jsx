import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { fetchCourseCategories } from "../../../../services/operations/courseDetailsAPI"
import { addCourseDetails, editCourseDetails } from "../../../../services/operations/courseAPI"
import { setCourse, setStep } from "../../../../slices/courseSlice"

export default function CourseInformationForm() {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [thumbnailPreview, setThumbnailPreview] = useState(course?.thumbnail || null)
  const [thumbnailFile, setThumbnailFile] = useState(null)

  const [formData, setFormData] = useState({
    courseName: course?.courseName || "",
    courseDescription: course?.courseDescription || "",
    WhatYouWillLearn: course?.WhatYouWillLearn || "",
    price: course?.price || "",
    category: course?.category?._id || "",
  })

  useEffect(() => {
    ;(async () => {
      const result = await fetchCourseCategories()
      setCategories(result || [])
    })()
  }, [])

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleThumbnail(e) {
    const file = e.target.files[0]
    if (file) {
      setThumbnailFile(file)
      setThumbnailPreview(URL.createObjectURL(file))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (!editCourse && !thumbnailFile) {
      toast.error("Please upload a course thumbnail")
      return
    }

    setLoading(true)
    const formDataToSend = new FormData()

    if (editCourse) {
      formDataToSend.append("courseId", course._id)
    }
    formDataToSend.append("courseName", formData.courseName)
    formDataToSend.append("courseDescription", formData.courseDescription)
    formDataToSend.append("WhatYouWillLearn", formData.WhatYouWillLearn)
    formDataToSend.append("price", formData.price)
    formDataToSend.append("category", formData.category)
    formDataToSend.append("tag", "General")
    if (thumbnailFile) {
      formDataToSend.append("thumbnailImage", thumbnailFile)
    }

    const result = editCourse
      ? await editCourseDetails(formDataToSend, token)
      : await addCourseDetails(formDataToSend, token)

    if (result) {
      dispatch(setCourse(result))
      dispatch(setStep(2))
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-ink-100 bg-white p-6">
      <label className="block">
        <p className="mb-1 text-sm font-medium text-charcoal">Course title <sup className="text-rose-600">*</sup></p>
        <input
          required
          type="text"
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
          placeholder="e.g. Complete Web Development Bootcamp"
          className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
        />
      </label>

      <label className="mt-5 block">
        <p className="mb-1 text-sm font-medium text-charcoal">Course description <sup className="text-rose-600">*</sup></p>
        <textarea
          required
          rows={4}
          name="courseDescription"
          value={formData.courseDescription}
          onChange={handleChange}
          placeholder="What is this course about?"
          className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
        />
      </label>

      <label className="mt-5 block">
        <p className="mb-1 text-sm font-medium text-charcoal">What you'll learn <sup className="text-rose-600">*</sup></p>
        <textarea
          required
          rows={4}
          name="WhatYouWillLearn"
          value={formData.WhatYouWillLearn}
          onChange={handleChange}
          placeholder="List the key takeaways for students"
          className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
        />
      </label>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block">
          <p className="mb-1 text-sm font-medium text-charcoal">Price (₹) <sup className="text-rose-600">*</sup></p>
          <input
            required
            type="number"
            min="0"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="499"
            className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
          />
        </label>

        <label className="block">
          <p className="mb-1 text-sm font-medium text-charcoal">Category <sup className="text-rose-600">*</sup></p>
          <select
            required
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-lg border border-ink-100 bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 block">
        <p className="mb-1 text-sm font-medium text-charcoal">Thumbnail {!editCourse && <sup className="text-rose-600">*</sup>}</p>
        <div className="flex items-center gap-4">
          {thumbnailPreview && (
            <img src={thumbnailPreview} alt="preview" className="h-20 w-32 rounded-lg object-cover" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnail}
            className="block w-full text-sm text-charcoal-dim file:mr-4 file:rounded-lg file:border-0 file:bg-ink-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-ink-900 hover:file:bg-ink-100"
          />
        </div>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 rounded-lg bg-ink-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Next"}
      </button>
    </form>
  )
}
