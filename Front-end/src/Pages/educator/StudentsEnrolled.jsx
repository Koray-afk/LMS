import React, { useContext, useEffect, useState } from 'react';
import Loading from '../../Components/student/Loading';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';

function StudentsEnrolled() {

  const { token, backend_Url } = useContext(AppContext)
  const [enrolledStudents, setEnrolledStudents] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchStudentsEnrolled = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const { data } = await axios.get(`${backend_Url}/api/educator/enrolled-students`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (data.success) {
        setEnrolledStudents(data.enrolledStudents)
      } else {
        setError(data.message || 'Failed to load enrolled students')
        toast.error(data.message || 'Failed to load enrolled students')
      }
    } catch (error) {
      console.error(error)
      setError(error.response?.data?.message || 'Failed to load enrolled students')
      toast.error(error.response?.data?.message || 'Failed to load enrolled students')
    } finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (token) {
      fetchStudentsEnrolled();
    }
  }, [token]);


  if (isLoading) return <Loading />

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl text-red-600 mb-4">Error: {error}</p>
        <button
          onClick={() => fetchStudentsEnrolled()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!enrolledStudents || enrolledStudents.length === 0) {
    return (
      <div className="p-4 md:p-6">
        <h1 className="text-lg font-semibold mb-5">Students Enrolled</h1>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-xl text-gray-600 mb-2">No students enrolled yet</p>
          <p className="text-sm text-gray-400">Students will appear here once they enroll in your courses</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-lg font-semibold mb-5">Students Enrolled</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium">
              <th className="p-4 w-10">#</th>
              <th className="p-4">Student Name</th>
              <th className="p-4">Course Title</th>
              <th className="p-4">Enrollment Date</th>
            </tr>
          </thead>

          <tbody className="text-sm">
            {enrolledStudents.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                
                {/* Index */}
                <td className="p-4">{index + 1}</td>

                {/* Student Info */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.student?.imageUrl || assets.patients_icon}
                      alt={item.student?.name || 'Student'}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p>{item.student?.name || 'Unknown Student'}</p>
                  </div>
                </td>

                {/* Course Title */}
                <td className="p-4">{item.courseTitle || 'N/A'}</td>

                {/* Purchase Date - backend has typo: courseData instead of purchaseDate */}
                <td className="p-4">
                  {item.courseData ? new Date(item.courseData).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  }) : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentsEnrolled;
