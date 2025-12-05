
const jwt = require("jsonwebtoken");
const { User } = require("../Models/User");
const { Course } = require("../Models/Course");
const { Purchase } = require("../Models/Purchase");

exports.becomeEducator = async (req, res) => {
  try {
    const userId = req.user.id;

    // Update user role
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role: "educator" },
      { new: true }
    );

    // Create new JWT so frontend knows role changed
    const token = jwt.sign(
      {
        id: updatedUser._id,
        role: updatedUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "You are now an educator",
      token, // Send new token
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// WE have to design educator dashboard data 
exports.educatorDashbboardData = async (req,res)=>{
    try{
        const educator = req.user.id 
        // Now with this id we have to find the courses 
        const courses = await Course.find({educator})

        const totalCourses = courses.length;

        const courseIds = courses.map(course=>course._id)

        // Calculate total earning from this 
        const purchase = await Purchase.find(
          {courseId:{$in:courseIds},status:'completed'}
        )

        const totalEarnings = purchase.reduce((sum,purchase)=> sum+purchase.amount , 0)

        // Now we have to collect unique enrolled student who are enrolled in these courses 
        const ernrolledStudensData = []
        for(const course of courses){
          const students = await User.find({
            _id:{$in:course.enrolledStudents}
          }, 'name imageUrl')

          students.forEach(student=>{
            ernrolledStudensData.push({
              courseTitle:course.courseTitle,
              student
            })
          })
        }


        return res.status(201).json({success:true,dashboardData:{totalEarnings,ernrolledStudensData,totalCourses}})

    }
    catch(error){
      console.log(error)
      return res.status(500).json({success:false,message:error.message})
    }
}

// Get enrolled students data with purchased data 
exports.getEnrolledStudentsData = async(req,res)=>{
  try{ 
    const educator = req.user.id
    const courses = await Course.find({educator})
    const courseIds = courses.map(course=>course._id)

    const purchases = await Purchase.find({
      courseId:{$in:courseIds},status:'completed'
    }).populate('userId','name imageUrl').populate('courseId','courseTitle')

    // Now we have to find the students data 
    const enrolledStudents = purchases.map((purchase)=> (
      {
        student:purchase.userId,
        courseTitle:purchase.courseId.courseTitle,
        courseData:purchase.createdAt
      }
    ))

    return res.status(201).json({success:true,enrolledStudents})

  }
  catch(error){
    console.log(error)
    return res.status(500).json({success:false,message:error})
  }
}