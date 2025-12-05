// Add new course 
const { Course } = require("../Models/Course");
const cloudinary = require('cloudinary').v2

const addCourse = async(req,res)=>{
    try{
        const {courseData}= req.body
        console.log(req.body)
        const imageFile = req.file 

        const educatorId = req.user.id;
        console.log(req.user.id)

        if(!imageFile){
            return res.status(400).json({success:false,message:'Please attach thumbnail'})
        }

        const parseCourseData = await JSON.parse(courseData)
        parseCourseData.educator= educatorId
        // Now we have to upload the image in cloudinary and get the public url 
        const newCourse = await Course.create(parseCourseData)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
        newCourse.courseThumbnail= imageUpload.secure_url

        await newCourse.save()

        return res.status(201).json({success:true,message:'Course added SuccessFully',newCourse})

    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,error:error})
    }
}

const getEducatorCourse = async(req,res)=>{
    try{
        const educator = req.user.id
        // Find the course of the perticular educator 
        const courses = await Course.find({educator})

        return res.status(201).json({success:true,courses})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({success:false,message:err})
    }
}

// get all courses 
const getAllCourses = async(req,res)=>{
    try{
        const course = await Course.find({isPublished:true}).select(['-courseContent','-enrolledStudents']).populate({path:'educator'})

        return res.status(201).json({success:true,course})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:error.message})
    }
}

// Get course by ID 
const getCourseByID = async(req,res)=>{
    try{
        const {id}= req.params 
        const courseData = await Course.findById(id).populate({path:'educator'})

        // now we have to remove lecture url if is preview is false 
        courseData.courseContent.forEach((chapter)=>{
            chapter.chapterContent.forEach((lecture)=>{
                if(!lecture.isPreviewFree){
                    lecture.lectureUrl=''
                }
            })
        })

        return res.status(201).json({success:true,courseData})


    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:error.message})
    }
}




module.exports={
    addCourse,getEducatorCourse,getAllCourses,getCourseByID
}