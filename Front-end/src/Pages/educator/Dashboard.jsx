import React, { useEffect, useState } from 'react'
import { assets, dummyDashboardData } from '../../assets/assets'
import Loading from '../../Components/student/Loading'

function Dashboard() {

  const [dashboard, setDashboard] = useState(null)

  const fetchDashboardData = async () => {
    setDashboard(dummyDashboardData)
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  return dashboard ? (
    <div className="p-4 md:p-6">
      <div className="space-y-6">

        {/* --- Top Cards --- */}
        <div className="flex flex-wrap gap-5">

          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md bg-white">
            <img src={assets.patients_icon} alt="" className="w-10 h-10" />
            <div>
              <p className="text-xl font-semibold">{dashboard.enrolledStudentsData.length}</p>
              <p className="text-gray-600 text-sm">Total Enrollments</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md bg-white">
            <img src={assets.appointments_icon} alt="" className="w-10 h-10" />
            <div>
              <p className="text-xl font-semibold">{dashboard.totalCourses}</p>
              <p className="text-gray-600 text-sm">Total Courses</p>
            </div>
          </div>

          <div className="flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md bg-white">
            <img src={assets.earning_icon} alt="" className="w-10 h-10" />
            <div>
              <p className="text-xl font-semibold">$ {dashboard.totalEarnings}</p>
              <p className="text-gray-600 text-sm">Total Amount Earned</p>
            </div>
          </div>

        </div>

        {/* --- Table Section --- */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Latest Enrollments</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-100 text-left text-sm text-gray-600">
                  <th className="p-3 border-b">#</th>
                  <th className="p-3 border-b">Student Name</th>
                  <th className="p-3 border-b">Course Title</th>
                  <th className="p-3 border-b">Date</th>
                </tr>
              </thead>

              <tbody>
                {dashboard.enrolledStudentsData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 text-sm">
                    <td className="p-3 border-b">{index + 1}</td>

                    <td className="p-3 border-b">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.student.imageUrl}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span>{item.student.name}</span>
                      </div>
                    </td>

                    <td className="p-3 border-b">{item.courseTitle}</td>
                    <td className="p-3 border-b">{item.student.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default Dashboard
