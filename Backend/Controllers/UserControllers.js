const express = require('express')
const { User } = require('../Models/User')
const jwt = require('jsonwebtoken')
const bcrypt=require('bcryptjs')

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

    const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET, { expiresIn: "7d" });

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
            const token = jwt.sign({email},process.env.JWT_SECRET)
            return res.status(201).json({success:true,token,user: {
                _id: userExist._id,
                name: userExist.name,
                email: userExist.email
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

module.exports={
    registerUser,
    LoginUser
}