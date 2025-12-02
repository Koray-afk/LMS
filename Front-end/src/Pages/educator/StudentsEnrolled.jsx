import React, { useEffect, useState } from 'react';
import { dummyStudentEnrolled } from '../../assets/assets';
import Loading from '../../Components/student/Loading';

function StudentsEnrolled() {

  const [enrolledStudents, setEnrolledStudents] = useState(null);

  const fetchStudentsEnrolled = () => {
    setEnrolledStudents(dummyStudentEnrolled);
  };

  useEffect(() => {
    fetchStudentsEnrolled();
  }, []);

  return enrolledStudents ? (
    <div className="p-4 md:p-6">
      <h1 className="text-lg font-semibold mb-5">Students Enrolled</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium">
              <th className="p-4 w-10">#</th>
              <th className="p-4">Student Name</th>
              <th className="p-4">Course Title</th>
              <th className="p-4">Date</th>
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
                      src={item.student.imageUrl}
                      alt={item.student.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p>{item.student.name}</p>
                  </div>
                </td>

                {/* Course Title */}
                <td className="p-4">{item.courseTitle}</td>

                {/* Purchase Date */}
                <td className="p-4">
                  {new Date(item.purchaseDate).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default StudentsEnrolled;
