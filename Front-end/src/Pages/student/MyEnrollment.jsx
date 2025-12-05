import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { Line } from 'rc-progress';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../Components/student/Loading';

function MyEnrollment() {

  const { token, backend_Url, calculateCourseDuration } = useContext(AppContext)
  const navigate = useNavigate()
  
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchEnrolledCoursesWithProgress = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Fetch enrolled courses
      const { data } = await axios.get(`${backend_Url}/api/user/enrolled-courses`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (data.success) {
        const courses = data.enrolledCourses

        // Fetch progress for each course
        const coursesWithProgress = await Promise.all(
          courses.map(async (course) => {
            try {
              // Fetch progress for this course
              const progressResponse = await axios.post(
                `${backend_Url}/api/user/getCourseProgress`,
                { courseId: course._id },
                { headers: { Authorization: `Bearer ${token}` } }
              )

              // Calculate total lectures
              const totalLectures = course.courseContent?.reduce(
                (sum, chapter) => sum + (chapter.chapterContent?.length || 0),
                0
              ) || 0

              // Get completed lectures count
              const lectureCompleted = progressResponse.data.progressData?.lectureCompleted?.length || 0

              return {
                ...course,
                progress: {
                  lectureCompleted,
                  totalLectures
                }
              }
            } catch (progressError) {
              console.error(`Error fetching progress for course ${course._id}:`, progressError)
              // If progress fetch fails, return course with 0 progress
              const totalLectures = course.courseContent?.reduce(
                (sum, chapter) => sum + (chapter.chapterContent?.length || 0),
                0
              ) || 0

              return {
                ...course,
                progress: {
                  lectureCompleted: 0,
                  totalLectures
                }
              }
            }
          })
        )

        setEnrolledCourses(coursesWithProgress)
      } else {
        setError(data.message || 'Failed to load enrolled courses')
        toast.error(data.message || 'Failed to load enrolled courses')
      }
    } catch (error) {
      console.error(error)
      setError(error.response?.data?.message || 'Failed to load enrolled courses')
      toast.error(error.response?.data?.message || 'Failed to load enrolled courses')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchEnrolledCoursesWithProgress()
    }
  }, [token])


  if (isLoading) return <Loading />

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl text-red-600 mb-4">Error: {error}</p>
        <button
          onClick={() => fetchEnrolledCoursesWithProgress()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!enrolledCourses || enrolledCourses.length === 0) {
    return (
      <div className="mx-4 md:mx-10 lg:mx-20 py-6">
        <h1 className="text-3xl font-bold mb-6">My Enrollments</h1>
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl shadow-lg">
          <p className="text-xl text-gray-600 mb-2">No enrolled courses yet</p>
          <p className="text-sm text-gray-400">Enroll in courses to start learning!</p>
          <button
            onClick={() => navigate('/courseList')}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Browse Courses
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-4 md:mx-10 lg:mx-20 py-6">
      <h1 className="text-3xl font-bold mb-6">My Enrollments</h1>
  
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-4 px-6 text-sm font-semibold">Course</th>
              <th className="py-4 px-6 text-sm font-semibold">Duration</th>
              <th className="py-4 px-6 text-sm font-semibold">Completed</th>
              <th className="py-4 px-6 text-sm font-semibold">Status</th>
            </tr>
          </thead>
  
          <tbody className="divide-y">
            {enrolledCourses.map((course, index) => (
              <tr key={course._id || index} className="hover:bg-gray-50 transition">
                {/* Course Thumbnail + Title */}
                <td className="py-4 px-6 flex items-center gap-4 min-w-[250px]">
                  <img
                    src={course.courseThumbnail}
                    alt=""
                    className="w-20 h-14 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 max-w-xs mb-2">
                      {course.courseTitle}
                    </p>
                    <Line 
                      strokeWidth={1} 
                      percent={course.progress?.totalLectures > 0 
                        ? (course.progress.lectureCompleted * 100) / course.progress.totalLectures 
                        : 0
                      }
                    />
                  </div>
                </td>
  
                {/* Course Duration */}
                <td className="py-4 px-6 text-gray-700 font-medium min-w-[120px]">
                  {calculateCourseDuration(course)}
                </td>
  
                {/* Lecture Progress */}
                <td className="py-4 px-6 text-gray-700 font-medium min-w-[150px]">
                  {course.progress && (
                    <>
                      {course.progress.lectureCompleted} / {course.progress.totalLectures}
                      <span className="text-sm text-gray-500 ml-1">Lectures</span>
                    </>
                  )}
                </td>
  
                {/* Status */}
                <td className="py-4 px-6 min-w-[120px]">
                  <button 
                    onClick={() => navigate('/player/' + course._id)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer
                      ${
                        course.progress?.lectureCompleted === course.progress?.totalLectures && course.progress?.totalLectures > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {course.progress?.lectureCompleted === course.progress?.totalLectures && course.progress?.totalLectures > 0
                      ? "Completed"
                      : "On Going"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyEnrollment
