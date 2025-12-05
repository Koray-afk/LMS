const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true 
    },
    email:{
        type:String,
        require:true 
    },
    password:{
        type:String,
        require:true
    },
    imageUrl:{
        type:String,
        require:true
    },
    role:{
        type:String,
        enum:["user","educator"],
        default:"user"
    },
    enrolledCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'}
    ]

},{timestamps:true});

const User = mongoose.model('User',userSchema)

module.exports={
    User
}