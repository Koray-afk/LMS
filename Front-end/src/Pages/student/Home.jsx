import React from 'react'
import Hero from '../../Components/student/Hero'
import SearchBar from '../../Components/student/SearchBar'
import Companies from '../../Components/student/Companies'
import CourseSection from '../../Components/student/CourseSection'
import Testimonial from '../../Components/student/Testimonial'
import CallToAction from '../../Components/student/CallToAction'
import Footer from '../../Components/student/Footer'

function Home() {
  return (
    <div className='flex flex-col items-center space-y-7 text-center '>
      <Hero/>
      <SearchBar/>
      <Companies/>
      <CourseSection/>
      <Testimonial/>
      <CallToAction/>
      {/* <Footer/> */}
    </div>
  )
}

export default Home
