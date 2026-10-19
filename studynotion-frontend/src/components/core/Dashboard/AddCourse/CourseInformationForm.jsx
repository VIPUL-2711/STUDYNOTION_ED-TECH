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
    <form onSubmit={handleSubmit} className="glass-card rounded-2xl border border-white/10 p-6 md:p-8 space-y-6">
      <label className="block">
        <p className="mb-2 text-sm font-medium text-slate-300">
          Course Title <sup className="text-pink-500">*</sup>
        </p>
        <input
          required
          type="text"
          name="courseName"
          value={formData.courseName}
          onChange={handleChange}
          placeholder="e.g. Complete Full Stack Web Development Bootcamp"
          className="w-full rounded-xl border border-white/10 bg-midnight-card/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition"
        />
      </label>

      <label className="block">
        <p className="mb-2 text-sm font-medium text-slate-300">
          Course Description <sup className="text-pink-500">*</sup>
        </p>
        <textarea
          required
          rows={4}
          name="courseDescription"
          value={formData.courseDescription}
          onChange={handleChange}
          placeholder="What is this course about? Outline the objectives and scope."
          className="w-full rounded-xl border border-white/10 bg-midnight-card/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition resize-y"
        />
      </label>

      <label className="block">
        <p className="mb-2 text-sm font-medium text-slate-300">
          What You'll Learn <sup className="text-pink-500">*</sup>
        </p>
        <textarea
          required
          rows={4}
          name="WhatYouWillLearn"
          value={formData.WhatYouWillLearn}
          onChange={handleChange}
          placeholder="List key takeaways, skills, and projects students will build."
          className="w-full rounded-xl border border-white/10 bg-midnight-card/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition resize-y"
        />
      </label>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block">
          <p className="mb-2 text-sm font-medium text-slate-300">
            Price (₹) <sup className="text-pink-500">*</sup>
          </p>
          <input
            required
            type="number"
            min="0"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="499"
            className="w-full rounded-xl border border-white/10 bg-midnight-card/80 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition"
          />
        </label>

        <label className="block">
          <p className="mb-2 text-sm font-medium text-slate-300">
            Category <sup className="text-pink-500">*</sup>
          </p>
          <select
            required
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-midnight-card/80 px-4 py-3 text-sm text-white outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition"
          >
            <option value="" className="bg-midnight-surface text-slate-400">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id} className="bg-midnight-surface text-white">
                {cat.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="block">
        <p className="mb-2 text-sm font-medium text-slate-300">
          Course Thumbnail {!editCourse && <sup className="text-pink-500">*</sup>}
        </p>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-dashed border-white/15 bg-midnight-surface/40">
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="preview"
              className="h-20 w-32 rounded-lg object-cover border border-white/10 shadow-md"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnail}
            className="block w-full text-sm text-slate-400 file:mr-4 file:rounded-xl file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-cyan-300 hover:file:bg-white/15 file:cursor-pointer transition"
          />
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={loading}
          className="aurora-btn px-6 py-2.5 text-sm font-semibold text-white transition disabled:opacity-50"
        >
          {loading ? "Saving..." : editCourse ? "Save & Next" : "Next"}
        </button>
      </div>
    </form>
  )
}
