import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { Line } from 'rc-progress';

function MyEnrollment() {

  const{enrolledCourse,calculateCourseDuration}=useContext(AppContext)
  const navigate = useNavigate()
  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 2, totalLectures: 4 },
    { lectureCompleted: 1, totalLectures: 5 },
    { lectureCompleted: 3, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 3 },
    { lectureCompleted: 5, totalLectures: 7 },
    { lectureCompleted: 6, totalLectures: 8 },
    { lectureCompleted: 2, totalLectures: 6 },
    { lectureCompleted: 4, totalLectures: 10 },
    { lectureCompleted: 3, totalLectures: 5 },
    { lectureCompleted: 7, totalLectures: 7 },
    { lectureCompleted: 1, totalLectures: 4 },
    { lectureCompleted: 0, totalLectures: 2 },
    { lectureCompleted: 5, totalLectures: 5 }
  ]);

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
            {enrolledCourse.map((course, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                {/* Course Thumbnail + Title */}
                <td className="py-4 px-6 flex items-center gap-4 min-w-[250px]">
                  <img
                    src={course.courseThumbnail}
                    alt=""
                    className="w-20 h-14 object-cover rounded-lg border"
                  />
                  <p className="font-medium text-gray-900 max-w-xs">
                    {course.courseTitle}
                  </p>
                  <Line strokeWidth={1} percent={progressArray[index] ? (progressArray[index].lectureCompleted*100) / progressArray[index].totalLectures :0}/>
                </td>
  
                {/* Course Duration */}
                <td className="py-4 px-6 text-gray-700 font-medium min-w-[120px]">
                  {calculateCourseDuration(course)}
                </td>
  
                {/* Lecture Progress */}
                <td className="py-4 px-6 text-gray-700 font-medium min-w-[150px]">
                  {progressArray[index] &&
                    `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures}`}
                  <span className="text-sm text-gray-500 ml-1">Lectures</span>
                </td>
  
                {/* Status */}
                <td className="py-4 px-6 min-w-[120px]">
                  <button onClick={()=>navigate('/player/'+course._id)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer
                      ${
                        progressArray[index]?.lectureCompleted ===
                        progressArray[index]?.totalLectures
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {progressArray[index]?.lectureCompleted ===
                    progressArray[index]?.totalLectures
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
