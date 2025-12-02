import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'

function CourseSection() {

  const{allCourses}=useContext(AppContext)
  console.log(allCourses)

  return (
    <div className="px-6 py-16 md:px-32">
  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center">
    Learn from the best
  </h2>

  <p className="text-gray-600 text-center max-w-2xl mx-auto mt-4">
    Explore our most popular courses across multiple fields. Whether it’s tech,
    design, business, or personal growth, each course is built to help you succeed.
  </p>

  {/* RESPONSIVE GRID */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12">
    {allCourses.slice(0, 4).map((value, index) => (
      <CourseCard key={index} course={value} />
    ))}
  </div>

  <div className="flex justify-center mt-10">
    <Link
      to="/courseList"
      className="text-gray-700 border border-gray-700 px-8 py-3 rounded-lg hover:bg-gray-100 transition"
      onClick={() => scrollTo(0, 0)}
    >
      Show all Courses
    </Link>
  </div>
</div>
  )
}

export default CourseSection
