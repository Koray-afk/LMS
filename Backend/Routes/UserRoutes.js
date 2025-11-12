const express = require('express')
const { registerUser, LoginUser } = require('../Controllers/UserControllers')
const userRouter = express.Router()

userRouter.post('/registerUser',registerUser)
userRouter.post('/loginUser',LoginUser)

module.exports={
    userRouter
}
