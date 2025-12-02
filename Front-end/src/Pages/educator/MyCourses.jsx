import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../Components/student/Loading'

function MyCourses() {

  const { allCourses } = useContext(AppContext)
  const [courses, setCourses] = useState(null)

  const fetchEducatorCourses = async () => {
    setCourses(allCourses)
  }

  useEffect(() => {
    fetchEducatorCourses()
  }, [])

  const formatDate = (isoDate) => {
    if (!isoDate) return "—"
    const d = new Date(isoDate)
    return d.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  } 


  return courses ? (
    <div className="p-4 md:p-6">
      <h1 className="pb-4 text-xl font-semibold">My Courses</h1>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-600 text-sm">
              <th className="p-4 font-medium">All Courses</th>
              <th className="p-4 font-medium">Earnings</th>
              <th className="p-4 font-medium">Students</th>
              <th className="p-4 font-medium">Published On</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                
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

                {/* Earnings */}
                <td className="p-4 text-sm md:text-base">
                  ${course.coursePrice || 0}
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
  ) : (
    <Loading />
  )
}

export default MyCourses
