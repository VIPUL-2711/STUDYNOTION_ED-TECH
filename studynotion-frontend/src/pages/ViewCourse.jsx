import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, Outlet, useParams } from "react-router-dom"
import { fetchFullCourseDetails } from "../services/operations/courseDetailsAPI"
import {
  setCourseSectionData,
  setEntireCourseData,
  setCompletedLectures,
  setTotalNoOfLectures,
  resetViewCourseState,
} from "../slices/viewCourseSlice"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import Spinner from "../components/common/Spinner"

export default function ViewCourse() {
  const { courseId } = useParams()
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(true)
  const [notEnrolled, setNotEnrolled] = useState(false)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const response = await fetchFullCourseDetails(courseId, token)
      if (response?.success) {
        const { courseDetails, completedVideos } = response.data
        dispatch(setEntireCourseData(courseDetails))
        dispatch(setCourseSectionData(courseDetails.courseContent || []))
        dispatch(setCompletedLectures(completedVideos || []))
        const total = (courseDetails.courseContent || []).reduce(
          (acc, s) => acc + (s.subSection?.length || 0),
          0
        )
        dispatch(setTotalNoOfLectures(total))
      } else {
        setNotEnrolled(true)
      }
      setLoading(false)
    })()

    return () => {
      dispatch(resetViewCourseState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId])

  if (loading) return <Spinner />
  if (notEnrolled) return <Navigate to={`/courses/${courseId}`} replace />

  return (
    <div className="flex">
      <VideoDetailsSidebar />
      <Outlet />
    </div>
  )
}
