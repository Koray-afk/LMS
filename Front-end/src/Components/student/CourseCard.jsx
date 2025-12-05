import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

function CourseCard({ course }) {
  const { currency } = useContext(AppContext)

  const finalPrice = (course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)

  return (
    <Link
    to={"/course/" + course._id}
    onClick={() => scrollTo(0, 0)}
    className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
  >
    {/* Image */}
    <div className="w-full aspect-[16/10] overflow-hidden">
      <img
        src={course.courseThumbnail}
        alt={course.courseTitle}
        className="w-full h-full object-cover"
      />
    </div>
  
    {/* Content */}
    <div className="p-4 space-y-2">
      <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
        {course.courseTitle}
      </h3>
  
      <p className="text-sm text-gray-500">Koray Cerragil</p>
  
      <div className="flex items-center gap-2 text-sm text-yellow-500">
        <p className="font-semibold">4.5</p>
        <div>⭐⭐⭐⭐⭐</div>
        <p className="text-gray-500">(22)</p>
      </div>
  
      <p className="text-xl font-bold text-blue-600 mt-2">
        {currency}{finalPrice}
      </p>
  
      <p className="text-sm text-gray-400 line-through">
        {currency}{course.coursePrice}
      </p>
    </div>
  </Link>
  )
}

export default CourseCard
