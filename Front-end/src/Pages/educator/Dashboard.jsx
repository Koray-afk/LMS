import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Loading from '../../Components/student/Loading'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

function Dashboard() {

  const { token, backend_Url } = useContext(AppContext)
  const [dashboard, setDashboard] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const { data } = await axios.get(`${backend_Url}/api/educator/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (data.success) {
        // Handle backend typo: ernrolledStudensData -> enrolledStudentsData
        const dashboardData = {
          ...data.dashboardData,
          enrolledStudentsData: data.dashboardData.ernrolledStudensData || []
        }
        setDashboard(dashboardData)
      } else {
        setError(data.message || 'Failed to load dashboard')
        toast.error(data.message || 'Failed to load dashboard')
      }
    } catch (error) {
      console.error(error)
      setError(error.response?.data?.message || 'Failed to load dashboard')
      toast.error(error.response?.data?.message || 'Failed to load dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      fetchDashboardData()
    }
  }, [token])


  if (isLoading) return <Loading />

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-xl text-red-600 mb-4">Error: {error}</p>
        <button
          onClick={() => fetchDashboardData()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    )
  }

  if (!dashboard) return <Loading />

  return (
    <div className="p-4 md:p-6">
      <div className="space-y-6">

        {/* --- Top Cards --- */}
        <div className="flex flex-wrap gap-5">

          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md bg-white">
            <img src={assets.patients_icon} alt="" className="w-10 h-10" />
            <div>
              <p className="text-xl font-semibold">{dashboard.enrolledStudentsData?.length || 0}</p>
              <p className="text-gray-600 text-sm">Total Enrollments</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md bg-white">
            <img src={assets.appointments_icon} alt="" className="w-10 h-10" />
            <div>
              <p className="text-xl font-semibold">{dashboard.totalCourses || 0}</p>
              <p className="text-gray-600 text-sm">Total Courses</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md bg-white">
            <img src={assets.earning_icon} alt="" className="w-10 h-10" />
            <div>
              <p className="text-xl font-semibold">$ {dashboard.totalEarnings || 0}</p>
              <p className="text-gray-600 text-sm">Total Amount Earned</p>
            </div>
          </div>

        </div>

        {/* --- Table Section --- */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Latest Enrollments</h2>

          {dashboard.enrolledStudentsData && dashboard.enrolledStudentsData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-100 text-left text-sm text-gray-600">
                    <th className="p-3 border-b">#</th>
                    <th className="p-3 border-b">Student Name</th>
                    <th className="p-3 border-b">Course Title</th>
                  </tr>
                </thead>

                <tbody>
                  {dashboard.enrolledStudentsData.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 text-sm">
                      <td className="p-3 border-b">{index + 1}</td>

                      <td className="p-3 border-b">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.student?.imageUrl || assets.patients_icon}
                            alt=""
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <span>{item.student?.name || 'Unknown Student'}</span>
                        </div>
                      </td>

                      <td className="p-3 border-b">{item.courseTitle || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No enrollments yet</p>
          )}

        </div>
      </div>
    </div>
  )
}

export default Dashboard
