import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../Components/student/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'

function MyCourses() {

  const { token, backend_Url } = useContext(AppContext)
  const [courses, setCourses] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchEducatorCourses = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const { data } = await axios.get(`${backend_Url}/api/educator/courses`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (data.success) {
        setCourses(data.courses)
      } else {
        setError(data.message || 'Failed to load courses')
        toast.error(data.message || 'Failed to load courses')
      }
    } catch (error) {
      console.error(error)
      setError(error.response?.data?.message || 'Failed to load courses')
      toast.error(error.response?.data?.message || 'Failed to load courses')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchEducatorCourses()
    }
  }, [token])

  const formatDate = (isoDate) => {
    if (!isoDate) return "—"
    const d = new Date(isoDate)
    return d.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  } 


  if (isLoading) return <Loading />

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl text-red-600 mb-4">Error: {error}</p>
        <button
          onClick={() => fetchEducatorCourses()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="p-4 md:p-6">
        <h1 className="pb-4 text-xl font-semibold">My Courses</h1>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-xl text-gray-600 mb-2">No courses yet</p>
          <p className="text-sm text-gray-400">Create your first course to get started!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="pb-4 text-xl font-semibold">My Courses</h1>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 text-sm">
              <th className="p-4 font-medium">All Courses</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Students</th>
              <th className="p-4 font-medium">Published On</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id || index} className="border-t hover:bg-gray-50">
                
                {/* Course Info */}
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={course.courseThumbnail}
                      alt=""
                      className="w-20 h-16 object-cover rounded-md"
                    />
                    <p className="text-sm md:text-base">
                      {course.courseTitle}
                    </p>
                  </div>
                </td>

                {/* Price */}
                <td className="p-4 text-sm md:text-base">
                  ${parseFloat(course.coursePrice).toFixed(2)}
                </td>

                {/* Students Count */}
                <td className="p-4 text-sm md:text-base">
                  {course.enrolledStudents?.length || 0}
                </td>

                {/* Published On */}
                <td className="p-4 text-sm md:text-base">
                  {formatDate(course.createdAt)}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyCourses
