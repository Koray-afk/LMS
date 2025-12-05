const express = require('express')
const { auth, isEducator } = require('../Middleware/authMIddleware')
const { becomeEducator, educatorDashbboardData, getEnrolledStudentsData } = require('../Controllers/EducatorController')
const { upload } = require('../Config/multer')
const { addCourse, getEducatorCourse } = require('../Controllers/CourseController')
const educatorRouter = express.Router()

educatorRouter.post('/become-educator',auth,becomeEducator)
educatorRouter.post('/add-course',auth,isEducator,upload.single('image'),addCourse)
educatorRouter.get('/courses',auth,isEducator,getEducatorCourse)
educatorRouter.get('/dashboard',auth,isEducator,educatorDashbboardData)
educatorRouter.get('/enrolled-students',auth,isEducator,getEnrolledStudentsData)

module.exports={
    educatorRouter
}