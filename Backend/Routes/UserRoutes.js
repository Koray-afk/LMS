const express = require('express')
const { registerUser, LoginUser, getUserData, userEnrolledCourses, updateUserCourseProgress, getUserCourseProgress } = require('../Controllers/UserControllers')
const { auth } = require('../Middleware/authMIddleware')
const userRouter = express.Router()

userRouter.post('/registerUser',registerUser)
userRouter.post('/loginUser',LoginUser)
userRouter.get('/data',auth,getUserData)
userRouter.get('/enrolled-courses',auth,userEnrolledCourses)
userRouter.post('/updateCourseProgress',auth,updateUserCourseProgress)
userRouter.post('/getCourseProgress',auth,getUserCourseProgress)

module.exports={
    userRouter
}



