import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchFullCourseDetails } from "../../services/operations/courseDetailsAPI"
import { setCourse, setEditCourse, setStep } from "../../slices/courseSlice"
import RenderSteps from "../../components/core/Dashboard/AddCourse/RenderSteps"
import CourseInformationForm from "../../components/core/Dashboard/AddCourse/CourseInformationForm"
import CourseBuilderForm from "../../components/core/Dashboard/AddCourse/CourseBuilderForm"
import PublishCourse from "../../components/core/Dashboard/AddCourse/PublishCourse"
import Spinner from "../../components/common/Spinner"

export default function EditCourse() {
  const { courseId } = useParams()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { step } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      dispatch(setStep(1))
      dispatch(setEditCourse(true))
      const response = await fetchFullCourseDetails(courseId, token)
      if (response?.success) {
        dispatch(setCourse(response.data.courseDetails))
      }
      setLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId])

  if (loading) return <Spinner />

  return (
    <div>
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">Edit Course</h1>
      <p className="mt-1 text-sm text-slate-400">Update your course details, section modules, and publishing status.</p>
      <div className="mt-8 max-w-3xl">
        <RenderSteps />
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse />}
      </div>
    </div>
  )
}
