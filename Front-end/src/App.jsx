import React from 'react'
import { Route, Routes, useMatch } from 'react-router-dom'
import Home from './Pages/student/Home'
import CourseList from './Pages/student/CourseList'
import CourseDetails from './Pages/student/CourseDetails'
import MyEnrollment from './Pages/student/MyEnrollment'
import Player from './Pages/student/Player'
import Loading from './Components/student/Loading'
import Educator from './Pages/educator/Educator'
import Dashboard from './Pages/educator/Dashboard'
import AddCourse from './Pages/educator/AddCourse'
import MyCourses from './Pages/educator/MyCourses'
import StudentsEnrolled from './Pages/educator/StudentsEnrolled'
import Navbar from './Components/student/Navbar'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import Footer from './Components/student/Footer'
import "quill/dist/quill.snow.css";


function App() {

  const isEducatorRoute = useMatch('/educator/*')

  return (

    <div className='text-default min-h-screen bg-white'>
      {!isEducatorRoute && <Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/courseList' element={<CourseList/>}/>
        <Route path='/courseList/:input' element={<CourseList/>}/>
        <Route path='/course/:id' element={<CourseDetails/>}/>
        <Route path='/myEnrollments' element={<MyEnrollment/>}/>
        <Route path='/player/:courseId' element={<Player/>}/>
        <Route path='/loading/:path' element={<Loading/>}/>
        <Route path='/educator' element={<Educator/>}>
          <Route path='educator' element={<Dashboard/>}/>
          <Route path='addCourses' element={<AddCourse/>}/>
          <Route path='myCourses' element={<MyCourses/>}/>
          <Route path='studentEnrolled' element={<StudentsEnrolled/>}/>
        </Route>
      
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
