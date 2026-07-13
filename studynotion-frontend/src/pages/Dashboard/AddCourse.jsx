import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import RenderSteps from "../../components/core/Dashboard/AddCourse/RenderSteps"
import CourseInformationForm from "../../components/core/Dashboard/AddCourse/CourseInformationForm"
import CourseBuilderForm from "../../components/core/Dashboard/AddCourse/CourseBuilderForm"
import PublishCourse from "../../components/core/Dashboard/AddCourse/PublishCourse"
import { resetCourseState } from "../../slices/courseSlice"

export default function AddCourse() {
  const dispatch = useDispatch()
  const { step } = useSelector((state) => state.course)

  useEffect(() => {
    dispatch(resetCourseState())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-charcoal">Add a new course</h1>
      <div className="mt-6 max-w-3xl">
        <RenderSteps />
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse />}
      </div>
    </div>
  )
}
