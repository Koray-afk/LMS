const express = require('express')
const { User } = require('../Models/User')
const jwt = require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const { Course } = require('../Models/Course')
const { CourseProgress } = require('../Models/CourseProgress')

// Api for register new User 
const registerUser = async(req,res)=>{
   try {
     const {name , email , password} = req.body 
     if(!name || !email || !password){
         return res.status(404).json({success:false,message:"missing Fields"})
     }
 
     const existinguser = await User.findOne({email})
 
     if(existinguser){
        return res.status(400).json({success:false,message:'user already existed'})
     }

     // Now we have to hashed the password before sending it to the  databse 
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password,salt)

     const UserData = {
        name,
        email,
        password:hashedPassword
     }

     const newUser = new User(UserData)
     console.log(newUser)

     await newUser.save();

    const token = jwt.sign({id:newUser._id,role:newUser.role}, process.env.JWT_SECRET, { expiresIn: "7d" });

    return res.status(201).json({success:true,message:'User added successfully',user:newUser,token})


   } catch (error) {
    console.log(error)
    return res.status(500).json({success:false,message:error.message})
   }
}

// API for user Login 
const LoginUser = async(req,res)=>{
    try {
        const {email,password} = req.body;
        // now we have to find whether user exixt in the database or not 
        console.log(email)
        console.log(password)
        const userExist = await User.findOne({email})
        if(!userExist){
            return res.status(404).json({success:false,message:'User does not exist'})
        }
        console.log(userExist)
    
        // Now we have to compare the password 
        const isMatch = await bcrypt.compare(password,userExist.password)
        console.log(isMatch)
    
        if(isMatch){
            // now we will send the token to the user 
            const token = jwt.sign({id:userExist._id,role:userExist.role},process.env.JWT_SECRET)
            return res.status(201).json({success:true,token,user: {
                _id: userExist._id,
                name: userExist.name,
                email: userExist.email,
                role:userExist.role
              }})
        }
        else{
            return res.json({success:false,message:'Invalid Credentials'})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:error.message})
    }
}

// User data 
const getUserData = async(req,res)=>{
    try{
        const userId = req.user.id 
        console.log(userId)
        const user = await User.findById(userId)

        if(!user){
            return res.status(401).json({success:false,message:'User does not exists'})
        }

        return res.status(201).json({success:true,message:user})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:error.message})
    }
}

//  User enrolled courses with lecure links 
const userEnrolledCourses = async(req,res)=>{
    try{
        const userId = req.user.id 
        const UserData = await User.findById(userId).populate('enrolledCourses')

        if(!UserData){
            return res.status(401).json({success:false,message:'User does not exists'})
        }

        return res.status(201).json({success:true,enrolledCourses:UserData.enrolledCourses})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:error.message})
    }
}

// IPdate user course progress 
const updateUserCourseProgress = async(req,res)=>{
    try {
        const userId = req.user.id
        const {courseId,lectureId} = req.body
    
        const progressData = await CourseProgress.findOne({userId,courseId})
    
        if(progressData){
            if (progressData.lectureCompleted.includes(lectureId)){
                res.json({success:true,message:'Lecture already Completed'})
            }
    
            progressData.lectureCompleted.push(lectureId)
            await progressData.save()
             
        }
        else{
            await CourseProgress.create({
                userId,
                courseId,
                lectureCompleted:[lectureId]
            })
        }

        return res.status(201).json({success:true,message:'Progress Updated'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:error.message})
    }

}

// Get user Course Progress 
const getUserCourseProgress = async(req,res)=>{
    try {
        const userId = req.user.id 
        const {courseId} = req.body
        
        const progressData = await CourseProgress.findOne({userId,courseId})

        return res.status(201).json({success:true,progressData})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:error.message})
    }
}

module.exports={
    registerUser,
    LoginUser,getUserData,userEnrolledCourses,updateUserCourseProgress,getUserCourseProgress
}