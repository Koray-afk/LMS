const express = require('express')
const { getAllCourses, getCourseByID } = require('../Controllers/CourseController')
const courseRoute = express.Router()

courseRoute.get('/all',getAllCourses)
courseRoute.get('/:id',getCourseByID)

module.exports={
    courseRoute
}